import React, { useEffect, useState } from "react";
import "./AlarmsContainer.css";
import AlarmComponent from "../alarm/Alarm";
import AlarmHttpService from "../../services/AlarmHttpService";
import { Alarm } from "../../utils/Alarm";
import AlarmModal from "../alarm-card/AlarmCard";
import { Howl } from "howler";
import alarmSound from "../../assets/alarm-sound.mp3";
import {
  DayNumber,
  convertDayOfWeekToNumber,
  convertNumberToDayNumber,
} from "../../utils/DaysOfWeek";
import { Duration } from "../../utils/Duration";

const AlarmsContainerComponent: React.FC = () => {
  const [data, setData] = useState<Alarm[]>([]);
  const [nextAlarm, setNextAlarm] = useState<Duration>();
  const TOTAL_HOURS = 24;
  const MINUTES_IN_AN_HOUR = 60;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmModal = (alarm: Alarm) => {
    setIsModalOpen(false);
    setData([...data, alarm]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await AlarmHttpService.fetchAlarms();
        setData(
          result.sort((alarm1, alarm2) => {
            if (
              alarm1.time.getHours() < alarm2.time.getHours() ||
              (alarm1.time.getHours() === alarm2.time.getHours() &&
                alarm1.time.getMinutes() < alarm2.time.getMinutes())
            ) {
              return -1;
            } else if (
              alarm1.time.getHours() === alarm2.time.getHours() &&
              alarm1.time.getMinutes() === alarm2.time.getMinutes()
            ) {
              return 0;
            } else {
              return 1;
            }
          })
        );
      } catch (error) {
        // Gérer les erreurs
      }
    };

    fetchData();
  }, []);

  const calculateDiffHours = (time1: Date, time2: Date) => {
    let totalHours;
    if (time1.getHours() < time2.getHours()) {
      totalHours = TOTAL_HOURS - (time2.getHours() - time1.getHours());
    } else if (time1.getHours() < time2.getHours()) {
      totalHours = 0;
    } else {
      totalHours = time1.getHours() - time2.getHours();
    }
    if (time1.getMinutes() < time2.getMinutes()) {
      if (totalHours === 0) {
        totalHours = 23;
      } else {
        totalHours = totalHours - 1;
      }
    }
    return totalHours;
  };

  const calculateDiffMinutes = (time1: Date, time2: Date) => {
    return time1.getMinutes() < time2.getMinutes()
      ? MINUTES_IN_AN_HOUR - (time2.getMinutes() - time1.getMinutes())
      : time1.getMinutes() - time2.getMinutes();
  };

  const calculateDay = (today: Date, alarm: Alarm) => {
    const day = convertNumberToDayNumber(today.getDay());
    if (alarm.days.length === 0) {
      return 0;
    } else {
      const daysNumber: DayNumber[] = [];
      alarm.days.forEach((day) => {
        const dayNumber = convertDayOfWeekToNumber(day);
        if (dayNumber) {
          daysNumber.push(dayNumber);
        }
      });
      // TODO casser ces blocs en fonction
      // Si l'heure de today est > à celle de l'alarme on calcule le prochain jour
      if (
        today.getHours() > alarm.time.getHours() ||
        (today.getHours() === alarm.time.getHours() &&
          today.getMinutes() > alarm.time.getMinutes())
      ) {
        const nextDay = daysNumber.sort().find((jour) => jour > day!);
        return nextDay !== undefined ? nextDay : daysNumber.sort()[0];
      } else {
        const nextDay = daysNumber.sort().find((jour) => jour >= day!);
        return nextDay !== undefined ? nextDay : daysNumber.sort()[0];
      }
    }
  };

  function calculateDayDifference(day1: number, day2: number): number {
    let difference = Math.abs(day1 - day2);

    if (difference > 7 / 2) {
      difference = 7 - difference;
    }

    return difference;
  }

  useEffect(() => {
    const updateNextAlarm = () => {
      const date = new Date();
      const soonerAlarm = data
        .filter((alarm) => alarm.enabled)
        .sort((alarm1, alarm2) => {
          const nextDay1 = calculateDay(date, alarm1);
          const nextDay2 = calculateDay(date, alarm2);

          let alarm1Diff =
            calculateDiffHours(alarm1.time, date) * 60 +
            calculateDiffMinutes(alarm1.time, date);

          if (nextDay1 !== 0) {
            let dayDiff1 = calculateDayDifference(nextDay1, date.getDay());
            if (dayDiff1 >= 1) {
              // TODO change ce code la pour le rendre plus clean
              // Si on est déjà au dessus de 24H
              if (
                alarm1.time.getHours() < date.getHours() ||
                (alarm1.time.getHours() === date.getHours() &&
                  alarm1.time.getMinutes() < date.getMinutes())
              ) {
                dayDiff1 = dayDiff1 - 1;
              }

              alarm1Diff = alarm1Diff + dayDiff1 * 24 * 60;
            }
          }
          let alarm2Diff =
            calculateDiffHours(alarm2.time, date) * 60 +
            calculateDiffMinutes(alarm2.time, date);

          if (nextDay2 !== 0) {
            calculateDayDifference(nextDay2, date.getDay());
            let dayDiff2 = calculateDayDifference(nextDay2, date.getDay());
            if (dayDiff2 >= 1) {
              // TODO change ce code la pour le rendre plus clean
              // Si on est déjà au dessus de 24H
              if (
                alarm2.time.getHours() < date.getHours() ||
                (alarm2.time.getHours() === date.getHours() &&
                  alarm2.time.getMinutes() < date.getMinutes())
              ) {
                dayDiff2 = dayDiff2 - 1;
              }

              alarm2Diff = alarm2Diff + dayDiff2 * 24 * 60;
            }
          }

          return alarm1Diff - alarm2Diff;
        })[0];

      if (soonerAlarm) {
        const time = new Date(soonerAlarm.time);
        const nextDay = calculateDay(date, soonerAlarm);

        let diffHours = calculateDiffHours(time, date);
        const diffMinutes = calculateDiffMinutes(time, date);
        if (nextDay !== 0) {
          let dayDiff = calculateDayDifference(nextDay, date.getDay());
          if (dayDiff >= 1) {
            // TODO change ce code la pour le rendre plus clean
            // Si on est déjà au dessus de 24H
            if (
              time.getHours() < date.getHours() ||
              (time.getHours() === date.getHours() &&
                time.getMinutes() < date.getMinutes())
            ) {
              dayDiff = dayDiff - 1;
            }
            diffHours = diffHours + dayDiff * 24;
          }
        }

        const duration = new Duration(diffHours, diffMinutes);
        if (
          duration.days === 0 &&
          duration.hours === 0 &&
          duration.minutes === 0
        ) {
          playAlarm();
        }
        setNextAlarm(duration);
      }
    };
    updateNextAlarm();

    const intervalId = setInterval(updateNextAlarm, 1000);

    return () => clearInterval(intervalId);
  }, [data]);

  const handleAlarmChange = (newAlarm: Alarm) => {
    const index = data.findIndex((day) => day._id === newAlarm._id);
    data[index] = newAlarm;
    setData(data);
  };

  const handleAlarmDelete = (deletedAlarmId: string) => {
    const newData = data.filter((alarm) => alarm._id !== deletedAlarmId);
    setData(newData);
  };

  const playAlarm = () => {
    const sound = new Howl({
      src: [alarmSound],
    });
    sound.play();
  };

  return (
    <div className="alarms-container">
      <div className="next-alarm-container">
        <p>
          {data && data.filter((alarm) => alarm.enabled).length > 0
            ? "Sonne dans " +
              (nextAlarm?.days && nextAlarm?.days > 0
                ? nextAlarm?.days + " jours et "
                : "") +
              nextAlarm?.hours +
              " heures et " +
              nextAlarm?.minutes +
              " minutes."
            : "Pas d'alarmes activée"}
        </p>
      </div>
      <div className="alarm-container">
        {data ? (
          data.map((alarm, index) => (
            <AlarmComponent
              key={"ID" + alarm._id}
              alarm={alarm}
              onChange={handleAlarmChange}
              onDelete={handleAlarmDelete}
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
        <AlarmModal onClose={closeModal} onConfirm={confirmModal}></AlarmModal>
      )}
    </div>
  );
};

export default AlarmsContainerComponent;
