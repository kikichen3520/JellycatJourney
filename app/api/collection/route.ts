import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as typeof session.user & { id: string }).id;

  const collection = await prisma.userCollection.findMany({
    where: { userId },
    include: { sku: true },
    orderBy: { dateAcquired: "desc" },
  });

  return NextResponse.json(collection);
}

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

    const newItem = await prisma.userCollection.create({
        data: {
            userId,
            skuId: data.skuId,
            dateAcquired: data.dateAcquired ?? new Date().toISOString(),
            isWishlist: data.isWishlist ?? false,
        },
    });

    return NextResponse.json(newItem);
}

export async function PATCH(request: Request) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as typeof session.user & { id: string }).id;
    const { id, isWishlist, quantity } = await request.json();

    if (!id || typeof id !== "string") {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const updated = await prisma.userCollection.update({
        where: { id, userId },
        data: { isWishlist, quantity },
    });

    return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as typeof session.user & { id: string }).id;
    const { id } = await request.json();

    if (!id || typeof id !== "string") {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    await prisma.userCollection.delete({
        where: { id, userId },
    });

    return NextResponse.json({ success: true });
}