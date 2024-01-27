import "./App.css";
import SideNav from "./components/Navigation/SideNav";
import BasicCalendar from "./components/basicCalendat/BasicCalendar";

function App() {
  return (
    <div className="app">
      <div className="content">
        <SideNav />
        <div className="calendar-container">
          <BasicCalendar />
        </div>
      </div>
    </div>
  );
}

export default App;
