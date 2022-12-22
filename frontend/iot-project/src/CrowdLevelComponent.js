import "./RestaurantCard.css";
import { useState } from "react";

var thresholds = {
  "very high": 85,
  high: 65,
  normal: 35,
  low: 15,
  "very low": 0,
};

function getCrowdLevelTitle(number) {
  var level = "unknown";
  for (var key in thresholds) {
    if (thresholds[key] <= number) {
      level = key;
      break;
    }
  }
  return level;
}

function CrowdLevel() {
  var randomCrowdNumber = Math.floor(Math.random() * 101);

  const [crowdLevel, setCrowdLevel] = useState(
    getCrowdLevelTitle(randomCrowdNumber)
  );

  if (crowdLevel == "very high") {
    return <div className="crowdLevelAlert">{crowdLevel}</div>;
  }
  return <div className="crowdLevelNormal">{crowdLevel}</div>;
}

export default CrowdLevel;
