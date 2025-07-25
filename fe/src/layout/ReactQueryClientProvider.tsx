"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <QueryClientProvider client={queryClient}>
    {children}
  
  </QueryClientProvider>
);
