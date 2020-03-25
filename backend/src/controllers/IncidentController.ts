import { Request, Response } from 'express';
import { connection } from '../database/connection';
import crypto from 'crypto';

export default class IncidentController {
  static async index(req: Request, res: Response) {
    const { page = 1 } = req.query;
    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);

    const [count] = await connection('incidents').count();
    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  }

  static async create(req: Request, res: Response) {
    const { title, description, value } = req.body;
    const ongId = req.headers.authorization;

    const [id] = await connection('incidents').insert({
      title, description, value,
      ong_id: ongId,
    });

    return res.json({ id });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const ongId = req.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ongId) {
      return res.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  }
};
