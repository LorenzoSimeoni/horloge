import axios from "axios";
import { Alarm } from "../utils/Alarm";

class AlarmHttpService {
  baseUrl: string;
  endpoint: string;
  constructor() {
    this.baseUrl = "http://localhost:3001"; // Remplacez ceci par l'URL de votre backend
    this.endpoint = "alarms";
  }

  async fetchAlarms(): Promise<Alarm[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.endpoint}`);
      return response.data.map((alarm: any) => ({
        ...alarm,
        time: new Date(alarm.time),
      }));
    } catch (error) {
      console.error("Error fetching alarm:", error);
      throw error;
    }
  }

  async postAlarm(alarm: { name: string; time?: Date; days: string[] }) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/${this.endpoint}`,
        alarm
      );
      return {
        ...response.data,
        time: new Date(response.data.time),
      };
    } catch (error) {
      console.error("Error posting alarm:", error);
      throw error;
    }
  }

  async patchAlarm(alarm: Alarm) {
    try {
      const response = await axios.patch(
        `${this.baseUrl}/${this.endpoint}/${alarm._id}`,
        (({ _id, ...rest }) => rest)(alarm)
      );
      return response.data;
    } catch (error) {
      console.error("Error patching alarm:", error);
      throw error;
    }
  }

  async deleteAlarm(id: string) {
    try {
      const response = await axios.delete(
        `${this.baseUrl}/${this.endpoint}/${id}`
      );
      return response.data._id;
    } catch (error) {
      console.error("Error deleting alarm:", error);
      throw error;
    }
  }
}

const alarmHttpService = new AlarmHttpService();
export default alarmHttpService;
