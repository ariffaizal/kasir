"use client";

import { useState } from "react";
import { tambahProduk } from "@/actions/produk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormProduk() {
  const [pesan, setPesan] = useState("");

  async function handleSubmit(formData: FormData) {
    const result = await tambahProduk(formData);
    if (result?.error) {
      setPesan(result.error);
    } else {
      setPesan("Produk berhasil ditambahkan!");
      // Reset form (cara sederhana)
      (document.getElementById("form-produk") as HTMLFormElement).reset();
    }
  }

  return (
    <form id="form-produk" action={handleSubmit} className="space-y-4 max-w-md border p-4 rounded-lg bg-white">
      <h2 className="font-bold text-lg">Tambah Produk Baru</h2>
      {pesan && <p className="text-sm text-blue-600 font-medium">{pesan}</p>}
      
      <div>
        <Label>Nama Produk</Label>
        <Input name="nama" required placeholder="Contoh: Indomie Goreng" />
      </div>
      <div>
        <Label>Kategori</Label>
        <Input name="kategori" required placeholder="Contoh: Makanan" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Harga (Rp)</Label>
          <Input name="harga" type="number" required placeholder="3500" />
        </div>
        <div>
          <Label>Stok Awal</Label>
          <Input name="stok" type="number" required placeholder="50" />
        </div>
      </div>
      <div>
        <Label>Barcode (Opsional)</Label>
        <Input name="barcode" placeholder="Scan atau ketik barcode" />
      </div>
      
      <Button type="submit" className="w-full">Simpan Produk</Button>
    </form>
  );
}