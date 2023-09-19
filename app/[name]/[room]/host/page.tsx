"use client";
import { ListUser } from "@/components/list-user";
import { Question, RoomData } from "@/types";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("localhost:3000/", { autoConnect: false });

const questions: Question[] = [
  { id: "0", title: "cau 1" },
  { id: "1", title: "cau 2" },
  { id: "2", title: "cau 3" },
];

export default function Home({ params }: { params: { name: string; room: string } }) {
  const { name, room: roomId } = params;
  const [questionIndex, setQuestionIndex] = useState<number | null>(null);
  const [users, setUsers] = useState<RoomData["hasagi"]["users"]>([]);

  const handleNextQuestion = () => {
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
        socket.emit("SendQuestion", { question: { id: "done", title: "Done" } });
      }
    }
  };

  const handleReset = () => {
    setQuestionIndex(null);
    socket.emit("ResetRoom");
  };

  useEffect(() => {
    socket.auth = { roomId, name, isHost: true };
    socket.connect();
    socket.on("connect", function () {
      console.log("Connected");
    });
    socket.on("disconnect", function () {
      console.log("Disconnected");
    });
    socket.on("UpdateUsers", function ({ users }) {
      setUsers(users);
      console.log("🚀 ~ file: page.tsx:30 ~ users:", users);
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        Host
      </div>
      <ListUser users={users} />
      <table>
        <tr>
          <th className="border w-24 w-12">user</th>
          {questions.map(({ id, title }) => (
            <th className="border w-24 w-12" key={title}>
              {title}
            </th>
          ))}
        </tr>
        {users.map(
          ({ name, isHost, answer }) =>
            !isHost && (
              <tr key={name}>
                <th className="border w-24 w-12">{name}</th>
                {questions.map(({ id }) => (
                  <th className="border w-24 w-12" key={id}>
                    {answer?.[id]}
                  </th>
                ))}
              </tr>
            )
        )}
      </table>
      <div>
        <Button variant="outlined" color="primary" onClick={handleNextQuestion}>
          {questionIndex === null ? "Start" : questionIndex + 1 < questions.length ? "Next Question" : "Finish"}
        </Button>
        <Button variant="outlined" color="success" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </main>
  );
}
