import { Constants } from "@/config/constants";

export class LectureApi {
  static async loadLectures(
    dto: {
      name?: string,
      professor?: string,
      major?: string,
      campusName?: string,
      category?: string,
      group?: string,
      lectureNumber?: string,
      grade?: string,
      query?: string,
    }
  ): Promise<Record<string, string>[]> {
    const query = new URLSearchParams(dto).toString().replace(/(?:\&|^)[^\&]*?\=(?=\&|$)/g, '');
    try {
        const res = await fetch(`${Constants.serverAddress}/lecture/search?${query}`, {
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
