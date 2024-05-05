"use client";

import { Settings, X } from "lucide-react";
import { useState } from "react";
import { sidebarPages } from "@/utils/sidebarPages";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logout from "./Logout";

const Sidebar = () => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<boolean>(true);

  if (!expanded) {
    return (
      <aside className="h-full w-32 transition-all duration-300 py-4 px-2 text-text-color-900">
        <button
          className="flex flex-col justify-center items-center"
          onClick={() => setExpanded(true)}
        >
          <Settings className="w-4" />
          <span className="text-[10px]">Settings</span>
        </button>
      </aside>
    );
  }

  return (
    <aside className="h-screen bg-[#100f3b] w-80 transition-all duration-300 text-white">
      <nav className="h-full flex flex-col shadow-sm">
        <div className="p-2 pb-2 flex justify-between items-center">
          {/* Logo */}
          <h4>Ai Blend</h4>
          {/* Close button */}
          <button
            className="p-1.5 rounded-lg"
            onClick={() => setExpanded(false)}
          >
            <X />
          </button>
        </div>
        <h3 className="text-center uppercase text-2xl my-4 font-bold">
          Settings
        </h3>
        <ul className="px-4 mt-4 space-y-8">
          {sidebarPages.map((page) => {
            return (
              <li
                key={page.id}
                className={`px-2 ${
                  pathname === page.href && "bg-[#61284480] py-2 rounded-xl"
                }`}
              >
                <Link
                  href={page.href}
                  className={`flex gap-8 items-center hover:ml-2 transition-all hover:cursor-pointer `}
                >
                  <span>{page.icon}</span>
                  <span className="text-sm">{page.title}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <Logout />
          </li>
        </ul>
      </nav>
    </aside>
  );
};
export default Sidebar;
