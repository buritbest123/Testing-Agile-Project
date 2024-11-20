const {
    getAllBeverages,
    getBeverageByName,
    getBeveragesByType,
    getBeveragesWithImages,
  } = require("../Database beverage/beverageController");
  
  describe("Beverage Controller", () => {
    let mockDb;
  
    beforeEach(() => {
      mockDb = {
        collection: jest.fn().mockReturnThis(),
        find: jest.fn().mockReturnThis(),
        findOne: jest.fn(),
        toArray: jest.fn(),
      };
    });
    
    // Test Case 1: Fetch all beverages with valid filters
    // Test Requirements: TR = {1, 2, 3, 4, 5, 6, 7, 8}
    // Test Paths: t1 = [1, 2, 3, 4, 5, 6, 8]
    // NC Satisfied By: {t1}
    // Test Case Values: t1 = (Drink_Name: "Latte", DrinkType: "Hot/Cold"), expected Drink_Name: "Latte", DrinkType: "Hot/Cold"
    it("should fetch all beverages with filters", async () => {
      const query = { name: "Latte", type: "Hot/Cold" };
      mockDb.toArray.mockResolvedValue([{ Drink_Name: "Latte", DrinkType: "Hot/Cold" }]);
  
      const result = await getAllBeverages(mockDb, query);
  
      expect(result).toEqual([{ Drink_Name: "Latte", DrinkType: "Hot/Cold" }]);
      expect(mockDb.find).toHaveBeenCalledWith({ Drink_Name: "Latte", DrinkType: "Hot/Cold" });
    });
  
    // Test Case 2: Throw error when no beverages match the criteria
    // Test Requirements: TR = {1, 2, 3, 4, 5, 6, 7, 8}
    // Test Paths: t2 = [1, 2, 3, 4, 5, 6, 7]
    // NC Satisfied By: {t2}
    // Test Case Values: t2 = (""), expected "No beverages found matching the criteria."
    it("should throw an error if no beverages match the criteria", async () => {
      mockDb.toArray.mockResolvedValue([]);
  
      await expect(getAllBeverages(mockDb, {})).rejects.toThrow("No beverages found matching the criteria.");
    });
  
    // Test Case 3: Fetch a beverage by name
    // Test Requirements: TR = {1, 2, 3, 4}
    // Test Paths: t3 = [1, 2, 4]
    // NC Satisfied By: {t3}
    // Test Case Values: t3 = "Latte", expected: { Drink_Name: "Latte", DrinkType: "Hot/Cold" }
    it("should fetch a beverage by name", async () => {
      mockDb.findOne.mockResolvedValue({ Drink_Name: "Latte", DrinkType: "Hot/Cold" });
  
      const result = await getBeverageByName(mockDb, "Latte");
  
      expect(result).toEqual({ Drink_Name: "Latte", DrinkType: "Hot/Cold" });
      expect(mockDb.findOne).toHaveBeenCalledWith({ Drink_Name: "Latte" });
    });
  
    // Test Case 4: Throw error when beverage by name is not found
    // Test Requirements: TR = {1, 2, 3, 4}
    // Test Paths: t4 = [1, 2, 3]
    // NC Satisfied By: {t4}
    // Test Case Values: t4 = "Unknown", expected: "Beverage not found."
    it("should throw an error if beverage by name is not found", async () => {
      mockDb.findOne.mockResolvedValue(null);
  
      await expect(getBeverageByName(mockDb, "Unknown")).rejects.toThrow("Beverage not found.");
    });
  
    // Test Case 5: Fetch beverages by type
    // Test Requirements: TR = {1, 2, 3, 4}
    // Test Paths: t5 = [1, 2, 4]
    // NC Satisfied By: {t5}
    // Test Case Values: t5 = "Hot/Cold", expected: [{ Drink_Name: "Latte", DrinkType: "Hot/Cold" }]
    it("should fetch beverages by type", async () => {
      mockDb.toArray.mockResolvedValue([{ Drink_Name: "Latte", DrinkType: "Hot/Cold" }]);
  
      const result = await getBeveragesByType(mockDb, "Hot/Cold");
  
      expect(result).toEqual([{ Drink_Name: "Latte", DrinkType: "Hot/Cold" }]);
      expect(mockDb.find).toHaveBeenCalledWith({ DrinkType: "Hot/Cold" });
    });
  
    // Test Case 6: Throw error when no beverages match the type
    // Test Requirements: TR = {1, 2, 3, 4}
    // Test Paths: t6 = [1, 2, 3]
    // NC Satisfied By: {t6}
    // Test Case Values: t6 = "Unknown", expected: "No beverages found for the specified type."
    it("should throw an error if no beverages match the type", async () => {
      mockDb.toArray.mockResolvedValue([]);
  
      await expect(getBeveragesByType(mockDb, "Unknown")).rejects.toThrow("No beverages found for the specified type.");
    });
  
    // Test Case 7: Fetch beverages with image URLs
    // Test Requirements: TR = {1, 2}
    // Test Paths: t7 = [1, 2]
    // NC Satisfied By: {t7}
    // Test Case Values: t7 = {}, expected: [{ Drink_Name: "Latte", img_src: "/images/latte.png", Price: { hotPrice: 60, coldPrice: 65 } }]
    it("should fetch beverages with image URLs", async () => {
      mockDb.toArray.mockResolvedValue([
        { Drink_Name: "Latte", img_src: "latte.png", Price: { hotPrice: 60, coldPrice: 65 } },
      ]);
  
      const result = await getBeveragesWithImages(mockDb);
  
      expect(result).toEqual([
        {
          Drink_Name: "Latte",
          img_src: "/images/latte.png",
          Price: { hotPrice: 60, coldPrice: 65 },
        },
      ]);
    });
  });  