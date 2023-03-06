import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';
import { z } from 'zod';

const app = fastify();

const prisma = new PrismaClient(); // Instance of PrismaClient

app.get('/users', async () => {
  console.log(11111111)

  const users = await prisma.user.findMany();

  return { users };
});

app.post('/users', async (request, reply) => {
  const createUserSquema = z.object({
    name: z.string(),
    email: z.string().email()
  });

  const { name, email } = createUserSquema.parse(request.body);

  await prisma.user.create({
    data: {
      name,
      email
    }
  })

  return reply.status(201).send();
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3333

app.listen({
  host: '0.0.0.0',
  port: PORT,
})
.then(() => {
  console.log(`HTTP Server Running on port ${PORT}!`)
});