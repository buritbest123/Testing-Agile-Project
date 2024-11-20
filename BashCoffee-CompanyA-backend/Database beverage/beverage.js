const dbName = "BashCoffeeDB";
const collectionName = "beverage";

// Function to create the Beverage collection if it doesn't exist
async function initializeBeverageCollectionIfNotExist(client) {
  const db = client.db(dbName);
  const collections = await db.listCollections({ name: collectionName }).toArray();

  if (collections.length === 0) {
    await db.createCollection(collectionName);

    await db.collection(collectionName).insertMany([
      {
        Drink_ID: 101,
        Drink_Name: "Dirty",
        Description: "A rich espresso shot served over cold milk, resulting in a bold flavor contrast.",
        Price: { hotPrice: 85, coldPrice: 90 },
        DrinkType: "Hot/Cold",
        Tag: ["Coffee","Recommend"],
        isRecommended: true,
        img_src: "latte.png",
        AddOns: [
          { name: "Oat Milk", price: 10 },
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },      {
        Drink_ID: 102,
        Drink_Name: "Americano",
        Description: "An Americano is made by diluting an espresso shot with hot water for a smooth, robust coffee.",
        Price: { hotPrice: 55, coldPrice: 60 },
        DrinkType: "Hot/Cold",
        Tag: ["Coffee"],
        isRecommended: false,
        img_src: "americano.png",
        AddOns: [
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 103,
        Drink_Name: "Espresso",
        Description: "A rich, concentrated coffee brewed by forcing a small amount of water through finely-ground beans.",
        Price: { hotPrice: 55, coldPrice: 60 },
        DrinkType: "Hot/Cold",
        Tag: ["Coffee"],
        isRecommended: false,
        img_src: "espresso.png",
        AddOns: [
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 104,
        Drink_Name: "Latte",
        Description: "A smooth blend of espresso and steamed milk with a creamy finish.",
        Price: { hotPrice: 60, coldPrice: 65 },
        DrinkType: "Hot/Cold",
        Tag: ["Coffee", "Milk"],
        isRecommended: false,
        img_src: "latte.png",
        AddOns: [
          { name: "Oat Milk", price: 15 },
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 105,
        Drink_Name: "Cappuccino",
        Description: "A classic Italian coffee with equal parts espresso, steamed milk, and foam.",
        Price: { hotPrice: 60, coldPrice: 65 },
        DrinkType: "Hot/Cold",
        Tag: ["Coffee", "Milk"],
        isRecommended: false,
        img_src: "capuccino.png",
        AddOns: [
          { name: "Oat Milk", price: 15 },
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 106,
        Drink_Name: "Es-Yen (Thai Style)",
        Description: "A bold and refreshing Thai iced coffee, perfect for warm days.",
        Price: { hotPrice: 65, coldPrice: 70 },
        DrinkType: "Hot/Cold",
        Tag: ["Coffee", "Milk"],
        isRecommended: false,
        img_src: "Es-Yen Thai Style.png",
        AddOns: [
          { name: "Oat Milk", price: 15 },
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 107,
        Drink_Name: "Mocha",
        Description: "A chocolate-infused coffee with a rich, sweet taste.",
        Price: { hotPrice: 65, coldPrice: 70 },
        DrinkType: "Hot/Cold",
        Tag: ["Coffee", "Milk"],
        isRecommended: false,
        img_src: "mocha.png",
        AddOns: [
          { name: "Oat Milk", price: 15 },
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 108,
        Drink_Name: "Honey Americano",
        Description: "Americano with a touch of honey for natural sweetness.",
        Price: { hotPrice: 65, coldPrice: 70 },
        DrinkType: "Hot/Cold",
        Tag: ["Coffee", "Honey", "Recommend"],
        isRecommended: true,
        img_src: "latte.png",
        AddOns: [
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 109,
        Drink_Name: "Black Yuzu",
        Description: "Refreshing black coffee with yuzu citrus infusion.",
        Price: { hotPrice: null, coldPrice: 70 },
        DrinkType: "Cold",
        Tag: ["Coffee", "Yuzu", "Recommend"],
        isRecommended: true,
        img_src: "orange coffee.png",
        AddOns: [
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 110,
        Drink_Name: "Orange Coffee",
        Description: "A zesty coffee with bright orange flavor.",
        Price: { hotPrice: null, coldPrice: 70 },
        DrinkType: "Cold",
        Tag: ["Coffee", "Orange", "Recommend"],
        isRecommended: true,
        img_src: "orange coffee.png",
        AddOns: [
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 111,
        Drink_Name: "Coconut Flower Macchiato",
        Description: "A creamy macchiato with a hint of coconut flower sweetness.",
        Price: { hotPrice: null, coldPrice: 70 },
        DrinkType: "Cold",
        Tag: ["Coffee", "Coconut", "Recommend"],
        isRecommended: true,
        img_src: "coconut flower macchiato.png",
        AddOns: [
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 112,
        Drink_Name: "Clear Matcha",
        Description: "A clear and refreshing ceremonial-grade matcha drink.",
        Price: { hotPrice: null, coldPrice: 65 },
        DrinkType: "Cold",
        Tag: ["Matcha", "Milk"],
        isRecommended: false,
        img_src: "matcha latte.png",
        AddOns: [
          {}
        ]
      },
      {
        Drink_ID: 113,
        Drink_Name: "Matcha Latte",
        Description: "A creamy blend of matcha and steamed milk.",
        Price: { hotPrice: 65, coldPrice: null },
        DrinkType: "Hot",
        Tag: ["Matcha", "Milk"],
        isRecommended: false,
        img_src: "matcha latte.png",
        AddOns: [
          { name: "Oat Milk", price: 15 },
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 114,
        Drink_Name: "Orange Matcha",
        Description: "Refreshing matcha with a burst of orange flavor.",
        Price: { hotPrice: null, coldPrice: 70 },
        DrinkType: "Cold",
        Tag: ["Matcha", "Orange", "Recommend"],
        isRecommended: true,
        img_src: "orange matcha.png",
        AddOns: [
          {}
        ]
      },
      {
        Drink_ID: 115,
        Drink_Name: "Premium Matcha Latte",
        Description: "A premium matcha latte with a nutty and umami taste.",
        Price: { coldPrice: 90 },
        DrinkType: "Cold",
        img_src: "matcha latte.png",
        isRecommended: true,
        Tag: ["Matcha", "Nutty", "Umami"],
        AddOns: [
          { name: "Oat Milk", price: 15 },
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 116,
        Drink_Name: "Twist Matcha Latte",
        Description: "A unique twist on traditional matcha with a blend of creamy milk and subtle nutty flavors.",
        Price: { hotPrice: 110, coldPrice: 120 },
        DrinkType: "Hot/Cold",
        Tag: ["Matcha", "Milk", "Recommend Menu", "Nutty", "Umami"],
        isRecommended: true,
        img_src: "matcha latte.png",
        AddOns: [
          { name: "Oat Milk", price: 15 },
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 117,
        Drink_Name: "Caramel Fresh Milk",
        Description: "Smooth, creamy milk with a rich caramel infusion, perfect for a warm treat.",
        Price: { hotPrice: 45, coldPrice: 50 },
        DrinkType: "Hot/Cold",
        Tag: ["Non-Coffee", "Milk"],
        isRecommended: false,
        img_src: "caramel fresh milk.png",
        AddOns: [
          { name: "Oat Milk", price: 15 },
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 118,
        Drink_Name: "Pinky Milk",
        Description: "A playful, pastel pink milk drink with a sweet, creamy taste.",
        Price: { hotPrice: 45, coldPrice: 50 },
        DrinkType: "Hot/Cold",
        Tag: ["Non-Coffee", "Milk", "Pinky"],
        isRecommended: false,
        img_src: "thai milk tea.png",
        AddOns: [
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 119,
        Drink_Name: "Black Tea",
        Description: "A strong and aromatic black tea that offers a deep and classic tea flavor.",
        Price: { hotPrice: 50, coldPrice: 55 },
        DrinkType: "Hot/Cold",
        Tag: ["Non-Coffee", "Tea"],
        isRecommended: false,
        img_src: "cocoa.png",
        AddOns: [
          {}
        ]
      },
      {
        Drink_ID: 120,
        Drink_Name: "Cocoa",
        Description: "A rich, comforting cocoa drink with smooth chocolatey notes.",
        Price: { hotPrice: 55, coldPrice: 60 },
        DrinkType: "Hot/Cold",
        Tag: ["Non-Coffee", "Cocoa"],
        isRecommended: false,
        img_src: "cocoa.png",
        AddOns: [
          {}
        ]
      },
      {
        Drink_ID: 121,
        Drink_Name: "Thai Milk Tea",
        Description: "A classic Thai tea with a creamy finish, known for its sweet and aromatic flavor.",
        Price: { hotPrice: 55, coldPrice: 60 },
        DrinkType: "Hot/Cold",
        Tag: ["Non-Coffee", "Tea", "Milk"],
        isRecommended: false,
        img_src: "thai milk tea.png",
        AddOns: [
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 122,
        Drink_Name: "Assam Black Milk Tea",
        Description: "A blend of Assam tea and milk, offering bold flavors with a smooth finish.",
        Price: { hotPrice: 60, coldPrice: 60 },
        DrinkType: "Hot/Cold",
        img_src: "thai milk tea.png",
        isRecommended: true,
        Tag: ["Non-Coffee", "Milk", "Tea"],
        AddOns: [
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 123,
        Drink_Name: "Whipped Cheese Thai Tea",
        Description: "Thai tea topped with a savory whipped cheese layer for a unique, creamy experience.",
        Price: { coldPrice: 85 },
        DrinkType: "Cold",
        isRecommended: true,
        img_src: "thai milk tea.png",
        Tag: ["Non-Coffee", "Milk", "Tea"],
        AddOns: [
          {}
        ]
      },
        {
          Drink_ID: 124,
          Drink_Name: "Orange Juice",
          Description: "Freshly squeezed orange juice, vibrant and refreshing.",
          Price: { coldPrice: 45 },
          DrinkType: "Cold",
          Tag: ["Non-Coffee", "Juice"],
          isRecommended: false,
          img_src: "orange juice.png"
          ,
        AddOns: [
          {}
        ]
        },
        {
          Drink_ID: 125,
          Drink_Name: "Lemon Thai Tea",
          Description: "Refreshing Thai tea with a twist of lemon for a citrusy zing.",
          Price: { coldPrice: 55 },
          DrinkType: "Cold",
          isRecommended: false,
          img_src: "thai milk tea.png",
          Tag: ["Refreshment", "Tea"]
          ,
        AddOns: [
          {}
        ]
        },
        {
          Drink_ID: 126,
          Drink_Name: "Honey Lemonade",
          Description: "A sweet and tangy lemonade with a touch of honey for natural sweetness.",
          Price: { coldPrice: 55 },
          DrinkType: "Cold",
          Tag: ["Refreshment", "Lemonade"],
          isRecommended: false,
          img_src: "orange juice.png"
          ,
        AddOns: [
          {}
        ]
        },
        {
          Drink_ID: 127,
          Drink_Name: "Red Lemon Soda",
          Description: "A refreshing, fizzy delight combining zesty lemon with a hint of sweetness. The vibrant red color adds a twist to the classic lemon soda, making it the perfect thirst-quencher for hot days.",
          Price: { coldPrice: 55 },
          DrinkType: "Cold",
          img_src: "orange juice.png",
          isRecommended: false,
          Tag: ["Soda","Refreshment"],
          AddOns: [
            {}
          ]
          
        },
        {
          Drink_ID: 128,
          Drink_Name: "Honey Yuzu Soda",
          Description: "A fizzy and refreshing drink with honey and yuzu citrus flavors.",
          Price: { coldPrice: 60 },
          DrinkType: "Cold",
          Tag: ["Soda", "Yuzu","Refreshment"],
          isRecommended: true,
          img_src: "orange juice.png",
          AddOns: [
            {}
          ]
        },
        {
          Drink_ID: 129,
          Drink_Name: "Breezy Rose",
          Description: "Light and refreshing rose-flavored drink with a subtle floral aroma.",
          Price: { coldPrice: 55 },
          Price: { coldPrice: 60 },
          DrinkType: "Cold",
          isRecommended: true,
          img_src: "orange juice.png",
          Tag: ["Rose","Refreshment"],
          AddOns: [
            {}
          ]
        },
        {
          Drink_ID: 130,
          Drink_Name: "Plum Lemon Soda",
          Description: "A sweet and tangy soda with a blend of plum and lemon flavors for a unique twist.",
          Price: { coldPrice: 60 },
          DrinkType: "Cold",
          isRecommended: false,
          img_src: "orange juice.png",
          Tag: ["Soda", "Plum","Refreshment"],
          AddOns: [
            {}
          ]
        },
        {
          Drink_ID: 131,
          Drink_Name: "Craft Cola",
          Description: "A hand-crafted cola drink with a perfect balance of sweetness and spice.",
          Price: { coldPrice: 60 },
          DrinkType: "Cold",
          isRecommended: true,
          img_src: "coconut flower macchiato.png",
          Tag: ["Cola","Refreshment"],
          AddOns: [
            {}
          ]
        },
        {
          Drink_ID: 132,
          Drink_Name: "Fruit Sunshine Tea",
          Description: "A bright and fruity tea blend perfect for sunny days.",
          Price: { coldPrice: 70 },
          DrinkType: "Cold",
          Tag: ["Tea", "Fruit","Refreshment"],
          isRecommended: true,
          img_src: "fruit sunshine tea.png",
          AddOns: [
            {}
          ]
        },
        {
          Drink_ID: 133,
          Drink_Name: "Water",
          Description: "Pure, refreshing water to keep you hydrated.",
          Price: { coldPrice: 10 },
          DrinkType: "",
          img_src: "water.png",
          Tag: ["Water","Refreshment"],
          AddOns: [
            {}
          ]
        },
        {
          Drink_ID: 134,
          Drink_Name: "Coke",
          Description: "Classic carbonated soft drink, refreshing and fizzy.",
          Price: { coldPrice: 18 },
          DrinkType: "Cold",
          Tag: ["Soft Drink","Refreshment"],
          isRecommended: false,
          img_src: "coke.png",
          AddOns: [
            {}
          ]
        }
      ]
      
    );

    console.log(`Collection '${collectionName}' created.`);
  } else {
    console.log(`Collection '${collectionName}' already exists.`);
  }
}

module.exports = initializeBeverageCollectionIfNotExist;
