"use client";
import React, { Suspense } from "react";
import styles from "./homepage.module.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCoffee, FaBreadSlice } from "react-icons/fa"; // Import icons
import { CiCircleChevDown, CiCircleChevUp, CiLemon } from "react-icons/ci";
import { RiDrinks2Fill, RiDrinksLine } from "react-icons/ri";
import { GiThermometerCold, GiThermometerHot } from "react-icons/gi";
import Card from "./components/ProductCard/Card";
import SearchBar from "./components/SearchBar/SearchBar";
import FilterBar from "./components/FilterBar/FilterBar";
import Slideshow from "./components/Slideshow/Slideshow";
import NavBar from "./components/Nav/Nav";
import PaginationButton from "./components/Pagination/Pagination";
import SortByDropdown from "./components/SortByDropdown/Sort";
import { CartProvider, useCart } from "../context/CartContext";
import NoResult from "./components/NoResult/NoResult";
import { handleSortChange as sortChangeUtility } from "@/lib/utilsSort";

const ITEMS_PER_PAGE = 10; // number of items per page (not sure na just estimate)

const baseURL = process.env.NEXT_PUBLIC_ROOT_URL;
// const baseURL = "http://localhost:3030";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

interface Product {
  id: number | string; // Use string if the Bakery_ID is alphanumeric
  name: string;
  description: string;
  hotPrice: string | number;
  coldPrice: string | number;
  category: string;
  TypeOfDrinks: string;
  isRecommended: boolean;
  image: string;
  Tag: string[]; // Add this line for tags
}

const filters = [
  { label: "All" },
  { label: "Coffee", icon: <FaCoffee /> },
  { label: "Matcha", icon: <RiDrinksLine /> },
  { label: "Non-Coffee", icon: <RiDrinks2Fill /> },
  { label: "Bakery", icon: <FaBreadSlice /> },
  { label: "Refreshment", icon: <CiLemon /> },
  { label: "Hot menu", icon: <GiThermometerHot /> },
  { label: "Cold menu", icon: <GiThermometerCold /> },
];

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  // const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]); // Fetched data state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/menu`);
        console.log("res data: ", response);
        const data = await response.json();

        // Map data to match Product interface, dynamically building the image URL
        const mappedData = data.map(
          (item: {
            Drink_ID: any;
            Bakery_ID: any;
            Drink_Name: any;
            Bakery_Name: any;
            Description: any;
            Price: { hotPrice: any; coldPrice: any; singlePrice: any };
            Tag: string | string[];
            DrinkType: any;
            isRecommended: any;
            img_src: any;
            image_src: any;
          }) => ({
            id: item.Drink_ID || item.Bakery_ID,
            name: item.Drink_Name || item.Bakery_Name,
            description: item.Description || "",
            hotPrice: item.Price?.hotPrice || item.Price?.singlePrice || "-",
            coldPrice: item.Price?.coldPrice || "-",
            category: item.Tag?.includes("bakery") ? "Bakery" : "Drink",
            TypeOfDrinks: item.DrinkType || "-",
            isRecommended: item.isRecommended || false,
            image: item.img_src
              ? `${baseURL}/image/${item.img_src}`
              : item.image_src
              ? `${baseURL}/image/bakery/${item.image_src}`
              : `${baseURL}/image/default-image.png`,
            Tag: Array.isArray(item.Tag) ? item.Tag : [item.Tag], // Ensure Tag is an array
          })
        );

        setProducts(mappedData);
        setFilteredProducts(mappedData);
        setMatchingCount(mappedData.length);

        console.log("menu: ", mappedData);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchData();
  }, []);

  // Calculate the total number of pages based on items per page
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Slice products to display only items for the current page
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(currentPage);
  };

  // const handleSortChange = (sortValue: string) => {
  //   setSortOrder(sortValue);
  //   applyFilters(selectedFilter, sortValue);
  // };

  const [matchingCount, setMatchingCount] = useState(0);

  // Function to apply filters and sorting
  const applyFilters = (filter: string, sortOrder: string) => {
    let updatedProducts = [...products]; // Make a copy of products

    // Handle category filters
    if (filter !== "All") {
      // If "Bakery" is selected, filter by the "bakery" tag
      if (filter === "Bakery") {
        updatedProducts = updatedProducts.filter(
          (product) => product.Tag && product.Tag.includes("bakery")
        );
      } else if (filter !== "Hot menu" && filter !== "Cold menu") {
        // For other filters, use the filter label to check in the Tag array
        updatedProducts = updatedProducts.filter(
          (product) => product.Tag && product.Tag.includes(filter)
        );
      } else if (filter === "Hot menu") {
        updatedProducts = updatedProducts.filter(
          (product) =>
            product.TypeOfDrinks === "Hot" ||
            product.TypeOfDrinks === "Hot/Cold"
        );
      } else if (filter === "Cold menu") {
        updatedProducts = updatedProducts.filter(
          (product) =>
            product.TypeOfDrinks === "Cold" ||
            product.TypeOfDrinks === "Hot/Cold"
        );
      }
    }

    setMatchingCount(updatedProducts.length);

    // Refactor to another function
    // Apply sorting by price
    // if (sortOrder === "Price Low to High") {
    //   updatedProducts.sort((a, b) => {
    //     const priceA =
    //       a.coldPrice !== "-" ? Number(a.coldPrice) : Number(a.hotPrice);
    //     const priceB =
    //       b.coldPrice !== "-" ? Number(b.coldPrice) : Number(b.hotPrice);
    //     return priceA - priceB; // Sort from low to high
    //   });
    // } else if (sortOrder === "Price High to Low") {
    //   updatedProducts.sort((a, b) => {
    //     const priceA =
    //       a.coldPrice !== "-" ? Number(a.coldPrice) : Number(a.hotPrice);
    //     const priceB =
    //       b.coldPrice !== "-" ? Number(b.coldPrice) : Number(b.hotPrice);
    //     return priceB - priceA; // Sort from high to low
    //   });
    // }
    
    const sortedProducts = sortChangeUtility(updatedProducts, sortOrder);
    setFilteredProducts(sortedProducts);

    // Filter products based on search term
    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Update the state with filtered/sorted products
    setFilteredProducts(updatedProducts);
    setCurrentPage(1); // Reset to first page when filters are applied
    setMatchingCount(updatedProducts.length);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setSortOrder("none");
    applyFilters(filter, "none");
    console.log(`Selected filter: ${filter}`);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(selectedFilter, sortOrder);
    console.log(`Search: ${term}`);
  };

  useEffect(() => {
    applyFilters(selectedFilter, sortOrder); // Apply filters when the search term or filter changes
  }, [searchTerm, selectedFilter, sortOrder]);

  const handleSortOrderChange = (sortValue: string) => {
    setSortOrder(sortValue);
    applyFilters(selectedFilter, sortValue);
  };
  
  return (
    <main className="pt-20">
      <header>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=ADLaM+Display&family=Montserrat:wght@400;700&display=swap"
        />
      </header>
      <NavBar />
      <div className={styles.searchContainer}>
        {/* <SearchBar onSearch={handleSearch} /> */}
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBar onSearch={handleSearch} />
        </Suspense>
      </div>
      <motion.div
        className={styles.filterbarContainer}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FilterBar
          filters={filters}
          selectedFilter={selectedFilter}
          onFilterSelect={handleFilterSelect}
        />
      </motion.div>

      {selectedFilter === "All" && searchTerm === "" && (
        <div>
          <Slideshow />
        </div>
      )}
      {selectedFilter === "All" && searchTerm === "" && (
        <div className={styles.title}>
          <h1> RECOMMENDED</h1>
        </div>
      )}
      {selectedFilter === "All" && searchTerm === "" && (
        <div className={styles.recommendedContainer}>
          {products
            .filter((product) => product.isRecommended)
            .map((product) => (
              <div className={styles.cardRcmd} key={product.id}>
                {" "}
                {/* Moved cardrcmd inside the map */}
                <Card
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  hotPrice={product.hotPrice}
                  coldPrice={product.coldPrice}
                  category={product.category}
                  TypeOfDrinks={product.TypeOfDrinks}
                  isRecommended={product.isRecommended}
                  image={product.image}
                />
              </div>
            ))}
        </div>
      )}

      <div className={styles.title}>
        <h1> EXPLORE OUR MENU </h1>
      </div>
      {/* Global sorting for all products */}
      <SortByDropdown onSortChange={handleSortOrderChange} sortValue={sortOrder} />
      {/* Display matching count */}
      <div className="text-[#674636] mr-[6.5%] my-4 flex justify-end space-x-1 text-nowrap">
        <p className="font-bold" id="matchedNumber">{matchingCount}</p>
        <p >products match your filter</p>
      </div>

      {paginatedProducts.length > 0 ? (
        <motion.div
          className={styles.cardContainer}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {paginatedProducts.map((product) => {
            console.log("Rendering product:", product.name); // Debugging line
            return <Card key={product.id} {...product} />;
          })}
        </motion.div>
      ) : (
        <NoResult textHeader="No Result" />
      )}
      {paginatedProducts.length > 0 && (
        <PaginationButton
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
}
