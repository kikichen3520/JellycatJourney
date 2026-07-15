import { v2 as cloudinary } from "cloudinary";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as typeof session.user & { id: string }).id;
    const data = await request.json();

    if (!data.skuId || typeof data.skuId !== "string") {
        return NextResponse.json({ error: "Invalid skuId" }, { status: 400 });
    }

    if (!data.customImage || typeof data.customImage !== "string") {
        return NextResponse.json({ error: "Invalid customImage" }, { status: 400 });
    }

    // Upload the image to Cloudinary
    try {
        const uploadResult = await cloudinary.uploader.upload(data.customImage, {
            folder: "jellycat_custom_images",
            public_id: `${userId}_${data.skuId}`,
            overwrite: true,
        });

        // Update the custom image URL for the specified SKU in the user's collection
        const newItem = await prisma.userCollection.update({
            where: { userId_skuId: { userId, skuId: data.skuId } },
            data: {
                customImage: uploadResult.secure_url, // Store the secure URL of the uploaded image
            }
        });

        return NextResponse.json(newItem);
    } catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }
}