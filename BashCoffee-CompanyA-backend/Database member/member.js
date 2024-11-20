const dbName = "BashCoffeeDB";
const collectionName = "member";

async function initializeMemberCollectionIfNotExist(client) {
    const db = client.db(dbName);
    const collections = await db.listCollections({ name: collectionName }).toArray();

    if (collections.length === 0) {
      await db.createCollection(collectionName);

      await db.collection(collectionName).insertMany([
        {
          MID: 0,
          Mname: "Thanat Phi",
          Tel: "0625916127",
          Points: 999,
          Alumni: true
        },
        {
          MID: 1,
          Mname: "PhiPhi nat",
          Tel: "0123456789",
          Points: 3,
          Alumni: false
        },
        {
          MID: 2,
          Mname: "Thanatos Thanat",
          Tel: "1234567890",
          Points: 4,
          Alumni: true
        },
        {
          MID: 3,
          Mname: "Phi Phinat",
          Tel: "0987654321",
          Points: 5,
          Alumni: false
        },
      ]);

      console.log(`Collection '${collectionName}' created.`);
    } else {
      console.log(`Collection '${collectionName}' already exists.`);
    }
}


module.exports = initializeMemberCollectionIfNotExist;