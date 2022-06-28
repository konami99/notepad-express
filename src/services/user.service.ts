import { FilterQuery } from "mongoose";
import { omit } from "lodash";
import UserModel, { UserDocument, UserInput } from "../models/user.model";

export async function createUser({email, name}: UserInput) {
  try {
    const user = await UserModel.create({email, name});
    
    return user.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}