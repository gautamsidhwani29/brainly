import React, { useState, useEffect } from "react";
import type { Tag } from "../context/TagsContext";

interface TagSelectorProps {
  options: Tag[];
  value: string[];                     
  onChange: (selectedNames: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  options,
  value,
  onChange,
}) => {
  const [selected, setSelected] = useState<string[]>(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const toggleTag = (tagName: string) => {
    const newSelected = selected.includes(tagName)
      ? selected.filter((name) => name !== tagName)
      : [...selected, tagName];

    setSelected(newSelected);
    onChange(newSelected);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((tag) => {
        const isSelected = selected.includes(tag.title);

        return (
          <button
            key={tag._id}
            onClick={() => toggleTag(tag.title)}
            className={`px-3 py-1 rounded-full border text-sm transition
              ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-700 border-gray-300"
              }
            `}
          >
            {tag.title}
          </button>
        );
      })}
    </div>
  );
};

export default TagSelector;
