import Button from "../Button";

export default function SettingsInput({
  labelName,
  value,
  type,
  onChange,
  onAdd,
  checked,
}) {
  return (
    <div className="flex gap-3 items-center py-2">
      <label
        htmlFor={labelName}
        className="min-w-32 uppercase font-semibold tracking-wider text-source-greenHover dark:text-green-100"
      >
        {labelName?.charAt(0).toUpperCase() + labelName.slice(1)}
      </label>
      <div className="flex gap-0">
        {type === "checkbox" && (
          <input
            id={labelName}
            type={type}
            className="appearance-none h-5 w-5 border-2 border-source-green dark:bg-source-green rounded-[4px] checked:bg-green-100 focus:outline-none cursor-pointer"
            value={value}
            onChange={onChange}
            checked={checked}
          ></input>
        )}

        {type === "text" && (
          <>
            <input
              id={labelName}
              type={type}
              className="block w-full rounded-[6px_0_0_6px] border-0 px-3.5 py-2 text-source-green  ring-2 ring-inset ring-source-green placeholder:text-gray-500 focus:ring-inset focus:ring-source-green sm:text-sm focus:outline-none focus:bg-green-50 dark:ring-green-100 dark:focus:ring-green-100 min-w-[180px]"
              value={value}
              onChange={onChange}
            />

            <button
              type="button"
              onClick={onAdd}
              className="bg-source-green rounded-[0_6px_6px_0] p-2 text-green-100 hover:bg-source-greenHover hover:text-white transition-colors duration-300  uppercase font-medium dark:bg-green-100 dark:text-source-greenHover"
            >
              Add
            </button>
          </>
        )}
      </div>
    </div>
  );
}
