import { Constants } from '@/config/constants';

export class AccountApi {
  static async getAccessToken(): Promise<void> {
    try {
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
