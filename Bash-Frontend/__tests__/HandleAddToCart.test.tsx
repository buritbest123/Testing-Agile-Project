import { handleAddToCart } from "@/lib/utilsCart";
import { CartItemType } from "@/context/CartContext";

describe("Test handleAddToCart Function", () => {
  const mockAddToCart = jest.fn().mockImplementation((item: CartItemType) => 1); // Mock addToCart to return cart length of 1

  // T1 (C1b1, C2b1, C3b1, C4b1, C5b1, C6b1, C7b1)
  // Test null product, invalid quantity and displayTotalPrice, empty sweetness and type
  it("should return an error if product is null", () => {
    const selectedAddOns = ([] = []);
    const quantity = 0;
    const displayTotalPrice = 0;

    const result = handleAddToCart(
      null, // null product
      selectedAddOns,
      quantity,
      displayTotalPrice,
      mockAddToCart
    );

    // Assertions
    expect(result.success).toBe(false);
    expect(result.message).toBe("Product not found");
    expect(mockAddToCart).not.toHaveBeenCalled(); // addToCart should not be called when product is null
  });

  // T2 (C1b2, C2b2, C3b2, C4b2, C5b2, C6b2, C7b2)
  // Test valid product, valid quantity and displayTotalPrice, non-empty sweetness and type
  it("should add a product to the cart with the correct details", () => {
    const product = {
      id: 101,
      Drink_Name: "Americano",
      Description: "A rich espresso with added water for a smooth coffee.",
      Price: { hotPrice: 50, coldPrice: 55 },
      DrinkType: "Hot/Cold",
      Tag: ["Coffee"],
      isRecommended: true,
      img_src: "/images/americano.png",
      category: "Beverage",
      AddOns: [{ name: "Oat Milk", price: 10 }],
    };

    const selectedAddOns = [{ name: "Oat Milk", price: 10 }];
    const quantity = 1;
    const displayTotalPrice = 60;
    const sweetness = "50%";
    const type = "Hot";

    const result = handleAddToCart(
      product,
      selectedAddOns,
      quantity,
      displayTotalPrice,
      mockAddToCart,
      product.category,
      sweetness,
      type
    );

    // Assertions
    expect(result.success).toBe(true);
    expect(result.cartLength).toBe(1); // Check if mockAddToCart returned 1
    expect(mockAddToCart).toHaveBeenCalledWith(
      expect.objectContaining({
        productId: product.id,
        itemName: product.Drink_Name,
        quantity: 1,
        price: 60,
        addOns: ["Oat Milk"],
        sweetness: "50%",
        type: "Hot",
      })
    );
  });

  // T3 (C1b2, C2b2, C3b3, C4b3, C5b2, C6b2, C7b2)
  // Test valid product, invalid quantity and displayTotalPrice, non-empty sweetness and type
  it("should return an arror if quantity and total price in invalid", () => {
    const product = {
      id: 101,
      Drink_Name: "Americano",
      Description: "A rich espresso with added water for a smooth coffee.",
      Price: { hotPrice: 50, coldPrice: 55 },
      DrinkType: "Hot/Cold",
      Tag: ["Coffee"],
      isRecommended: true,
      img_src: "/images/americano.png",
      category: "Beverage",
      AddOns: [{ name: "Oat Milk", price: 10 }],
    };

    const selectedAddOns = [{ name: "Oat Milk", price: 10 }];
    const quantity = NaN;
    const displayTotalPrice = NaN;
    const sweetness = "50%";
    const type = "Hot";

    const result = handleAddToCart(
      product,
      selectedAddOns,
      quantity,
      displayTotalPrice,
      mockAddToCart,
      product.category,
      sweetness,
      type
    );

    // Assertions
    expect(result.success).toBe(false);
    expect(result.message).toBe("Product quantity is invalid");
    expect(mockAddToCart).not.toHaveBeenCalled(); // addToCart should not be called when quantity and displayTotalPrice are invalid
  });
});
