function Cart(localstoragekey) {
    const cart ={

        cartitems:undefined,

        loadfromstorage:function(){
            this.cartitems = JSON. parse
                (localStorage.getItem(localstoragekey));

                if (!this.cartitems) {

                    this.cartitems = [{
                    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryoptionId: '1'
                    }, {
                    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryoptionId: '2'
                    }]}
        },
        saveToStorage:function(){
            localStorage.setItem(localstoragekey, JSON.stringify(this.cartitems));

        },
        addtocart(productId){
            let matchingitem;

                this.cartitems.forEach((cartitem)=>{
                    if(productId===cartitem.productId){
                    matchingitem=cartitem;

                }}
                );

                if(matchingitem){
                matchingitem.quantity += 1;
                }

                else{
                this.cartitems.push({
                    productId:productId,
                    quantity:1,
                    deliveryoptionId: '1'
                }); }
                this.saveToStorage() ;
        },
        removefromcart(productId){
        const newcart=[];
            this.cartitems.forEach((cartitem)=>{
                if(cartitem.productId !== productId){
                newcart.push(cartitem);
                }
            });
            this.cartitems=newcart;
            this.saveToStorage() ;
        },
        updateDeliveryOption(productId, deliveryoptionId) {
        let matchingitem;

        this.cartitems.forEach((cartitem) => {
            if (productId === cartitem.productId) {
            matchingitem = cartitem;
            }
        });

        matchingitem.deliveryoptionId = deliveryoptionId;
        this.saveToStorage();
        }
        }

        return cart;
}

const cart=Cart('cart-oop');
const businesscart=Cart('cart-busniess');



cart.loadfromstorage();
businesscart.loadfromstorage();

console.log(cart);
console.log(businesscart);



