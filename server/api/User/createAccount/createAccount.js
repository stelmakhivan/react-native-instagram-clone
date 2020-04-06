import { prisma } from '../../../../generated/prisma-client'
export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { userName, email, firstName = '', lastName = '', bio = '' } = args
      const exists = await prisma.$exists.user({
        OR: [
          {
            userName,
          },
          { email },
        ],
      })
      if (exists) {
        throw Error('This userName / email is already taken')
      }
      await prisma.createUser({
        userName,
        email,
        firstName,
        lastName,
        bio,
      })
      return true
    },
  },
}
