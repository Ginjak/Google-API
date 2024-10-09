import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <div className="container px-3 bg-white dark:bg-source-darkThemeBg">
        <Sidebar />
        <Header />
        <main>
          <div className="content-container p-3">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
