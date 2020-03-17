import { prisma } from '../../../../generated/prisma-client'
export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request)
      const { userName, email, firstName, lastName, bio, avatar } = args
      const { user } = request
      const updatedUser = await prisma.updateUser({
        where: { id: user.id },
        data: {
          userName,
          email,
          firstName,
          lastName,
          bio,
          avatar,
        },
      })
      return updatedUser
    },
  },
}
