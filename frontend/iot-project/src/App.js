import "./App.css";
import RestaurantCard from "./RestaurantCard";
import TopNav from "./TopNav";

function App() {
  return (
    <>
      <TopNav />
      <div className="contentWrapper">
        {/*<RestaurantCard name="Café Hub" />*/}
        <RestaurantCard name="Foobar" />
        {/*<RestaurantCard name="Foodoo" />*/}
        {/*<RestaurantCard name="H2O" />*/}
        {/*<RestaurantCard name="Kastari" />*/}
        {/*<RestaurantCard name="Napa" />*/}
        {/*<RestaurantCard name="Subway" />*/}
      </div>
    </>
  );
}

export default App;
