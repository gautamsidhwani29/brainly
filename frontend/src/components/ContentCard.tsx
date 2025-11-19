import { useEffect } from "react";
import useContent from "../hooks/useContent";
import Card from "../components/ui/Card";
import { useSearch } from "../context/SearchContext";
interface CardInterface {
  contentType: "document" | "link" | "youtube" | "tweet" | "all";
}
const ContentCard = (props: CardInterface) => {
  const { contentType } = props;
  const { query } = useSearch();

  const { contents, getContents, deleteContent, toggleShareState } =
    useContent();
  const queriedContent = contents.filter((content) =>
    content.title.toLowerCase().includes(query.toLowerCase())
  );
  let filteredContent =
    contentType === "all"
      ? queriedContent.filter((content) => content)
      : queriedContent.filter((content) => content.type === contentType);

  useEffect(() => {
    getContents();
  }, []);
  return (
    <>
      <div className="flex flex-wrap">
        {filteredContent &&
          filteredContent.length > 0  ? filteredContent.map((content) => (
            <Card
              link={content.link ?? ""}
              key={content._id ?? Math.random()}
              type={content.type ?? "document"}
              tags={content.tags ?? ""}
              content={content.description ?? ""}
              shareAction={{
                isShared: content.shareable,
                handler: () => {
                  toggleShareState(content._id);
                },
              }}
              deleteAction={{
                handler: () => deleteContent(content._id),
              }}
              title={content.title}
              createdAt={
                content.createdAt
                  ? new Date(content.createdAt).toLocaleString().slice(0, 10)
                  : "NA"
              }
            />
          )) : <div></div>}
      </div>
    </>
  );
};

export default ContentCard;
