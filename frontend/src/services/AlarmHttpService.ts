import axios from "axios";
import { Alarm } from "../utils/Alarm";

class AlarmHttpService {
  baseUrl: string;
  constructor() {
    this.baseUrl = "http://localhost:3001"; // Remplacez ceci par l'URL de votre backend
  }

  async fetchData(endpoint: string): Promise<Alarm[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/${endpoint}`);
      return response.data.map((alarm: any) => ({
        ...alarm,
        time: new Date(alarm.time),
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async postData(endpoint: string, alarm: Alarm) {
    try {
      const response = await axios.post(`${this.baseUrl}/${endpoint}`, alarm);
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  }

  async patchData(endpoint: string, alarm: Alarm) {
    try {
      const response = await axios.patch(
        `${this.baseUrl}/${endpoint}/${alarm._id}`,
        (({ _id, ...rest }) => rest)(alarm)
      );
      return response.data;
    } catch (error) {
      console.error("Error patching data:", error);
      throw error;
    }
  }
}

const alarmHttpService = new AlarmHttpService();
export default alarmHttpService;
