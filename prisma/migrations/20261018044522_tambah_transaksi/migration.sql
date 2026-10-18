-- CreateTable
CREATE TABLE "Transaksi" (
    "id" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "bayar" INTEGER NOT NULL,
    "kembalian" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'selesai',

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemTransaksi" (
    "id" TEXT NOT NULL,
    "transaksiId" TEXT NOT NULL,
    "produkId" TEXT NOT NULL,
    "namaProduk" TEXT NOT NULL,
    "hargaSatuan" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,

    CONSTRAINT "ItemTransaksi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemTransaksi" ADD CONSTRAINT "ItemTransaksi_transaksiId_fkey" FOREIGN KEY ("transaksiId") REFERENCES "Transaksi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemTransaksi" ADD CONSTRAINT "ItemTransaksi_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
