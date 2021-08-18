const mongoose = require('mongoose')
mongoose
    .connect("mongodb://localhost:27017/MyBagShop", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("connected to mongodb cloud! :)");
    })
    .catch((err) => {
        console.log(err);
    });

