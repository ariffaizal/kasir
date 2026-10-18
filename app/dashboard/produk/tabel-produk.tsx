// app/dashboard/produk/tabel-produk.tsx
import prisma from "@/lib/prisma";

export default async function TabelProduk() {
  const produk = await prisma.produk.findMany({
    include: { kategori: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="border rounded-lg bg-white overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-left">Nama</th>
            <th className="p-3 text-left">Kategori</th>
            <th className="p-3 text-left">Harga</th>
            <th className="p-3 text-left">Stok</th>
          </tr>
        </thead>
        <tbody>
          {produk.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-3 text-center text-muted-foreground">
                Belum ada produk.
              </td>
            </tr>
          ) : (
            produk.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3 font-medium">{p.nama}</td>
                <td className="p-3">{p.kategori.nama}</td>
                <td className="p-3">Rp {p.harga.toLocaleString("id-ID")}</td>
                <td className="p-3">{p.stok}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}