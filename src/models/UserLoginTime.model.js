import { model, Schema } from "mongoose";

export const UserLoginTimeSchema = Schema({
   user_id_app: {
      type: Number,
      unique: true,
   },
   user_name_app: String,
   client_id_app: Number,
   ruc_app: String,
   client_name_app: String,
   logs: [
      {
         timeStart: Date,
         timeEnd: Date,
      },
   ],
});

export const UserLoginTime = model("UserLoginTime", UserLoginTimeSchema);
