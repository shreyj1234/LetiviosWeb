import { Client, Account, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("699f1972002bdbe493c7");

export const account = new Account(client);
export const databases = new Databases(client);
export { client };
