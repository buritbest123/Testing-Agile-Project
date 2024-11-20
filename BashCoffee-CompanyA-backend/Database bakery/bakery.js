const dbName = "BashCoffeeDB";
const collectionName = "bakery";

// Function to create the Baker collection if it doesn't exist
async function initializbakeryCollectionIfNotExist(client) {
  const db = client.db(dbName);
  const collections = await db.listCollections({ name: collectionName }).toArray();

    // If the collection does not exist, create it
    if (collections.length === 0) {
      await db.createCollection('bakery');

      // Insert all data
      await db.collection('bakery').insertMany([
        {
          Bakery_ID: 201,
          Bakery_Name: "Plain Croissant",
          Description: "The classic crescent-shaped pastry made from flaky layers of buttery dough",
          Price: { singlePrice: 45 },
          Category: "Bakery",
          Tag: ["croissant", "bakery"],
          isRecommended: false,
          image_src: "cro.png"
        },
        {
          Bakery_ID: 202,
          Bakery_Name: "Chocolate Croissant",
          Description: "A flaky, buttery pastry with a rich, chocolate filling, combining lightness and indulgence.",
          Price: { singlePrice: 50 },
          Category: "Bakery",
          Tag: ["croissant", "chocolate", "bakery", "sweet"],
          isRecommended: true,
          image_src: "chocolate.png"
        },
        {
          Bakery_ID: 203,
          Bakery_Name: "Nutella Croissant",
          Description: "A flaky, buttery croissant filled with rich, creamy Nutella, combining layers of pastry with chocolate-hazelnut goodness.",
          Price: { singlePrice: 65 },
          Category: "Bakery",
          Tag: ["croissant", "nutella", "bakery", "chocolate", "sweet"],
          isRecommended: true,
          image_src: "nutella.png"
        },
        {
          Bakery_ID: 204,
          Bakery_Name: "Cream Cheese Danish",
          Description: "A delightful pastry with a soft, flaky crust and a creamy, tangy cream cheese filling at its center.",
          Price: { singlePrice: 50 },
          Category: "Bakery",
          Tag: ["danish", "cream cheese", "bakery", "cheese"],
          isRecommended: true,
          image_src: "creamcheesedanish.png"
        },
        {
          Bakery_ID: 205,
          Bakery_Name: "Danish Custard",
          Description: "A soft, flaky pastry with creamy custard filling, balancing sweetness and richness.",
          Price: { singlePrice: 45 },
          Category: "Bakery",
          Tag: ["danish", "custard", "bakery", "sweet"],
          isRecommended: false,
          image_src: "danishcustard.png"
        },
        {
          Bakery_ID: 206,
          Bakery_Name: "Ham Cheese Croissant",
          Description: "A savory croissant filled with ham and melted cheese, perfect for a satisfying snack.",
          Price: { singlePrice: 65 },
          Category: "Bakery",
          Tag: ["croissant", "ham", "cheese", "bakery"],
          isRecommended: false,
          image_src: "hamcheese.png"
        },
        {
          Bakery_ID: 207,
          Bakery_Name: "Croffle",
          Description: "A fusion of croissant and waffle, with a crispy exterior and soft layers inside.",
          Price: { singlePrice: 45 },
          Category: "Bakery",
          Tag: ["croffle", "waffle", "bakery", "sweet"],
          isRecommended: false,
          image_src: "croffle.png"
        },
        {
          Bakery_ID: 208,
          Bakery_Name: "Madeleine",
          Description: "A small, soft cake with a light, buttery flavor, perfect for tea time.",
          Price: { singlePrice: 30 },
          Category: "Bakery",
          Tag: ["madeleine", "bakery", "cake"],
          isRecommended: false,
          image_src: "medeleine.png"
        },
        {
          Bakery_ID: 209,
          Bakery_Name: "Original Cookies",
          Description: "Classic cookies with a perfect balance of crispiness and chewiness.",
          Price: { singlePrice: 45 },
          Category: "Bakery",
          Tag: ["cookies", "bakery", "sweet"],
          isRecommended: false,
          image_src: "oricookie.png"
        },
        {
          Bakery_ID: 210,
          Bakery_Name: "Lava Chocolate Cookies",
          Description: "A rich chocolate cookie with a gooey lava center, perfect for chocolate lovers.",
          Price: { singlePrice: 55 },
          Category: "Bakery",
          Tag: ["cookies", "lava", "chocolate", "bakery", "sweet"],
          isRecommended: true,
          image_src: "lavachoccook.png"
        },
        {
          Bakery_ID: 211,
          Bakery_Name: "Brownies",
          Description: "A dense, fudgy brownie with intense chocolate flavor, satisfying any sweet tooth.",
          Price: { singlePrice: 65 },
          Category: "Bakery",
          Tag: ["brownies", "bakery", "chocolate", "sweet"],
          isRecommended: true,
          image_src: "brownies.png"
        },
        {
          Bakery_ID: 212,
          Bakery_Name: "Donut",
          Description: "A soft, sweet ring-shaped pastry, fried to golden perfection.",
          Price: { singlePrice: 50 },
          Category: "Bakery",
          Tag: ["donut", "bakery", "sweet"],
          isRecommended: false,
          image_src: "donut.png"
        },
        {
          Bakery_ID: 213,
          Bakery_Name: "Kanom Khai",
          Description: "A traditional Thai dessert with a soft, sweet texture, perfect for a light treat.",
          Price: { singlePrice: 25 },
          Category: "Bakery",
          Tag: ["kanom khai", "thai dessert", "bakery", "sweet"],
          isRecommended: false,
          image_src: "kanomkhai.png"
        }
      ]);


      console.log(`Collection 'bakery' created with initial bakery items.`);
    } else {
      console.log(`Collection 'bakery' already exists.`);
    }
}

module.exports = initializbakeryCollectionIfNotExist;
