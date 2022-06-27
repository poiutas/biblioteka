import { Outlet } from "react-router-dom";
import Navigation from "../src/components/navigation/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />

      <Outlet />
    </div>
  );
}

export default App;
