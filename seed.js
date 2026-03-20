const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  createdAt: { type: Date, default: Date.now },
})

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  stock: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const User = mongoose.models.User || mongoose.model("User", userSchema)
const Product = mongoose.models.Product || mongoose.model("Product", productSchema)

const products = [
  // Electronics (20) - Each with unique image
  { name: "Wireless Bluetooth Headphones", description: "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality", price: 149.99, image: "https://i.pinimg.com/736x/00/e2/71/00e271b10657045f97185f1f64cf0911.jpg", category: "Electronics", stock: 50 },
  { name: "Smart Fitness Watch", description: "Advanced fitness tracker with GPS, heart rate monitoring, sleep tracking, and smartphone notifications", price: 299.99, image: "https://i.pinimg.com/736x/9d/6e/ea/9d6eeac5cb3590d2329c174efc58b535.jpg", category: "Electronics", stock: 30 },
  { name: "Wireless Gaming Mouse", description: "High-precision optical sensor with RGB lighting, programmable buttons, and ergonomic design", price: 69.99, image: "https://i.pinimg.com/736x/9a/42/b8/9a42b81fd18313e6c97e84350e74e8d3.jpg", category: "Electronics", stock: 55 },
  { name: "Portable Bluetooth Speaker", description: "Waterproof portable speaker with powerful bass, 20-hour battery, and built-in microphone", price: 79.99, image: "https://i.pinimg.com/736x/b0/ee/0f/b0ee0f183b79c54433fb0b637fe07d31.jpg", category: "Electronics", stock: 40 },
  { name: "Smart LED TV 55 Inch", description: "4K Ultra HD Smart LED TV with HDR10+, built-in streaming apps, and voice control", price: 499.99, image: "https://i.pinimg.com/1200x/f2/e8/4b/f2e84b36187717873a330cc1a1824932.jpg", category: "Electronics", stock: 15 },
  { name: "Mechanical Keyboard", description: "RGB mechanical gaming keyboard with Cherry MX switches, customizable backlighting, and media keys", price: 119.99, image: "https://i.pinimg.com/736x/23/16/c6/2316c6c055db5d97918f0cf04fbf8ae4.jpg", category: "Electronics", stock: 35 },
  { name: "Wireless Earbuds Pro", description: "True wireless earbuds with active noise cancellation, transparency mode, and spatial audio", price: 159.99, image: "https://i.pinimg.com/736x/41/66/90/416690d2a51e7165c02a2c01b283d09c.jpg", category: "Electronics", stock: 60 },
  { name: "Laptop Stand Adjustable", description: "Ergonomic aluminum laptop stand with adjustable height and angle for better posture", price: 44.99, image: "https://i.pinimg.com/1200x/96/c8/a3/96c8a35216496401bfbcd70958d386a9.jpg", category: "Electronics", stock: 70 },
  { name: "USB-C Hub 7-in-1", description: "Multi-port USB-C hub with HDMI output, SD card reader, and power delivery", price: 39.99, image: "https://i.pinimg.com/736x/16/dd/cd/16ddcd245d5cf212fc8346c14e875b45.jpg", category: "Electronics", stock: 80 },
  { name: "Webcam HD 1080p", description: "Full HD webcam with autofocus, built-in microphone, and automatic low-light correction", price: 59.99, image: "https://i.pinimg.com/736x/18/75/97/187597202bd6b9391873080cfcd4c264.jpg", category: "Electronics", stock: 45 },
  { name: "Power Bank 20000mAh", description: "High-capacity portable charger with fast charging and dual USB output ports", price: 49.99, image: "https://i.pinimg.com/1200x/cf/89/89/cf898955bcc5a57c2391ca4489afe446.jpg", category: "Electronics", stock: 65 },
  { name: "Wireless Charger Pad", description: "Fast wireless charging pad compatible with all Qi-enabled devices", price: 24.99, image: "https://i.pinimg.com/736x/c4/0a/16/c40a16222877010cfa7de49d7800301b.jpg", category: "Electronics", stock: 90 },
  { name: "Smart Home Speaker", description: "Voice-controlled smart speaker with premium sound and smart home integration", price: 99.99, image: "https://i.pinimg.com/736x/00/d4/8d/00d48db06004a4349a1787a4869657a1.jpg", category: "Electronics", stock: 40 },
  { name: "Gaming Monitor 27 Inch", description: "144Hz gaming monitor with 1ms response time and AMD FreeSync support", price: 349.99, image: "https://i.pinimg.com/1200x/ef/af/46/efaf46bb64568080a9adf950f40cf784.jpg", category: "Electronics", stock: 20 },
  { name: "Tablet 10 Inch", description: "Android tablet with HD display, long battery life, and expandable storage", price: 199.99, image: "https://i.pinimg.com/1200x/af/25/a3/af25a3d17ff6b74296032a14715eac80.jpg", category: "Electronics", stock: 30 },
  { name: "Smart Doorbell Camera", description: "WiFi doorbell camera with HD video, night vision, and two-way audio", price: 149.99, image: "https://i.pinimg.com/1200x/10/5b/2d/105b2dccda8159ae8f7df46929862ee6.jpg", category: "Electronics", stock: 25 },
  { name: "External SSD 1TB", description: "Portable SSD with USB-C, shock-resistant design, and ultra-fast transfer speeds", price: 129.99, image: "https://i.pinimg.com/1200x/6a/74/f7/6a74f7e8d2bfbde5b7226fbc0186f08c.jpg", category: "Electronics", stock: 35 },
  { name: "Portable Projector", description: "Mini HD projector with built-in speakers and wireless connectivity", price: 179.99, image: "https://i.pinimg.com/736x/39/78/e7/3978e7abdc2fef7986d4d9d5dc26aec5.jpg", category: "Electronics", stock: 25 },
  { name: "Smart Plug Set", description: "WiFi smart plugs pack of 4 with app control and voice assistant compatibility", price: 29.99, image: "https://i.pinimg.com/1200x/32/d1/be/32d1be5ce2991773134f0136a49e00db.jpg", category: "Electronics", stock: 60 },
  { name: "Drone Mini", description: "Compact drone with 4K camera, GPS, and 30-minute flight time", price: 249.99, image: "https://i.pinimg.com/736x/44/d7/ca/44d7ca21c2930b6596bda6b9783bfa39.jpg", category: "Electronics", stock: 20 },

  // Clothing (20) - Each with unique image
  { name: "Cotton T-Shirt Pack", description: "Set of 3 premium cotton t-shirts in assorted colors, breathable and comfortable", price: 39.99, image: "https://i.pinimg.com/1200x/52/ed/de/52edde4f3cdd90e773eca0aa4874361c.jpg", category: "Clothing", stock: 100 },
  { name: "Denim Jacket", description: "Classic denim jacket with vintage wash, perfect for casual styling", price: 89.99, image: "https://i.pinimg.com/736x/5c/2e/d8/5c2ed8e889774d0879fbc9ac3b403e95.jpg", category: "Clothing", stock: 25 },
  { name: "Leather Handbag", description: "Genuine leather handbag with multiple compartments and adjustable strap", price: 129.99, image: "https://i.pinimg.com/736x/da/56/41/da5641dc8c0b49a9a6f1ff7ead827b75.jpg", category: "Clothing", stock: 35 },
  { name: "Winter Puffer Jacket", description: "Warm puffer jacket with water-resistant exterior and cozy fleece lining", price: 149.99, image: "https://i.pinimg.com/1200x/49/e7/72/49e7729ae43b5d11e2486dd6477b7a38.jpg", category: "Clothing", stock: 25 },
  { name: "Casual Sneakers", description: "Comfortable everyday sneakers with cushioned sole and breathable mesh upper", price: 79.99, image: "https://i.pinimg.com/1200x/71/09/68/710968389609e90b94acbd974953b0b4.jpg", category: "Clothing", stock: 50 },
  { name: "Travel Backpack", description: "40L travel backpack with laptop compartment and anti-theft features", price: 69.99, image: "https://i.pinimg.com/1200x/1c/b5/85/1cb585135667103d3f68133280db0c65.jpg", category: "Clothing", stock: 40 },
  { name: "Sunglasses Polarized", description: "Polarized sunglasses with UV400 protection and scratch-resistant lenses", price: 34.99, image: "https://i.pinimg.com/1200x/a5/c0/2b/a5c02be528d3e581b2f4fd9b2a6c1a75.jpg", category: "Clothing", stock: 80 },
  { name: "Running Shoes", description: "Lightweight running shoes with responsive cushioning and breathable mesh", price: 119.99, image: "https://i.pinimg.com/736x/61/69/f0/6169f0b803d2be0c21150bf67394b460.jpg", category: "Clothing", stock: 45 },
  { name: "Wool Scarf", description: "Soft merino wool scarf in classic pattern, perfect for winter warmth", price: 29.99, image: "https://i.pinimg.com/736x/17/24/bc/1724bcf4125220d3eb258c70a0d5664b.jpg", category: "Clothing", stock: 60 },
  { name: "Baseball Cap", description: "Adjustable cotton cap with embroidered logo and breathable design", price: 19.99, image: "https://i.pinimg.com/736x/f6/d0/39/f6d0393a709c7c3f18fe29a20c02d8af.jpg", category: "Clothing", stock: 75 },
  { name: "Leather Belt", description: "Genuine leather belt with classic buckle, durable and stylish", price: 34.99, image: "https://i.pinimg.com/736x/43/6d/60/436d6099785a3c05f01c2dc85e7e0381.jpg", category: "Clothing", stock: 55 },


  // Home & Garden (20) - Each with unique image
  { name: "Indoor Plant Set", description: "Collection of 5 easy-care indoor plants in decorative pots", price: 49.99, image: "https://i.pinimg.com/736x/15/8e/08/158e084287a1371452b9c2b4309655cb.jpg", category: "Home & Garden", stock: 40 },
  { name: "Coffee Maker Deluxe", description: "Programmable coffee maker with thermal carafe and brew strength control", price: 79.99, image: "https://i.pinimg.com/736x/9f/38/66/9f386670dbb45834009a6292a42437ab.jpg", category: "Home & Garden", stock: 20 },
  { name: "Ceramic Plant Pot Set", description: "Set of 3 decorative ceramic pots with drainage holes and saucers", price: 32.99, image: "https://i.pinimg.com/736x/03/43/8e/03438e23c5e074466a34d8c497d2d6ed.jpg", category: "Home & Garden", stock: 45 },
  { name: "Kitchen Knife Set", description: "8-piece professional knife set with wooden block and sharpener", price: 89.99, image: "https://i.pinimg.com/736x/cc/33/9c/cc339c7c8acdbf184a65eb1ae3127ad8.jpg", category: "Home & Garden", stock: 30 },
  { name: "Vintage Desk Lamp", description: "Adjustable LED desk lamp with touch control and USB charging port", price: 44.99, image: "https://i.pinimg.com/736x/ee/4e/c7/ee4ec7118fa21b816f0e59176af25751.jpg", category: "Home & Garden", stock: 35 },
  { name: "Organic Green Tea Set", description: "Premium organic green tea collection with 50 biodegradable bags", price: 29.99, image: "https://i.pinimg.com/736x/f0/6f/fb/f06ffbd6212a58155382d76df631f0d8.jpg", category: "Home & Garden", stock: 70 },
  { name: "Standing Desk Mat", description: "Anti-fatigue standing desk mat with non-slip surface", price: 39.99, image: "https://i.pinimg.com/736x/19/ed/e7/19ede7b5e859cc4e75c519e1aeacf960.jpg", category: "Home & Garden", stock: 45 },
  { name: "Succulent Plant Set", description: "6 low-maintenance succulents in geometric planters", price: 27.99, image: "https://i.pinimg.com/736x/71/02/27/710227b32e5ef84b91a8057c7509b3ce.jpg", category: "Home & Garden", stock: 55 },
  { name: "Cast Iron Skillet", description: "Pre-seasoned 12-inch cast iron skillet, oven-safe and durable", price: 34.99, image: "https://i.pinimg.com/736x/46/8c/6a/468c6ae1b2ddd338f154d6e6b2834f88.jpg", category: "Home & Garden", stock: 40 },
 

  // Sports (20) - Each with unique image
  { name: "Yoga Mat Pro", description: "Premium non-slip yoga mat with alignment lines and carrying strap", price: 34.99, image: "https://i.pinimg.com/736x/81/ae/2b/81ae2bb3ffe3de40de80a4cc0acfbeb1.jpg", category: "Sports", stock: 60 },
  { name: "Stainless Steel Water Bottle", description: "32oz insulated water bottle, keeps drinks cold for 24 hours", price: 24.99, image: "https://i.pinimg.com/736x/a6/a2/ca/a6a2ca289fb54132ff5125a152de932e.jpg", category: "Sports", stock: 80 },
  { name: "Fitness Resistance Bands", description: "Set of 5 resistance bands with different tension levels", price: 19.99, image: "https://i.pinimg.com/736x/7b/82/f0/7b82f045cb5b3be6b6d7f46a1c061b71.jpg", category: "Sports", stock: 100 },
  { name: "Yoga Towel", description: "Quick-dry microfiber yoga towel with corner pockets", price: 24.99, image: "https://i.pinimg.com/1200x/be/9b/16/be9b163491fc9f7181cc58236358ca4c.jpg", category: "Sports", stock: 65 },
  { name: "Dumbbell Set", description: "Adjustable dumbbell set from 5 to 52.5 lbs with space-saving design", price: 149.99, image: "https://i.pinimg.com/736x/f6/53/63/f653635881f28aa9fd53a8928a19d481.jpg", category: "Sports", stock: 25 },
  { name: "Jump Rope Speed", description: "Professional speed jump rope with ball bearings and adjustable length", price: 14.99, image: "https://i.pinimg.com/1200x/84/c6/e8/84c6e8bb1ea99d79db4864afe78542a8.jpg", category: "Sports", stock: 75 },
  { name: "Foam Roller", description: "High-density foam roller for muscle recovery and myofascial release", price: 29.99, image: "https://i.pinimg.com/736x/51/0d/68/510d68218f548490667e5b1f9d11337a.jpg", category: "Sports", stock: 50 },
  { name: "Gym Bag", description: "Durable gym bag with shoe compartment and wet pocket", price: 39.99, image: "https://i.pinimg.com/1200x/be/6d/e4/be6de41b4e6cb53fbd804ca8bab933cc.jpg", category: "Sports", stock: 45 },
  { name: "Tennis Racket", description: "Professional tennis racket with carbon fiber frame and vibration dampening", price: 89.99, image: "https://i.pinimg.com/1200x/d1/d8/2a/d1d82a04f72443daac29a57af8ce7ceb.jpg", category: "Sports", stock: 30 },
  { name: "Basketball", description: "Official size basketball with superior grip and durability", price: 29.99, image: "https://i.pinimg.com/1200x/9a/3b/a8/9a3ba8436309069647f651d6c67c8a28.jpg", category: "Sports", stock: 40 },
 

  // Books (20) - Each with unique image
  { name: "Programming Cookbook", description: "Modern programming guide with 200+ practical recipes", price: 44.99, image: "https://i.pinimg.com/736x/5a/f6/dd/5af6dd24331b7aeb8b9fbc9820cdfa56.jpg", category: "Books", stock: 35 },
  { name: "Bestselling Novel Collection", description: "5 bestselling novels by award-winning authors", price: 59.99, image: "https://i.pinimg.com/1200x/c9/13/3c/c9133c681d0f2f99b09ffdf6117ee367.jpg", category: "Books", stock: 50 },
  { name: "Cookbook Collection", description: "Essential recipes cookbook with 500 family favorites", price: 49.99, image: "https://i.pinimg.com/736x/c0/84/1f/c0841fc1022e9255710701e938fcf5a7.jpg", category: "Books", stock: 30 },
  { name: "Self Help Book", description: "Personal development book for achieving your goals", price: 19.99, image: "https://i.pinimg.com/1200x/f0/dc/1f/f0dc1fa17f15ef973c5a72433f44e1e3.jpg", category: "Books", stock: 65 },
  { name: "History Encyclopedia", description: "Comprehensive world history encyclopedia with illustrations", price: 69.99, image: "https://i.pinimg.com/736x/44/31/19/44311977c30af15a8fe0b879f723f38b.jpg", category: "Books", stock: 25 },
  { name: "Science Fiction Box Set", description: "Classic sci-fi novels collection in deluxe edition", price: 54.99, image: "https://i.pinimg.com/736x/05/21/53/052153b04545b67d13f9cb880f875f02.jpg", category: "Books", stock: 40 },
  { name: "Business Strategy Guide", description: "Business strategy book for modern entrepreneurs", price: 34.99, image: "https://i.pinimg.com/736x/e3/da/20/e3da209133533223f53922ce484a0d5d.jpg", category: "Books", stock: 45 },
  { name: "Art Painting Book", description: "Learn to paint guide with step-by-step tutorials", price: 29.99, image: "https://i.pinimg.com/webp/1200x/a4/78/c2/a478c2de0efde626ded259b05a75c42a.webp", category: "Books", stock: 35 },
  { name: "Travel Photography Book", description: "Travel photography book with tips from professionals", price: 39.99, image: "https://i.pinimg.com/webp/736x/14/69/29/146929939f4c1eaf060f76acaa6e57db.webp", category: "Books", stock: 30 },
  { name: "Gardening Handbook", description: "Complete home gardening guide for beginners", price: 24.99, image: "https://i.pinimg.com/1200x/f4/09/1b/f4091ba4f8e4d1a5f4c5550f444d626f.jpg", category: "Books", stock: 40 },
  
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/zuvomart")
    console.log("✅ Connected to MongoDB")

    const adminExists = await User.findOne({ email: "admin@zuvomart.com" })
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 12)
      await User.create({ name: "Admin", email: "admin@zuvomart.com", password: hashedPassword, role: "admin" })
      console.log("✅ Admin created (admin@zuvomart.com / admin123)")
    }

    await Product.deleteMany({})
    await Product.insertMany(products)
    console.log(`✅ ${products.length} products inserted`)

    console.log("🎉 Seed completed!")
    process.exit()
  } catch (error) {
    console.error("❌ Seed Error:", error)
    process.exit(1)
  }
}

seed()
