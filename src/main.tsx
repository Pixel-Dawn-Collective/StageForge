import { createRoot } from "react-dom/client";
import Routes from "./routes/routes.tsx";
import Test from "./pages/Test/index.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <Routes />
  </>
);
