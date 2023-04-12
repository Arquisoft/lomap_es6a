import React, { useState } from 'react';

type MenuProps = {
  options: string[];
  onFilter: (option: string) => void;
};

const Menu = ({ options, onFilter }: MenuProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onFilter(option);
  };

  return (
    <nav>
      <ul>
        {options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionClick(option)}
            className={selectedOption === option ? 'active' : ''}
          >
            {option}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;