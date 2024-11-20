// Promotion Controller

// Function to fetch all promotions
// Initial Node: const promotions = await db.collection("Promotion").find({}).toArray();
// Final Node: return promotions;
// Basic Blocks (nodes):
// 1. const promotions = await db.collection("Promotion").find({}).toArray();
// 2. return promotions;
// Control Flow (edges):
// 1 -> 2
async function getAllPromotions(db) {
    const promotions = await db.collection("Promotion").find({}).toArray(); // Node 1
    return promotions; // Node 2
}

// Function to fetch a promotion by Pro_ID
// Initial Node: const promotion = await db.collection("Promotion").findOne({ Pro_ID });
// Final Node: return promotion or throw an error.
// Basic Blocks (nodes):
// 1. const promotion = await db.collection("Promotion").findOne({ Pro_ID });
// 2. if (!promotion)
// 3. throw new Error("Promotion not found.");
// 4. return promotion;
// Control Flow (edges):
// 1 -> 2
// 2 -> 3
// 2 -> 4
// Get a promotion by ID
async function getPromotionById(db, id) {
    const promotion = await db.collection("Promotion").findOne({ Pro_ID: id }); // Node 1
    if (!promotion) { // Node 2
        throw new Error("Promotion not found."); // Node 3
    }
    return promotion; // Node 4
}

// Function to add a new promotion
// Initial Node: const { Pro_ID, Promo_Description } = promotionData;
// Final Node: return promotionData;
// Basic Blocks (nodes):
// 1. const { Pro_ID, Promo_Description } = promotionData;
// 2. if (!Pro_ID || !Promo_Description)
// 3. throw new Error("Pro_ID and Promo_Description are required fields.");
// 4. await db.collection("Promotion").insertOne(promotionData);
// 5. return promotionData;
// Control Flow (edges):
// 1 -> 2
// 2 -> 3 (if validation fails)
// 2 -> 4 (if validation passes)
// 4 -> 5
async function addPromotion(db, promotionData) {
    const { Pro_ID, Promo_Description } = promotionData; // Node 1
    if (!Pro_ID || !Promo_Description) { // Node 2
        throw new Error("Pro_ID and Promo_Description are required fields."); // Node 3
    }
    await db.collection("Promotion").insertOne(promotionData); // Node 4
    return promotionData; // Node 5
}

// Function to update a promotion by Pro_ID
// Initial Node: const result = await db.collection("Promotion").updateOne( { Pro_ID: id }, { $set: updatedPromotion } );
// Final Node: return { message: "Promotion updated successfully" };
// Basic Blocks (nodes):
// 1. const result = await db.collection("Promotion").updateOne( { Pro_ID: id }, { $set: updatedPromotion } );
// 2. if (result.matchedCount === 0)
// 3. throw new Error("Promotion not found.");
// 4. return { message: "Promotion updated successfully" };
// Control Flow (edges):
// 1 -> 2
// 2 -> 3
// 2 -> 4
async function updatePromotion(db, id, updatedPromotion) {
    const result = await db.collection("Promotion").updateOne( // Node 1
        { Pro_ID: id },
        { $set: updatedPromotion }
    );
    if (result.matchedCount === 0) { // Node 2
        throw new Error("Promotion not found."); // Node 3
    }
    return { message: "Promotion updated successfully" }; // Node 4
}

// Function to delete a promotion by Pro_ID
// Initial Node: Attempt to delete promotion.
// Final Node: Return success message or throw an error if not found.
// Basic Blocks (nodes):
// 1. const result = await db.collection("Promotion").deleteOne({ Pro_ID });
// 2. if (result.deletedCount === 0)
// 3. throw new Error("Promotion not found.");
// 4. return { message: "Promotion deleted successfully" };
// Control Flow (edges):
// 1 -> 2
// 2 -> 3
// 2 -> 4
async function deletePromotion(db, id) {
    const result = await db.collection("Promotion").deleteOne({ Pro_ID: id }); // Node 1
    if (result.deletedCount === 0) { // Node 2
        throw new Error("Promotion not found."); // Node 3
    }
    return { message: "Promotion deleted successfully" }; // Node 4
}

module.exports = {
    getAllPromotions,
    getPromotionById,
    addPromotion,
    updatePromotion,
    deletePromotion,
};