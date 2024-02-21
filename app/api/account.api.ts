import { Constants } from '@/config/constants';

export class AccountApi {
  static async getAccessToken(tempToken: string): Promise<void> {
    try {
      await fetch(`${Constants.serverAddress}/google/refresh`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + tempToken,
        },
        cache: 'no-cache',
        credentials: 'include',
      });
      const res = await fetch(`${Constants.serverAddress}/google/access`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        credentials: 'include',
      });
      const body = await res.json();
      return body.accessToken;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getAccount(accessToken: string): Promise<void> {
    try {
      const res = await fetch(`${Constants.serverAddress}/account`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + accessToken,
        },
        cache: 'no-cache',
        credentials: 'include',
      });
      const body = await res.json();
      return body;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async uploadTimetable(accessToken: string, timetable: string): Promise<void> {
    try {
      await fetch(`${Constants.serverAddress}/account/timetable`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + accessToken,
        },
        cache: 'no-cache',
        credentials: 'include',
        body: new URLSearchParams({
          timetable,
        }),
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async uploadCalculator(accessToken: string, timetable: string): Promise<void> {
    try {
      await fetch(`${Constants.serverAddress}/account/calculator`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + accessToken,
        },
        cache: 'no-cache',
        credentials: 'include',
        body: new URLSearchParams({
          timetable,
        }),
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
