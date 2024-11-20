"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import "./descriptionCart.css";
import ReturnButton from "@/app/components/ReturnButton/ReturnButton";
import { useCart, CartItemType } from "@/context/CartContext";

interface AddOn {
  name: string;
  price: number;
}

interface Product {
  id: number;
  Drink_Name?: string;
  Bakery_Name?: string;
  Description: string;
  Price: {
    hotPrice?: number | null;
    coldPrice?: number | null;
    singlePrice?: number | null;
  };
  DrinkType?: string;
  Tag: string[];
  isRecommended: boolean;
  img_src: string;
  category?: string;
  AddOns?: AddOn[];
}
// const baseURL = "http://10.34.112.130:3030/";
const baseURL = process.env.NEXT_PUBLIC_ROOT_URL;
// const baseURL = "http://localhost:3030";

const DescriptionPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { cartItems, updateCartItem } = useCart();
  const [cartItem, setCartItem] = useState<CartItemType | null>(null);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [productAddOns, setProductAddOns] = useState<AddOn[]>([]);
  const [product, setProduct] = useState<Product | null>(null);

  // Item options
  const [type, setType] = useState("");
  const [addOn, setAddOn] = useState<string[]>([]);
  const [sweetness, setSweetness] = useState("");
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const foundCartItem =
      cartItems && cartItems.find((item) => item.id === Number(id));

    if (foundCartItem) {
      setCartItem(foundCartItem);
      setType(foundCartItem.type || "");
      setAddOn(foundCartItem.addOns || []);
      setSweetness(foundCartItem.sweetness || "");

      // Fetch product details from the backend to get the image, add-ons, and prices
      const fetchProduct = async () => {
        try {
          const response = await fetch(
            `${baseURL}/menu/${foundCartItem.productId}`
          );
          if (response.ok) {
            const data = await response.json();

            // Process the data to set the category field
            const productData: Product = {
              id: data.Drink_ID || data.Bakery_ID,
              Drink_Name: data.Drink_Name,
              Bakery_Name: data.Bakery_Name,
              Description: data.Description,
              Price: data.Price,
              DrinkType: data.DrinkType,
              Tag: data.Tag,
              isRecommended: data.isRecommended,
              img_src: data.img_src
                ? `${baseURL}/image/${data.img_src}` // Beverage images
                : data.image_src
                  ? `${baseURL}/image/bakery/${data.image_src}` // Bakery images
                  : `${baseURL}/image/default-image.png`, // Default image
              category:
                data.category || (data.Drink_Name ? "Beverage" : "Bakery"),
              AddOns: data.AddOns || [],
            };

            setProduct(productData); // Store the processed product data
            setProductImage(productData.img_src);
            setProductAddOns(productData.AddOns || []); // Set the add-ons here
          } else {
            console.error("Failed to fetch product details.");
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };

      fetchProduct();
    }
  }, [id, cartItems]);

  // Calculate total price based on selected options
  useEffect(() => {
    if (product) {
      const basePrice =
        type === "Hot" &&
        product.Price.hotPrice !== null &&
        product.Price.hotPrice !== undefined
          ? product.Price.hotPrice
          : type === "Cold" &&
              product.Price.coldPrice !== null &&
              product.Price.coldPrice !== undefined
            ? product.Price.coldPrice
            : product.Price.singlePrice !== null &&
                product.Price.singlePrice !== undefined
              ? product.Price.singlePrice
              : 0;

      const addOnTotal = addOn.reduce((total, addOnName) => {
        const addOnItem = product.AddOns?.find(
          (item) => item.name === addOnName
        );
        return total + (addOnItem?.price || 0);
      }, 0);

      setTotalPrice(basePrice + addOnTotal);
    }
  }, [product, type, addOn]);

  const handleAddOnClick = (selectedAddOn: string) => {
    setAddOn((prevAddOn) => {
      if (prevAddOn.includes(selectedAddOn)) {
        return prevAddOn.filter((item) => item !== selectedAddOn);
      }
      return [...prevAddOn, selectedAddOn];
    });
  };

  const handleUpdateMenu = () => {
    if (!cartItem) return;

    const updatedCartItem = {
      ...cartItem,
      type,
      addOns: addOn,
      sweetness,
      price: totalPrice, // Update the price here
    };

    updateCartItem(updatedCartItem);
    router.push("/cart");
  };

  if (!cartItem) {
    return <div>Product not found!</div>;
  }

  return (
    <main>
      <ReturnButton />

      <div className="description-page">
        <div className="product-details">
          {productImage && (
            <Image
              src={productImage}
              alt={cartItem.itemName}
              width={500}
              height={500}
              className="product-image"
            />
          )}
          <h1>{cartItem.itemName}</h1>
          <p className="product-description">{cartItem.itemDetails}</p>

          <div className="options">
            {product?.DrinkType && (
              <>
                <h2>Type</h2>
                <div className="option-group">
                  {(product.DrinkType === "Hot" ||
                    product.DrinkType === "Hot/Cold") && (
                    <button
                      className={type === "Hot" ? "option selected" : "option"}
                      onClick={() => setType("Hot")}
                    >
                      Hot
                    </button>
                  )}
                  {(product.DrinkType === "Cold" ||
                    product.DrinkType === "Hot/Cold") && (
                    <button
                      className={type === "Cold" ? "option selected" : "option"}
                      onClick={() => setType("Cold")}
                    >
                      Cold
                    </button>
                  )}
                </div>
              </>
            )}

            {productAddOns && productAddOns.length > 0 && (
              <>
                <h2>Add on</h2>
                <div className="option-group">
                  {productAddOns.map((addOnItem) => (
                    <button
                      key={addOnItem.name}
                      className={
                        addOn.includes(addOnItem.name)
                          ? "option selected"
                          : "option"
                      }
                      onClick={() => handleAddOnClick(addOnItem.name)}
                    >
                      {addOnItem.name} (+{addOnItem.price}.-)
                    </button>
                  ))}
                </div>
              </>
            )}

            {product?.category === "Beverage" && (
              <>
                <h2>Choice of Sweetness</h2>
                <div className="option-group">
                  <button
                    className={
                      sweetness === "0%" ? "option selected" : "option"
                    }
                    onClick={() => setSweetness("0%")}
                  >
                    0%
                  </button>
                  <button
                    className={
                      sweetness === "30%" ? "option selected" : "option"
                    }
                    onClick={() => setSweetness("30%")}
                  >
                    30%
                  </button>
                  <button
                    className={
                      sweetness === "50%" ? "option selected" : "option"
                    }
                    onClick={() => setSweetness("50%")}
                  >
                    50%
                  </button>
                  <button
                    className={
                      sweetness === "75%" ? "option selected" : "option"
                    }
                    onClick={() => setSweetness("75%")}
                  >
                    75%
                  </button>
                  <button
                    className={
                      sweetness === "100%" ? "option selected" : "option"
                    }
                    onClick={() => setSweetness("100%")}
                  >
                    100%
                  </button>
                </div>
              </>
            )}

            <div className="price">
              <h3>
                <strong>Total Price:</strong> <span>{totalPrice} .-</span>
              </h3>
            </div>
            <button className="add-to-cart" onClick={handleUpdateMenu}>
              Update Menu
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DescriptionPage;
