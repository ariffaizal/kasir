// app/dashboard/produk/page.tsx
import prisma from "@/lib/prisma";

export default async function ProdukPage() {
  // Ambil data dari database
  const produk = await prisma.produk.findMany({
    include: { kategori: true },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Daftar Produk</h1>
      <p className="text-muted-foreground">
        Total: {produk.length} produk ditemukan.
      </p>

      {/* Tabel sederhana untuk melihat hasil */}
      <div className="border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Harga</th>
              <th className="p-3 text-left">Stok</th>
            </tr>
          </thead>
          <tbody>
            {produk.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-3 text-center text-muted-foreground">
                  Belum ada produk. (Nanti kita buat form tambah produk)
                </td>
              </tr>
            ) : (
              produk.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">{p.nama}</td>
                  <td className="p-3">Rp {p.harga.toLocaleString("id-ID")}</td>
                  <td className="p-3">{p.stok}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}