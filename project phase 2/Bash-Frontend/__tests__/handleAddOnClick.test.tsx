import { handleAddOnClick } from "@/lib/utilsCart";
import "@testing-library/jest-dom";

interface AddOn {
  name: string;
  price: number;
}

describe("Test handleAddOnClick function", () => {
  const oatMilk: AddOn = { name: "Oat Milk", price: 15 };
  const brownSugarJelly: AddOn = { name: "Brown Sugar Jelly", price: 15 };

  // T2 (C1b1, C2b2)
  // Test intial empty list of selectedAddOns and new selectedAddOn
  it("adds an add-on to an initially empty list", () => {
    const result = handleAddOnClick(oatMilk, []);
    expect(result).toEqual([oatMilk]);
  });

  // T3 (C1b2, C2b1)
  // Test intial non-empty list of selectedAddOns and the existed selectedAddOn (removing it)
  it("removes an add-on if it already exists in the list", () => {
    const result = handleAddOnClick(oatMilk, [oatMilk]);
    expect(result).toEqual([]);
  });

  // T4 (C1b2, C2b2)
  // Test intial non-empty list of selectedAddOns and new selectedAddOn
  it("adds an add-on to an non-empty list", () => {
    const result = handleAddOnClick(brownSugarJelly, [oatMilk]);
    expect(result).toEqual([oatMilk, brownSugarJelly]);
  });
});