import { toast } from "react-toastify";
import API from "../api/axios";
import { createContext, useState, type ReactNode } from "react";

export interface Content {
  _id: string;
  type: "document" | "tweet" | "youtube" | "link";
  link: string;
  title: string;
  description: string;
  tags: string[];
  shareableId: string;
  shareable: boolean;
  userId: string;
  createdAt: Date;
}

export interface ContentContextInterface {
  contents: Content[];
  loading: boolean;
  getContents: () => Promise<void>;
  updateContent: (id: string, content: Partial<Content>) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;
  getContentById: (id: string) => Promise<void>;
  addContent: (content: Partial<Content>) => Promise<void>;
  toggleShareState: (id: string) => Promise<void>;
  getSharedContent: (
    shareableId: string
  ) => Promise<Partial<Content> | null | {}>;
}
export const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success("Url Copied to Clipboard", { position: "top-center" });
    })
    .catch((e) => {
      toast.error("Failed to Copy Url");
    });
};

export const ContentContext = createContext<ContentContextInterface | null>(
  null
);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [contents, setContents] = useState<Content[] | []>([]);
  const [loading, setLoading] = useState(true);
  const getContents = async () => {
    setLoading(true);
    try {
      const res = await API.get("/content/", { withCredentials: true });
      setContents(res.data.contents || []);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to Load Contents", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const getContentById = async (id: string) => {
    try {
      const res = await API.get(`/content/${id}`, {
        withCredentials: true,
      });
      return res.data.content;
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to Load Content", {
        position: "top-center",
      });
    }
  };

  const addContent = async (contentData: Partial<Content>) => {
    const tempId = crypto.randomUUID();
    const newContent: Content = {
      _id: tempId,
      ...contentData,
      createdAt: new Date(),
      shareable: contentData.shareable ?? false,
    } as Content;

    setContents((prev) => [...prev, newContent]);
    try {
      const res = await API.post("/content", contentData, {
        withCredentials: true,
      });

      setContents((prev) => [...prev, res.data.content]);
      toast.success("Content Added!", { position: "top-center" });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to Add Content!", {
        position: "top-center",
      });
    }
  };
  const updateContent = async (id: string, contentData: Partial<Content>) => {
    try {
      const res = await API.patch(`/content/${id}`, contentData, {
        withCredentials: true,
      });
      setContents((prev) =>
        prev.map((c) => (c._id === id ? res.data.content : c))
      );

      toast.success(res.data.message || "Content updated", {
        position: "top-center",
      });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to Add Content!", {
        position: "top-center",
      });
    }
  };

  const toggleShareState = async (id: string) => {
    try {
      await API.patch(
        `/content/shared/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      setContents((prev) =>
        prev.map((content) =>
          content._id === id
            ? { ...content, shareable: !content.shareable }
            : content
        )
      );
      contents.map((content) => {
        content._id === id
          ? content.shareable
            ? toast.success(`Content set to private`, {
                position: "top-center",
              })
            : copyToClipboard(
                `http:localhost:5173/shared/${content.shareableId}`
              )
          : content;
      });
    } catch (err: any) {
      toast.error(err?.response?.data?.message, {
        position: "top-center",
      });
    }
  };

  const getSharedContent = async (shareableId: string) => {
    try {
      const res = await API.get(`/content/shared/watch/${shareableId}`);
      return { data: res.data, success: true };
    } catch (err: any) {
      return {
        error: err?.response?.data?.message || "Something went wrong!",
        success: false,
      };
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const res = await API.delete(`/content/${id}`, {
        withCredentials: true,
      });
      setContents((prev) => prev.filter((content) => content._id !== id));
      toast.success(res.data.message, { position: "top-center" });
    } catch (err: any) {
      toast.error(err?.response?.data?.message, {
        position: "top-center",
      });
    }
  };

  return (
    <ContentContext.Provider
      value={{
        contents,
        addContent,
        deleteContent,
        updateContent,
        getContentById,
        toggleShareState,
        loading,
        getContents,
        getSharedContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};
