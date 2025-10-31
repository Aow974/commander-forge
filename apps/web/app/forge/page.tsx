"use client";
import { useState } from "react";
import axios from "axios";

export default function Forge() {
  const [cmd, setCmd] = useState("");
  const [res, setRes] = useState<any[]>([]);

  const fetchSynergies = async () => {
    const { data } = await axios.post("http://localhost:8000/synergies", {
      commander: cmd,
    });
    setRes(data);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Choose your Commander</h2>
      <input
        className="px-3 py-2 rounded bg-surface text-white"
        value={cmd}
        onChange={(e) => setCmd(e.target.value)}
        placeholder="Atraxa, Praetors' Voice"
      />
      <button
        onClick={fetchSynergies}
        className="ml-2 px-4 py-2 bg-primary rounded"
      >
        Forge
      </button>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {res.map((c: any) => (
          <div key={c.name} className="bg-surface p-3 rounded">
            <img src={c.image} alt={c.name} className="rounded" />
            <p className="mt-2 font-semibold">{c.name}</p>
            <p className="text-sm text-gray-300">{c.synergy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
