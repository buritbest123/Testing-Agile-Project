import { CartItemType } from "../context/CartContext";
interface AddOn {
  name: string;
  price: number;
}

interface Product {
  id: number; // Unified ID, can be Drink_ID or Bakery_ID
  Drink_Name?: string;
  Bakery_Name?: string;
  Description: string;
  Price: {
    hotPrice?: number | null;
    coldPrice?: number | null;
    singlePrice?: number | null;
  };
  DrinkType?: string; // Applicable for beverages only
  Tag: string[];
  isRecommended: boolean;
  img_src: string;
  category?: string; // Optional, could be used for custom categorization if needed
  AddOns?: AddOn[]; // List of available add-ons for this product
}

// add to cart function in description/[id]
export function handleAddToCart(
  product: Product | null,
  selectedAddOns: AddOn[],
  quantity: number,
  displayTotalPrice: number,
  addToCart: (item: CartItemType) => number, // returns cart length or updated cart
  category = "Unknown Category",
  sweetness = "",
  type = ""
) {
  if (!product) {
    return { success: false, message: "Product not found" };
  }
  if (quantity < 1 || Number.isNaN(quantity)) {
    console.error("Quantity is invalid.");
    return { success: false, message: "Product quantity is invalid" };
  }
  if (displayTotalPrice <= 0 || Number.isNaN(displayTotalPrice)) {
    console.error("Total Price is invalid.");
    return { success: false, message: "Product total price is invalid" };
  }

  const isBakery = !!product.Bakery_Name;

  const newCartItem: CartItemType = {
    id: Date.now(),
    productId: product.id,
    itemName: product.Drink_Name || product.Bakery_Name || "Unknown Product",
    itemDetails: product.Description,
    category,
    addOns: selectedAddOns.map((addOn) => addOn.name),
    quantity,
    price: displayTotalPrice,
    image: product.img_src,
    ...(isBakery ? {} : { sweetness, type }),
  };

  const cartLength = addToCart(newCartItem);
  return { success: true, cartLength };
}

export function handleAddOnClick(
  selectedAddOn: AddOn, // new add-on
  selectedAddOns: AddOn[] // array of current selected add-ons
): AddOn[] {
  // check if Add-On already exists in selectedAddOns
  if (selectedAddOns.some((addOn) => addOn.name === selectedAddOn.name)) {
    // remove the Add-On if it already exists (double click)
    return selectedAddOns.filter((addOn) => addOn.name !== selectedAddOn.name);
  }
  console.log([...selectedAddOns, selectedAddOn]);
  return [...selectedAddOns, selectedAddOn]; // append new add on with current list
}
