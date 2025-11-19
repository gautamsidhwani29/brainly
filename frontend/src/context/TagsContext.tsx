import React, { createContext, useEffect, useState } from "react";
import API from "../api/axios";

export interface Tag {
  _id: string;
  title: string;
}

export interface TagContextType {
  tags: Tag[];
  getTags: () => Promise<void>;
  addLocalTags: (title: string) => void;
}

export const TagsContext = createContext<TagContextType | null>(null);

export const TagProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tags, setTags] = useState<Tag[]>([]);

  const getTags = async () => {
    try {
      const response = await API.get("/tags");
      setTags(response.data.tags);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };
  const addLocalTags = (title: string) => {
    const newTag: Tag = {
      _id: crypto.randomUUID(),
      title,
    };

    setTags((prev) => [...prev, newTag]);
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <TagsContext.Provider value={{ tags, getTags, addLocalTags }}>
      {children}
    </TagsContext.Provider>
  );
};
