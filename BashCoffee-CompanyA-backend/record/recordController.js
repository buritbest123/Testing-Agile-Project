async function insertRecord(db, orderData) {
    // Check if the 'record' collection exists
    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some(col => col.name === "record");
    if (!collectionExists) {
      await db.createCollection("record");
      console.log("Collection 'record' created");
    }
  
    // Map over the Menu items in orderData to construct the menuItems array
    const menuItems = await Promise.all(
      orderData.Menu.map(async (item) => {
        const [name, type, price, addOn] = item;
  
        console.log(`Checking for item: ${name}`);
  
        // Fetch beverage or bakery item based on name
        const beverageItem = await db.collection("beverage").findOne({ Drink_Name: name });
        console.log("Beverage Item:", beverageItem);
  
        const bakeryItem = await db.collection("bakery").findOne({ Bakery_Name: name });
        console.log("Bakery Item:", bakeryItem);
  
        let menuItem;
        if (beverageItem) {
          menuItem = {
            Drink_Name: beverageItem.Drink_Name,
            Drink_Type: type || beverageItem.DrinkType,
            Price: price || (type === "COLD" ? beverageItem.Price.coldPrice : beverageItem.Price.hotPrice),
            Add_On: addOn || "None",
            category: "beverage",
          };
        } else if (bakeryItem) {
          menuItem = {
            Bakery_Name: bakeryItem.Bakery_Name,
            Bakery_Type: "Bakery",
            Price: bakeryItem.Price.singlePrice,
            Add_On: addOn || "None",
            category: "bakery",
          };
        } else {
          throw new Error(`Item not found: ${name}`);
        }
  
        return menuItem;
      })
    );
  
    // Prepare the record to insert
    const record = {
      Customer: orderData.Customer,
      Tel: orderData.Tel,
      Menu: menuItems,
      promotion: orderData.promotion,
      totalPrice: orderData.totalPrice,
      date: new Date(),
    };
  
    // Insert the record into the 'record' collection
    await db.collection("record").insertOne(record);
    console.log("Order inserted into 'record':", record);
  
    return record;
  }

  async function insertRecordWithValidation(db, orderData) {
    if (!orderData.Customer || !orderData.Tel || !orderData.Menu || !orderData.totalPrice || !orderData.promotion) {
      throw new Error("Incomplete order information");
    }
  
    // Ensure Menu is an array
    if (typeof orderData.Menu === "string") {
      orderData.Menu = orderData.Menu.split(",").map(item => item.trim());
    }
  
    return await insertRecord(db, orderData);
  }
  
  
  module.exports = { insertRecord, insertRecordWithValidation };
