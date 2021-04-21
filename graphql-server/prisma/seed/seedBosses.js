const { PrismaClient } = require('@prisma/client')
const zelda_bosses = require('./zelda_bosses.json')

const prisma = new PrismaClient()

async function loadZeldaBosses() {
  const allBosses = zelda_bosses['data']
  return allBosses.map((bosses) => {
    return {
      data: {
        name: bosses.name,
        description: bosses.description,
      },
    }
  })
}

async function main() {
  const allBosses = await loadZeldaBosses()
  for (const bosses of allBosses) {
    try {
      await prisma.bosses.create(bosses)
    } catch (error) {
      console.log(`error creating boss: ${error}`)
    }
  }
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
