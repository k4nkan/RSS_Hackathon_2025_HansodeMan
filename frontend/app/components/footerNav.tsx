import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FiPlusSquare } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";

import Link from "next/link";

const FooterNav = () => {
  const navItems = [
    { name: "home", icon: IoHomeOutline, href: "/top" },
    { name: "create", icon: FiPlusSquare, href: "/create" },
    { name: "profile", icon: FaRegUser, href: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 mb-5">
      <footer
        className="
          relative w-[90%] mx-auto
          bg-gradient-to-r from-cyan-300 to-sky-300
          rounded-2xl
          shadow-lg py-3 px-2
          flex justify-around items-center h-full
          transform translate-y-2
        "
      >
        <nav className="flex justify-center gap-14 items-center h-full w-full">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center text-white transition-colors"
            >
              <item.icon className="text-3xl mb-1" />
              <span className="text-3xs font-semibold">{item.name}</span>
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
};

export default FooterNav;
