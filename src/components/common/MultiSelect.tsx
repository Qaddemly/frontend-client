interface MultiSelectProps {
  selectedTypes: string[];
  onSelect: (types: string[]) => void;
  label: string;
  types: string[];
}

function MultiSelect({
  selectedTypes,
  onSelect,
  label,
  types,
}: MultiSelectProps) {
  const toggleSelection = (type: string) => {
    if (selectedTypes.includes(type)) {
      onSelect(selectedTypes.filter((t) => t !== type)); // Remove if already selected
    } else {
      onSelect([...selectedTypes, type]); // Add if not selected
    }
  };

  return (
    <div className="text-left">
      <label className="mb-2 block font-semibold text-light-secondary-200">
        {label}
      </label>
      <div className="flex flex-wrap justify-center gap-2">
        {types.map((type) => (
          <button
            key={type}
            className={`flex items-center gap-2 rounded-lg px-3 py-1 text-sm font-medium text-gray-700 transition`}
            onClick={() => toggleSelection(type)}
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded border ${
                selectedTypes.includes(type)
                  ? "border-main bg-main"
                  : "border-gray-200"
              }`}
            />
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MultiSelect;
