import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export const ShowDevices = ({ devices, type, free = null }) => {
  const [batteries, setBatteries] = useState("ToSet");
  const [timeToilettes, setTimeToilettes] = useState("toSet");
  useEffect(() => {
    if (
      type === "WC" &&
      (timeToilettes < new Date().toLocaleTimeString() - 5 ||
        timeToilettes === "toSet")
    ) {
      const getSondes = async () => {
        try {
          let batterie = {};
          let res = 0;
          for (let i = 0; i < devices.length; i++) {
            console.log(type);
            res = await axios.get(
              import.meta.env.VITE_API_URL + "/wc/batteryStatus/" + devices[i],
            );
            batterie[devices[i]] = res.data.battery;
            console.log(type, batterie);
          }
          setTimeToilettes(new Date().toLocaleTimeString());
          setBatteries(batterie);
        } catch (e) {
          console.error(e);
        }
      };
      void getSondes();
    }
  });
  if (batteries !== "ToSet" || type === "sondes") {
    return (
      <div>
        <h1>Devices {type}</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {devices.map((device) =>
            free !== null && free.includes(device) ? (
              <div
                style={{
                  borderRadius: "30px",
                  backgroundColor: "#21aa47",
                  padding: "10px 20px",
                }}
              >
                <div>{device}</div> <div>🗲{batteries[device]}%</div>
              </div>
            ) : (
              <div
                style={{
                  borderRadius: "30px",
                  backgroundColor: "#213547",
                  padding: "10px 20px",
                }}
              >
                <div>{device}</div>{" "}
                {type === "WC" ? <div>🗲{batteries[device]}%</div> : ""}
              </div>
            ),
          )}
        </div>
      </div>
    );
  }
};
