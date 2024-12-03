import { MENU_ITEMS } from './constants.js'; 
import readline from 'readline';
import { menuDisplay } from './menuDisplay.js'; 

const user_input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function userInterface() {
    console.log("\n1: Display Menu ");
    console.log("2: View Payment requests");
    console.log("3: Make payment");
    console.log("4: Check Transaction history");
    console.log("5: Undo transactions");
    console.log("6: Prioritize payment queue");
    console.log("7: Exit");

    user_input.question("Enter selection: ", (selection) => {
        switch (parseInt(selection)) {
            case 1:
                menuDisplay(); // Call menuDisplay to show the menu
                break;
            case 2:
                console.log("Viewing payment requests...");
                // Add functionality here
                break;
            case 3:
                console.log("Making payment...");
                // Add functionality here
                break;
            case 4:
                console.log("Checking transaction history...");
                // Add functionality here
                break;
            case 5:
                console.log("Undoing transactions...");
                // Add functionality here
                break;
            case 6:
                console.log("Prioritizing payment queue...");
                // Add functionality here
                break;
            case 7:
                console.log("Exiting...");
                user_input.close(); // Exit the program
                return; // Exit the userInterface function to stop recursion
            default:
                console.log("Invalid selection. Please try again.");
                break;
        }
        
        // Call userInterface again to prompt the user for the next action
        userInterface();
    });
}

userInterface();
