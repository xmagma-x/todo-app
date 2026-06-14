import { model, Schema } from "mongoose";

const refreshTokenSchema = Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
});

const Token = model("Token", refreshTokenSchema);

export default Token;
