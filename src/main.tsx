import { createRoot } from "react-dom/client";
import Routes from "./routes/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <Routes />
  </>
);
