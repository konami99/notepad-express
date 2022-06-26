import { FilterQuery } from "mongoose";
import { omit } from "lodash";
import UserModel, { UserDocument, UserInput } from "../models/user.model";

export async function createUser({email, name}: UserInput) {
  try {
    console.log(`input-----${email}`);
    console.log(`input-----${name}`);
    const user = await UserModel.create({email: email, name: name});
    
    return user.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}