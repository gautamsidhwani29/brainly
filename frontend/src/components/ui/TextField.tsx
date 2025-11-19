import { type ChangeEvent, type FC } from "react";
// Define the props it will accept
interface TextAreaProps {
  placeholder: string;
  classes?: string;
  name?: string;
  value?: string;
  rows?: number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField: FC<TextAreaProps> = ({
  placeholder,
  classes,
  rows = 6,
  ...rest
}) => {
  return (
    <textarea
      placeholder={placeholder}
      className={`p-4 border rounded-xl border-gray-300 ${classes}`}
      rows={rows}
      {...rest}
    />
  );
};

export default TextAreaField;
