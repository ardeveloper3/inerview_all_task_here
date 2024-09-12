import { create, deleteRecord, find, findById, update } from "../db/querie.js";
import { getvalue, setvalue } from "../redis.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await find();
    return res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occured" });
  }
}; //get

//get single product by id
//uses redis caches
export const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const value = await getvalue(id);
    if (value) {
      console.log("Value exists in redis Memory", value);
      return res.status(200).json({ product: value });
    }
    const product = await findById(id);
    //TODO CACHE THIS VALUE
    await setvalue(id, product[0]);

    return res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occured" });
  }
}; //get

//post request querie
export const creatProduct = async (req, res) => {
  const { title, description, price } = req.body;

  if (!title || !description || !price) {
    return res
      .status(403)
      .json({ message: "Input paramaters were not provided" });
  }

  try {
    const product = await create(title, description, price);
    return res.status(201).json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occured" });
  }
}; //post

export const updateProduct = async (req, res) => {
  const { title, description, price } = req.body;
  const id = req.params.id;

  if (!title || !description || !price) {
    return res
      .status(403)
      .json({ message: "Input paramaters were not provided" });
  }

  try {
    const product = await update(title, description, price, id);
    return res.status(201).json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occured" });
  }
}; //put

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await deleteRecord(id);
    return res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occured" });
  }
}; //delete
