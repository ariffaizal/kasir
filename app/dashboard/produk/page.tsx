// app/dashboard/produk/page.tsx
import { Suspense } from "react";
import FormProduk from "./form-produk";
import TabelProduk from "./tabel-produk";

export default function ProdukPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Kiri: Form Tambah */}
      <FormProduk />

      {/* Kanan: Tabel Daftar Produk */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Daftar Produk</h1>
        
        {/* Bungkus dengan Suspense */}
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Memuat data produk...</div>}>
          <TabelProduk />
        </Suspense>
      </div>
    </div>
  );
}