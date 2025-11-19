import LinkIcon from "../../../assets/icons/LinkIcon";
import DocumentIcon from "../../../assets/icons/DocumentIcon";
import { AiOutlineYoutube } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import BulbIcon from "../../../assets/icons/BulbIcon";

export const navLinks = [
  {
    icon: <BulbIcon size={"lg"} />,
    title: "All Contents",
    route: "/home",
  },
  {
    icon: <LinkIcon size={"lg"} />,
    title: "Links",
    route: "/links",
  },
  {
    icon: <AiOutlineYoutube className="size-8" />,
    title: "Youtube Links",
    route: "/youtube-links",
  },
  {
    icon: <BsTwitterX className="size-7" />,
    title: "Tweets",
    route: "/tweets",
  },
  {
    icon: <DocumentIcon size={"lg"} />,
    title: "Documents",
    route: "/documents",
  },
];
