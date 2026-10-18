// actions/transaksi.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function simpanTransaksi(total: number, bayar: number, items: any[]) {
  try {
    await prisma.$transaction(async (tx) => {
      const trx = await tx.transaksi.create({
        data: {
          total,
          bayar,
          kembalian: bayar - total,
        },
      });

      for (const item of items) {
        await tx.itemTransaksi.create({
          data: {
            transaksiId: trx.id,
            produkId: item.id,
            namaProduk: item.nama,
            hargaSatuan: item.harga,
            qty: item.qty,
          },
        });

        await tx.produk.update({
          where: { id: item.id },
          data: { stok: { decrement: item.qty } },
        });
      }
    });

    revalidatePath("/dashboard/riwayat");
    revalidatePath("/dashboard/produk");
    return { success: true };
  } catch (error: any) {
    console.error("Error Transaksi:", error); // Cek di terminal VS Code
    // Kembalikan error asli agar muncul di alert
    return { error: `Gagal: ${error.message}` }; 
  }
}