import { PrismaClient } from '@prisma/client';
import { TiposUsuario } from './../src/resources/tipoUsuario/tipoUsuario.constants';
const prisma = new PrismaClient();

async function seed() {
  await prisma.tipoUsuario.createMany({
    data: [
      { id: TiposUsuario.Admin, rotulo: 'admin' },
      { id: TiposUsuario.CLIENT, rotulo: 'client' },
    ],
    skipDuplicates: true
  });
}

seed()
  .then(async () => {
    prisma.$disconnect();
  })
  .catch(async e => {
    console.log(e);
    prisma.$disconnect();
  });
