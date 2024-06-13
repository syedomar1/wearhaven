import Order from "../../models/Order";
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  let order;
  // Validate paytm checksum
  // Update the order status into order table after checking transaction status
  if(req.body.STATUS == 'TXN_SUCCESS'){
    order = await Order.findOneAndUpdate({orderId: req.body.ORDERID},{status: "Paid", paymentInfo: JSON.stringify(req.body)})
    let products = order.products
    for(let slug in products){
      // console.log(products[slug].qty)
      await Product.findOneAndUpdate({slug:slug}, {$inc: {"availableQty": - products[slug].qty}})
      // await products.save()
    }
  }
  else if(req.body.STATUS == 'PENDING'){
    order = await Order.findOneAndUpdate({orderId: req.body.ORDERID},{status: "Pending", paymentInfo: JSON.stringify(req.body)})
  }
  // Initiate shipping
  // Redirect user to order confirmation page
  res.redirect('/order?id=&clearCart=1'+order._id, 200)
    // res.status(200).json({ body: req.body });
  }
  
export default connectDb(handler);
