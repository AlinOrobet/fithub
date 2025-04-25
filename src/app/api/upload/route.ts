import {type NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

import {ID} from "node-appwrite";
import {createSessionClient} from "@/lib/appwrite";
import {APPWRITE_BUCKET_ID, APPWRITE_ENDPOINT, APPWRITE_PROJECT, AUTH_COOKIE} from "@/config";

export async function POST(request: NextRequest) {
  try {
    const cookieValues = await cookies();
    const session = cookieValues.get(AUTH_COOKIE);

    const {account, storage} = await createSessionClient();
    const user = await account.get();

    if (!session || !user.labels || !Array.isArray(user.labels) || !user.labels.includes("admin")) {
      return NextResponse.json({error: "Acces interzis."}, {status: 403});
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({error: "Nu a fost furnizat niciun fișier."}, {status: 400});
    }

    const uploadedFile = await storage.createFile(APPWRITE_BUCKET_ID, ID.unique(), file);

    const fileUrl = `${APPWRITE_ENDPOINT}/storage/buckets/${APPWRITE_BUCKET_ID}/files/${uploadedFile.$id}/view?project=${APPWRITE_PROJECT}`;

    return NextResponse.json({
      fileId: uploadedFile.$id,
      url: fileUrl,
      name: file.name,
      size: file.size,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      {error: error instanceof Error ? error.message : "Unknown error"},
      {status: 500}
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const cookieValues = await cookies();
    const session = cookieValues.get(AUTH_COOKIE);

    const {account, storage} = await createSessionClient();
    const user = await account.get();

    if (!session || !user.labels || !Array.isArray(user.labels) || !user.labels.includes("admin")) {
      return NextResponse.json({error: "Acces interzis."}, {status: 403});
    }

    const data = await request.json();

    const {id} = data;

    if (!id) {
      return NextResponse.json({error: "Nu a fost furnizat niciun id."}, {status: 404});
    }

    await storage.deleteFile(APPWRITE_BUCKET_ID, id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error deleting file:", error);

    return NextResponse.json(
      {error: error instanceof Error ? error.message : "Unknown error"},
      {status: 500}
    );
  }
}
