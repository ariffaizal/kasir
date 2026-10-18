import Link from "next/link";

const menuItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Produk", href: "/dashboard/produk" },
  { label: "Kasir", href: "/dashboard/kasir" },
  { label: "Riwayat", href: "/dashboard/riwayat" },
  { label: "Laporan", href: "/dashboard/laporan" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold">KasirKu</h1>
          <p className="text-sm text-slate-400 mt-1">POS Ritel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 rounded-md text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700 text-sm text-slate-400">
          Kasir: Admin
        </div>
      </aside>

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-white flex items-center px-6">
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </header>
        <main className="flex-1 p-6 bg-muted/20">{children}</main>
      </div>
    </div>
  );
}