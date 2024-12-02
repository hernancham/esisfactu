import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary/types";

export async function POST(request: Request) {
  const data = await request.formData();
  const image = data.get("file_image") as File;

  if (!image) {
    return NextResponse.json({ message: "No file" }, { status: 400 });
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // const filePath = path.join(process.cwd(), "public", "insumo", image.name);
  // await writeFile(filePath, buffer);

  const response: UploadApiResponse = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result);
        }
      })
      .end(buffer);
  });

  return NextResponse.json(
    {
      message: "Imagen Subida",
      url: response.secure_url,
    },
    { status: 200 }
  );
}
