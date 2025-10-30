'use client';

import { io } from "socket.io-client";
import { useEffect } from "react";

export default function SocketTest() {
  useEffect(() => {
    const socket = io("http://localhost:3000", {
      auth: { token: { id: "12345" } },
    });

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>Testing socket connection...</div>;
}
