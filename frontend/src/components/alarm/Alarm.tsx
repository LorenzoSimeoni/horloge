import React, { useEffect, useState } from "react";
import "./Alarm.css";
import { Alarm } from "../../utils/Alarm";
import AlarmHttpService from "../../services/AlarmHttpService";

interface AlarmProps {
  alarm: Alarm;
}

const AlarmComponent: React.FC<AlarmProps> = (props) => {
  const [alarm, setAlarm] = useState<Alarm>(props.alarm);
  const alarmClass = alarm.enabled
    ? "alarm-component"
    : "alarm-component disabled";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await AlarmHttpService.patchData("alarms", alarm);
        console.log(result);
      } catch (error) {
        // Gérer les erreurs
      }
    };

    fetchData();
  }, [alarm]);

  const toggleEnabled = () => {
    setAlarm((prevAlarm) => ({ ...prevAlarm, enabled: !prevAlarm.enabled }));
  };
  return (
    <div className={alarmClass}>
      <div className="alarm-description">
        <span className="time">{alarm.time.toLocaleTimeString()}</span>
        <span className="alarm-informations">
          {alarm.name} ;{" "}
          {alarm.days.length > 0
            ? alarm.days.join(" ")
            : "Ne sonne qu'une fois"}
        </span>
      </div>
      <div>
        <input
          type="checkbox"
          name="checkbox"
          id={alarm._id}
          checked={alarm.enabled}
          onChange={() => {}}
          onClick={toggleEnabled}
        ></input>
        <label htmlFor={alarm._id} className="switch"></label>
      </div>
    </div>
  );
};

export default AlarmComponent;
