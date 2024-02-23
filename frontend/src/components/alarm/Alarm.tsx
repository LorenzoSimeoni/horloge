import React, { useEffect, useState } from "react";
import "./Alarm.css";
import { Alarm } from "../../utils/Alarm";
import AlarmHttpService from "../../services/AlarmHttpService";
import DeleteIcon from "@mui/icons-material/Delete";

interface AlarmProps {
  alarm: Alarm;
  onChange: (newAlarm: Alarm) => void;
  onDelete: (deletedAlarmId: string) => void;
}

const AlarmComponent: React.FC<AlarmProps> = (props) => {
  const [alarm, setAlarm] = useState<Alarm>(props.alarm);
  const alarmClass = alarm.enabled
    ? "alarm-component"
    : "alarm-component disabled";

  useEffect(() => {
    const fetchData = async () => {
      try {
        await AlarmHttpService.patchAlarm(alarm);
      } catch (error) {
        // Gérer les erreus
      }
    };

    fetchData();
  }, [alarm]);

  useEffect(() => {
    props.onChange(alarm);
  }, [alarm.enabled, alarm, props]);

  const toggleEnabled = () => {
    setAlarm((prevAlarm) => ({ ...prevAlarm, enabled: !prevAlarm.enabled }));
  };

  const deleteAlarm = async () => {
    try {
      const deletedAlarmId = await AlarmHttpService.deleteAlarm(alarm._id);
      props.onDelete(deletedAlarmId);
    } catch (error) {
      // TODO Gérer les erreus
    }
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
      <div className="actions-container">
        <input
          type="checkbox"
          name="checkbox"
          className="toggle-input"
          id={alarm._id}
          checked={alarm.enabled}
          onChange={() => {}}
          onClick={toggleEnabled}
        ></input>
        <label htmlFor={alarm._id} className="switch"></label>
        <DeleteIcon onClick={deleteAlarm} className="delete" />
      </div>
    </div>
  );
};

export default AlarmComponent;
