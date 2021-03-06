import Mongoose = require("mongoose");
Mongoose.set('useFindAndModify', false);

class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;
    //static DB_CONNECTION_STRING:string = 'mongodb://dbAdmin:test@localhost:27017/QuizAppSample?authSource=admin';
    static DB_CONNECTION_STRING:string = 'mongodb+srv://dbAdmin:test@cluster0-tofxk.azure.mongodb.net/QuizAppSample?retryWrites=true&w=majority';
    public mongoUrl: string = 'mongodb+srv://dbAdmin:test@cluster0-tofxk.azure.mongodb.net/QuizAppSample?retryWrites=true&w=majority';

    constructor () {
        DataAccess.connect();
    }
    private mongoSetup(): void{
        Mongoose.Promise = global.Promise;
        Mongoose.connect(this.mongoUrl);
    }

    static connect (): Mongoose.Connection {
        if(this.mongooseInstance) return this.mongooseInstance;

        this.mongooseConnection  = Mongoose.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });

        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }

}
DataAccess.connect();
export {DataAccess};
