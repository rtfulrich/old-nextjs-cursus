import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'
import { RiArrowRightFill, RiMenu2Fill } from 'react-icons/ri'

function SidebarMenuItem({
  text,
  children,
  href = "#",
  iconClass = "",
  target = "",
  icon = <RiMenu2Fill />
}) {
  const router = useRouter();
  const active = router.pathname === href;

  const handleClick = (e) => {
    if (href === "#") e.preventDefault();
  }

  return (
    <li className={`relative`}>
      <Link href={href}>
        <a
          className={`flex items-center pr-2 py-1 ${active ? "bg19" : "hover:bg19"} ${router.pathname.match("/admin") ? "twitter-hover" : ""} transition-colors duration-150 font-semibold`}
          style={{ textDecoration: "none" }} onClick={handleClick} target={target}
        >
          {/* Icon */}
          <span className={`w-10 flex justify-center items-center ${iconClass}`}>
            {icon}
          </span>

          {/* Text */}
          <span className="flex-1">{text}</span>

          {/* Arrow if there are submenus */}
          {children && <RiArrowRightFill />}
        </a>
      </Link>

      {/* Submenus if there are */}
      {children && <ul className="submenus bg33 w-48">{children}</ul>}
    </li>
  )
}

export default SidebarMenuItem

export function MenusHeader({ children }) {
  return (
    <h4 className="text-center pt-3 pb-2 font-bold tracking-widest text-gray-300 text-opacity-75">{children}</h4>
  )
}