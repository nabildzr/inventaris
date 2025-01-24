import { useEffect, useState } from "react";
import axios from "axios";

interface BarangInventaris {
  br_kode: string;
  jns_brg_kode: string;
  user_id: string;
  br_nama: string;
  br_tgl_terima: string;
  br_tgl_entry: string;
  br_status: string;
}

const Login = () => {
  const [userId, setUserId] = useState<string>("");
  const [userPass, setUserPass] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [barangInventaris, setBarangInventaris] = useState<BarangInventaris[] | null>(null);
  const [error, setError] = useState<string>("");

  const [newBarang, setNewBarang] = useState<Partial<BarangInventaris>>({
    br_kode: "",
    jns_brg_kode: "",
    user_id: "",
    br_nama: "",
    br_tgl_terima: "",
    br_tgl_entry: "",
    br_status: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error message
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        user_id: userId,
        user_pass: userPass,
      });
      const data = response.data;
      setAccessToken(data.access_token);
      localStorage.setItem('token', data.access_token);
      fetchBarangInventaris(data.access_token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login failed", error.response?.data);
        setError(error.response?.data?.message || "Login failed");
      } else {
        setError("An unknown error occurred");
      }
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => {
    setAccessToken(null);
    localStorage.removeItem('token');
    setBarangInventaris(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAccessToken(token);
      fetchBarangInventaris(token);
    }
  }, []);
  useEffect(() => {
    if (accessToken) {
      fetchBarangInventaris(accessToken);
    }
  }, [accessToken, barangInventaris]);

  const fetchBarangInventaris = async (token: string) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/barang-inventaris", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBarangInventaris(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Fetching barang-inventaris failed", error.response?.data);
        setError(error.response?.data?.message || "Fetching barang-inventaris failed");
      } else {
        setError("An unknown error occurred");
      }
      console.error("Fetching barang-inventaris failed", error);
    }
  };

  const handleAddBarang = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error message
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/barang-inventaris", newBarang, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setBarangInventaris((prev) => (prev ? [...prev, response.data] : [response.data]));
      setNewBarang({
        br_kode: "",
        jns_brg_kode: "",
        user_id: "",
        br_nama: "",
        br_tgl_terima: "",
        br_tgl_entry: "",
        br_status: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Adding barang-inventaris failed", error.response?.data);
        setError(error.response?.data?.message || "Adding barang-inventaris failed");
      } else {
        setError("An unknown error occurred");
      }
      console.error("Adding barang-inventaris failed", error);
    }
  };

  return (
    <div>
      {!accessToken ? (
        <form onSubmit={handleLogin}>
          <div>
            <label>User ID:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={userPass}
              onChange={(e) => setUserPass(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>
          {barangInventaris && (
            <div>
              <h2>Barang Inventaris</h2>
              <table>
                <thead>
                  <tr>
                    <th>Kode</th>
                    <th>Jenis Barang Kode</th>
                    <th>User ID</th>
                    <th>Nama Barang</th>
                    <th>Tanggal Terima</th>
                    <th>Tanggal Entry</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {barangInventaris.map((item) => (
                    <tr key={item.br_kode}>
                      <td>{item.br_kode}</td>
                      <td>{item.jns_brg_kode}</td>
                      <td>{item.user_id}</td>
                      <td>{item.br_nama}</td>
                      <td>{item.br_tgl_terima}</td>
                      <td>{item.br_tgl_entry}</td>
                      <td>{item.br_status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h3>Add New Barang Inventaris</h3>
              <form onSubmit={handleAddBarang}>
                <div>
                  <label>Kode:</label>
                  <input
                    type="text"
                    value={newBarang.br_kode}
                    onChange={(e) => setNewBarang({ ...newBarang, br_kode: e.target.value })}
                  />
                </div>
                <div>
                  <label>Jenis Barang Kode:</label>
                  <input
                    type="text"
                    value={newBarang.jns_brg_kode}
                    onChange={(e) => setNewBarang({ ...newBarang, jns_brg_kode: e.target.value })}
                  />
                </div>
                <div>
                  <label>User ID:</label>
                  <input
                    type="text"
                    value={newBarang.user_id}
                    onChange={(e) => setNewBarang({ ...newBarang, user_id: e.target.value })}
                  />
                </div>
                <div>
                  <label>Nama Barang:</label>
                  <input
                    type="text"
                    value={newBarang.br_nama}
                    onChange={(e) => setNewBarang({ ...newBarang, br_nama: e.target.value })}
                  />
                </div>
                <div>
                  <label>Tanggal Terima:</label>
                  <input
                    type="date"
                    value={newBarang.br_tgl_terima}
                    onChange={(e) => setNewBarang({ ...newBarang, br_tgl_terima: e.target.value })}
                  />
                </div>
                <div>
                  <label>Tanggal Entry:</label>
                  <input
                    type="datetime-local"
                    value={newBarang.br_tgl_entry}
                    onChange={(e) => setNewBarang({ ...newBarang, br_tgl_entry: e.target.value })}
                  />
                </div>
                <div>
                  <label>Status:</label>
                  <input
                    type="text"
                    value={newBarang.br_status}
                    onChange={(e) => setNewBarang({ ...newBarang, br_status: e.target.value })}
                  />
                </div>
                <button type="submit">Tambah Barang</button>
              </form>
            </div>
          )}
        </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default Login;