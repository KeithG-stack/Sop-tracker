import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import { neon } from '../Config/database.js';

// Define the User model
export const User = neon.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { 
    timestamps: true,
    tableName: 'users'
});

async function insertSampleData() {
    try {
        // Check if there are any users
        const userCount = await User.count();
        if (userCount === 0) {
            // Create default user
            const defaultUser = await User.create({
                name: 'Default User',
                email: 'default@example.com',
                password: await bcrypt.hash('password123', 10)
            });
            console.log('Default user created:', defaultUser.id);
        }
    } catch (error) {
        console.error('Error inserting sample data:', error);
    } finally {
        // Close the database connection
        await neon.close();
    }
}

// Export the function as initializeDatabase
export { insertSampleData as initializeDatabase };

