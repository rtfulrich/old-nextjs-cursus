import React from 'react'
import SidebarMenuItem, { MenusHeader } from '../../../_components/simple-components/SidebarMenuItem';
import FrontSidebar from "./FrontSidebar";
import { ADMIN_PSEUDO } from '../../../_constants/users';
import UserContext from '../../../_react-contexts/user-context'

function AdminSidebar() {
  // C O N T E X T S
  const { user } = React.useContext(UserContext)

  // J S X
  if (user === undefined || user === null || user.pseudo !== ADMIN_PSEUDO) return <FrontSidebar />
  return (
    <ul className="menus">
      <SidebarMenuItem text="Dashboard" href="/admin" />

      <MenusHeader>Posts Menus</MenusHeader>
      {/* Courses */}
      <SidebarMenuItem text="Courses">
        <SidebarMenuItem text="All" href="/admin/course" />
        <SidebarMenuItem text="Create one" href="/admin/course/new" />
      </SidebarMenuItem>

      {/* Challenges */}
      <SidebarMenuItem text="Challenges">
        <SidebarMenuItem text="All" href="/admin/challenge" />
        <SidebarMenuItem text="Create one" href="/admin/challenge/new" />
      </SidebarMenuItem>

      {/* Tutorials */}
      <SidebarMenuItem text="Tutorials">
        <SidebarMenuItem text="All" href="/admin/tutorial" />
        <SidebarMenuItem text="Create one" href="/admin/tutorial/new" />
      </SidebarMenuItem>

      {/* Blogs */}
      <SidebarMenuItem text="Blogs">
        <SidebarMenuItem text="All" href="/admin/blogs" />
        <SidebarMenuItem text="Create one" href="/admin/blog/new" />
      </SidebarMenuItem>
    </ul>
  )
}

export default AdminSidebar
