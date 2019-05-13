import Mongoose = require("mongoose");

interface IAccountModel extends Mongoose.Document {
    username: string;
    password: string;
    userid: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}
export {IAccountModel};