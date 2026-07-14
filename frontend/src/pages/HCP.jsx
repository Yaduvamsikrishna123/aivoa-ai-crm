import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../api/api";

function HCP() {
  const [hcps, setHcps] = useState([]);

  useEffect(() => {
    fetchHCPs();
  }, []);

  async function fetchHCPs() {
    try {
      const res = await api.get("/hcps/");
      setHcps(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-slate-100 min-h-screen">
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">
            Healthcare Professionals
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hcps.map((hcp) => (
              <div
                key={hcp.id}
                className="bg-white rounded-xl shadow p-6"
              >
                <h2 className="text-xl font-bold text-blue-700">
                  {hcp.name}
                </h2>

                <p className="mt-3">
                  <strong>Specialization:</strong>{" "}
                  {hcp.specialization}
                </p>

                <p>
                  <strong>Hospital:</strong>{" "}
                  {hcp.hospital}
                </p>

                <p>
                  <strong>City:</strong>{" "}
                  {hcp.city}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HCP;
