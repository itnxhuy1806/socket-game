"use client";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("localhost:3000/", { autoConnect: false });
const questions: string[] = ["cau 1", "cau 2", "cau 3"];
export default function Home({ params }: { params: { room: string } }) {
  const [questionIndex, setQuestionIndex] = useState<number | null>(null);

  useEffect(() => {
    socket.auth = { roomId: params.room };
    socket.connect();
    socket.on("connect", function () {
      console.log("Connected");
    });
    socket.on("disconnect", function () {
      console.log("Disconnected");
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        Host
      </div>
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            if (questionIndex === null) {
              const question = questions[0];
              if (question) {
                socket.emit("SendQuestion", { question });
                setQuestionIndex(0);
              }
            } else {
              const question = questions[questionIndex + 1];
              if (question) {
                socket.emit("SendQuestion", { question });
                setQuestionIndex(questionIndex + 1);
              } else {
                socket.emit("SendQuestion", { question: "Done" });
              }
            }
          }}
        >
          {questionIndex === null ? "Start" : questionIndex + 1 < questions.length ? "Next Question" : "Finish"}
        </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            setQuestionIndex(null);
            socket.emit("SendQuestion", { question: "wait for host start" });
          }}
        >
          Reset
        </Button>
      </div>
    </main>
  );
}
