import { type FC, useState } from "react";

interface Props {
  options: string[];
  onSelect?: (value: string) => void;
}

const DocumentTypeSelector: FC<Props> = ({ options, onSelect }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect?.(value);
  };

  return (
    <div className="flex gap-2 ">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleSelect(option)}
          className={`px-4 py-2 rounded-xl border transition
            ${
              selected === option
                ? "bg-blue-600 text-white"
                : "bg-white border-gray-300"
            }
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default DocumentTypeSelector;
