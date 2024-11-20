const dbName = "BashCoffeeDB";
const collectionName = "record";
const { Timestamp } = require("mongodb");

// Function to create the Beverage collection if it doesn't exist
async function initializeRecordCollectionIfNotExist(client) {
  const db = client.db(dbName);
  const collections = await db.listCollections({ name: collectionName }).toArray();

  if (collections.length === 0) {
    await db.createCollection(collectionName);

await db.collection(collectionName).insertMany([
      {
        _id: "6739976fd0b9b7671f58e4ae",
        Customer: "Thanat Phi",
        Tel: "0625916127",
        Menu: [
          {
            Drink_Name: "Orange Matcha",
            Drink_Type: "Cold",
            Price: 70,
            Add_On: "None",
            category: "beverage",
          },
          {
            Bakery_Name: "Nutella Croissant",
            Bakery_Type: "Bakery",
            Price: 65,
            Add_On: "None",
            category: "bakery",
          },
        ],
        promotion: "สะสมแต้มผ่าน LINE OA 10 แก้ว ฟรี 1 แก้ว",
        totalPrice: 135,
        date: new Date("2024-11-17T14:13:56Z"),
      },
      {
        _id: "673997dbd0b9b7671f58e4af",
        Customer: "Customer",
        Tel: "000-000-0000",
        Menu: [
          {
            Drink_Name: "Espresso",
            Drink_Type: "Hot",
            Price: 70,
            Add_On: "Brown Sugar Jelly",
            category: "beverage",
          },
        ],
        promotion: "No Promotion",
        totalPrice: 70,
        date: new Date("2024-11-17T14:14:35Z"),
      },
      {
        _id: "67399809d0b9b7671f58e4b0",
        Customer: "Thanatos Thanat",
        Tel: "1234567890",
        Menu: [
          {
            Bakery_Name: "Cream Cheese Danish",
            Bakery_Type: "Bakery",
            Price: 50,
            Add_On: "None",
            category: "bakery",
          },
        ],
        promotion: "ส่วนลด 5 บาทสำหรับนักศึกษาเก่ามหิดล",
        totalPrice: 45,
        date: new Date("2024-11-17T14:15:21Z"),
      },
      {
        _id: "6739987cd0b9b7671f58e4b1",
        Customer: "PhiPhi nat",
        Tel: "0123456789",
        Menu: [
          {
            Drink_Name: "Honey Yuzu Soda",
            Drink_Type: "Cold",
            Price: 60,
            Add_On: "None",
            category: "beverage",
          },
          {
            Drink_Name: "Es-Yen (Thai Style)",
            Drink_Type: "Hot",
            Price: 80,
            Add_On: "Oat Milk",
            category: "beverage",
          },
          {
            Bakery_Name: "Madeleine",
            Bakery_Type: "Bakery",
            Price: 30,
            Add_On: "None",
            category: "bakery",
          },
        ],
        promotion: "No Promotion",
        totalPrice: 170,
        date: new Date("2024-11-17T14:17:16Z"),
      },
    ]);

    console.log(`Collection '${collectionName}' created and initialized with sample data.`);
  } else {
    console.log(`Collection '${collectionName}' already exists.`);
  }
}

module.exports = initializeRecordCollectionIfNotExist;
//    await db.collection(collectionName).insertMany([
//      {
//        _id: "6739976fd0b9b7671f58e4aa",
//        Customer: "MaMa Mia",
//        Tel: "0991564848",
//        Menu: [
//          {
//            Drink_Name: "Dirty",
//            Drink_Type: "HOT",
//            Price: 90,
//            Add_On: "None",
//            category: "beverage",
//          },
//          {
//            Drink_Name: "Espresso",
//            Drink_Type: "HOT",
//            Price: 50,
//            Add_On: "None",
//            category: "beverage",
//          },
//        ],
//        promotion: "None",
//        totalPrice: 140,
//        date: new Date("2024-11-17T14:12:47Z"),
//      },
//      {
//        _id: "6739976fd0b9b7671f58e4ab",
//        Customer: "Thanat Phi",
//        Tel: "0625916127",
//        Menu: [
//          {
//            Drink_Name: "Latte",
//            Drink_Type: "COLD",
//            Price: 60,
//            Add_On: "None",
//            category: "beverage",
//          },
//        ],
//        promotion: "สะสมแต้มผ่าน LINE OA 10 แก้ว ฟรี 1 แก้ว",
//        totalPrice: 60,
//        date: new Date("2024-11-17T14:12:47Z"),
//      },
//      {
//        _id: "6739976fd0b9b7671f58e4ac",
//        Customer: "PhiPhi nat",
//        Tel: "0123456789",
//        Menu: [
//          {
//            Drink_Name: "Cappuccino",
//            Drink_Type: "HOT",
//            Price: 60,
//            Add_On: "Oat Milk",
//            category: "beverage",
//          },
//          {
//            Drink_Name: "Mocha",
//            Drink_Type: "HOT",
//            Price: 65,
//            Add_On: "None",
//            category: "beverage",
//          },
//          {
//            Bakery_Name: "Chocolate Croissant",
//            Price: 50,
//            category: "bakery",
//          },
//        ],
//        promotion: "None",
//        totalPrice: 175,
//        date: new Date("2024-11-17T14:12:47Z"),
//      },
//      {
//        _id: "6739976fd0b9b7671f58e4ad",
//        Customer: "Thanatos Thanat",
//        Tel: "1234567890",
//        Menu: [
//          {
//            Drink_Name: "Mocha",
//            Drink_Type: "HOT",
//            Price: 65,
//            Add_On: "None",
//            category: "beverage",
//          },
//          {
//            Drink_Name: "Cappuccino",
//            Drink_Type: "HOT",
//            Price: 60,
//            Add_On: "None",
//            category: "beverage",
//          },
//        ],
//        promotion: "ส่วนลด 5 บาทสำหรับนักศึกษาเก่ามหิดล",
//        totalPrice: 125,
//        date: new Date("2024-11-17T14:12:47Z"),
//      },
//      {
//        _id: "673997b4d0b9b7671f58e4ae",
//        Customer: "Thanat Phi",
//        Tel: "0625916127",
//        Menu: [
//          {
//            Drink_Name: "Orange Matcha",
//            Drink_Type: "Cold",
//            Price: 70,
//            Add_On: "None",
//            category: "beverage",
//          },
//          {
//            Bakery_Name: "Nutella Croissant",
//            Price: 65,
//            Add_On: "None",
//            category: "bakery",
//          },
//        ],
//        promotion: "สะสมแต้มผ่าน LINE OA 10 แก้ว ฟรี 1 แก้ว",
//        totalPrice: 135,
//        date: new Date("2024-11-17T14:13:56Z"),
//      },
//      {
//        _id: "673997dbd0b9b7671f58e4af",
//        Customer: "Customer",
//        Tel: "000-000-0000",
//        Menu: [
//          {
//            Drink_Name: "Espresso",
//            Drink_Type: "Hot",
//            Price: 70,
//            Add_On: "Brown Sugar Jelly",
//            category: "beverage",
//          },
//        ],
//        promotion: "No Promotion",
//        totalPrice: 70,
//        date: new Date("2024-11-17T14:14:35Z"),
//      },
//      {
//        _id: "67399809d0b9b7671f58e4b0",
//        Customer: "Thanatos Thanat",
//        Tel: "1234567890",
//        Menu: [
//          {
//            Bakery_Name: "Cream Cheese Danish",
//            Price: 50,
//            Add_On: "None",
//            category: "bakery",
//          },
//        ],
//        promotion: "ส่วนลด 5 บาทสำหรับนักศึกษาเก่ามหิดล",
//        totalPrice: 45,
//        date: new Date("2024-11-17T14:15:21Z"),
//      },
//      {
//        _id: "6739987cd0b9b7671f58e4b1",
//        Customer: "PhiPhi nat",
//        Tel: "0123456789",
//        Menu: [
//          {
//            Drink_Name: "Honey Yuzu Soda",
//            Drink_Type: "Cold",
//            Price: 60,
//            Add_On: "None",
//            category: "beverage",
//          },
//          {
//            Drink_Name: "Es-Yen (Thai Style)",
//            Drink_Type: "Hot",
//            Price: 80,
//            Add_On: "Oat Milk",
//            category: "beverage",
//          },
//          {
//            Bakery_Name: "Madeleine",
//            Price: 30,
//            Add_On: "None",
//            category: "bakery",
//          },
//        ],
//        promotion: "No Promotion",
//        totalPrice: 170,
//        date: new Date("2024-11-17T14:17:16Z"),
//      },
//    ]);
//
//    console.log(`Collection '${collectionName}' created and initialized with sample data.`);
//  } else {
//    console.log(`Collection '${collectionName}' already exists.`);
//  }
//}
//
//module.exports = initializeRecordCollectionIfNotExist;