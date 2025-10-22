import React, { useEffect, useState } from "react";
import axios from "axios";

function ShowData({ device, type }) {
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

  if (height !== "toSet") {
    return <div>{type === "sondes" ? <div>Height : {height}m</div> : ""}</div>;
  }
}

export default ShowData;
