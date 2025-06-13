"use server";
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export async function getData() {
    try {
        const data = await prisma.user.findMany();
        return data;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Failed to fetch data');
    }
}