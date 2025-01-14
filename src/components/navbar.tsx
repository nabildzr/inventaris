import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [navChange, setNavChange] = useState("/");

  const clickedNav = (route: string) => {
    setNavChange(route);
  };

  return (
    <nav className="flex justify-between sticky top-0 px-4 py-6 text-lg bg-slate-900 text-white">
      <a href="/" className="font-bold text-2xl">
        Inventaris
      </a>
      <ul className="flex gap-5">
        <li>
          <Link
            onClick={() => clickedNav("barang-inventaris")}
            to="/barang-inventaris"
            className={`hover:text-gray-300 ${
              navChange === "barang-inventaris" ? "text-red-300" : ""
            }`}
          >
            Barang Inventaris
          </Link>
        </li>
        <li>
          <Link
            onClick={() => clickedNav("peminjaman-barang")}
            to={"/peminjaman-barang"}
            className={`hover:text-gray-300 ${
              navChange === "peminjaman-barang" ? "text-red-300" : ""
            }`}
          >
            Peminjaman Barang
          </Link>
        </li>
        <li>
          <Link
            onClick={() => clickedNav("laporan")}
            to={"/laporan"}
            className={`hover:text-gray-300 ${
              navChange === "laporan" ? "text-red-300" : ""
            }`}
          >
            Laporan
          </Link>
        </li>
        <li>
          <Link
            onClick={() => clickedNav("referensi")}
            to={"/referensi"}
            className={`hover:text-gray-300 ${
              navChange === "referensi" ? "text-red-300" : ""
            }`}
          >
            Referensi
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
