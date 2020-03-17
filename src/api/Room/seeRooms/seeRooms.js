import { isAuthenticated } from '../../../middlewares'
import { prisma } from '../../../../generated/prisma-client'

export default {
  Query: {
    seeRooms: (_, __, { request }) => {
      isAuthenticated(request)
      const { user } = request
      return prisma.rooms({
        where: {
          participants_some: {
            id: user.id,
          },
        },
      })
    },
  },
}
