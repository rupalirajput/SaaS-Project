import Mongoose = require("mongoose");

interface IAccountModel extends Mongoose.Document {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}
export {IAccountModel};