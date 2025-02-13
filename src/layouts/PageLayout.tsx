import { useMediaQuery } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import { useTheme } from "@mui/material/styles";

import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";

interface IPageLayoutProps {
  children: ReactNode;
  wallet?: ReactNode;
}

const PageLayout: FC<IPageLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <>
      {isMd ? (
        <MobileLayout showMenu={showMenu} toggleMenu={toggleMenu}>
          {children}
        </MobileLayout>
      ) : (
        <DesktopLayout>{children}</DesktopLayout>
      )}
    </>
  );
};

export default PageLayout;
