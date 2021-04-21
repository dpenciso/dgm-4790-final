const { PrismaClient } = require('@prisma/client')
const zelda_places = require('./zelda_places.json')

const prisma = new PrismaClient()

async function loadZeldaPlaces() {
  const allPlaces = zelda_places['data']
  return allPlaces.map((places) => {
    return {
      data: {
        name: places.name,
        description: places.description,
      },
    }
  })
}

async function main() {
  const allPlaces = await loadZeldaPlaces()
  for (const places of allPlaces) {
    try {
      await prisma.places.create(places)
    } catch (error) {
      console.log(`error creating place: ${error}`)
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