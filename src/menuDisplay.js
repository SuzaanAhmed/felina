/*
ABSOLUTELY POINTLESS NOT NEEDED YOU DUMB MORON
*/


import { MENU_ITEMS, totalBill, mainDishCount, sideDishCount } from './constants.js';

export function menuDisplay(user_input) {
    console.log("\nMenu Items:");
    MENU_ITEMS.forEach((item, index) => {
        console.log(`${index + 1}: ${item.name} - $${item.price} (${item.category})`);
    });

    console.log("\nEnter the number of the item you want to add to your order, or type 'finalize' to complete the order.");
    
    user_input.question("Select an item: ", (selection) => {
        if (selection.toLowerCase() === 'finalize') {
            finalizeOrder(user_input);
        } else {
            let itemIndex = parseInt(selection) - 1;
            if (itemIndex >= 0 && itemIndex < MENU_ITEMS.length) {
                addItemToOrder(MENU_ITEMS[itemIndex]);
                menuDisplay(user_input);  // Recursively display menu until 'finalize'
            } else {
                console.log("Invalid selection, please try again.");
                menuDisplay(user_input);  // Recursively prompt for a valid selection
            }
        }
    });
}

function addItemToOrder(item) {
    totalBill += item.price;
    if (item.category === 'Main Course') {
        mainDishCount++;
    } else if (item.category === 'Side') {
        sideDishCount++;
    }
    console.log(`${item.name} added to your order.`);
}

function finalizeOrder(user_input) {
    console.log("\nOrder Summary:");
    console.log(`Main Dishes: ${mainDishCount}`);
    console.log(`Side Dishes: ${sideDishCount}`);
    console.log(`Total Bill: $${totalBill.toFixed(2)}`);
    
    console.log("\nWould you like to finalize the payment? (yes/no)");
    user_input.question("Enter your choice: ", (choice) => {
        if (choice.toLowerCase() === 'yes') {
            console.log("Payment confirmed. Thank you for your order!");
            return;  // Exit the order process
        } else {
            console.log("Returning to menu...");
            menuDisplay(user_input);  // Go back to the menu if the user doesn't finalize
        }
    });
}
