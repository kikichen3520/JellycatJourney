import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as typeof session.user & { id: string }).id;
    const search = request.nextUrl.searchParams.get("search")?.trim() ?? "";

    const owned = await prisma.userCollection.findMany({
        where: { userId },
        select: { skuId: true },
    });
    const ownedSkuIds = new Set(owned.map((item) => item.skuId));

    let matchingSkus: any[] = []
    if (search != "") {
        matchingSkus = await prisma.sku.findMany({
            where: search
                ? { name: { contains: search, mode: "insensitive" } }
                : undefined,
            orderBy: { name: "asc" },
        });
    }

    return NextResponse.json(matchingSkus.filter((sku) => !ownedSkuIds.has(sku.id)));
}