import React from 'react';
import styles from "../../homepage.module.css";



interface SortByDropdownProps {
  onSortChange: (value: string) => void; 
  sortValue: string; 
}

const SortByDropdown: React.FC<SortByDropdownProps> = ({ onSortChange, sortValue }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);  
  };

  return (
    <div className={styles.sortDropdown} >
      <label>Sort by: </label>
      <select value={sortValue || 'none'} onChange={handleChange}>
        <option value="none">Select</option>
        <option value="Price Low to High">Price, low to high</option>
        <option value="Price High to Low">Price, high to low</option>
      </select>
    </div>
  );
};

export default SortByDropdown;
