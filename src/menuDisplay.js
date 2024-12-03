import { MENU_ITEMS } from './constants.js'; 

export function menuDisplay() {
    console.log("Menu Items:");
    MENU_ITEMS.forEach((item, index) => {
        console.log(`${index + 1}: ${item.name} - $${item.price} (${item.category})`);
    });
}
