import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../api/api";

function Dashboard() {

  const [hcpCount, setHcpCount] = useState(0);
  const [interactionCount, setInteractionCount] = useState(0);

  useEffect(() => {

    fetchData();

  }, []);

  async function fetchData() {

    try {

      const hcpRes = await api.get("/hcps/");
      const interactionRes = await api.get("/interactions/");

      setHcpCount(hcpRes.data.length);
      setInteractionCount(interactionRes.data.length);

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

          <h1 className="text-3xl font-bold">
            Welcome 👋
          </h1>

          <div className="grid grid-cols-2 gap-6 mt-8">

            <div className="bg-white rounded-xl shadow p-6">

              <h2 className="text-xl font-semibold">
                Total HCPs
              </h2>

              <p className="text-5xl mt-4 font-bold text-blue-600">
                {hcpCount}
              </p>

            </div>

            <div className="bg-white rounded-xl shadow p-6">

              <h2 className="text-xl font-semibold">
                Total Interactions
              </h2>

              <p className="text-5xl mt-4 font-bold text-green-600">
                {interactionCount}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;