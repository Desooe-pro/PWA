import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import {SondesDevices} from "./Components/SondesDevices.jsx";

function App() {
  const [count, setCount] = useState(0)
    const [devices, setDevices] = useState(["Non récupéré"])
    const [time, setTime] = useState("toSet")
    console.log(time)
    useEffect(() => {
        const getDevices = async () => {
            if (time < new Date().toLocaleTimeString() - 5 || time === "toSet") {
                try {
                    let devices = await axios.get(import.meta.env.VITE_API_URL + "/sondes/deviceId")
                    setTime(new Date().toLocaleTimeString())
                    setDevices(devices.data);
                } catch (e) {
                    console.error(e)
                }
            }
        }
        void getDevices()
    })

  if (devices[0] !== "Non récupéré") {
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
              <SondesDevices devices={devices}/>
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
      )
  }
}

export default App
