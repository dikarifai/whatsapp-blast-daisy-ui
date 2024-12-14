"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSidebar from "./useSidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa";

interface SidebarProps {
  className?: React.HTMLElementType | string;
  setTitle?: Dispatch<SetStateAction<string>>;
  name: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ className, setTitle, name }) => {
  const { sidebarItems } = useSidebar();
  const pathname = usePathname();
  const [index, setIndex] = useState<number>();
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    console.log("item path: ", sidebarItems[0].path.split("/"));
    const pathnameSplit = pathname.split("/");
    const pathnameFix =
      pathnameSplit.length === 2 ? pathnameSplit[0] : pathnameSplit[2];
    console.log("Split: ", pathnameFix);

    if (setTitle) {
      const index = sidebarItems.findIndex(
        (item) => item.path.split("/")[1] === pathnameFix
      );
      console.log(pathname.split("/"));

      console.log("Index: ", index);

      setTitle(sidebarItems[index]?.name);
    }
  }, []);

  useEffect(() => {
    setIsActive(false);
  }, [pathname]);

  return (
    <div
      className={`w-screen h-12 max-md:sticky top-0 z-50 max-md:flex max-md:items-center max-md:pl-3 md:w-full md:h-screen bg-green-500 ${
        className || ""
      }`}
    >
      <FaBars
        className="md:hidden text-lg flex"
        onClick={() => setIsActive(true)}
      />
      <div
        onClick={() => setIsActive(false)}
        className={`${
          isActive
            ? "fixed top-0 left-0 w-full h-screen z-50 bg-black bg-opacity-50"
            : "hidden"
        }`}
      >
        test
      </div>
      <div
        className={`menu w-full h-full max-md:${
          isActive ? "" : "hidden"
        } max-md:fixed max-md:top-0 max-md:left-0 max-md:bg-green-500 z-50 max-md:w-4/6`}
      >
        <h2 className="text-2xl text-center w-full">WHATSAPP BLAST {index}</h2>
        <h2 className="text-2xl w-full">Selamat Datang {name}</h2>
        <ul className=" p-4 text-white">
          {/* Sidebar content here */}
          {sidebarItems.map((item) => (
            <li className="text-xl" key={item.key}>
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
