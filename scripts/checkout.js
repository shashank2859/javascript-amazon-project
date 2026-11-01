import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderpaymentsummary } from "./checkout/paymentsummary.js";
// import '../data/cart-class.js';
// import '../data/backend-practise.js';
import { loadcart } from "../data/cart.js";
import { loadproducts } from "../data/products.js";

Promise.all([
    new Promise((resolve) => {
        loadproducts(() => {
            resolve('value1');
    })
    }),
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

