import { useState } from "react";
import { Ping } from "@uiball/loaders";

function LoadingScreen() {
  return (
    <div
      style={{ width: "100%", height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Ping size={200} speed={2} color="#0F75BD" />
    </div>
  );
}

export default function LoadingComponent({ isLoading, children }) {
  return isLoading ? <LoadingScreen /> : <>{children}</>;
}
