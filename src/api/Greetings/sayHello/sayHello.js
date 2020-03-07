import { prisma } from '../../../../generated/prisma-client/index'
export default {
  Query: {
    sayHello: async () => {
      console.log(await prisma.users())
      return 'Hello'
    }
  }
}
