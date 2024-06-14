import Order from "../../models/Order";
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import PaytmChecksum from "paytmchecksum";

const handler = async (req, res) => {
  let order;
  // Validate paytm checksum
  var paytmChecksum = "";
  var paytmParams = {};
  const received_data = req.body;
  for (var key in received_data) {
    if (key == "CHECKSUMHASH") {
      paytmChecksum = received_data[key];
    } else {
      paytmParams[key] = received_data[key];
    }
  }

  var isValidChecksum = PaytmChecksum.verifySignature(
    paytmParams,
    process.env.PAYTM_MKEY,
    paytmChecksum
  );
  if (!isValidChecksum) {
    res.status(500).send("Some Error Occured");
    return;
  }
  // Update the order status into order table after checking transaction status
  if (req.body.STATUS == "TXN_SUCCESS") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Paid", paymentInfo: JSON.stringify(req.body) }
    );
    let products = order.products;
    for (let slug in products) {
      // console.log(products[slug].qty)
      await Product.findOneAndUpdate(
        { slug: slug },
        { $inc: { availableQty: -products[slug].qty } }
      );
      // await products.save()
    }
  } else if (req.body.STATUS == "PENDING") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Pending", paymentInfo: JSON.stringify(req.body) }
    );
  }
  // Initiate shipping
  // Redirect user to order confirmation page
  res.redirect("/order?clearCart=1&id=" + order._id, 200);
  // res.status(200).json({ body: req.body });
};

export default connectDb(handler);
