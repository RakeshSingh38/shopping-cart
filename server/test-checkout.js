import axios from "axios";

async function testCheckoutEndpoint() {
    try {
        // Sample cart data
        const cartData = {
            items: [
                { id: 1, quantity: 2 },
                { id: 3, quantity: 1 },
                { id: 4, quantity: 3 },
            ],
        };

        console.log("Sending checkout request with data:", cartData);

        const response = await axios.post(
            "http://localhost:5000/api/checkout",
            cartData
        );

        console.log("\nCheckout endpoint test passed!");
        console.log("Response:", response.data);
        console.log(
            "\nCheck your backend server console to see the logged order."
        );
    } catch (error) {
        console.error("Test failed : ", error.message);
    }
}

testCheckoutEndpoint();
