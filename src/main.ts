import compression from "compression";
import express,{ Application, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors"
import bookRouter from "./book/route";

const app:Application = express();
const PORT = process.env.PORT || 1001;

app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
app.use(cors());

// routes
app.use("/book",bookRouter)

app.get("/",(_req:Request,res:Response)=>{
    res.send("Book Store Server is Running")
})

const start =()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}

start();
