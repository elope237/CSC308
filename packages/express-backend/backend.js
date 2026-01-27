// backend.js

import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001; //3001

app.use(cors());
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

const generateId = () => Math.random().toString(36).substring(2, 9);

// Check if the server is running with message
app.get("/", (req, res) => {
  res.json({
    message:
      "Hello from Backend. The Backend is running correctly with nodemon",
  });
});

// Find users by name
const findUserByName = (name) => {
  return users.users_list.filter((user) => user.name === name);
};

// Find user by ID
const findUserById = (id) => {
  return users.users_list.find((user) => user.id === id);
};

// Add a new user
const addUser = (user) => {
  users.users_list.push(user);
  return user;
};

// Delete a user by ID (hard delete)
const deleteUserById = (id) => {
  const index = users.users_list.findIndex((user) => user.id === id);
  if (index === -1) return false;

  users.users_list.splice(index, 1);
  return true;
};

// Get all users or filter by name
app.get("/users", (req, res) => {
  const { name, job } = req.query;

  // No filters: return all users
  if (name === undefined && job === undefined) {
    return res.json(users);
  }

  // Apply whichever filters were provided
  const result = users.users_list.filter((user) => {
    const matchName = name === undefined || user.name === name;
    const matchJob = job === undefined || user.job === job;
    return matchName && matchJob;
  });

  return res.json({ users_list: result });
});

// Get user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const result = findUserById(id);

  if (result === undefined) {
    return res.status(404).send("Resource not found.");
  }

  return res.json(result);
});

// DELETE user by ID
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const deleted = deleteUserById(id);

  if (!deleted) {
    return res.status(404).send("Resource not found.");
  }

  return res.sendStatus(200);
});

// Add a new user
app.post("/users", (req, res) => {
  const userToAdd = {
    id: generateId(),
    name: req.body.name,
    job: req.body.job,
  };

  addUser(userToAdd);
  res.status(201).json(userToAdd);
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
