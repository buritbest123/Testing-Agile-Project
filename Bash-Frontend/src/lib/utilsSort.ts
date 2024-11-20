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

export function handleSortChange(updatedProducts: Product[], sortOrder: string) {
    let sortedProducts = [...updatedProducts];
    if (sortOrder === "Price Low to High") {
          updatedProducts.sort((a, b) => {
            const priceA =
              a.coldPrice !== "-" ? Number(a.coldPrice) : Number(a.hotPrice);
            const priceB =
              b.coldPrice !== "-" ? Number(b.coldPrice) : Number(b.hotPrice);
            return priceA - priceB; // Sort from low to high
          });
        } else if (sortOrder === "Price High to Low") {
          updatedProducts.sort((a, b) => {
            const priceA =
              a.coldPrice !== "-" ? Number(a.coldPrice) : Number(a.hotPrice);
            const priceB =
              b.coldPrice !== "-" ? Number(b.coldPrice) : Number(b.hotPrice);
            return priceB - priceA; // Sort from high to low
          });
        }
    return sortedProducts;
  }
