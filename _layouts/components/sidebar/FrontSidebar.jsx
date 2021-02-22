import React from 'react'
import { RiCss3Fill, RiHtml5Fill } from 'react-icons/ri';
import SidebarMenuItem from '../../../_components/simple-components/SidebarMenuItem';
import { ADMIN_PSEUDO } from '../../../_constants/users';
import UserContext from '../../../_react-contexts/user-context';

function FrontSidebar() {

  // C O N T E X T S
  const { user } = React.useContext(UserContext);

  // J S X
  return (
    <ul className="menus">
      {user && user.pseudo === ADMIN_PSEUDO && (
        <SidebarMenuItem text="Admin" href="/admin" />
      )}

      {/* Technologies */}
      <SidebarMenuItem text="HTML &amp; CSS" iconClass="text-xs"
        icon={<>
          <RiHtml5Fill className="text-blue-500" /><RiCss3Fill className="text-yellow-500" />
        </>
        }
      />
      <SidebarMenuItem text="PHP" />
      <SidebarMenuItem text="Javascript" />
      <SidebarMenuItem text="Laravel" />
      <SidebarMenuItem text="React JS" />
    </ul>
  )
}

export default FrontSidebar
