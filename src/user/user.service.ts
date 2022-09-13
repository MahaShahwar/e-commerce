import { Injectable, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { user } from "./user.model";
require("dotenv").config();

@Injectable()
export class userService{

    constructor(
        @InjectModel('user') private readonly userModel:Model<user>
    ){}
    
    //Adding into database
    async signUp(name:string, email:string,password:string){
        const checkEmail = await this.userModel.findOne({email:email})
        if(checkEmail){
            return 'Email already existed'
        }else{
            const newUser = await this.userModel.create({
                name,
                email,
                password,
            })
            return newUser
        }
    }

    //Login

    async getEntity(email:string){
        const getUser = await this.userModel.findOne({email:email})
        console.log(getUser)
        return getUser
      }

      @UseGuards(JwtAuthGuard)
      async getUsers():Promise<any>{
        const allUsers = await this.userModel.find().exec()
        return allUsers

      }
}