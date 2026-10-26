const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.static("public"));

function readData() {
  return JSON.parse(fs.readFileSync("data.json", "utf8"));
}

function saveData(items) {
  fs.writeFileSync("data.json", JSON.stringify(items, null, 2));
}

// GET all items
app.get("/api/items", (req, res) => {
  res.status(200).json(readData());
});

// GET one item by ID
app.get("/api/items/:id", (req, res) => {
  const item = readData().find((i) => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.status(200).json(item);
});

// POST a new item
app.post("/api/items", (req, res) => {
  const { item_name, category, location_found, date_found } = req.body;

  if (!item_name || !category || !location_found || !date_found) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const items = readData();
  const id = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
  const newItem = { id, item_name, category, location_found, date_found, claimed: false };

  items.push(newItem);
  saveData(items);
  res.status(201).json(newItem);
});

// DELETE an item by ID
app.delete("/api/items/:id", (req, res) => {
  const items = readData();
  const index = items.findIndex((i) => i.id === Number(req.params.id));

  if (index === -1) return res.status(404).json({ error: "Item not found" });

  if (items[index].claimed) {
    return res.status(403).json({ error: "A claimed item cannot be deleted" });
  }

  const deleted = items.splice(index, 1)[0];
  saveData(items);
  res.status(200).json({ message: "Item deleted", item: deleted });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
