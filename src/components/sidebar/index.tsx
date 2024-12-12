"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSidebar from "./useSidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
  className?: React.HTMLElementType | string;
  setTitle?: Dispatch<SetStateAction<string>>;
  name: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ className, setTitle, name }) => {
  const { sidebarItems } = useSidebar();
  const pathname = usePathname();
  const [index, setIndex] = useState<number>();

  useEffect(() => {
    if (setTitle) {
      const index = sidebarItems.findIndex(
        (item) => item.path.split("/")[0] === pathname.split("/")[0]
      );
      setTitle(sidebarItems[index].name);
    }
  }, []);

  return (
    <div className={`drawer lg:drawer-open ${className}`}>
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side menu bg-base-200">
        <h2 className="text-2xl text-center w-full">WHATSAPP BLAST {index}</h2>
        <h2 className="text-2xl w-full">Selamat Datang {name}</h2>
        <ul className="text-base-content  w-80 p-4">
          {/* Sidebar content here */}
          {sidebarItems.map((item) => (
            <li key={item.key}>
              <Link
                onClick={() => setTitle && setTitle(item.name)}
                href={`/dashboard/${item.path}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
