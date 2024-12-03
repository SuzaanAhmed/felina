import express from 'express';

let totalBill = 0;
let mainDishCount = 0;
let sideDishCount = 0;
let dessertCount = 0;
let beverageCount = 0;
//have initialised here itself instead of importing because javascriipt is possessed

let MENU_ITEMS = [];  
//forgot requiremnt to post menu so declared in file and imported but changed it now

const app = express();
const port = 3001;//Note to self check why 3000 not available

app.use(express.json());

app.post('/menu', (req, res) => {

    MENU_ITEMS = req.body;

    if (!Array.isArray(MENU_ITEMS) || MENU_ITEMS.length === 0) {
        return res.status(400).json({ error: 'Invalid menu items' });
    }

    res.json({
        message: 'Menu updated successfully',
        MENU_ITEMS
    });
});

app.get('/menu', (req, res) => {
    res.json(MENU_ITEMS);
});

app.post('/order', (req, res) => {
    let { itemIndex } = req.body; 

    if (itemIndex < 1 || itemIndex > MENU_ITEMS.length) {
        return res.status(400).json({ error: 'Invalid item index' });
    }

    let item = MENU_ITEMS[itemIndex - 1]; // Adjust for 1-based index
    totalBill += item.price;

    if (item.category === 'Main Course') {
        mainDishCount++;
    } else if (item.category === 'Side') {
        sideDishCount++;
    } else if (item.category === 'Beverage') {
        dessertCount++;
    } else if (item.category === 'Dessert') {
        beverageCount++;
    }

    res.json({
        message: `${item.name} added to your order.`,
        totalBill,
        mainDishCount,
        sideDishCount
    });
});



app.post('/finalize', (req, res) => {
    res.json({
        message: 'Order finalized',
        mainDishCount,
        sideDishCount,
        totalBill: totalBill.toFixed(2)
    });
});


app.post('/reset', (req, res) => {
    totalBill = 0;
    mainDishCount = 0;
    sideDishCount = 0;
    res.json({ message: 'Order reset' });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
