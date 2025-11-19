import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useContent from "../hooks/useContent";
import SharedCard from "./SharedCard";

const SharedContentPage = () => {
  const { shareableId } = useParams<{ shareableId: string }>();

  const { getSharedContent } = useContent();
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    if (!shareableId) return;

    const fetchShared = async () => {
      const data = await getSharedContent(shareableId);
      setContent(data);
    };

    fetchShared();
  }, [shareableId]);

  if (!shareableId) return <p>Loading...</p>;
  return (
    <div>
      {!content ? (
        <p>Loading...</p>
      ) : !content.success ? (
        <p>{content.error}</p>
      ) : (
        <SharedCard
          key={content.data._id}
          title={content.data.title}
          content={content.data.description}
          createdAt={
            content.data.createdAt
              ? new Date(content.data.createdAt).toLocaleString().slice(0, 10)
              : "NA"
          }
          type={content.data.type}
          tags={content.data.tags}
        />
      )}
    </div>
  );
};

export default SharedContentPage;
