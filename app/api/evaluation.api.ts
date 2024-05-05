import { Constants } from '@/config/constants';

export class EvaluationApi {
  static async getEvaluations(
    lecture: string,
    professor: string
  ): Promise<unknown> {
    try {
      const query = new URLSearchParams({
        lecture,
        professor,
      }).toString().replace(/(?:\&|^)[^\&]*?\=(?=\&|$)/g, '');
      const res = await fetch(`${Constants.serverAddress}/evaluation?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
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
    description: string;
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
