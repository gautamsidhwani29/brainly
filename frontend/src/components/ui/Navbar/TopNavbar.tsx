import NavItem from "./NavItem";
import { LuBrain } from "react-icons/lu";
import HamburgerIcon from "../../../assets/icons/Hamburger";
import Sidebar from "./Sidebar";
import ProfileIcon from "../../../assets/icons/ProfileIcon";
import Button from "../Button";
import { IoMdExit } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import InputField from "../InputField";
import Modal from "../Modal";
import { useContext, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import TextAreaField from "../TextField";
import DocumentTypeSelector from "../../DocumentTypeSelector";
import useContent from "../../../hooks/useContent";
import TagSelector from "../../TagsSelector";
import { TagsContext } from "../../../context/TagsContext";
import { type Content } from "../../../context/ContentContext";
import { useSearch } from "../../../context/SearchContext";

const TopNavbar = ({
  collapsed,
  toggleMenu,
}: {
  collapsed: boolean;
  toggleMenu: () => void;
}) => {
  const { query, setQuery } = useSearch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { user, logout, loading } = useAuth();
  const { addContent } = useContent();

  const tagContext = useContext(TagsContext);
  if (!tagContext) {
    console.error(
      "TagsContext is null. Make sure TopNavbar is wrapped in TagsProvider."
    );
    return null;
  }
  const { tags, addLocalTags } = tagContext;

  const [contentData, setContentData] = useState<Partial<Content>>({
    title: "",
    link: "",
    description: "",
    tags: [],
    type: "document",
  });

  const [newTag, setNewTag] = useState("");

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-center"> Add Content : </h1>

          <DocumentTypeSelector
            options={["document", "link", "youtube", "tweet"]}
            onSelect={(value) =>
              setContentData((prev) => ({ ...prev, type: value }))
            }
          />

          <InputField
            placeholder="Title"
            type="text"
            classes="w-full"
            value={contentData.title ?? ""}
            onChange={(e) =>
              setContentData((prev) => ({ ...prev, title: e.target.value }))
            }
          />

          <InputField
            placeholder="Link (if any)"
            type="text"
            classes="w-full"
            value={contentData.link ?? ""}
            onChange={(e) =>
              setContentData((prev) => ({ ...prev, link: e.target.value }))
            }
          />

          <TextAreaField
            placeholder="Content"
            value={contentData.description ?? ""}
            onChange={(e) =>
              setContentData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />

          <p>Available Tags : </p>

          <TagSelector
            value={contentData.tags ?? []}
            options={tags ?? []}
            onChange={(value) =>
              setContentData((prev) => ({ ...prev, tags: value }))
            }
          />

          <p>Add new :</p>

          <InputField
            placeholder="Type a tag"
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />

          <Button
            classes="w-full"
            loading={false}
            variant="secondary"
            size="sm"
            title="Add Tag"
            onClick={() => {
              if (newTag.trim() === "") return;
              addLocalTags(newTag.trim());
              setContentData((prev) => ({
                ...prev,
                tags: [...new Set([...(prev.tags ?? []), newTag.trim()])],
              }));

              setNewTag("");
            }}
          />

          <Button
            classes="w-full mt-2"
            loading={false}
            variant="primary"
            size="md"
            title="Add Content"
            onClick={() => {
              addContent(contentData);
              closeModal();
            }}
          />
        </div>
      </Modal>

      <div className="mb-3 w-full h-32 g-5 flex items-center justify-between fixed z-30 bg-white">
        <div className="flex items-center">
          <HamburgerIcon
            handler={toggleMenu}
            size="lg"
            classes={" h-12 w-12 ml-10"}
          />
          <NavItem
            collapsed={false}
            icon={<LuBrain />}
            classes="text-5xl py-10 items-center pointer-events-none"
            title="Brainly"
          />
        </div>

        <InputField
          type="text"
          placeholder="Search "
          classes="w-100"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="mr-12 flex items-center gap-4">
          <div className="flex flex-col items-center mr-5">
            <ProfileIcon size="lg" classes="h-12 w-12" />
            <p className="text-xl">{user?.username}</p>
          </div>

          <Button
            variant="primary"
            size="md"
            title="Add Content"
            loading={false}
            onClick={openModal}
            icon={<FaPlus />}
          />

          <Button
            variant="primary"
            size="md"
            title="Log out"
            loading={loading}
            onClick={() => logout()}
            icon={<IoMdExit />}
          />
        </div>
      </div>

      <div
        className={`fixed top-32 left-0 h-[calc(100vh-8rem)] ${
          collapsed ? "w-20" : "w-80"
        } bg-white transition-all duration-300`}
      >
        <Sidebar collapsedValue={collapsed} />
      </div>
    </>
  );
};

export default TopNavbar;
