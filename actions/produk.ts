// actions/produk.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function tambahProduk(formData: FormData) {
  const nama = formData.get("nama") as string;
  const harga = parseInt(formData.get("harga") as string);
  const stok = parseInt(formData.get("stok") as string);
  const barcode = formData.get("barcode") as string;
  const namaKategori = formData.get("kategori") as string;

  if (!nama || !harga || isNaN(stok)) {
    return { error: "Nama, harga, dan stok wajib diisi dengan benar." };
  }

  try {
    // 1. Cari atau buat kategori baru
    let kategori = await prisma.kategori.findFirst({
      where: { nama: namaKategori },
    });

    if (!kategori) {
      kategori = await prisma.kategori.create({
        data: { nama: namaKategori },
      });
    }

    // 2. Buat produk
    await prisma.produk.create({
      data: {
        nama,
        harga,
        stok,
        barcode: barcode || null,
        kategoriId: kategori.id,
      },
    });

    revalidatePath("/dashboard/produk");
    return { success: true };
  } catch (error) {
    return { error: "Gagal menyimpan produk. Pastikan barcode unik." };
  }
}