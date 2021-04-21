const {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
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

    // t.field('togglePublishPost', {
    //   type: 'Post',
    //   args: {
    //     id: nonNull(intArg()),
    //   },
    //   resolve: async (_, args, context) => {
    //     const post = await context.prisma.post.findUnique({
    //       where: { id: args.id || undefined },
    //       select: {
    //         published: true,
    //       },
    //     })

    //     if (!post) {
    //       throw new Error(
    //         `Post with ID ${args.id} does not exist in the database.`,
    //       )
    //     }

    //     return context.prisma.post.update({
    //       where: { id: args.id || undefined },
    //       data: { published: !post.published },
    //     })
    //   },
    // })

    // t.field('incrementPostViewCount', {
    //   type: 'Post',
    //   args: {
    //     id: nonNull(intArg()),
    //   },
    //   resolve: (_, args, context) => {
    //     return context.prisma.post.update({
    //       where: { id: args.id || undefined },
    //       data: {
    //         viewCount: {
    //           increment: 1,
    //         },
    //       },
    //     })
    //   },
    // })

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

// const SortOrder = enumType({
//   name: 'SortOrder',
//   members: ['asc', 'desc'],
// })

// const PostOrderByUpdatedAtInput = inputObjectType({
//   name: 'PostOrderByUpdatedAtInput',
//   definition(t) {
//     t.nonNull.field('updatedAt', { type: 'SortOrder' })
//   },
// })

// const UserUniqueInput = inputObjectType({
//   name: 'UserUniqueInput',
//   definition(t) {
//     t.int('id')
//     t.string('email')
//   },
// })

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
    // UserUniqueInput,
    PlaceCreateInput,
    CharacterCreateInput,
    // SortOrder,
    // PostOrderByUpdatedAtInput,
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
