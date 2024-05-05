import { InputFieldType } from "@/utils/types";

const InputField = ({ name, type }: InputFieldType) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-text-color-100 capitalize">
        {name}
      </label>
      <input
        type={type}
        name={name}
        placeholder={`Enter your ${name}`}
        className="p-1 pl-2 bg-custom-input rounded-md focus:outline-none focus:bg-custom-input placeholder:text-sm text-custom-input-text  placeholder:text-custom-input-text "
        required
      />
    </div>
  );
};
export default InputField;
