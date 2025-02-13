import { FC, ReactNode } from "react";

// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

interface IDesktopLayoutProps {
  children: ReactNode;
  wallet?: ReactNode;
}

const DesktopLayout: FC<IDesktopLayoutProps> = ({ children, wallet }) => {
  return (
    <div className="flex h-screen flex-col">
      <header>{/* <Navbar /> */}</header>
      <main className="flex flex-1 justify-between">
        {/* <Sidebar /> */}
        <div className="w-full !overflow-x-hidden p-8 transition-all duration-300">
          {children}
        </div>
        {wallet}
      </main>
    </div>
  );
};

export default DesktopLayout;
