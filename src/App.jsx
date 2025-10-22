import { useEffect, useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { ShowDevices } from "./Components/ShowDevices.jsx";

/**
 * Affiche le contenu de la page d'accueil
 *
 * @component
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
  /**
   * @const devices {Array} de string contenant les identifiants des différentes sondes des ponts
   */
  const [devices, setDevices] = useState("Non récupéré");
  /**
   * @const toilettes {Array} de string contenant les identifiants des différents capteurs de présence des WC
   */
  const [toilettes, setToilettes] = useState("Non récupéré");
  /**
   * @const toilettesFree {Array} de string contenant les identifiants des WC libres
   */
  const [toilettesFree, setToilettesFree] = useState("Non récupéré");
  /**
   * @const timeSondes {Number} Heure de la dernière récupération des informations des sondes
   */
  const [timeSondes, setTimeSondes] = useState(-1);
  /**
   * @const timeToilettes {Number} Heure de la dernière récupération des informations des WC
   */
  const [timeToilettes, setTimeToilettes] = useState(-1);
  /**
   * @const pasDeCo {boolean} A true si pas de connexion internet
   */
  const [pasDeCo, setPasDeCo] = useState(false);

  useEffect(() => {
    /**
     * Récupère et enregistre les identifiants des sondes et l'heure de récupération des informations
     * @returns {Promise<void>}
     */
    const getDevices = async () => {
      if (timeSondes < new Date().getTime() - 10000 || timeSondes === -1) {
        try {
          let devices = await axios.get(
            import.meta.env.VITE_API_URL + "/sondes/deviceId",
          );
          setTimeSondes(new Date().getTime());
          setDevices(devices.data);
          setPasDeCo(false);
        } catch (e) {
          if (e.message === "Network Error") {
            setPasDeCo(true);
          }
          console.error(e);
        }
      }
    };
    void getDevices();
  });

  useEffect(() => {
    /**
     * Récupère et enregistre les identifiants des capteurs toilettes, ceux des toilettes libres et l'heure de récupération des informations
     * @returns {Promise<void>}
     */
    const getToilettes = async () => {
      if (
        timeToilettes < new Date().getTime() - 10000 ||
        timeToilettes === -1
      ) {
        try {
          let data = await axios.get(
            import.meta.env.VITE_API_URL + "/wc/deviceId",
          );
          let dataFree = await axios.get(
            import.meta.env.VITE_API_URL + "/wc/free",
          );
          setTimeToilettes(new Date().getTime());
          setToilettes(data.data);
          for (let i = 0; i < dataFree.data.length; i++) {
            if (i === 0) {
              setToilettesFree([dataFree.data[i].device_id]);
            } else {
              setToilettesFree(toilettesFree + dataFree.data[i].device_id);
            }
          }
          setPasDeCo(false);
        } catch (e) {
          if (e.message === "Network Error") {
            setPasDeCo(true);
          }
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
        </div>
        <h1>Vite</h1>
        <ShowDevices devices={devices} type={"sondes"} />
        <ShowDevices devices={toilettes} type={"WC"} free={toilettesFree} />
      </>
    );
  } else if (pasDeCo) {
    return (
      <>
        Vous n'avez pas de connexion internet ou le serveur n'en a pas (C'est
        surement vous)
      </>
    );
  }
}

export default App;
