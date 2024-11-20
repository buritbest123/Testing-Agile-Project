import React from "react";
import styles from "./SearchBar.module.css";
import { CiSearch } from "react-icons/ci";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string; // Optional placeholder prop
}

export default function SearchBar({
  onSearch,
  placeholder = "Search a product...",
}: SearchBarProps) {
  // Default placeholder
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("name", term);
    } else {
      params.delete("name");
    }

    replace(`${pathname}?${params.toString()}`);
    onSearch(term);
  }, 300);

  return (
    <div className={styles.searchContainer} >
      <input
        id="searchInput"
        type="text"
        className={styles.searchInput}
        placeholder={placeholder} // Use the placeholder prop
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("name")?.toString()}
      />
      <CiSearch className={styles.searchIcon} />
    </div>
  );
}
