import { handleSortChange } from "@/lib/utilsSort";

interface Product {
  id: number | string;
  name: string;
  description: string;
  hotPrice: string | number;
  coldPrice: string | number;
  category: string;
  TypeOfDrinks: string;
  isRecommended: boolean;
  image: string;
  Tag: string[];
}

describe("handleSortChange Function", () => {
  test("T1: sorts multiple products by price in ascending order when both hot and cold prices are valid", () => {
    const products: Product[] = [
      { id: 1, name: "Dirty", hotPrice: "85", coldPrice: "90", category: "Drink", TypeOfDrinks: "Hot/Cold", isRecommended: true, image: "latte.png", description: "", Tag: ["Coffee", "Recommend"] },
      { id: 2, name: "Americano", hotPrice: "55", coldPrice: "60", category: "Drink", TypeOfDrinks: "Hot/Cold", isRecommended: false, image: "americano.png", description: "", Tag: ["Coffee"] },
      { id: 3, name: "Latte", hotPrice: "60", coldPrice: "65", category: "Drink", TypeOfDrinks: "Hot/Cold", isRecommended: false, image: "latte.png", description: "", Tag: ["Coffee", "Milk"] },
    ];
    handleSortChange(products, "Price Low to High");
    expect(products[0].id).toBe(2);
    expect(products[1].id).toBe(3);
    expect(products[2].id).toBe(1);
  });

  test("T2: sorts multiple products by price in ascending order when only hot prices are valid", () => {
    const products: Product[] = [
      { id: 1, name: "Dirty", hotPrice: "85", coldPrice: "-", category: "Drink", TypeOfDrinks: "Hot/Cold", isRecommended: true, image: "latte.png", description: "", Tag: ["Coffee", "Recommend"] },
      { id: 2, name: "Americano", hotPrice: "55", coldPrice: "-", category: "Drink", TypeOfDrinks: "Hot/Cold", isRecommended: false, image: "americano.png", description: "", Tag: ["Coffee"] },
      { id: 3, name: "Latte", hotPrice: "60", coldPrice: "-", category: "Drink", TypeOfDrinks: "Hot/Cold", isRecommended: false, image: "latte.png", description: "", Tag: ["Coffee", "Milk"] },
    ];
    handleSortChange(products, "Price Low to High");
    expect(products[0].id).toBe(2);
    expect(products[1].id).toBe(3);
    expect(products[2].id).toBe(1);
  });

  test("T3: sorts multiple products by price in ascending order when only cold prices are valid", () => {
    const products: Product[] = [
      { id: 1, name: "Dirty", hotPrice: "-", coldPrice: "90", category: "Drink", TypeOfDrinks: "Hot/Cold", isRecommended: true, image: "latte.png", description: "", Tag: ["Coffee", "Recommend"] },
      { id: 2, name: "Americano", hotPrice: "-", coldPrice: "60", category: "Drink", TypeOfDrinks: "Hot/Cold", isRecommended: false, image: "americano.png", description: "", Tag: ["Coffee"] },
      { id: 3, name: "Latte", hotPrice: "-", coldPrice: "65", category: "Drink", TypeOfDrinks: "Hot/Cold", isRecommended: false, image: "latte.png", description: "", Tag: ["Coffee", "Milk"] },
    ];
    handleSortChange(products, "Price Low to High");
    expect(products[0].id).toBe(2);
    expect(products[1].id).toBe(3);
    expect(products[2].id).toBe(1);
  });

  test("T4: sorts multiple products by price in descending order when both hot and cold prices are valid", () => {
    const products: Product[] = [
      { id: 1, name: "Dirty", hotPrice: "85", coldPrice: "90", category: "Drink", TypeOfDrinks: "Hot/Cold", isRecommended: true, image: "latte.png", description: "", Tag: ["Coffee", "Recommend"] },
      { id: 2, name: "Americano", hotPrice: "55", coldPrice: "60", category: "Drink", TypeOfDrinks: "Hot/Cold", isRecommended: false, image: "americano.png", description: "", Tag: ["Coffee"] },
      { id: 3, name: "Latte", hotPrice: "60", coldPrice: "65", category: "Drink", TypeOfDrinks: "Hot/Cold", isRecommended: false, image: "latte.png", description: "", Tag: ["Coffee", "Milk"] },
    ];
    handleSortChange(products, "Price High to Low");
    expect(products[0].id).toBe(1);
    expect(products[1].id).toBe(3);
    expect(products[2].id).toBe(2);
  });

  test("T5: retains original order when sort order is invalid", () => {
    const products: Product[] = [
      { id: 1, name: "Dirty", hotPrice: "85", coldPrice: "90", category: "Drink", TypeOfDrinks: "Hot/Cold", isRecommended: true, image: "latte.png", description: "", Tag: ["Coffee", "Recommend"] },
      { id: 2, name: "Americano", hotPrice: "55", coldPrice: "60", category: "Drink", TypeOfDrinks: "Hot/Cold", isRecommended: false, image: "americano.png", description: "", Tag: ["Coffee"] },
      { id: 3, name: "Latte", hotPrice: "60", coldPrice: "65", category: "Drink", TypeOfDrinks: "Hot/Cold", isRecommended: false, image: "latte.png", description: "", Tag: ["Coffee", "Milk"] },
    ];
    handleSortChange(products, "Invalid value");
    expect(products[0].id).toBe(1);
    expect(products[1].id).toBe(2);
    expect(products[2].id).toBe(3);
  });

  test("T6: sorts single product by price in ascending order", () => {
    const products: Product[] = [
      { id: 1, name: "Dirty", hotPrice: "50", coldPrice: "60", category: "Drink", TypeOfDrinks: "Hot/Cold", isRecommended: true, image: "latte.png", description: "", Tag: ["Coffee", "Recommend"] },
    ];
    handleSortChange(products, "Price Low to High");
    expect(products[0].id).toBe(1);
  });
});
