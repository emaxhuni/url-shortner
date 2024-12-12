import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";

import classes from './CustomDropdown.module.css';

const CustomDropdown = ({ options, onOptionSelect, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={classes.dropdown} ref={dropdownRef}>
      <button className={classes.expirationSelect} onClick={toggleDropdown}>
        {selectedOption}
        <IoIosArrowDown />
      </button>
      {isOpen && (
        <div className={classes.expirationContent}>
          {options.map((option) => (
            <div
              key={option.value}
              className={classes.expirationOption}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
