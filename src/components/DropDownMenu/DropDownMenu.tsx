import React, { FC, useState } from "react";
import Buttons from "../Buttons/Buttons";
import icons from "../../assets/icons/icons";
import "./styles.scss";

interface IOptions {
  id: string | number;
  text: string;
  slug: string;
  ico: string;
}

interface IProps {
  options: IOptions[];
  onChange: (e: string) => void;
}

const DropDownMenu: FC<IProps> = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: IOptions) => {
    setSelectedOption(option);
    onChange(option.slug);
    setIsOpen(false); // Закрываем меню при выборе опции
  };

  return (
    <div className="dropdown">
      <Buttons
        text={selectedOption.text}
        onClick={toggleDropDown}
        className="filterButton"
        rightIco={icons.chevronDown}
        stileRightIco={"rightIco"}
      />
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              className="dropsdownItem"
              key={option.slug}
              onClick={() => handleOptionClick(option)}
            >
              {option.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
