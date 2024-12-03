import express from 'express';
import cron from 'node-cron';

let totalBill = 0;
let mainDishCount = 0;
let sideDishCount = 0;
let dessertCount = 0;
let beverageCount = 0;

let MENU_ITEMS = [];
let orders = [];

const app = express();
const port = 3001;

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
    const { itemIndex } = req.body;

    if (itemIndex < 1 || itemIndex > MENU_ITEMS.length) {
        return res.status(400).json({ error: 'Invalid item index' });
    }

    let item = MENU_ITEMS[itemIndex - 1];
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

    let order = {
        id: orders.length + 1,
        items: [item],
        status: 'Preparing',  // Initial status
        totalBill,
        mainDishCount,
        sideDishCount,
        dessertCount,
        beverageCount
    };

    orders.push(order);

    res.json({
        message: `${item.name} added to your order.`,
        totalBill,
        mainDishCount,
        sideDishCount,
        dessertCount,
        beverageCount,
        orderId: order.id
    });

    // Change status after 1 minute (60000ms) to "Out for Delivery"
    setTimeout(() => {
        order.status = 'Out for Delivery';
        console.log(`Order ${order.id} status changed to Out for Delivery.`);
        
        // Change status after another minute (60000ms) to "Delivered"
        setTimeout(() => {
            order.status = 'Delivered';
            console.log(`Order ${order.id} status changed to Delivered.`);
        }, 60000);
        
    }, 60000);
});

app.post('/finalize', (req, res) => {
    res.json({
        message: 'Order finalized',
        totalBill,
        mainDishCount,
        sideDishCount,
        dessertCount,
        beverageCount,
        totalBill: totalBill.toFixed(2)
    });
});

app.post('/reset', (req, res) => {
    totalBill = 0;
    mainDishCount = 0;
    sideDishCount = 0;
    dessertCount = 0;
    beverageCount = 0;
    orders = [];
    res.json({ message: 'Order reset' });
});

app.get('/orders', (req, res) => {
    const formattedOrders = orders.map(order => ({
        id: order.id,
        items: order.items,
        status: order.status || 'Preparing', 
        totalBill: order.totalBill.toFixed(2), 
        mainDishCount: order.mainDishCount,
        sideDishCount: order.sideDishCount,
        dessertCount: order.dessertCount,
        beverageCount: order.beverageCount
    }));

    res.json(formattedOrders);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
