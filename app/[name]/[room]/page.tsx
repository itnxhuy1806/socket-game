"use client";
import { ListUser } from "@/components/list-user";
import { Question, RoomData } from "@/types";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("localhost:3000/", { autoConnect: false });

export default function Home({ params }: { params: { name: string; room: string } }) {
  const { name, room: roomId } = params;
  const [question, setQuestion] = useState<Question>();
  const [users, setUsers] = useState<RoomData["hasagi"]["users"]>([]);

  useEffect(() => {
    socket.auth = { roomId, name };
    socket.connect();
    // socket.on("connect", function () {
    //   console.log("Connected");
    // });
    // socket.on("disconnect", function () {
    //   console.log("Disconnected");
    // });
    socket.on("UpdateQuestion", function ({ question }) {
      setQuestion(question);
      console.log("🚀 ~ file: page.tsx:26 ~ question:", question);
    });
    socket.on("UpdateUsers", function ({ users }) {
      setUsers(users);
      console.log("🚀 ~ file: page.tsx:29 ~ users:", users);
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="">
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
          Client
        </div>
        <div className="text-violet-500 capitalize"> {name}</div>
      </div>
      <div className="flex justify-between w-full justify-items-center text-justify">
        <div className="w-full"></div>
        <div className="text-center w-full ">{question?.title || "Wait"}</div>
        <ListUser users={users} />
      </div>
      {!!question?.id && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            socket.emit("sendAnswer", { roomId, name, answer: "answer" });
          }}
        >
          Answer
        </Button>
      )}
    </main>
  );
}
