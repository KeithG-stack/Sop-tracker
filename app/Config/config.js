//connects to databse

import { neon } from './database.js';
import { initializeDatabase } from '../Models/DatabaseCreation.js';
import 'dotenv/config'

// Call the initializeDatabase function
initializeDatabase();

// Connect to the database
export async function connect() {
    
    try {
        await neon.authenticate();
        console.log('Successfully connected to Neon PostgreSQL database');
        
        // Initialize database and create tables
        await initializeDatabase();
        console.log('Database initialization completed');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    }
}
