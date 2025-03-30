import {createSessionClient} from "@/lib/appwrite";

export const getCurrentUser = async () => {
  try {
    const {account} = await createSessionClient();
    const user = await account.get();

    return {id: user.$id, name: user.name, email: user.email};
  } catch (error) {
    console.error(error);
    return null;
  }
};
