import { Outlet } from "react-router-dom";
import { ControlPanel } from "../components/control-panel/conrtol-panel";

import styles from "./layout.module.css";

export const Layout = () => {
  return (
    <>
      <header className={styles.header}>
        <ControlPanel />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
