export const orders = JSON.parse(localStorage.getItem('order'))||[];

export function addorders(order){
    orders.unshift(order);
    savetostorage()

}
function savetostorage(){
    localStorage.setItem('order',JSON.stringify((orders)));
}