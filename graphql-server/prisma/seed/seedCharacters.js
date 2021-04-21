const { PrismaClient } = require('@prisma/client')
const zelda_characters = require('./zelda_characters.json')

const prisma = new PrismaClient()

async function loadZeldaCharacters() {
  const allCharacters = zelda_characters['data']
  return allCharacters.map((chars) => {
    return {
      data: {
        name: chars.name,
        description: chars.description,
        gender: chars.gender,
        race: chars.race,
      },
    }
  })
}

async function main() {
  const allCharacters = await loadZeldaCharacters()
  for (const chars of allCharacters) {
    try {
      await prisma.character.create(chars)
    } catch (error) {
      console.log(`error creating character: ${error}`)
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
