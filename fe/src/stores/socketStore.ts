import { io, Socket } from "socket.io-client";
import { create } from "zustand";

type SocketType = {
  socket: Socket | null;
  connect: (userId: string | number) => void;
  joinRoom: (room: string) => void;
  leaveRoom: (room: string) => void;
};

export const useSocketStore = create<SocketType>((set, get) => ({
  socket: null,
  connect: (userId) => {
    if (get().socket) return;
    const socket = io("http://localhost:5000");
    socket.emit("join", userId);
    set({ socket });
  },
  disconnect: () => {
    get().socket?.disconnect();
    set({ socket: null });
  },
  joinRoom: (room) => {
    get().socket?.emit("join-room", room);
  },
  leaveRoom: (room) => {
    get().socket?.emit("leave-room", room);
  },
}));
