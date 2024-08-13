import React from "react";
import { IoMdSend } from "react-icons/io";

function ChatWindow() {
  return (
    <main className="flex-1 px-[15px] py-[10px] h-screen border-box">
      <div className="message-container h-[92%]  p-[20px] flex items-start flex-col justify-end"></div>
      <div className="sending-box  h-[60px] flex justify-center items-center bg-[#202c33]">
        <div className="w-[70%] relative rounded-sm">
          <input
            type="text"
            placeholder="type a message ..."
            className="w-[100%] h-[40px] p-[10px] bg-[#2A3942] text-[white] outline-none field "
            onFocus={(e) => {
              e.target.placeholder = "";
            }}
            onBlur={(e) => {
              e.target.placeholder = "type a message...";
            }}
          />
          <IoMdSend
            className="absolute text-[white] cursor-pointer right-[9px] top-[31%]"
            onClick={function () {
              const messageBox = document.querySelector(".message-container");
              const messageField = document.querySelector(".field");
              if (messageField.value) {
                const message = document.createElement("div");
                message.textContent = messageField.value;
                messageField.value = "";
                message.classList.add(
                  "ml-[150px]",
                  "bg-[#3E64DA]",
                  "w-auto",
                  "inline-block",
                  "p-[10px]",
                  "rounded-lg",
                  "text-[white]",
                  "mb-[5px]"
                );
                messageBox.appendChild(message);
              }
            }}
          />
        </div>
      </div>
    </main>
  );
}
export default ChatWindow;
