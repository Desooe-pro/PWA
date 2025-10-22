import * as React from "react";
import { useState } from "react";
import ShowData from "./ShowData.jsx";

export const ShowDevices = ({ devices, type, free = null }) => {
  const [clicked, setClicked] = useState(false);
  console.log(clicked);

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
