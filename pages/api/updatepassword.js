import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import jsonwebtoken from "jsonwebtoken"
import cryptoJs from "crypto-js"


const handler = async (req, res)=> {
    if(req.method == 'POST'){
        let token = req.body.token;
        let user = jsonwebtoken.verify(token,process.env.JWT_SECRET)
        // console.log(user)
        let dbuser = await User.findOne({email: user.email})
        const bytes = cryptoJs.AES.decrypt(dbuser.password, process.env.AES_SECRET)
        let decryptedPass = bytes.toString(cryptoJs.enc.Utf8); 
        // console.log(decryptedPass)
        if(decryptedPass == req.body.password && req.body.npassword == req.body.cpassword){
            let dbuseru = await User.findOneAndUpdate({email: dbuser.email}, {password: cryptoJs.AES.encrypt(req.body.cpassword, process.env.AES_SECRET).toString()})
            res.status(200).json({success: true});
            return;
        }
        // console.log(dbuser)
        res.status(400).json({success: false});
    }
    else{
        res.status(400).json({error: "user"});
    }
}

export default connectDb(handler)
  