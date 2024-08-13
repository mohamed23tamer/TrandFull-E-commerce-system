import { IoMdSend } from "react-icons/io";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";

function BuyerChat() {
  const [socket, setSocket] = useState(null);
  const [id, setID] = useState(null);

  const [send, setSend] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  async function checkLoggedIn() {
    if (localStorage.getItem("token")) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/buyer/token",
          {
            token: localStorage.getItem("token"),
          }
        );

        setID(response.data.id);
      } catch (err) {
        localStorage.removeItem("token");
      }
    } else {
      localStorage.removeItem("token");
      window.location.href = "http://localhost:5173/login";
    }
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket === null || id === null) return;

    socket.emit("addNewUser", id);
  }, [socket, id]);

  // receive message
  useEffect(() => {
    if (socket === null) return;

    socket.on("buyerGetMessage", (message) => {
      const old = allMessages;
      old.push([message.message, "received"]);
      const messages = [...old];

      setAllMessages(messages);
    });

    return () => {
      socket.off("buyerGetMessage");
    };
  }, [socket, allMessages]);

  function sendMessage(e) {
    e.preventDefault();

    if (socket === null) return;
    if (send === "") return;

    socket.emit("buyerSendMessage", { message: send, id });

    const old = allMessages;
    old.push([send, "sent"]);
    const messages = [...old];

    setSend("");
    setAllMessages(messages);
  }

  return (
    <>
      <div className="w-fit text-2xl text-[#3E64DA] font-bold mx-auto my-5">
        <h1>Customer Support</h1>
      </div>

      <main className="w-1/2 px-4 py-2 mx-auto">
        <div className="bg-slate-200 h-[450px] flex flex-col p-5 overflow-y-scroll">
          {allMessages.map((message, index) => {
            return (
              <div key={index} className="w-full grid mb-2">
                <p
                  className={`w-fit ${
                    message[1] == "received"
                      ? "bg-slate-500 justify-self-end"
                      : "bg-[#3E64DA]"
                  } text-white rounded-lg px-4 py-2`}
                >
                  {message[0]}
                </p>
              </div>
            );
          })}
        </div>

        <div className="h-[60px] flex justify-center items-center bg-[#202c33]">
          <form onSubmit={sendMessage} className="w-[70%] relative rounded-sm">
            <input
              type="text"
              id="message"
              placeholder="type a message ..."
              className="w-full h-[40px] p-[10px] bg-[#2A3942] text-white outline-none"
              onFocus={(e) => {
                e.target.placeholder = "";
              }}
              onBlur={(e) => {
                e.target.placeholder = "type a message...";
              }}
              value={send}
              onChange={(e) => {
                setSend(e.target.value);
              }}
            />

            <button type="submit">
              <IoMdSend className="absolute text-[white] cursor-pointer right-[9px] top-[31%]" />
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default BuyerChat;
