// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./auth/AuthProvider";
import { OrganizationProvider } from "./organizations/OrganizationProvider";
import { BoardProvider } from "./boards/BoardProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  //   <AuthProvider>
  //     <OrganizationProvider>
  //       <App />
  //     </OrganizationProvider>
  //   </AuthProvider>
  // </React.StrictMode>
  <AuthProvider>
    <OrganizationProvider>
      <BoardProvider>
        <App />
      </BoardProvider>
    </OrganizationProvider>
  </AuthProvider>,
);
