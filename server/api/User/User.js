import { prisma } from '../../../generated/prisma-client'
export default {
  User: {
    fullName: parent => `${parent.firstName} ${parent.lastName}`,
    isFollowing: async (parent, _, { request }) => {
      const { user } = request
      const { id: parentId } = parent
      try {
        const exists = await prisma.$exists.user({
          AND: [{ id: user.id }, { following_some: { id: parentId } }]
        })
        return exists
      } catch {
        return false
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request
      const { id: parentId } = parent
      return user.id === parentId
    }
  }
}
