import { Constants } from "@/config/constants";

export class LectureApi {
  static async loadLectures(condition: Record<string, string>): Promise<Record<string, string>[]> {
    try {
        const res = await fetch(`${Constants.serverAddress}/lecture`, {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-cache'
        });
        const body = await res.json();
        return body.data.lectures;
    } catch (error) {
        console.error(error);
        throw error;
    }
  }
}