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
      return body.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
