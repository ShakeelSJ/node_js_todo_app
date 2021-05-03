import express, { Request, Response, Router } from "express";
import { Todo } from "../models/user_model";

const router = express.Router();

// Post Request
router.post("/add", async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const dataItem = Todo.set({ title, description });
  await dataItem.save();
  return res.status(200).json({
    data: dataItem,
  });
});

// Get Request
router.get("/", async (req: Request, res: Response) => {
  try {
    const dataItem = await Todo.find({});
    res.status(200).json({
      data: dataItem,
    });
  } catch (error) {
    console.log(error);
  }
});
// Delete Request
router.delete("/delete", async (req: Request, res: Response) => {
  const filter = {
    title: req.body.title,
  };
  const dataItem = await Todo.deleteOne(filter)
    .then((data) => res.json({ data: data }))
    .catch((error) => {
      return res.send(error);
    });
});
// Update Request
router.put("/update", async (req: Request, res: Response) => {
    const filter = {
        title: req.body.title,
    };
    const updateData = {
        description: req.body.description,
    };

    const dataItem = await Todo.updateOne(filter, updateData,{
        new:true,
    })
        .then((data) => res.json({ data: data }))
        .catch((error) => {
            return res.send(error);
        });
});

export { router };
