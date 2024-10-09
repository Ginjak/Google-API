export default function SettingsSelect({
  labelName,
  options,
  onChange,
  onAdd,
}) {
  return (
    <div className="flex gap-3 items-center">
      <label className="min-w-32 uppercase font-semibold tracking-wider text-source-greenHover dark:text-green-100">
        {labelName?.charAt(0).toUpperCase() + labelName.slice(1)}
      </label>
      <div className="flex py-2">
        <select
          onChange={onChange}
          defaultValue=""
          className="min-w-[180px] block w-full rounded-[6px_0_0_6px] border-0 px-3.5 py-2 text-source-green  ring-2 ring-inset ring-source-green placeholder:text-gray-500 focus:ring-inset focus:ring-source-green sm:text-sm focus:outline-none focus:bg-green-50 dark:ring-green-100 dark:focus:ring-green-100"
        >
          <option value="" disabled>
            Select a status
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onAdd}
          className="bg-source-green rounded-[0_6px_6px_0] p-2 text-green-100 hover:bg-source-greenHover hover:text-white transition-colors duration-300  uppercase font-medium dark:bg-green-100 dark:text-source-greenHover"
        >
          Add
        </button>
      </div>
    </div>
  );
}
