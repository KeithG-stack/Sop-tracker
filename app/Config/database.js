//initializes it

import { Sequelize } from 'sequelize';
import 'dotenv/config';

// Set up the Sequelize connection for Neon PostgreSQL
export const neon = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false // Set to console.log to see SQL queries
}); 