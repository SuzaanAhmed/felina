const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory storage for menu items (for simplicity)
let menu = [];
let menuItemId = 1;

// Add Menu Item endpoint
app.post('/menu', (req, res) => {
    const { name, price, category } = req.body;

    // Validation
    if (!name || !price || !category) {
        return res.status(400).json({ message: 'All fields are required: name, price, and category.' });
    }

    // Check if item exists (by name)
    const existingItem = menu.find(item => item.name.toLowerCase() === name.toLowerCase());
    if (existingItem) {
        // Update the existing item
        existingItem.price = price;
        existingItem.category = category;
        return res.status(200).json({
            message: 'Menu item updated successfully.',
            menuItem: existingItem
        });
    }

    // Add new menu item
    const newItem = { id: menuItemId++, name, price, category };
    menu.push(newItem);
    res.status(201).json({
        message: 'Menu item added successfully.',
        menuItem: newItem
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
