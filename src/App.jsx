import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { ShowDevices } from "./Components/ShowDevices.jsx";

function App() {
  const [count, setCount] = useState(0);
  const [devices, setDevices] = useState("Non récupéré");
  const [toilettes, setToilettes] = useState("Non récupéré");
  const [toilettesFree, setToilettesFree] = useState("Non récupéré");
  const [timeSondes, setTimeSondes] = useState("toSet");
  const [timeToilettes, setTimeToilettes] = useState("toSet");
  useEffect(() => {
    const getDevices = async () => {
      if (
        timeSondes < new Date().toLocaleTimeString() - 5 ||
        timeSondes === "toSet"
      ) {
        try {
          let devices = await axios.get(
            import.meta.env.VITE_API_URL + "/sondes/deviceId",
          );
          setTimeSondes(new Date().toLocaleTimeString());
          setDevices(devices.data);
        } catch (e) {
          console.error(e);
        }
      }
    };
    void getDevices();
  });

  useEffect(() => {
    const getToilettes = async () => {
      if (
        timeToilettes < new Date().toLocaleTimeString() - 5 ||
        timeToilettes === "toSet"
      ) {
        try {
          let data = await axios.get(
            import.meta.env.VITE_API_URL + "/wc/deviceId",
          );
          let dataFree = await axios.get(
            import.meta.env.VITE_API_URL + "/wc/free",
          );
          setTimeToilettes(new Date().toLocaleTimeString());
          setToilettes(data.data);
          for (let i = 0; i < dataFree.data.length; i++) {
            if (i === 0) {
              setToilettesFree([dataFree.data[i].device_id]);
            } else {
              setToilettesFree(toilettesFree + dataFree.data[i].device_id);
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
    };
    void getToilettes();
  });

  if (devices !== "Non récupéré" && toilettes !== "Non récupéré") {
    return (
      <>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <ShowDevices devices={devices} type={"sondes"} />
        <ShowDevices devices={toilettes} type={"WC"} free={toilettesFree} />
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </>
    );
  }
}

export default App;
