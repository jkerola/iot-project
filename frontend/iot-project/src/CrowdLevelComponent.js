import "./RestaurantCard.css";
import { useState } from "react";

var URL = "http://127.0.0.1:3000";

function CrowdLevel(props) {
  const [crowdLevel, setCrowdLevel] = useState("");

  var trueURL = (URL + "/" + props.name).toLowerCase();

  fetch(trueURL)
    .then((response) => response.json())
    .then((data) => {
      setCrowdLevel(data.crowd_level);
    });

  if (crowdLevel == "very high") {
    return <div className="crowdLevelAlert">{crowdLevel}</div>;
  }
  return <div className="crowdLevelNormal">{crowdLevel}</div>;
}

export default CrowdLevel;
