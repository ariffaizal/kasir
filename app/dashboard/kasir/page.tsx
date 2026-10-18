"use client";

import { useState, useEffect, useRef } from "react";
import { simpanTransaksi } from "@/actions/transaksi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function KasirPage() {
  const [barcode, setBarcode] = useState("");
  const [keranjang, setKeranjang] = useState<any[]>([]);
  const [bayar, setBayar] = useState("");
  const barcodeRef = useRef<HTMLInputElement>(null);

  // Otomatis fokus ke input barcode (sangat penting untuk scanner USB)
  useEffect(() => {
    barcodeRef.current?.focus();
  }, []);

  // Fungsi untuk mencari produk via API
  async function handleScan(e: React.FormEvent) {
    e.preventDefault();
    if (!barcode) return;

    const res = await fetch(`/api/produk/barcode/${barcode}`);
    if (!res.ok) {
      alert("Produk tidak ditemukan!");
      setBarcode("");
      return;
    }

    const produk = await res.json();
    
    // Cek jika barang sudah ada di keranjang
    const existing = keranjang.find((item) => item.id === produk.id);
    if (existing) {
      setKeranjang(keranjang.map(item => 
        item.id === produk.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setKeranjang([...keranjang, { ...produk, qty: 1 }]);
    }
    
    setBarcode("");
    barcodeRef.current?.focus(); // Kembalikan fokus ke input
  }

  const total = keranjang.reduce((sum, item) => sum + item.harga * item.qty, 0);
  const kembalian = parseInt(bayar) - total;

  async function handleBayar() {
    if (keranjang.length === 0) return alert("Keranjang kosong");
    if (parseInt(bayar) < total) return alert("Uang bayar kurang");

    const res = await simpanTransaksi(total, parseInt(bayar), keranjang);
    if (res.error) {
      alert(res.error);
    } else {
      alert("Transaksi Berhasil!");
      setKeranjang([]);
      setBayar("");
      barcodeRef.current?.focus();
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      {/* Kiri: Input Scan */}
      <div className="md:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Scan Barcode / Cari Produk</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleScan}>
              <Input
                ref={barcodeRef}
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="Scan barcode di sini..."
                className="text-lg py-6"
              />
            </form>
            <p className="text-sm text-muted-foreground mt-2">
              *Scanner USB bekerja seperti keyboard. Cukup scan, lalu tekan Enter.
            </p>
          </CardContent>
        </Card>

        {/* Tabel Keranjang */}
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left">Nama</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Harga</th>
                  <th className="p-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {keranjang.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">Belum ada item</td></tr>
                ) : (
                  keranjang.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-3">{item.nama}</td>
                      <td className="p-3 text-center">{item.qty}</td>
                      <td className="p-3 text-right">Rp {item.harga.toLocaleString("id-ID")}</td>
                      <td className="p-3 text-right font-medium">Rp {(item.harga * item.qty).toLocaleString("id-ID")}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Kanan: Pembayaran */}
      <div>
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle>Total Pembayaran</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span>Rp {total.toLocaleString("id-ID")}</span>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Uang Bayar (Rp)</label>
              <Input 
                type="number" 
                value={bayar} 
                onChange={(e) => setBayar(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="flex justify-between text-lg">
              <span>Kembalian</span>
              <span className={kembalian < 0 ? "text-red-500" : "text-green-600 font-bold"}>
                Rp {kembalian >= 0 ? kembalian.toLocaleString("id-ID") : 0}
              </span>
            </div>

            <Button onClick={handleBayar} className="w-full py-6 text-lg" disabled={keranjang.length === 0}>
              Proses Bayar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}