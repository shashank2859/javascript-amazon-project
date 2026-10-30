export class Cart{
     cartitems;
    localstoragekey;

    constructor(localstoragekey){
        this.localstoragekey=localstoragekey;
         this.loadfromstorage();
    }


     loadfromstorage=function(){
            this.cartitems = JSON. parse
                (localStorage.getItem(this.localstoragekey));

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
        }
        saveToStorage=function(){
            localStorage.setItem(this.localstoragekey, JSON.stringify(this.cartitems));

        }
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
        }
        removefromcart(productId){
        const newcart=[];
            this.cartitems.forEach((cartitem)=>{
                if(cartitem.productId !== productId){
                newcart.push(cartitem);
                }
            });
            this.cartitems=newcart;
            this.saveToStorage() ;
        }
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


const cart= new Cart('cart-oop');
const businesscart= new Cart('cart-business');



console.log(cart);
console.log(businesscart);



