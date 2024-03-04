import { Constants } from '@/config/constants';

export class AccountApi {
  static async getEvaluations(
    accessToken: string, 
    nameOfLecture: string,
    nameOfProfessor: string
  ): Promise<unknown> {
    try {
      const res = await fetch(`${Constants.serverAddress}/evaluation/${nameOfLecture}/${nameOfProfessor}`, {
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

  static async createEvaluation(accessToken: string, evaluation: {
    nameOfLecture: string;
    nameOfProfessor: string;
    totalRate: number;
    assignmentRate: number;
    markRate: number;
  }): Promise<void> {
    try {
      await fetch(`${Constants.serverAddress}/evaluation/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + accessToken,
        },
        credentials: 'include',
        body: JSON.stringify(evaluation),
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
