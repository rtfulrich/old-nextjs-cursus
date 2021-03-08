import React from 'react'
import SidebarMenuItem, { MenusHeader } from '../../../_components/simple-components/SidebarMenuItem';
import FrontSidebar from "./FrontSidebar";
import { ADMIN_PSEUDO } from '../../../_constants/users';
import UserContext from '../../../_react-contexts/user-context'
import { FILEMANAGER_FILES, FILEMANAGER_IMAGES } from '../../../_constants/URLs';
import { FaFile, FaImages } from 'react-icons/fa';

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
        <SidebarMenuItem text="All" href="/admin/course/all" />
        <SidebarMenuItem text="Create a course" href="/admin/course/new" />
      </SidebarMenuItem>

      {/* Challenges */}
      <SidebarMenuItem text="Challenges">
        <SidebarMenuItem text="All" href="/admin/challenge/all" />
        <SidebarMenuItem text="Create a challenge" href="/admin/challenge/new" />
      </SidebarMenuItem>

      {/* Tutorials */}
      <SidebarMenuItem text="Tutorials">
        <SidebarMenuItem text="All" href="/admin/tutorial/all" />
        <SidebarMenuItem text="Create a tutorial" href="/admin/tutorial/new" />
      </SidebarMenuItem>

      {/* Blogs */}
      <SidebarMenuItem text="Blogs">
        <SidebarMenuItem text="All" href="/admin/blog/all" />
        <SidebarMenuItem text="Create a blog" href="/admin/blog/new" />
      </SidebarMenuItem>

      {/* Tag */}
      <SidebarMenuItem text="Tags" href="/admin/tags" />

      <MenusHeader>Filemanager</MenusHeader>
      <SidebarMenuItem
        text="Images" href={`${FILEMANAGER_IMAGES}`} target="_blank"
        icon={<FaImages />}
      />
      <SidebarMenuItem
        text="Files" href={`${FILEMANAGER_FILES}`} target="_blank"
        icon={<FaFile />}
      />
    </ul>
  )
}

export default AdminSidebar
