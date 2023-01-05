import { useState } from "react";
import "./RestaurantCard.css";
import Chart from "./CrowdChart";
import CrowdLevel from "./CrowdLevelComponent";

function RestaurantCard(props) {
  const [name, setName] = useState(props.name);

  return (
    <div className="cardWrapper">
      <div className="restaurantName">{name}</div>
      <hr width="100%" color="#3A3B3C" />
      <div className="crowdedness">crowdedness</div>
      <div className="crowdLevelWrapper">
        <CrowdLevel name={name} />
      </div>
      <div className="chartWrapper">
        <Chart name={name} />
      </div>
    </div>
  );
}

export default RestaurantCard;
