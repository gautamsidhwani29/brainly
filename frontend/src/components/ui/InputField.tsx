import type { InputHTMLAttributes, FC } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder: string;
  classes?: string;
}

const InputField: FC<InputFieldProps> = (props: InputFieldProps) => {
  const { type, placeholder, classes } = props;
  return (
    <input
      {...props}
      className={`px-6 font-medium py-3 border  rounded-xl border-gray-300 ${classes}`}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default InputField;
