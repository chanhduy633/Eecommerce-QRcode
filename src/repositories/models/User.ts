import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, default: "" },
    city: { type: String, default: "" },
    district: { type: String, default: "" },
    ward: { type: String, default: "" },
  },
  { _id: false } // không cần id riêng cho address
);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: addressSchema,
      default: null, // ✅ Cho phép bỏ qua hoàn toàn
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
