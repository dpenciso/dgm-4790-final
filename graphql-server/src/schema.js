const {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  inputObjectType,
  arg,
  asNexusMethod,
} = require('nexus')
const { DateTimeResolver } = require('graphql-scalars')

const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allCharacters', {
      type: 'Character',
      resolve: (_parent, _args, context) => {
        return context.prisma.character.findMany()
      },
    })

    t.nonNull.list.nonNull.field('allPlaces', {
      type: 'Places',
      resolve: (_parent, _args, context) => {
        return context.prisma.places.findMany()
      },
    })

    t.nonNull.list.nonNull.field('allBosses', {
      type: 'Bosses',
      resolve: (_parent, _args, context) => {
        return context.prisma.bosses.findMany()
      },
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.field('createPlace', {
      type: 'Places',
      args: {
        data: nonNull(
          arg({
            type: 'PlaceCreateInput',
          }),
        ),
      },
      resolve: (_, args, context) => {
        return context.prisma.place.create({
          data: {
            name: args.data.name,
            description: args.data.description,
          },
        })
      },
    })

    t.field('createCharacter', {
      type: 'Character',
      args: {
        data: nonNull(
          arg({
            type: 'CharacterCreateInput',
          }),
        ),
      },
      resolve: (_, args, context) => {
        return context.prisma.character.create({
          data: {
            name: args.data.name,
            description: args.data.description,
            gender: args.data.gender,
            race: args.data.race,
          },
        })
      },
    })

    t.field('updateCharacter', {
      type: 'Character',
      args: {
        id: nonNull(intArg()),
        data: nonNull(
          arg({
            type: 'CharacterCreateInput',
          }),
        ),
      },
      resolve: (_, args, context) => {
        return context.prisma.character.update({
          where: { id: args.id || undefined },
          data: {
            name: args.data.name,
            description: args.data.description,
            gender: args.data.gender,
            race: args.data.race,
          },
        })
      },
    })

    t.field('deleteCharacter', {
      type: 'Character',
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, args, context) => {
        return context.prisma.character.delete({
          where: { id: args.id },
        })
      },
    })
  },
})

const Character = objectType({
  name: 'Character',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.string('description')
    t.string('gender')
    t.string('race')
  },
})

const Places = objectType({
  name: 'Places',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.string('description')
  },
})

const Bosses = objectType({
  name: 'Bosses',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.string('description')
  },
})

const CharacterCreateInput = inputObjectType({
  name: 'CharacterCreateInput',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.string('description')
    t.string('gender')
    t.string('race')
  },
})

const PlaceCreateInput = inputObjectType({
  name: 'PlaceCreateInput',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.string('description')
  },
})

const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Character,
    Places,
    Bosses,
    PlaceCreateInput,
    CharacterCreateInput,
    DateTime,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})

module.exports = {
  schema: schema,
}
