// app/api/produk/barcode/[kode]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ kode: string }> }
) {
  const kode = (await params).kode;

  const produk = await prisma.produk.findUnique({
    where: { barcode: kode },
  });

  if (!produk) {
    return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json(produk);
}