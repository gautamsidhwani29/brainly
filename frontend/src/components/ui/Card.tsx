import type { ReactNode } from "react";
import DocumentIcon from "../../assets/icons/DocumentIcon";
import LinkIcon from "../../assets/icons/LinkIcon";
import { AiOutlineYoutube } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import RevertIcon from "../../assets/icons/RevertIcon";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import { ShareIcon } from "../../assets/icons/ShareIcon";

interface DeleteAction {
  handler: () => void;
  icon?: ReactNode;
}

interface ShareAction extends DeleteAction {
  revertIcon?: ReactNode;
  isShared: boolean;
}

const docTypeIcons: Record<string, ReactNode> = {
  document: <DocumentIcon size="md" />,
  link: <LinkIcon size="md" />,
  tweet: <BsTwitterX />,
  youtube: <AiOutlineYoutube />,
};

interface CardProps {
  type: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  deleteAction: DeleteAction;
  shareAction: ShareAction;
  link?: string;
  onClick?
  : () => void | Promise<void>;
}

const Card = (props: CardProps) => {
  const {
    link,
    type,
    title,
    tags,
    content,
    createdAt,
    shareAction,
    deleteAction,
  } = props;
  const docTypeIcon = docTypeIcons[type];
  return (
    <div className="w-[400px] hover:scale-102 h-125 m-2 rounded-lg border p-6 shadow-md flex flex-col">
      <div className="flex justify-between font-bold mb-4">
        <div className="flex gap-3">
          <div>{docTypeIcon}</div>
          <div className="font-bold text-xl sm:text-2xl">{title}</div>
        </div>
        <div className="flex gap-2">
          <button onClick={shareAction.handler}>
            {shareAction.isShared ? (
              <RevertIcon size="md" />
            ) : (
              <ShareIcon size="md" />
            )}
          </button>
          <button onClick={deleteAction.handler}>
            {<DeleteIcon size="md" />}
          </button>
        </div>
      </div>
      <div className="flex flex-wrap w-full p-1">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 break-all"
          >
            {link}
          </a>
        ) : (
          <span className="text-gray-400 italic">No link available</span>
        )}
      </div>
      <div className="overflow-y-auto text-l sm:text-xl flex-1 mb-4">
        {content}
      </div>

      <div>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-900 px-1 py-1 sm:px-3 sm:py-2 cursor-pointer rounded-2xl text-white font-bold"
            >
              #{tag.toLowerCase()}
            </span>
          ))}
        </div>

        <div className="font-bold text-l sm:text-xl">{`Added on : ${createdAt}`}</div>
      </div>
    </div>
  );
};

export default Card;
