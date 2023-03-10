const mongoose = require("mongoose");
const DB =
  "mongodb+srv://ashutosh:ashutoshnegi@cluster0.tsguvgj.mongodb.net/mernstack?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection starts"))
  .catch((error) => console.log(error.message));
