import { useState } from "react";
import "./RestaurantCard.css";
import Chart from "./CrowdChart";
import CrowdLevel from "./CrowdLevelComponent";

function createMinutesOrSeconds() {
  // TODO: Delete this function after backend integration
  var value = Math.floor(Math.random() * 60);
  if (value < 10) {
    return "0" + value.toString();
  }
  return value.toString();
}

function RestaurantCard(props) {
  const [name, setName] = useState(props.name);

  // Create a random timestamp for debugging
  var hours = Math.floor(Math.random() * (18 - 6 + 1) + 6);
  var minutes = createMinutesOrSeconds();
  var seconds = createMinutesOrSeconds();
  var time = hours + ":" + minutes + ":" + seconds;

  const [updateTimestamp, setUpdateTimestamp] = useState(time);

  return (
    <div className="cardWrapper">
      <div className="restaurantName">{name}</div>
      <hr width="100%" color="#3A3B3C" />
      <div className="crowdedness">crowdedness</div>
      <div className="crowdLevelWrapper">
        <CrowdLevel name={name} />
      </div>
      <div className="chartWrapper">
        <Chart />
      </div>
      <div className="timestamp">updated {updateTimestamp}</div>
    </div>
  );
}

export default RestaurantCard;
