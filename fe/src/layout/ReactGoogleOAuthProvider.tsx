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
    alert(
      "Google Client ID is not set. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID in your environment variables."
    );
    return null;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
};

export default ReactGoogleOAuthProvider;
