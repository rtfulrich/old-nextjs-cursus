import React from 'react'
import { useRouter } from "next/router"
import { toggleSidebar } from '../../../_helpers/toggleSidebar';
import FrontSidebar from './FrontSidebar';
import AdminSidebar from './AdminSidebar';

function Sidebar() {

  // V A R I A B L E S
  const router = useRouter();

  // M O U N T   E F F E C T
  React.useEffect(() => {
    let windowWidth = window.innerWidth;
    const sidebar = document.getElementById("sidebar");
    if (windowWidth > 1024) sidebar.classList.add("to-hide-sidebar");
    else sidebar.classList.add("to-show-sidebar");

    window.addEventListener("resize", () => {
      windowWidth = window.innerWidth;
      if (
        (windowWidth >= 1024 && sidebar.classList.contains("hide")) ||
        (windowWidth < 1024 && sidebar.classList.contains("show"))
      ) toggleSidebar();
    })
  }, [])

  // J S X
  let sidebar;
  if (router.pathname.match(/^\/admin/)) sidebar = <AdminSidebar />
  else sidebar = <FrontSidebar />
  return (
    <nav className={`fixed z-50 flex init`} id="sidebar">
      <nav className={`w-48 bg33 h-full ${router.pathname.match("/admin") ? "" : "overflow-y-auto"}`}>
        {sidebar}
      </nav>
      <div className="h-full bg-black bg-opacity-20 lg:hidden" style={{ width: "calc(100vw - 12rem" }} onClick={toggleSidebar}></div>
    </nav>
  )
}

export default Sidebar
