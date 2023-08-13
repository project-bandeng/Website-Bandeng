import { useState } from "react";

function LoadingScreen() {
    return <h1 className="mt-5">Loading ges ...</h1>;
}

export default function LoadingComponent({ isLoading, children }) {
    return isLoading ? <LoadingScreen /> : <>{children}</>;
}
