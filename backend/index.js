import express from 'express';
import rootRouter from "./routes/index.js";

const app = express();
app.use(express.json());
import { connectDb } from './db.js'

connectDb();

app.use("/api/v1", rootRouter);


app.get('/', (req, res) => {
    res.send("Hello");
})


app.listen(3000);