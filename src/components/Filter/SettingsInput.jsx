export default function SettingsInput({
  labelName,
  value,
  type,
  onChange,
  onAdd,
  checked,
}) {
  return (
    <label htmlFor={labelName} className="flex">
      {labelName?.charAt(0).toUpperCase() + labelName.slice(1)}
      <div>
        {type === "checkbox" && (
          <input
            id={labelName}
            type={type}
            className="bg-green-800"
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
              className="bg-green-800"
              value={value}
              onChange={onChange}
            />
            <button type="button" onClick={onAdd}>
              Add
            </button>
          </>
        )}
      </div>
    </label>
  );
}
