const mongoose = require('mongoose');
const ForgotSchema = new mongoose.Schema({
    // userid: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    token: {type: String, default: ''}
}, {timestamps:true});
// mongoose.models = {}
// export default mongoose.model("User", UserSchema);
export default mongoose.models.Forgot || mongoose.model("Forgot", ForgotSchema);
