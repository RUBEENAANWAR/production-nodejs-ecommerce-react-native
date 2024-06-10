import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: {
          type: String,
          required: [true, "product name is require"],
        },
        description: {
            type: String,
            required: [true, "description name is require"],
          },
        price: {
          type: Number,
          required: [true, "product price is required"],
        },
        quantity: {
          type: Number,
          required: [true, "product quantity is required"],
        },
        image: {
          type: String,
          required: [true, "product image is required"],
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "user id is require"],
    },
    paidAt: Date,
    itemPrice: {
      type: Number,
      required: [true, "item price is require"],
    },
    shippingCharges: {
      type: Number,
      required: [true, "item shippingCharges  is require"],
    },
    totalAmount: {
      type: Number,
      required: [true, "item totalAmount price is require"],
    },
    orderStatus: {
      type: String,
      enum: ["Ordered", "shipped", "delivered"],
      default: "Ordered",
    },
    deliverdAt: Date,
  },
  { timestamps: true }
);

export const orderModel = mongoose.model("Orders", orderSchema);
export default orderModel;