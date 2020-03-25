import { Request, Response } from 'express';
import { connection } from '../database/connection';
import crypto from 'crypto';

export default class ProfileController {
  static async index(req: Request, res: Response) {
    const ongId = req.headers.authorization;

    const incidents = await connection('incidents')
      .where('ong_id', ongId)
      .select('*');

    return res.json(incidents);
  }
};
