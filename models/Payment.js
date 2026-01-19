//Role: The "Blueprint" for a receipt. It defines exactly what information a payment must have.

import mongoose from "mongoose";

const {Schema,model} = mongoose;

const PaymentSchema = new Schema ({
    name: {type: String, required: true},
    to_user: {type: String, required: true},
    oid: {type: String, required: true},
    message: {type: String},
    amount: {type: Number, required: true},
    createdAt: {type: Date, default:Date.now},
    updatedAt: {type: Date, default:Date.now},

    // CRITICAL FIELD: This tracks if the payment actually succeeded. 
    // Starts as 'false' (pending), becomes 'true' only after verification.
    Done: {type: Boolean, default:false}
})

// Export the model. If it already exists, use that; otherwise create a new one.
export default mongoose.models.Payment || model("Payment",PaymentSchema);