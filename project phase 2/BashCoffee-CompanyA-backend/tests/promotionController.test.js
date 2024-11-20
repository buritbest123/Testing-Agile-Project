const {
    getAllPromotions,
    getPromotionById,
    addPromotion,
    updatePromotion,
    deletePromotion,
} = require("../Database promotion/promotionController");

describe("Promotion Controller", () => {
    let mockDb;

    beforeEach(() => {
        mockDb = {
            collection: jest.fn().mockReturnThis(),
            find: jest.fn().mockReturnThis(),
            findOne: jest.fn(),
            insertOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
            toArray: jest.fn(),
        };
    });

    // Test Case 1: Fetch all promotions
    // Test Requirements: TR = {1, 2}
    // Test Paths: t1 = [1, 2]
    // NC Satisfied By: {t1}
    // Test Case Values: t1 = {}, expected: [{ Pro_ID: "1", Promo_Description: "Buy 1 Get 1", start_date: "2023-01-01", expiry_date: "2023-12-31" }]
    it("should fetch all promotions", async () => {
        mockDb.toArray.mockResolvedValue([{ Pro_ID: "001", Promo_Description: "Promotion 1" }]);

        const result = await getAllPromotions(mockDb);
        expect(result).toEqual([{ Pro_ID: "001", Promo_Description: "Promotion 1" }]);
        expect(mockDb.find).toHaveBeenCalledWith({});
    });

    // Test Case 2: Fetch a promotion by Pro_ID
    // Test Requirements: TR = {1, 2, 3, 4}
    // Test Paths: t2 = [1, 2, 4]
    // NC Satisfied By: {t2}
    // Test Case Values: t2 = "P001", expected: { Pro_ID: "P001", Promo_Description: "Discount 20%" }
    it("should fetch a promotion by ID", async () => {
        mockDb.findOne.mockResolvedValue({ Pro_ID: "001", Promo_Description: "Promotion 1" });

        const result = await getPromotionById(mockDb, "001");
        expect(result).toEqual({ Pro_ID: "001", Promo_Description: "Promotion 1" });
        expect(mockDb.findOne).toHaveBeenCalledWith({ Pro_ID: "001" });
    });

    // Test Case 3: Throw error if promotion by Pro_ID is not found
    // Test Requirements: TR = {1, 2, 3, 4}
    // Test Paths: t3 = [1, 2, 3]
    // NC Satisfied By: {t3}
    // Test Case Values: t3 = "null", expected: "Promotion not found."
    it("should throw an error if promotion by ID not found", async () => {
        mockDb.findOne.mockResolvedValue(null);

        await expect(getPromotionById(mockDb, "999")).rejects.toThrow("Promotion not found.");
    });

    // Test Case 4: Add a new promotion
    // Test Requirements: TR = {1, 2, 3, 4, 5}
    // Test Paths: t4 = [1, 2, 4, 5]
    // NC Satisfied By: {t4}
    // Test Case Values: t4 = { Pro_ID: "P002", Promo_Description: "Buy 1 Get 1 Free" }, expected: { Pro_ID: "P002", Promo_Description: "Buy 1 Get 1 Free" }
    it("should add a new promotion", async () => {
        const promotionData = { Pro_ID: "002", Promo_Description: "New Promotion" };

        const result = await addPromotion(mockDb, promotionData);
        expect(result).toEqual(promotionData);
        expect(mockDb.insertOne).toHaveBeenCalledWith(promotionData);
    });

    // Test Case 5: Throw error when required fields are missing in addPromotion
    // Test Requirements: TR = {1, 2, 3, 4, 5}
    // Test Paths: t5 = [1, 2, 3]
    // NC Satisfied By: {t5}
    // Test Case Values: t5 = { Pro_ID: "", Promo_Description: "" }, expected: "Pro_ID and Promo_Description are required fields."
    it("should throw an error if required fields are missing", async () => {
        const promotionData = { Pro_ID: "" };

        await expect(addPromotion(mockDb, promotionData)).rejects.toThrow(
            "Pro_ID and Promo_Description are required fields."
        );
    });

    // Test Case 6: Update an existing promotion
    // Test Requirements: TR = {1, 2, 3, 4}
    // Test Paths: t6 = [1, 2, 4]
    // NC Satisfied By: {t6}
    // Test Case Values: t6 = { Pro_ID: "001", Promo_Description: "Updated Promotion" }, expected: { message: "Promotion updated successfully" }
    it("should update a promotion", async () => {
        mockDb.updateOne.mockResolvedValue({ matchedCount: 1 });

        const result = await updatePromotion(mockDb, "001", { Promo_Description: "Updated Promotion" });
        expect(result).toEqual({ message: "Promotion updated successfully" });
        expect(mockDb.updateOne).toHaveBeenCalledWith(
            { Pro_ID: "001" },
            { $set: { Promo_Description: "Updated Promotion" } }
        );
    });

    // Test Case 7: Throw error when updating a non-existent promotion
    // Test Requirements: TR = {1, 2, 3, 4}
    // Test Paths: t7 = [1, 2, 3]
    // NC Satisfied By: {t7}
    // Test Case Values: t7 = { Pro_ID: "999", Promo_Description: "Non-existent Promotion" }, expected: "Promotion not found."
    it("should throw an error if promotion to update not found", async () => {
        mockDb.updateOne.mockResolvedValue({ matchedCount: 0 });

        await expect(
            updatePromotion(mockDb, "999", { Promo_Description: "Non-existent Promotion" })
        ).rejects.toThrow("Promotion not found.");
    });

    // Test Case 8: Delete an existing promotion
    // Test Requirements: TR = {1, 2, 3, 4}
    // Test Paths: t8 = [1, 2, 4]
    // NC Satisfied By: {t8}
    // Test Case Values: t8 = { Pro_ID: "001" }, expected: { message: "Promotion deleted successfully" }
    it("should delete a promotion", async () => {
        mockDb.deleteOne.mockResolvedValue({ deletedCount: 1 });

        const result = await deletePromotion(mockDb, "001");
        expect(result).toEqual({ message: "Promotion deleted successfully" });
        expect(mockDb.deleteOne).toHaveBeenCalledWith({ Pro_ID: "001" });
    });

    // Test Case 9: Throw error when deleting a non-existent promotion
    // Test Requirements: TR = {1, 2, 3, 4}
    // Test Paths: t9 = [1, 2, 3]
    // NC Satisfied By: {t9}
    // Test Case Values: t9 = { Pro_ID: "999" }, expected: "Promotion not found."
    it("should throw an error if promotion to delete not found", async () => {
        mockDb.deleteOne.mockResolvedValue({ deletedCount: 0 });

        await expect(deletePromotion(mockDb, "999")).rejects.toThrow("Promotion not found.");
    });
});