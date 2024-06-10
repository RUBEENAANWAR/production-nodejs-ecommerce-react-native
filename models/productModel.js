import mongoose from "mongoose";

// PROCUCT MODAL
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required"],
    },
    description: {
      type: String,
      required: [true, "product description is required"],
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
    },
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    // },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

export const productModel = mongoose.model("Products", productSchema);
export default productModel;