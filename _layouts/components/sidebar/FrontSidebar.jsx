import React from 'react'
import { FaBrain, FaQq } from 'react-icons/fa';
import { RiAccountCircleLine, RiBracesLine, RiBracketsLine, RiCss3Fill, RiDashboardFill, RiFacebookFill, RiFacebookLine, RiHome2Fill, RiHome2Line, RiHtml5Fill, RiQuestionLine, RiYoutubeFill } from 'react-icons/ri';
import SidebarMenuItem, { MenusHeader } from '../../../_components/simple-components/SidebarMenuItem';
import { ADMIN_PSEUDO } from '../../../_constants/users';
import UserContext from '../../../_react-contexts/user-context';

function FrontSidebar() {

  // C O N T E X T S
  const { user } = React.useContext(UserContext);

  // J S X
  return (
    <div className="min-h-full flex flex-col justify-between mb-3">
      <ul className="menus">
        <SidebarMenuItem text="Pejitrano" icon={<RiHome2Line className="twitter" />} href="/" />

        {user && user.pseudo === ADMIN_PSEUDO && (
          <SidebarMenuItem text="Admin" href="/admin" />
        )}

        {user && user.pseudo !== ADMIN_PSEUDO && <SidebarMenuItem text="Dashboard" icon={<RiDashboardFill className="twitter" />} href="/dashboard" />}

        {/* POSTS */}
        {/* <MenusHeader /> */}
        <SidebarMenuItem text="Fampianarana" icon={<RiBracesLine className="success" />} />
        <SidebarMenuItem text="Challenges" icon={<FaBrain className="text-yellow-600" />} />

        {/* Technologies */}
        {/* <MenusHeader /> */}
        {/* FRONTEND */}
        <MenusHeader>Frontend</MenusHeader>
        <SidebarMenuItem text="HTML &amp; CSS" iconClass="text-xs"
          icon={<>
            {/* <img src="/images/tech-icons/html-css-icon.png" width="20px" className="" /> */}
            <RiHtml5Fill className="text-blue-500" style={{ fontSize: "15px" }} /><RiCss3Fill className="text-yellow-500" style={{ fontSize: "15px" }} />
          </>
          }
        />
        <SidebarMenuItem text="Javascript" icon={<img src="/images/tech-icons/javascript-icon.png" width="20px" />} />
        <SidebarMenuItem text="React JS" icon={<img src="/images/tech-icons/react-icon.svg" width="20px" />} />
        {/* BACKEND */}
        <MenusHeader>Backend</MenusHeader>
        <SidebarMenuItem text="PHP" icon={<img src="/images/tech-icons/php-icon.png" width="25px" />} />
        <SidebarMenuItem text="Laravel" icon={<img src="/images/tech-icons/laravel-icon.png" width="25px" />} />

        {/* Other menus */}
        <MenusHeader />
        {/* <MenusHeader /> */}
        <SidebarMenuItem text="Ny kaontiko" icon={<RiAccountCircleLine />} />
        <SidebarMenuItem text="F A Q s" icon={<RiQuestionLine className="text-yellow-300" />} />

        {/* Social links */}
        <MenusHeader>Rohy sôsialy</MenusHeader>
        <SidebarMenuItem text="Facebook" icon={<RiFacebookFill className="text-blue-600" />} />
        <SidebarMenuItem text="Youtube" icon={<RiYoutubeFill className="text-red-500" />} />

      </ul>
      <ul className="flex">
        <li>lskdjf</li>
        <li>sdfsdf</li>
        <li>sdsdf</li>
        <li>qsdf</li>
      </ul>
    </div>
  )
}

export default FrontSidebar
