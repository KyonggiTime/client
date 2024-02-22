import { Constants } from '@/config/constants';

export class AccountApi {
  static async getAccessToken(tempToken: string | null): Promise<unknown> {
    try {
      if (tempToken) {
        await fetch(`${Constants.serverAddress}/google/refresh`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'bearer ' + tempToken,
          },
          credentials: 'include',
        });
      }
      const res = await fetch(`${Constants.serverAddress}/google/access`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const body = await res.json();
      return body.accessToken;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getAccount(accessToken: string): Promise<unknown> {
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
        credentials: 'include',
        body: JSON.stringify({
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
        credentials: 'include',
        body: JSON.stringify({
          timetable,
        }),
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
