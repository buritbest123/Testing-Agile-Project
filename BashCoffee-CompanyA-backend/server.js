const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const { Timestamp } = require("mongodb");
const path = require('path');

const app = express();
const port = 3030;
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname))); // Serve static files from the root directory

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

// Serve static files from the "public" directory
// app.use("/image", express.static("Database beverage/images"));
app.use("/image", express.static(path.join(__dirname, "Database beverage/images")));

const dbName = "BashCoffeeDB"; // Define your database name here
let db; // Initialize a variable to hold the database reference

// Import the beverage, member, and promotion collection initializers
const initializeBeverageCollectionIfNotExist = require("./Database beverage/beverage");
const initializeMemberCollectionIfNotExist = require("./Database member/member");
const initializePromotionCollectionIfNotExist = require("./Database promotion/promotion.js");
const initializbakeryCollectionIfNotExist = require("./Database bakery/bakery.js");
const initializeRecordCollectionIfNotExist = require("./record/record.js");

const { addMember, getMemberByPhoneNumber, getAllMembers, getRecordHistory } = require("./Database member/memberController");
const { getBakeryItems, getBakeryItemByName, getMenuItems, getMenuItemById } = require("./Database bakery/bakeryController");
const { getMemberPointsByPhoneNumber, addPointsToMember, redeemPointsFromMember}  = require("./Database member/pointsController");
const {insertRecord, insertRecordWithValidation}  = require("./record/recordController");


const {
  getAllBeverages,
  getBeverageByName,
  getBeveragesByType,
  getBeveragesWithImages,
} = require("./Database beverage/beverageController");
const {
  getAllPromotions,
  getPromotionById,
  addPromotion,
  updatePromotion,
  deletePromotion,
} = require("./Database promotion/promotionController");

// Function to initialize all collections
// Function to initialize all collections with fresh data
async function initializeCollections() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    db = client.db(dbName); // Assign the database reference

        // // Drop the database if it exists
        // await db.dropDatabase();
        // console.log(`Database ${dbName} dropped`);
    
    // Drop collections if they exist before initializing
    const collections = ['beverage', 'member', 'Promotion', 'bakery', 'record'];
    for (const collection of collections) {
      const collectionExists = await db.collection(collection).countDocuments({});
      if (collectionExists) {
        await db.collection(collection).drop();
        console.log(`Dropped existing collection: ${collection}`);
      }
    }

    // Initialize collections
    await initializeBeverageCollectionIfNotExist(client);
    await initializeMemberCollectionIfNotExist(client);
    await initializePromotionCollectionIfNotExist(client);
    await initializbakeryCollectionIfNotExist(client);
    await initializeRecordCollectionIfNotExist(client);

    console.log("Collections initialized successfully");
  } catch (err) {
    console.error("Error initializing collections:", err);
  }
}


// Call initializeCollections when the server starts
initializeCollections();

  // Define beverage routes
  app.get("/beverages", async (req, res) => {
    try {
      const beverages = await getAllBeverages(db, req.query);
      res.status(200).json(beverages);
    } catch (err) {
      if (err.message === "No beverages found matching the criteria.") {
        res.status(404).json({ error: err.message });
      } else {
        console.error("Error fetching beverages:", err);
        res.status(500).json({ error: "An error occurred while fetching beverages" });
      }
    }
  });

  // Define beverage routes
  app.get("/beverage/:name", async (req, res) => {
    try {
      const beverage = await getBeverageByName(db, req.params.name);
      res.status(200).json(beverage);
    } catch (err) {
      if (err.message === "Beverage not found.") {
        res.status(404).json({ error: err.message });
      } else {
        console.error("Error fetching beverage by name:", err);
        res.status(500).json({ error: "An error occurred while fetching the beverage" });
      }
    }
  });

  app.get("/beverage/type/:type", async (req, res) => {
    try {
      const beverages = await getBeveragesByType(db, req.params.type);
      res.status(200).json(beverages);
    } catch (err) {
      if (err.message === "No beverages found for the specified type.") {
        res.status(404).json({ error: err.message });
      } else {
        console.error("Error fetching beverages by type:", err);
        res.status(500).json({ error: "An error occurred while fetching beverages" });
      }
    }
  });  

  app.get("/test-images", async (req, res) => {
    try {
      const beverages = await getBeveragesWithImages(db);
  
      let html = '<h1>Drink Images</h1>';
      beverages.forEach(beverage => {
        html += `<div>
                   <h3>${beverage.Drink_Name}</h3>
                   <img src="/images/${beverage.img_src}" alt="${beverage.Drink_Name}" style="width:150px;height:150px;"/>
                   <p>Price: ${beverage.Price}</p>
                 </div>`;
      });
      res.send(html);
    } catch (err) {
      console.error("Error displaying images:", err);
      res.status(500).send("Error displaying images");
    }
  });
  
  // Fetch beverage and bakery
  app.get("/menu", async (req, res) => {
    try {
      const menuItems = await getMenuItems(db);
      res.status(200).json(menuItems);
    } catch (err) {
      res.status(500).json({ error: "An error occurred while fetching menu items" });
    }
  });
  

  app.get("/menu/:id", async (req, res) => {
    try {
      const itemId = parseInt(req.params.id); // Get ID from URL parameter and convert to integer
      const item = await getMenuItemById(db, itemId);
      res.status(200).json(item);
    } catch (err) {
      if (err.message === "Item not found") {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An error occurred while fetching the item" });
      }
    }
  });
  

app.get("/members", async (req, res) => {
  try {
    const members = await getAllMembers(db);
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching members" });
  }
});


app.get("/member/:tel", async (req, res) => {
  const { tel } = req.params;

  try {
    const member = await getMemberByPhoneNumber(db, tel);
    res.status(200).json(member);
  } catch (err) {
    if (err.message === "Member not found") {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An error occurred while fetching the member" });
    }
  }
});

// Add a new member
app.post("/member", async (req, res) => {
  try {
    const newMember = await addMember(db, req.body);
    res.status(201).json(newMember);
  } catch (err) {
    if (err.message === "All member fields are required") {
      res.status(400).json({ error: err.message });
    } else if (err.message === "Member with this phone number already exists") {
      res.status(409).json({ error: err.message });
    } else {
      console.error("Error adding new member:", err);
      res.status(500).json({ error: "An error occurred while adding the member" });
    }
  }
});

//View points
app.get("/member/view-points/:tel", async (req, res) => {
  const { tel } = req.params;

  try {
    const memberPointsDetails = await getMemberPointsByPhoneNumber(db, tel);
    res.status(200).json(memberPointsDetails);
  } catch (err) {
    if (err.message === "Valid phone number is required") {
      res.status(400).json({ error: err.message });
    } else if (err.message === "Member not found") {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An error occurred while fetching the member points." });
    }
  }
});



// Add points to a member
app.put("/member/add-points", async (req, res) => {
  const { MID, points } = req.body;

  try {
    const updatedMember = await addPointsToMember(db, MID, points);
    res.status(200).json({ message: "Points added successfully", member: updatedMember });
  } catch (err) {
    if (err.message === "Valid MID and a positive number of points are required") {
      res.status(400).json({ error: err.message });
    } else if (err.message === "Member not found") {
      res.status(404).json({ error: err.message });
    } else if (err.message === "Failed to update points") {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An error occurred while adding points" });
    }
  }
});


// Redeem points from a member
app.put("/member/redeem-points", async (req, res) => {
  const { MID, points } = req.body;

  try {
    const updatedMember = await redeemPointsFromMember(db, MID, points);
    res.status(200).json({ message: "Points redeemed successfully", member: updatedMember });
  } catch (err) {
    if (err.message === "Valid MID and a positive number of points are required") {
      res.status(400).json({ error: err.message });
    } else if (err.message === "Member not found") {
      res.status(404).json({ error: err.message });
    } else if (err.message === "Insufficient points for redemption") {
      res.status(400).json({ error: err.message });
    } else if (err.message === "Failed to redeem points") {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An error occurred while redeeming points" });
    }
  }
});


// Promotions endpoints
app.get("/promotions", async (req, res) => {
  try {
    const promotions = await getAllPromotions(db);
    res.status(200).json(promotions);
  } catch (err) {
    console.error("Error fetching promotions:", err);
    res.status(500).json({ error: "An error occurred while fetching promotions" });
  }
});

// Endpoint to get a promotion by Pro_ID
app.get("/promotions/:Pro_ID", async (req, res) => {
  try {
      const promotion = await getPromotionById(db, req.params.Pro_ID);
      res.status(200).json(promotion);
  } catch (err) {
      if (err.message === "Promotion not found.") {
          res.status(404).json({ error: err.message });
      } else {
          console.error("Error fetching promotion:", err);
          res.status(500).json({ error: "An error occurred while fetching the promotion" });
      }
  }
});

app.post("/promotions", async (req, res) => {
  try {
      const newPromotion = await addPromotion(db, req.body);
      res.status(201).json(newPromotion);
  } catch (err) {
      if (err.message === "Pro_ID and Promo_Description are required fields.") {
          res.status(400).json({ error: err.message });
      } else {
          console.error("Error creating promotion:", err);
          res.status(500).json({ error: "An error occurred while creating the promotion" });
      }
  }
});

// Endpoint to update a promotion by Pro_ID
app.put("/promotions/:Pro_ID", async (req, res) => {
  try {
      const result = await updatePromotion(db, req.params.Pro_ID, req.body);
      res.status(200).json(result);
  } catch (err) {
      if (err.message === "Promotion not found.") {
          res.status(404).json({ error: err.message });
      } else {
          console.error("Error updating promotion:", err);
          res.status(500).json({ error: "An error occurred while updating the promotion" });
      }
  }
});

// Endpoint to delete a promotion by Pro_ID
app.delete("/promotions/:Pro_ID", async (req, res) => {
  try {
    const result = await deletePromotion(db, req.params.Pro_ID);
    res.status(200).json(result);
} catch (err) {
    if (err.message === "Promotion not found.") {
        res.status(404).json({ error: err.message });
    } else {
        console.error("Error deleting promotion:", err);
        res.status(500).json({ error: "An error occurred while deleting the promotion" });
    }
}
});

// GET method to fetch all bakery items
app.get("/bakery", async (req, res) => {
  try {
    const tagQuery = req.query.tag;
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);

    const items = await getBakeryItems(db, tagQuery, minPrice, maxPrice);
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: "Error occurred" });
  }
});

  
  // GET method to fetch bakery item by name
  app.get("/bakery/:name", async (req, res) => {
    try {
      const bakeryName = req.params.name;
      const item = await getBakeryItemByName(db, bakeryName);
      res.status(200).json(item);
    } catch (err) {
      if (err.message === "Bakery item not found") {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Error occurred" });
      }
    }
  });  

//-----------------------------//
// Modified function to insert records into the 'record' collection
// Function to insert the record into the database
app.post("/record", async (req, res) => {
  try {
    const record = await insertRecord(db, req.body);
    res.status(201).json({ message: "Order successfully inserted", record });
  } catch (err) {
    console.error("Error inserting record:", err);
    if (err.message.startsWith("Item not found:")) {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An error occurred while inserting the record" });
    }
  }
});




// Function to retrieve record history
async function getRecordHistory(client) {
    const record = await db.collection("record").find({}).toArray();
    return record;
}

async function insertRecord(client, orderData) {
  // Define the collection
  const collection = db.collection("record");

  // Check if the 'record' collection exists
  const collections = await db.listCollections().toArray();
  const collectionExists = collections.some(col => col.name === "record");
  if (!collectionExists) {
      await db.createCollection("record");
      console.log("Collection 'record' created");
  }

  // Map over the Menu items in orderData to construct the menuItems array
  const menuItems = await Promise.all(orderData.Menu.map(async (item) => {
      const [name, type, price, addOn] = item;

      console.log(`Checking for item: ${name}`); // Add this line to log the name being checked

      // Fetch beverage or bakery item based on name
      const beverageItem = await db.collection("beverage").findOne({ Drink_Name: name });
      console.log("Beverage Item:", beverageItem);

      const bakeryItem = await db.collection("bakery").findOne({ Bakery_Name: name });
      console.log("Bakery Item:", bakeryItem);

      let menuItem;
      if (beverageItem) {
          // Create a beverage menu item
          menuItem = {
              Drink_Name: beverageItem.Drink_Name,
              Drink_Type: type || beverageItem.DrinkType,
              Price: price || (type === "COLD" ? beverageItem.Price.coldPrice : beverageItem.Price.hotPrice),
              Add_On: addOn || "None",
              category: "beverage",
          };
      } else if (bakeryItem) {
          // Create a bakery menu item
          menuItem = {
              Bakery_Name: bakeryItem.Bakery_Name,
              Bakery_Type: "Bakery",
              Price: bakeryItem.Price.singlePrice,
              Add_On: addOn || "None",
              category: "bakery",
          };
      } else {
          // If the item is not found in either collection
          throw new Error(`Item not found: ${name}`);
      }

      return menuItem;

  }));

  // Prepare the record to insert
  const record = {
      Customer: orderData.Customer,
      Tel: orderData.Tel,
      Menu: menuItems,
      promotion: orderData.promotion,
      totalPrice: orderData.totalPrice,
      date: new Date() // Adding a timestamp
  };

  // Insert the record into the 'record' collection
  await collection.insertOne(record);
  console.log("Order inserted into 'record':", record);
}

// POST route to create a new record
app.post("/record", async (req, res) => {
  try {
    const orderData = req.body;
    await insertRecordWithValidation(db, orderData);
    res.status(201).json({ message: "Record has been successfully recorded" });
  } catch (error) {
    console.error("Error inserting record:", error.message, error.stack);
    if (error.message === "Incomplete order information") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An error occurred while recording the order" });
    }
  }
});



// GET route to retrieve record history
app.get("/record", async (req, res) => {
  try {
    const record = await getRecordHistory(db);
    res.status(200).json(record);
  } catch (error) {
    console.error("Error retrieving record history:", error);
    res.status(500).json({ error: "An error occurred while retrieving record history" });
  }
});


module.exports = { initializeRecordCollectionIfNotExist, insertRecord, getRecordHistory };


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
