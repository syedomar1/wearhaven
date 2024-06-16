const https = require("https");
const PaytmChecksum = require('paytmchecksum');
import Order from "../../models/Order";
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import pincodes from  "../../pincodes.json"

const handler = async (req, res) => {
  if (req.method == "POST") {
    // console.log(req.body)
    // Check if the pincode is serviceable 
    if(!Object.keys(pincodes).includes(req.body.pincode)){
      res.status(200).json({success:false, "error": "We do not deliver to your location yet. Please check out soon!", cartClear: false})
      return
    }

    // Check if the cart is tampered
    let product, sumTotal = 0;
    let cart = req.body.cart;
    if(req.body.subTotal <= 0){
      res.status(200).json({success:false, "error": "Cart Empty! Please build your cart and Try Again!", cartClear: false})
      return
    }
    for(let item in cart){
      // console.log(item);
      sumTotal += cart[item].price * cart[item].qty;
      product = await Product.findOne({slug: item})
      // Check if the cart items are out of stock
      if(product.availableQty < cart[item].qty){
        res.status(200).json({success:false, "error": "Some items in your cart went out of stock. Please try again in some time", cartClear: true})
        return
      }
      if(product.price != cart[item].price){
        res.status(200).json({success:false, "error": "The price of some items in your cart have changed. Please try again", cartClear: true})
        return
      }
    }
    if(sumTotal !== req.body.subTotal){
      res.status(200).json({success:false, "error": "The price of some items in your cart have changed. Please try again", cartClear: true})
      return
    }
    

    // Check is the details are valid
    // console.log(typeof req.body.phone)
    if(req.body.phone.length !==10 || !Number.isInteger(Number(req.body.phone))){
      res.status(200).json({success:false, "error": "Please Enter your 10-Digit Phone Number", cartClear: false})
      return
    }
    if(req.body.pincode.length !==6 || !Number.isInteger(Number(req.body.pincode))){
      res.status(200).json({success:false, "error": "Please Enter your 6-Digit Pincode", cartClear: false})
      return
    }

    // Initiate an order corresponding ot the order id
    let order = new Order({
      name: req.body.name,
      email: req.body.email,
      orderId: req.body.oid,
      address: req.body.address,
      phone: req.body.phone,
      city: req.body.city, 
      state: req.body.state, 
      pincode: req.body.pincode,
      amount: req.body.subTotal,
      products: req.body.cart
    });
    await order.save();

    var paytmParams = {};

    paytmParams.body = {
      requestType: "Payment",
      mid: process.env.NEXT_PUBLIC_PAYTM_MID,
      websiteName: "YOUR_WEBSITE_NAME",
      orderId: req.body.oid,
      callbackUrl: `/api/posttransaction`,
      txnAmount: {
        value: req.body.subTotal,
        currency: "INR",
      },
      userInfo: {
        custId: req.body.email,
      },
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MKEY)
      .then
      paytmParams.head = {
        signature: checksum,
      };

      var post_data = JSON.stringify(paytmParams);
      const requestAsync = async() =>{
        return new Promise((resolve, reject)=>{
            var options = {
                /* for Staging */
                // hostname: "securegw-stage.paytm.in",
                /* for Production */
                hostname: 'securegw.paytm.in',
        
                port: 443,
                path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Content-Length": post_data.length,
                },
              };
        
              var response = "";
              var post_req = https.request(options, function (post_res) {
                post_res.on("data", function (chunk) {
                  response += chunk;
                });
        
                post_res.on("end", function () {
                //   console.log("Response: ", response);
                  let ress = JSON.parse(response).body
                  ress.success = true;
                  ress.cartClear = false
                  resolve(ress)
                });
              });
        
              post_req.write(post_data);
              post_req.end();
        })
      }
      let myr = await requestAsync()
      res.status(200).json(myr)
  }
}

export default connectDb(handler);