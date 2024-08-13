import { IoMdSend } from "react-icons/io";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

function AdminChat() {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [id, setID] = useState(null);

  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState(null);

  const [send, setSend] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);

  async function check() {
    const response = await axios.post("http://localhost:3000/control/token", {
      token: localStorage.getItem("admin"),
    });

    setID(response.data.adminID);
  }

  useEffect(() => {
    check();
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  async function getUsers() {
    if (onlineUsers.length) {
      const allUsers = [];
      for (let i = 0; i < onlineUsers.length; i++) {
        const response = await axios.get(
          "http://localhost:3000/admin/get-buyer/" + onlineUsers[i].userID
        );

        allUsers.push(response.data);
      }

      setUsers(allUsers);
    }
  }

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  useEffect(() => {
    if (socket === null || id === null) return;

    socket.emit("addNewAdmin", id);
    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket, id]);

  // receive message
  useEffect(() => {
    if (socket === null) return;

    socket.on("adminGetMessage", (message) => {
      const old = allMessages;
      old.push({ id: message.id, allMessages: [message.message, "received"] });
      const messages = [...old];

      setAllMessages(messages);
      setUserMessages(allMessages.filter((id) => id.id == userID));
    });

    return () => {
      socket.off("adminGetMessage");
    };
  }, [socket, allMessages, userID]);

  useEffect(() => {
    setUserMessages(allMessages.filter((id) => id.id == userID));
  }, [allMessages, userID]);

  function sendMessage(e) {
    e.preventDefault();

    if (socket === null) return;
    if (send === "") return;

    socket.emit("adminSendMessage", {
      message: send,
      recepientID: userID,
    });

    const old = allMessages;
    old.push({ id: userID, allMessages: [send, "sent"] });
    const messages = [...old];

    setSend("");
    setAllMessages(messages);
    setUserMessages(allMessages.filter((id) => id.id == userID));
  }

  return (
    <div className="flex">
      <ul className="bg-[#3E64DA] h-screen px-[10px] py-[30px]  w-[350px] ">
        <Link to="/control/admin/products">
          <IoMdArrowRoundBack className=" cursor-pointer mb-[40px] text-[white] text-2xl" />
        </Link>

        {users.map((user) => {
          return (
            <li
              className="flex mb-[25px]  hover:bg-[#F39E31] cursor-pointer p-[5px] text-[white] chats"
              key={user._id}
              onClick={function (e) {
                setUserID(user._id);
                const chats = document.querySelectorAll(".chats");
                chats.forEach((chat) => {
                  chat.classList.remove("bg-[#F39E31]");
                  e.currentTarget.classList.add("bg-[#F39E31]");
                });
                setUserMessages(allMessages.filter((id) => id.id == userID));
              }}
            >
              <img
                src="/images/avatar.jpg"
                alt=""
                className="w-[60px] h-[60px] rounded-full mr-[10px]"
              />

              <div className="container">
                <p className="mb-[7px]">{user.name}</p>
                <p>{user.email}</p>
              </div>
            </li>
          );
        })}
      </ul>

      {userID ? (
        <main className="w-1/2 h-screen flex flex-col px-4 py-2 mx-auto">
          <div className="bg-slate-200 h-full flex flex-col p-5 overflow-y-scroll">
            {userMessages.map((user, index) => {
              return (
                <div key={user.id + index} className="w-full grid mb-2">
                  <p
                    className={`w-fit ${
                      user.allMessages[1] == "received"
                        ? "bg-slate-500 justify-self-end"
                        : "bg-[#3E64DA]"
                    } text-white rounded-lg px-4 py-2`}
                  >
                    {user.allMessages[0]}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="h-[60px] flex justify-center items-center bg-[#202c33]">
            <form
              onSubmit={sendMessage}
              className="w-[70%] relative rounded-sm"
            >
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
      ) : (
        ""
      )}
    </div>
  );
}

export default AdminChat;
