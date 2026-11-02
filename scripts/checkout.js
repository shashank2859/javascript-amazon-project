import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderpaymentsummary } from "./checkout/paymentsummary.js";
// import '../data/cart-class.js';
// import '../data/backend-practise.js';
import { loadcart } from "../data/cart.js";
import { loadproducts, loadproductsfetch } from "../data/products.js";

async function loadpage(){
 
    await loadproductsfetch();

    await new Promise((resolve) => {
        loadcart(()=> {
            resolve();
    })
    })
    renderOrderSummary();
    renderpaymentsummary();
}
loadpage();







/*
Promise.all([
    loadproductsfetch(),
    new Promise((resolve) => {
        loadcart(()=> {
            resolve();
    })
    })

    ]).then((values) => {
        console.log(values);
            renderOrderSummary();
            renderpaymentsummary();
})
*/

// new Promise((resolve)=>{
//    loadproducts(()=>{
//     resolve();
//    })
// }).then(()=>{
//     renderOrderSummary();
//     renderpaymentsummary();
// });





// loadproducts(()=>{
//     renderOrderSummary();
//     renderpaymentsummary();
// });

