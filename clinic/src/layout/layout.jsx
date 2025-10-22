import { Outlet } from "react-router-dom";
import { ControlPanel } from "../components/control-panel/conrtol-panel";
import { AuthProvider } from "../components/auth-provider";

import styles from "./layout.module.css";

export const Layout = () => {
  return (
    <>
      <AuthProvider>
        <header className={styles.header}>
          <ControlPanel />
        </header>
        <main>
          <Outlet />
        </main>
      </AuthProvider>
    </>
  );
};
