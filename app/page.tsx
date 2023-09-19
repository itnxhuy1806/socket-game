"use client";
import Image from "next/image";
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("localhost:3000/", { autoConnect: false });

export default function Home() {
  // useEffect(() => {
  //   socket.connect()
  //     socket.on("connect", function () {
  //       console.log("Connected");
  //       socket.emit("events", { test: "test" });
  //       socket.emit("identity", 1, (response) => console.log("Identity:", response));
  //     });
  //     socket.on("events", function (data) {
  //       console.log("event", data);
  //     });
  //     socket.on("exception", function (data) {
  //       console.log("event", data);
  //     });
  //     socket.on("disconnect", function () {
  //       console.log("Disconnected");
  //     });
  //   }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        Client
      </div>
    </main>
  );
}
