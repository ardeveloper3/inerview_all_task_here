import { createClient } from "redis";

let client;

const initRedisClient = async () => {
  if (!client) {
    client = createClient();
    client.on("error", () => console.log("Error creating Redis client"));
  }
  try {
    await client.connect();
  } catch (error) {
    console.log("Error occurred while initializing Redis");
    throw error;
  }
};

const getvalue = async (key) => {
  try {
    const value = await client.json.get(`user:${key}`);
    return value;
  } catch (error) {
    console.log("Error occurred while getting value for key:", key);
    throw error;
  }
};

const setvalue = async (key, value) => {
  try {
    const data = await client.json.set(`user:${key}`, "$", value);
    return data;
  } catch (error) {
    console.log("Error occurred while setting value for key:", key);
    throw error;
  }
};

export { initRedisClient, getvalue, setvalue };
