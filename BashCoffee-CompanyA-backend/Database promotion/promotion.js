// Define the database and collection names
const dbName = "BashCoffeeDB";
const collectionName = "Promotion";

// Function to create the Promotion collection if it doesn't exist
async function initializePromotionCollectionIfNotExist(client) {
    const db = client.db(dbName);
    // Check if the collection already exists
    const collections = await db
      .listCollections({ name: collectionName })
      .toArray();

    // If the collection does not exist, create it
    if (collections.length === 0) {
      await db.createCollection(collectionName);

      // Insert some initial data into the collection
      await db.collection(collectionName).insertMany([
        {
          Pro_ID: "001",
          Promo_Description: "สะสมแต้มผ่าน LINE OA 10 แก้ว ฟรี 1 แก้ว"
        },
        {
          Pro_ID: "002",
          Promo_Description: "ลด 50% สำหรับแก้วที่ 2 ทุกวันศุกร์ เวลา 13:00-16:00 (อาจจะใช้ถึงสิ้นเดือน ตค นี้)",
          start_date: new Date("2024-10-01"),
          expiry_date: new Date("2024-10-31"),
        },
        {
          Pro_ID: "003",
          Promo_Description: "ส่วนลด 5 บาทสำหรับนักศึกษาเก่ามหิดล"          
        },
      ]);

      console.log(`Collection '${collectionName}' created.`);
    } else {
      console.log(`Collection '${collectionName}' already exists.`);
    }
}

module.exports = initializePromotionCollectionIfNotExist;