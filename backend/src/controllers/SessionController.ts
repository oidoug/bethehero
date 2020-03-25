import { Request, Response } from 'express';
import { connection } from '../database/connection';

export default class SessionController {
  static async create(req: Request, res: Response) {
    const { id } = req.body;
    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first();

    if (!ong) {
      return res.status(400).json({ error: "No ONG found with provided ID." });
    }

    return res.json(ong);
  }
}