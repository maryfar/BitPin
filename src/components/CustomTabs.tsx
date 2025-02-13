interface CustomTabsProps {
  tabs: string[];
  value: number;
  onChange: (index: number) => void;
}

export const CustomTabs = ({ tabs, value, onChange }: CustomTabsProps) => {
  return (
    <div className="mb-4 border-b border-gray-300">
      <div className="flex">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => onChange(index)}
            className={`px-4 py-4 text-lg font-medium focus:outline-none ${
              value === index
                ? "border-b-2 border-green-300 "
                : "text-gray-500 hover:text-green-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};
