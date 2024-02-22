import React, { useEffect, useState } from "react";
import "./AlarmsContainer.css";
import AlarmComponent from "../alarm/Alarm";
import AlarmHttpService from "../../services/AlarmHttpService";
import { Alarm } from "../../utils/Alarm";
import AlarmModal from "../alarm-card/AlarmCard";

const AlarmsContainerComponent: React.FC = () => {
  const [data, setData] = useState<Alarm[]>([]);
  const [nextAlarm, setNextAlarm] = useState<Date>();
  const TOTAL_HOURS = 24;
  const MINUTES_IN_AN_HOUR = 60;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await AlarmHttpService.fetchData("alarms");
        setData(result);
      } catch (error) {
        // Gérer les erreurs
      }
    };

    fetchData();
  }, []);

  const calculateDiffHours = (time1: Date, time2: Date) => {
    if (time1.getHours() <= time2.getHours()) {
      let totalHours = TOTAL_HOURS - (time2.getHours() - time1.getHours());

      if (time1.getMinutes() < time2.getMinutes()) {
        totalHours = totalHours - 1;
      }
      return totalHours;
    } else {
      let totalHours = time1.getHours() - time2.getHours();
      if (time1.getMinutes() < time2.getMinutes()) {
        totalHours = totalHours - 1;
      }
      return totalHours;
    }
  };

  const calculateDiffMinutes = (time1: Date, time2: Date) => {
    return time1.getMinutes() < time2.getMinutes()
      ? MINUTES_IN_AN_HOUR - (time2.getMinutes() - time1.getMinutes())
      : time1.getMinutes() - time2.getMinutes();
  };

  useEffect(() => {
    const updateNextAlarm = () => {
      const date = new Date();
      const nextAlarmTime = new Date(
        data
          .filter((alarm) => alarm.enabled)
          .map((alarm) => alarm.time)
          .sort((time1, time2) => {
            const alarm1Diff =
              calculateDiffHours(time1, date) * 60 +
              calculateDiffMinutes(time1, date);
            const alarm2Diff =
              calculateDiffHours(time2, date) * 60 +
              calculateDiffMinutes(time2, date);

            return alarm1Diff - alarm2Diff;
          })[0]
      );

      if (nextAlarmTime) {
        const diffHours = calculateDiffHours(nextAlarmTime, date);
        const diffMinutes = calculateDiffMinutes(nextAlarmTime, date);

        nextAlarmTime.setHours(diffHours);
        nextAlarmTime.setMinutes(diffMinutes);

        setNextAlarm(nextAlarmTime);
      }
    };
    updateNextAlarm();

    const intervalId = setInterval(updateNextAlarm, 1000 * 60);

    return () => clearInterval(intervalId);
  }, [data]);

  return (
    <div className="alarms-container">
      <div className="next-alarm-container">
        <p>
          {data && data.filter((alarm) => alarm.enabled).length > 0
            ? "Sonne dans " + nextAlarm?.toLocaleTimeString()
            : "Pas d'alarmes activée"}
        </p>
      </div>
      <div className="alarm-container">
        {data ? (
          data.map((alarm, index) => (
            <AlarmComponent
              key={"ID" + alarm._id}
              alarm={alarm}
            ></AlarmComponent>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <button onClick={openModal} className="add-alarm">
        +
      </button>
      {isModalOpen && (
        <AlarmModal onClose={closeModal}>
          <h2>Contenu de la modal</h2>
          <p>Ce contenu est affiché dans la modal.</p>
        </AlarmModal>
      )}
    </div>
  );
};

export default AlarmsContainerComponent;
