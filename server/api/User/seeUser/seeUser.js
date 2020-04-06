import { prisma } from '../../../../generated/prisma-client'

export default {
  Query: {
    seeUser: async (_, args) => {
      const { userName } = args
      return prisma.user({ userName })
    },
  },
}
