import { useEffect, useState } from "react";
import { fetchCounters } from "./suiApi";

function Leaderboard() {
  const [counters, setCounters] = useState<any[]>([]);

  useEffect(() => {
    fetchCounters().then(setCounters);
  }, []);

  return (
    <div>
      <h2>🏆 Counter Leaderboard</h2>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Counter ID</th>
            <th>Value</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {counters.map((c, i) => (
            <tr key={c.id}>
              <td>{i + 1}</td>
              <td>{c.id}</td>
              <td>{c.value}</td>
              <td>{c.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
