import React, { useEffect, useState } from "react";
import "./Timer.css";

const TimerComponent: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000); // Met à jour l'heure toutes les secondes

    return () => clearInterval(intervalId); // Nettoie l'intervalle lors du démontage du composant
  }, []);

  return (
    <div className="timer-component">
      <h1 className="timer">{time.toLocaleTimeString()}</h1>
    </div>
  );
};

export default TimerComponent;
