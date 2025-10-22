import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * Shows Data of a selected device
 *
 * @component
 * @param device {Array} Identifiant du device
 * @param type {String} S'il s'agit des WC ou des sondes
 * @returns {Element}
 * @constructor
 */
function ShowData({ device, type }) {
  /**
   * @const batteries {String} contenant le niveau de batterie du capteur des toilettes
   */
  const [batteries, setBatteries] = useState("ToSet");
  /**
   * @const timeToilettes {Number} Heure de la dernière récupération des informations des WC
   */
  const [timeToilettes, setTimeToilettes] = useState(-1);
  /**
   * @const height {String} contenant la hauteur de l'eau de la sonde
   */
  const [height, setHeight] = useState("toSet");
  /**
   * @const time {Number} Heure de la dernière récupération des informations de la sonde
   */
  const [time, setTime] = useState(-1);
  useEffect(() => {
    if (
      type === "sondes" &&
      (time < new Date().getTime() - 10000 || time === -1)
    ) {
      /**
       * Récupère et enregistre la hauteur de l'eau de la sonde et l'heure de récupération des informations
       * @returns {Promise<void>}
       */
      const getHeight = async () => {
        let res = await axios.get(
          import.meta.env.VITE_API_URL + "/sondes/lastHeight/" + device,
        );
        setHeight(res.data.haut);
        setTime(new Date().getTime());
      };
      void getHeight();
    }
  });
  useEffect(() => {
    if (
      type === "WC" &&
      (timeToilettes < new Date().getTime() - 10000 || timeToilettes === -1)
    ) {
      /**
       * Récupère et enregistre le niveau de batterie du capteur des toilettes et l'heure de récupération des informations
       * @returns {Promise<void>}
       */
      const getBatteries = async () => {
        try {
          let res = await axios.get(
            import.meta.env.VITE_API_URL + "/wc/batteryStatus/" + device,
          );

          setTimeToilettes(new Date().getTime());
          setBatteries(res.data.battery);
        } catch (e) {
          console.error(e);
        }
      };
      void getBatteries();
    }
  });

  if (height !== "toSet" || batteries !== "ToSet") {
    return (
      <div>
        {type === "sondes" ? <div>Height : {height}m</div> : ""}
        {type === "WC" ? <div>🗲{batteries}%</div> : ""}
      </div>
    );
  }
}

export default ShowData;
