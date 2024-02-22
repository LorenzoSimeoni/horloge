import React from "react";
import Timer from "./components/timer/Timer";
import AlarmsContainerComponent from "./components/alarm-container/AlarmsContainer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Timer></Timer>
      <AlarmsContainerComponent></AlarmsContainerComponent>
    </div>
  );
}

export default App;
