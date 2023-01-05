import "./RestaurantCard.css";
import { useState, useEffect } from "react";

var baseURL = "http://127.0.0.1:3000"; // Backend API address

function CrowdLevel(props) {
  const [crowdLevel, setCrowdLevel] = useState("");

  var URL = (baseURL + "/" + props.name).toLowerCase();
  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setCrowdLevel(data.crowd_level);
      });
  }, []);

  if (crowdLevel == "very high") {
    return <div className="crowdLevelAlert">{crowdLevel}</div>;
  }
  return <div className="crowdLevelNormal">{crowdLevel}</div>;
}

export default CrowdLevel;
