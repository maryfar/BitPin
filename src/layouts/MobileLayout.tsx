import { FC, ReactNode } from "react";

// import MobileNavbar from "@/components/MobileNavbar";
// import MobileSidebar from "@/components/Sidebar/MobileSidebar";

interface IMobileLayoutProps {
  children: ReactNode;
  wallet?: ReactNode;
  showMenu: boolean;
  toggleMenu: () => void;
}
// , toggleMenu, showMenu

const MobileLayout: FC<IMobileLayoutProps> = ({ children, wallet }) => {
  return (
    <div className="flex flex-col">
      <header>
        {/* <MobileNavbar toggleMenu={toggleMenu} showMenu={showMenu} /> */}
      </header>
      <main className="mt-16 flex h-auto min-h-screen w-full flex-col gap-20 ">
        {/* <MobileSidebar showMenu={showMenu} /> */}
        {wallet}
        <div className=" !overflow-x-hidden p-5 sm:p-10">{children}</div>
      </main>
    </div>
  );
};

export default MobileLayout;
