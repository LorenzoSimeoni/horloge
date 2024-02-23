import React, { useEffect, useState } from "react";
import "./AlarmCard.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { Button } from "@mui/material";
import { DayOfWeek } from "../../utils/DaysOfWeek";
import AlarmHttpService from "../../services/AlarmHttpService";
import { Alarm } from "../../utils/Alarm";

interface ModalProps {
  onClose: () => void;
  onConfirm: (alarm: Alarm) => void;
}

const AlarmModal: React.FC<ModalProps> = ({ onClose, onConfirm }) => {
  const closeModal = () => {
    onClose();
  };
  const [name, setName] = useState("Alarm");
  const [time, setTime] = useState<Date>();
  const [days, setDays] = useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const daysOfWeekArray: string[] = Object.values(DayOfWeek);

  useEffect(() => {
    // Enable the button only if all inputs are filled
    setIsButtonDisabled(!(name && time));
  }, [name, time, days]);

  const handleConfirm = async () => {
    try {
      const createdAlarm = await AlarmHttpService.postAlarm({
        name: name,
        time: time,
        days: days,
      });
      onConfirm(createdAlarm);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Régler une alarme</h2>
        <label>Nom : </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker"]}>
            <TimePicker
              onChange={(value: Date | null) => {
                if (value) {
                  setTime(value);
                }
              }}
              label="With Time Clock"
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <div>
          {daysOfWeekArray.map((day, index) => (
            <div>
              <input
                key={day}
                id={day}
                type="checkbox"
                value={day}
                onChange={(e) =>
                  e.target.checked
                    ? setDays([...days, e.target.value])
                    : setDays(days.filter((day) => day !== e.target.value))
                }
              ></input>
              <label htmlFor={day}>{day}</label>
            </div>
          ))}
        </div>
        <div className="button-modale">
          <Button onClick={closeModal} variant="outlined">
            Fermer
          </Button>
          <Button
            disabled={isButtonDisabled}
            onClick={handleConfirm}
            variant="contained"
          >
            Valider
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlarmModal;
