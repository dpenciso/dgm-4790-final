const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const characterData = [
  {
    name: 'Link',
    description: 'A Hyrule warrior',
    gender: 'Male',
    race: 'Hylian',
  },
  {
    name: 'Zelda',
    description: 'A Hyrule princess',
    gender: 'Female',
    race: 'Hylian',
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const c of characterData) {
    const character = await prisma.character.create({
      data: c,
    })
    console.log(`Created character with id: ${character.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
