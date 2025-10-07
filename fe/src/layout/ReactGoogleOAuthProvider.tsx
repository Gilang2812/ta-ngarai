"use client";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const ReactGoogleOAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID; 
  if (!clientId) {
    return null;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
};

export default ReactGoogleOAuthProvider;
