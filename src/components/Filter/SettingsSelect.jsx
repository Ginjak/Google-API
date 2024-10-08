export default function SettingsSelect({
  labelName,
  options,
  onChange,
  onAdd,
}) {
  return (
    <div>
      <label>{labelName?.charAt(0).toUpperCase() + labelName.slice(1)}</label>
      <select onChange={onChange} defaultValue="">
        <option value="" disabled>
          Select a status
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button type="button" onClick={onAdd}>
        Add
      </button>
    </div>
  );
}
