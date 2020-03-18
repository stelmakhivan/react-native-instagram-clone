import { prisma } from '../../../../generated/prisma-client'
export default {
  Query: {
    seeFullPost: (_, args) => {
      const { id } = args
      return prisma.post({ id })
    }
  }
}
