import { Router } from "express";
import { BookCollection } from "./collection";

const bookRouter = Router();
const bookcollection = new BookCollection();

bookRouter.post("/create",bookcollection.Create);
bookRouter.get("/get-all",bookcollection.GetAll);
bookRouter.get("/:id",bookcollection.GetById);
bookRouter.delete("/delete/:id",bookcollection.Delete);
bookRouter.put("/update/:id",bookcollection.Update);

export default bookRouter;