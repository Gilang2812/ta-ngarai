// layout.tsx
"use client";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/AuthStore";
import { useSocketStore } from "@/stores/socketStore";

export default function SocketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((s) => s.user);
  const connect = useSocketStore((s) => s.connect);
  const socket = useSocketStore((s) => s.socket);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (user) {
      connect(user.id);
    }
  }, [user, connect]);

  useEffect(() => {
    if (!socket) return;
    console.log("Socket connected");
    socket.on("detail-updated", (detail) => {
      queryClient.invalidateQueries({
        queryKey: ["detailReservation", detail.id],
      });
      queryClient.invalidateQueries({ queryKey: ["sp-user"] });
      queryClient.invalidateQueries({ queryKey: ["detail-user-souvenir"] });
    });

    return () => {
      socket.off("detail-updated");
    };
  }, [socket, queryClient]);

  return <>{children}</>;
}
