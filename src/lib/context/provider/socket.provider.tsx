"use client";
import React, { useCallback, useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";
import main from "@/chat";

interface SocketProps {
  children?: React.ReactNode;
}

export interface SocketMessage {
  sendMessage: (message: string) => void;
  messages: string[];
}

const SocketContext = React.createContext<SocketMessage | null>(null);

export const SocketProvider: React.FC<SocketProps> = ({ children }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket>();

  const sendMessage: SocketMessage["sendMessage"] = useCallback(
    (message) => {
      console.log("Send Message", message);
      if (socket) {
        socket.emit("message", message);
      }
    },
    [socket],
  );

  const onMessageRec = useCallback((msg: string) => {
    console.log("From Server Msg Rec", msg);
    const { message } = JSON.parse(msg) as { message: string };
    setMessages((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    main();
    const _socket = io({ port: 3050 });
    _socket.on("message", onMessageRec);

    setSocket(_socket);

    return () => {
      _socket.off("message", onMessageRec);
      _socket.disconnect();
      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </SocketContext.Provider>
  );
};
