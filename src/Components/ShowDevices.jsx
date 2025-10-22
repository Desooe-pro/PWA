import * as React from "react";
import { useState } from "react";
import ShowData from "./ShowData.jsx";

/**
 * Shows Devices
 *
 * @component
 * @param devices {Array} Les devices que l'on veut afficher
 * @param type {String} S'il s'agit des WC ou des sondes
 * @param free {Array} Les WC libres
 * @returns {Element}
 * @constructor
 */
export const ShowDevices = ({ devices, type, free = null }) => {
  /**
   * @const clicked {boolean|string} false si rien n'est cliqué et l'identifiant du device cliqué sinon
   */
  const [clicked, setClicked] = useState(false);

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
                height: "fit-content",
              }}
              key={device}
              onClick={() => setClicked(clicked !== device ? device : false)}
            >
              <div>{device}</div>
              <div>
                {clicked === device ? (
                  <ShowData device={device} type={type} />
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            <div
              style={{
                borderRadius: "30px",
                backgroundColor: "#213547",
                padding: "10px 20px",
                height: "fit-content",
              }}
              key={device}
              onClick={() => setClicked(clicked !== device ? device : false)}
            >
              <div>{device}</div>{" "}
              <div>
                {clicked === device ? (
                  <ShowData device={device} type={type} />
                ) : (
                  ""
                )}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};
