import type { Produk } from "./types";

const contohProduk: Produk = {
  id: "1",
  nama: "Indomie Goreng",
  harga: 3500,
  stok: 50,
};

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Halo, KasirKu!</h1>
      <p className="mt-4">Produk contoh:</p>
      <ul className="mt-2 list-disc pl-6">
        <li>
          {contohProduk.nama} — Rp {contohProduk.harga.toLocaleString("id-ID")}
        </li>
      </ul>
    </main>
  );
}