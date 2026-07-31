import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  profileImage: {
    type: String,
    default:
      "https://imgs.search.brave.com/aX7CEgdsXcExaNXt5jLIa8--8k0utAjO33xcdugux44/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kcmVh/bXBmcC5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjYvMDUv/RGVmYXVsdC1QZnAt/Ym95LTIud2VicA",
  },
  cart: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    default: [],
  },
  order: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        status: {
          type: String,
          enum: ["pending", "shipped", "delivered"],
          default: "pending",
        },
      },
    ],
    default: [],
  },
});
const userData = mongoose.model("users", userSchema);
export default userData;
