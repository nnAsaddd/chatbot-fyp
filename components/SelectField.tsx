import { SelectFieldType } from "@/utils/types";

const SelectField = ({ values }: SelectFieldType) => {
  return (
    <div>
      <label htmlFor="gender" className="text-text-color-100 mr-2">
        Gender
      </label>
      <select
        name="gender"
        className="p-1 rounded-md bg-custom-input text-custom-input-text focus:outline-none"
      >
        {values.map((value) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default SelectField;
