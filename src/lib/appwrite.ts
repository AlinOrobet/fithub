import "server-only";
import {cookies} from "next/headers";
import {Client, Account, Users, Databases, Storage} from "node-appwrite";

import {APPWRITE_ENDPOINT, APPWRITE_PROJECT, AUTH_COOKIE} from "@/config";

export async function createSessionClient() {
  const client = new Client().setEndpoint(APPWRITE_ENDPOINT!).setProject(APPWRITE_PROJECT!);

  const cookieValues = await cookies();
  const session = cookieValues.get(AUTH_COOKIE);

  if (!session || !session.value) {
    throw new Error("Unauthorized");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get user() {
      return new Users(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
}

export async function createClient() {
  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT!)
    .setProject(APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get user() {
      return new Users(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
}
