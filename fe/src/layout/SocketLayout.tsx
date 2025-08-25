// layout.tsx
"use client";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocketStore } from "@/stores/socketStore";
import { useSession } from "next-auth/react";

export default function SocketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useSession();
  const user = data?.user;
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
