var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

mongoose.connect("mongodb://127.0.0.1:27017/user",{
}).then(() => {
    console.log('connection  successfull');
}).catch((e) => {
console.log(e.message);
});