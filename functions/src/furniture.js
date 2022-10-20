import dbConnect from "./dbConnect.js";
import { ObjectId } from "mongodb";

export async function getAllFurniture(req, res) {
  // connect to the db
  const db = dbConnect();
  // get the whole furniture collection
  const collection = await db.collection("furniture").find().toArray()
  // catch any errors -> status 500
    .catch(err => {
      res.status(500).send(err);
      return;
    });
  // send back the array of furniture
  res.set("Cache-Control", "public, max-age=300, s-maxage=600")
  res.send(collection);
}

export async function addNewFurniture(req, res) {
  // get new furniture from the body of the request
  const { brand, model, type, price } = req.body
  const newFurniture = { brand, model, type, price: Number(price) }
  // connect to db
  const db = dbConnect()
  // put this new furniture into our furniture collection in db
  await db.collection("furniture").insertOne(newFurniture)
  // catch any errors -> status 500
    .catch(err => {
      res.status(500).send(err)
      return
    })
  // return a response -> status 201
  res.status(201).send({ message: "Furniture added"})
}

export async function updateFurniture(req, res) {
  const { furnitureId } = req.params
  const db = dbConnect()
  await db.collection("furniture")
    .updateOne({ _id: new ObjectId(furnitureId) }, { $set: req.body })
    .catch(err => {
      res.status(500).send(err)
      return
    })
  res.status(202).send({ message: "Item updated" })
}


