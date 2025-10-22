import React, { useEffect, useState } from "react";
import axios from "axios";

function ShowData({ device, type }) {
  const [batteries, setBatteries] = useState("ToSet");
  const [timeToilettes, setTimeToilettes] = useState("toSet");
  const [height, setHeight] = useState("toSet");
  const [time, setTime] = useState("toSet");
  useEffect(() => {
    if (
      type === "sondes" &&
      (time < new Date().toLocaleTimeString() - 5 || time === "toSet")
    ) {
      const getHeight = async () => {
        let res = await axios.get(
          import.meta.env.VITE_API_URL + "/sondes/lastHeight/" + device,
        );
        console.log(res.data);
        setHeight(res.data.haut);
        setTime(new Date().toLocaleTimeString());
      };
      void getHeight();
    }
  });
  useEffect(() => {
    if (
      type === "WC" &&
      (timeToilettes < new Date().toLocaleTimeString() - 5 ||
        timeToilettes === "toSet")
    ) {
      const getSondes = async () => {
        try {
          let res = await axios.get(
            import.meta.env.VITE_API_URL + "/wc/batteryStatus/" + device,
          );

          setTimeToilettes(new Date().toLocaleTimeString());
          setBatteries(res.data.battery);
        } catch (e) {
          console.error(e);
        }
      };
      void getSondes();
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
