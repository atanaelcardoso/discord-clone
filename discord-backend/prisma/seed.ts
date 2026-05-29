import { prisma } from '../src/database.js';

async function seed() {
  console.log('Clearing database...');

  await prisma.message.deleteMany();
  await prisma.role.deleteMany();
  await prisma.channel.deleteMany();
  await prisma.server.deleteMany();
  await prisma.user.deleteMany();

  console.log('Creating users...');

  const john = await prisma.user.create({
    data: {
      id: 1,
      nickname: 'john_doe',
      email: 'john.doe@example.com',
      password: 'hashed_password_123',
    },
  });

  const jane = await prisma.user.create({
    data: {
      id: 2,
      nickname: 'jane_doe',
      email: 'jane.doe@example.com',
      password: 'hashed_password_456',
    },
  });

  console.log('Creating server with roles and channels...');
  await prisma.server.create({
    data: {
      id: 1,
      name: 'Comunidade TypeScript',
      inviteCode: 'ts-community-2026',
      ownerId: john.id, 

      roles: {
        create: [
          { name: 'Admin', color: '#FF0000' },
          { name: 'Mod', color: '#00FF00' },
          { name: 'Dev', color: '#0000FF' }
        ]
      },

      channels: {
        create: [
          {
            id: 1,
            name: 'boas-vindas',
            type: 'TEXT',
            
            messages: {
              create: [
                { content: 'Bem-vindo ao servidor de TypeScript!', userId: john.id },
                { content: 'Obrigado por me receber, John!', userId: jane.id }
              ]
            }
          },
          {
            id: 2,
            name: 'geral',
            type: 'TEXT',
            messages: {
              create: [
                { content: 'Alguém programando em NodeNext hoje?', userId: jane.id }
              ]
            }
          },
          {
            id: 3,
            name: 'Sala de Voz 1',
            type: 'VOICE'
          }
        ]
      }
    },
  });

  console.log('Creating secondary server...');

  await prisma.server.create({
    data: {
      id: 2,
      name: 'Lobby dos Jogos',
      inviteCode: 'lobby-games',
      ownerId: jane.id,

      roles: {
        create: [
          { name: 'MembroVIP', color: '#FFD700' }
        ]
      },

      channels: {
        create: [
          {
            id: 4,
            name: 'chat-geral',
            type: 'TEXT',
            messages: {
              create: [
                { content: 'Bora marcar uma partida mais tarde?', userId: jane.id }
              ]
            }
          },
          {
            id: 5,
            name: 'Duo Queue',
            type: 'VOICE'
          }
        ]
      }
    },
  });
}

seed()
  .then(() => {
    console.log('✅ Seeding completed successfully!');
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error('❌ Error seeding data:', error);
    prisma.$disconnect();
  });