const express = require('express')
const cors = require("cors")
const { connection } = require("./database/db")
const {userRouter} = require('./routes/user.route');
const {noteRouter} = require('./routes/note.route');

require('dotenv').config()

const app = express()
const PORT = process.env.port || 5000

app.use(express.json())
app.use(cors())

app.use("/user", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send({
    message: "api is working now"
  })
})


app.listen(PORT, async()=> {
    try {
      await connection
    }
    catch(error) {
      console.log(error);
    }
    console.log(`Listening on port: ${PORT}`);
});
