import React from 'react';
import styles from './FilterBar.module.css';

interface Filter {
  label: string;
  icon?: React.ReactNode; // Make the icon optional
}

interface FilterBarProps {
  filters: Filter[];
  selectedFilter: string;
  onFilterSelect: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, selectedFilter, onFilterSelect }) => {
  return (
    <div className={styles.filterContainer}>
      {filters.map((filter) => (
        <button
          key={filter.label}
          className={`${styles.filterButton} ${selectedFilter === filter.label ? styles.active : ''}`}
          onClick={() => onFilterSelect(filter.label)}
        >
          {filter.label !== "All" && filter.icon} 
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
