import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

// Health check
app.get("/", (req, res) => {
  res.json({
    message:
      "Hello from Backend. The Backend is running correctly with nodemon",
  });
});

app.get("/users", (req, res) => {
  res.json(users);
});

// Example REST endpoints
let items = [
  { id: 1, name: "apple" },
  { id: 2, name: "banana" },
];

// READ all
app.get("/api/items", (req, res) => {
  res.json(items);
});

// READ one
app.get("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = items.find((x) => x.id === id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

// CREATE
app.post("/api/items", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });

  const newItem = { id: Date.now(), name };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
