import { motion } from "framer-motion";
import { useState } from "react";

const tabs = ["Home", "About", "Pricing"];

const ChipTabs = ({onTabChange}) => {
  const [selected, setSelected] = useState(tabs[0]);

  const handleTabClick = (tab) => {
    setSelected(tab); // Update the selected tab
    onTabChange(tab); // Pass the selected tab value to the parent component
  };

  return (
    <div className="px-4 py-14 bg-[#FCC88F] flex items-center flex-wrap gap-2">
      {tabs.map((tab) => (
        <Chip
          text={tab}
          selected={selected === tab}
          onTabClick={handleTabClick}
          setSelected={setSelected}
          key={tab}
        />
      ))}
    </div>
  );
};

const Chip = ({ text, selected, setSelected, onTabClick }) => {
  return (
    <button
      onClick={() => onTabClick(text)}
      className={`${
        selected
          ? "text-white"
          : "text-black hover:text-white hover:bg-[#86370e]"
      } text-sm transition-colors px-2.5 py-0.5 rounded-md relative`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-[#86370e] rounded-md"
        ></motion.span>
      )}
    </button>
  );
};

export default ChipTabs;
