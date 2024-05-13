const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getCandidates(req, res) {
  try {
    const candidates = await prisma.candidate.findMany();
    res.json(candidates);
  } catch (error) {
    handleError(res, error);
  }
}

async function createCandidate(req, res) {
  const { firstName, lastName, email, phone, address, education, experience } = req.body;
  try {
    const candidate = await prisma.candidate.create({
      data: { firstName, lastName, email, phone, address, education, experience }
    });
    res.status(201).json(candidate);
  } catch (error) {
    handleError(res, error);
  }
}

async function getCandidate(req, res) {
  const id = parseInt(req.params.id);
  try {
    const candidate = await prisma.candidate.findUnique({
      where: { id }
    });
    if (candidate) {
      res.json(candidate);
    } else {
      res.status(404).send('Candidate not found');
    }
  } catch (error) {
    handleError(res, error);
  }
}

async function updateCandidate(req, res) {
  const id = parseInt(req.params.id);
  const { firstName, lastName, email, phoneNumber } = req.body;
  try {
    const candidate = await prisma.candidate.update({
      where: { id },
      data: { firstName, lastName, email, phoneNumber }
    });
    res.json(candidate);
  } catch (error) {
    handleError(res, error);
  }
}

async function deleteCandidate(req, res) {
  const id = parseInt(req.params.id);
  try {
    await prisma.candidate.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
}

const { PrismaClient } = require('@prisma/client');

async function testDatabaseConnection(req, res) {
  try {
    const users = await prisma.user.findMany(); // Make sure 'user' matches your Prisma schema
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    res.status(500).json({ error: "Failed to connect to the database" });
  }
}

function handleError(res, error) {
  res.status(500).json({ error: error.message });
}

module.exports = {
  getCandidates,
  createCandidate,
  getCandidate,
  updateCandidate,
  deleteCandidate
};
