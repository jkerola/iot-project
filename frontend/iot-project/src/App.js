import "./App.css";
import RestaurantCard from "./RestaurantCard";
import TopNav from "./TopNav";

function App() {
  return (
    <>
      <TopNav />
      <div className="contentWrapper">
        <RestaurantCard name="Foobar" />
        <RestaurantCard name="Foodoo" />
        <RestaurantCard name="Kastari" />
        <RestaurantCard name="Mara" />
        <RestaurantCard name="Napa" />
      </div>
    </>
  );
}

export default App;
