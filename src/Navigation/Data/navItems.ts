import { AiFillHome } from 'react-icons/ai'
import { FaMountain, FaFolder } from 'react-icons/fa'
import { HiDocument } from 'react-icons/hi'
import { MdEmail } from 'react-icons/md'

const navItems = [
    {
        name: "Home",
        href: "/",
        Icon: AiFillHome,
      },
      {
        name: "About",
        href: "/about",
        Icon: FaMountain
      },
      {
        name: "Portfolio",
        href: "/portfolio",
        Icon: FaFolder
      },
      {
        name: "Resume",
        href: "/resume",
        Icon: HiDocument
      },
      {
        name: "Contact",
        href: "/contact",
        Icon: MdEmail
      },
];

export default navItems;