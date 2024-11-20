async function getBakeryItems(db, tagQuery, minPrice, maxPrice) {
    try {
      const filter = {};
  
      if (tagQuery) {
        filter.Tag = { $in: [tagQuery] };
      }
  
      if (!isNaN(minPrice) || !isNaN(maxPrice)) {
        filter["Price.singlePrice"] = {};
        if (!isNaN(minPrice)) filter["Price.singlePrice"].$gte = minPrice;
        if (!isNaN(maxPrice)) filter["Price.singlePrice"].$lte = maxPrice;
      }
  
      console.log("Filter being used:", filter);
      const items = await db.collection("bakery").find(filter).toArray();
      console.log("Items found:", items);
  
      return items;
    } catch (err) {
      console.error("Error fetching bakery items:", err);
      throw err;
    }
  }

  async function getBakeryItemByName(db, bakeryName) {
    try {
      const item = await db.collection("bakery").findOne({ Bakery_Name: bakeryName });
      if (!item) {
        throw new Error("Bakery item not found");
      }
      return item;
    } catch (err) {
      console.error("Error fetching bakery item by name:", err);
      throw err;
    }
  }
  
  async function getMenuItems(db) {
    try {
      const drinks = await db.collection("beverage").find({}).toArray();
      const bakeries = await db.collection("bakery").find({}).toArray();
      return [...drinks, ...bakeries];
    } catch (err) {
      console.error("Error fetching menu items:", err);
      throw err;
    }
  }
  
  async function getMenuItemById(db, itemId) {
    try {
      // Try to find the item in the 'beverage' collection
      let item = await db.collection("beverage").findOne({ Drink_ID: itemId });
  
      // If not found in 'beverage', try 'bakery'
      if (!item) {
        item = await db.collection("bakery").findOne({ Bakery_ID: itemId });
      }
  
      if (!item) {
        throw new Error("Item not found");
      }
  
      return item;
    } catch (err) {
      console.error("Error fetching item:", err);
      throw err;
    }
  }
  

  module.exports = { getBakeryItems, getBakeryItemByName, getMenuItems, getMenuItemById };
