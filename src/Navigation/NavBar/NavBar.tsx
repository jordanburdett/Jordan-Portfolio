import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useMediaQuery } from "@chakra-ui/react";

const NavBar = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {!isMobile && <DesktopNav />}
      {isMobile && <MobileNav />}
    </>
  );
};

export default NavBar;
