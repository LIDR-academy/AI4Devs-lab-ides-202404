const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const candidates = [
        { firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', phoneNumber: '1234567890' },
        { firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@example.com', phoneNumber: '0987654321' }
        // Add more candidates as needed
    ];

    console.log(`Start seeding ...`);
    for (const candidate of candidates) {
        const candidateRecord = await prisma.candidate.create({
            data: candidate,
        });
        console.log(`Created candidate with id: ${candidateRecord.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
    