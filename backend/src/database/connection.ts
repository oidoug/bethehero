import knex from 'knex';
import configuration from '../../knexfile';

export const connection = knex(configuration.development);