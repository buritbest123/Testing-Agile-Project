// Function to get all beverages
// Initial Node: const { name, type } = query;
// Final Node: return beverages;
// Basic Blocks (nodes):
// 1. const { name, type } = query;
// 2. const filter = {};
// 3. if (name) filter.Drink_Name = name;
// 4. if (type) filter.DrinkType = type;
// 5. const beverages = await db.collection("beverage").find(filter).toArray();
// 6. if (beverages.length === 0)
// 7. throw new Error("No beverages found matching the criteria.");
// 8. return beverages;
// Control Flow (edges):
// 1 -> 2
// 2 -> 3
// 2 -> 4
// 4 -> 5
// 5 -> 6
// 6 -> 7
// 6 -> 8
  async function getAllBeverages(db, query) {
    const { name, type } = query;  // Node 1
  
    const filter = {}; // Node 2
    if (name) filter.Drink_Name = name; // Node 3
    if (type) filter.DrinkType = type; // Node 4
  
    const beverages = await db.collection("beverage").find(filter).toArray(); // Node 5
    if (beverages.length === 0) { // Node 6
      throw new Error("No beverages found matching the criteria."); // Node 7
    }
  
    return beverages; // Node 8
  }
  
// Function to get a beverage by name
// Initial Node: const beverage = await db.collection("beverage").findOne({ Drink_Name: name });
// Final Node: return beverage;
// Basic Blocks (nodes):
// 1. const beverage = await db.collection("beverage").findOne({ Drink_Name: name });
// 2. if (!beverage)
// 3. throw new Error("Beverage not found.");
// 4. return beverage;
// Control Flow (edges):
// 1 -> 2
// 2 -> 3
// 2 -> 4
  async function getBeverageByName(db, name) {
    const beverage = await db.collection("beverage").findOne({ Drink_Name: name }); // Node 1
  
    if (!beverage) { // Node 2
      throw new Error("Beverage not found."); // Node 3
    }
  
    return beverage; // Node 4
  }
  
// Function to get beverages by type
// Initial Node: const beverages = await db.collection("beverage").find({ DrinkType: type }).toArray();
// Final Node: return beverages;
// Basic Blocks (nodes):
// 1. const beverages = await db.collection("beverage").find({ DrinkType: type }).toArray();
// 2. if (beverages.length === 0)
// 3. throw new Error("No beverages found for the specified type.");
// 4. return beverages;
// Control Flow (edges):
// 1 -> 2
// 2 -> 3
// 2 -> 4
  async function getBeveragesByType(db, type) {
    const beverages = await db.collection("beverage").find({ DrinkType: type }).toArray(); // Node 1
  
    if (beverages.length === 0) { // Node 2
      throw new Error("No beverages found for the specified type."); // Node 3
    }
  
    return beverages; // Node 4
  }
  
// Function to get beverages with image URLs
// Initial Node: const beverages = await db.collection("beverage").find({}).toArray();
// Final Node: return mapped beverages;
// Basic Blocks (nodes):
// 1. const beverages = await db.collection("beverage").find({}).toArray();
// 2. return beverages.map(...);
// Control Flow (edges):
// 1 -> 2
  async function getBeveragesWithImages(db) {
    const beverages = await db.collection("beverage").find({}).toArray(); // Node 1
  
    return beverages.map((beverage) => ({ // Node 2
      Drink_Name: beverage.Drink_Name,
      img_src: `/images/${beverage.img_src}`,
      Price: beverage.Price,
    }));
  }
  
  module.exports = {
    getAllBeverages,
    getBeverageByName,
    getBeveragesByType,
    getBeveragesWithImages,
  };  