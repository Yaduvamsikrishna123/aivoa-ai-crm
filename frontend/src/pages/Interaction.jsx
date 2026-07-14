import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../api/api";

function Interaction() {
  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const [hcpName, setHcpName] = useState("");

const [interactionType, setInteractionType] = useState("");
const [message, setMessage] = useState("");

const [topics, setTopics] = useState("");

const [materials, setMaterials] = useState("");

const [outcomes, setOutcomes] = useState("");

const [followUp, setFollowUp] = useState("");

const [sentiment, setSentiment] = useState("");


const handleAnalyze = async () => {

  if (!message.trim()) {
    alert("Please describe the interaction.");
    return;
  }

  try {

    const res = await api.post("/ai/process", {
      notes: message,
    });

    console.log(res.data);

    setTopics(res.data.summary);

    setMaterials(res.data.entities.join(", "));

    setOutcomes(res.data.summary);

    setFollowUp(res.data.follow_up);

    setSentiment(res.data.sentiment);

    // Extract HCP Name
const doctorMatch = message.match(/Dr\.?\s+[A-Za-z ]+/);

if (doctorMatch) {
  setHcpName(doctorMatch[0].trim());
}

// Detect Interaction Type
const lowerMessage = message.toLowerCase();

if (lowerMessage.includes("meeting") || lowerMessage.includes("met")) {
  setInteractionType("Meeting");
} else if (lowerMessage.includes("visit")) {
  setInteractionType("Visit");
} else if (lowerMessage.includes("call")) {
  setInteractionType("Call");
} else if (lowerMessage.includes("conference")) {
  setInteractionType("Conference");
} else {
  setInteractionType("Meeting");
}

  } catch (err) {

    console.log(err);

    alert("AI Processing Failed");

  }

};

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-8">

          <div className="bg-white rounded-2xl shadow-md px-8 py-5 mb-6">
            <h1 className="text-3xl font-bold text-slate-800">
              Log HCP Interaction
            </h1>
            <p className="text-gray-500 mt-1">
              Capture and analyze healthcare professional interactions using AI.
            </p>
          </div>

          <div className="flex gap-6">

            <div className="w-[72%] bg-white rounded-2xl shadow-md p-6">

              <div className="grid grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    HCP Name
                  </label>
                 <input
                type="text"
                value={hcpName}
                onChange={(e) => setHcpName(e.target.value)}
                placeholder="Enter HCP Name"
                 className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                 />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Interaction Type
                  </label>
                  <input
                  type="text"
                  value={interactionType}
                  onChange={(e) => setInteractionType(e.target.value)}
                  placeholder="Enter Interaction Type"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    value={today}
                    readOnly
                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    value={currentTime}
                    readOnly
                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                  />
                </div>

              </div>

              <div className="mt-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Attendees
                </label>
                <input
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                  placeholder="Enter attendees"
                />
              </div>

              <div className="mt-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Topics Discussed
                </label>
                <textarea
                  value={topics}
                  onChange={(e) => setTopics(e.target.value)}
                  rows="4"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              <div className="mt-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Materials Shared
                </label>
                <textarea
                  rows="4"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              <div className="mt-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Observed HCP Sentiment
                </label>

                <div className="flex gap-8">
                  <label>
  <input
    type="radio"
    name="sentiment"
    checked={sentiment === "Positive"}
    onChange={() => setSentiment("Positive")}
  />
  Positive
</label>

<label>
  <input
    type="radio"
    name="sentiment"
    checked={sentiment === "Neutral"}
    onChange={() => setSentiment("Neutral")}
  />
  Neutral
</label>

<label>
  <input
    type="radio"
    name="sentiment"
    checked={sentiment === "Negative"}
    onChange={() => setSentiment("Negative")}
  />
  Negative

</label>
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Outcomes
                </label>
                <textarea
                  value={outcomes}
                  onChange={(e) => setOutcomes(e.target.value)}
                  rows="3"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              <div className="mt-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Follow-up Actions
                </label>
                <textarea
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                rows="3"
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              <div className="flex justify-end mt-8">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold">
                  Save Interaction
                </button>
              </div>

            </div>

            <div className="w-[28%] bg-white rounded-2xl shadow-md flex flex-col">

              <div className="bg-blue-600 text-white rounded-t-2xl p-4">
                <h2 className="font-bold text-lg">🤖 AI Assistant</h2>
                <p className="text-sm opacity-90">
                  Describe your interaction naturally.
                </p>
              </div>

              <div className="flex-1 p-4 space-y-4 overflow-y-auto">

                <div className="bg-blue-50 p-3 rounded-xl text-sm">
                  👋 Welcome! Describe your interaction below and I'll help populate the form.
                </div>

              </div>

              <div className="border-t p-4">

                <textarea
                  rows="4"
                  value={message}
                  onChange={(e)=>setMessage(e.target.value)}
                  placeholder="Describe Interaction..."
                  className="w-full border border-gray-300 rounded-xl p-3 resize-none"
                />

                <button 
                  onClick={handleAnalyze}
                  className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
                >
                  Analyze with AI
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Interaction;
