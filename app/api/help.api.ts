import { Constants } from "@/config/constants";

export class HelpApi {
  static async addHelp(
    dto: {
      title?: string,
      description?: string,
    }
  ): Promise<void> {
    try {
        await fetch(`${Constants.serverAddress}/help`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
            body: JSON.stringify(dto),
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
  }
}
