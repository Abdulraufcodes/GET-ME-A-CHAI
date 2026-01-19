import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import mongoose from "mongoose"
import User from "@/models/User"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"

export const authOptions = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    //signIn callback - used to allow on deny signIn
    async signIn({ user, account, profile}) {
      if (account.provider == 'github') {
        //connect to the database
        await connectDb();
        // const client = await mongoose.connect('mongodb://localhost:27017/chai') //we have made seperate file to connect to db
        //check if the user already exists in the database
        const currentUser = await User.findOne({ email: user.email })  //the await is imp as it will block the below if block of code

        if (!currentUser) {
          const newUser = new User({
            //create a new user
            email: user.email,
            username: user.email.split("@")[0],
          })
          await newUser.save()
        }
        return true
      }
    },
    //session callback - used to sync users to db
    async session({session, user, token}) {
    const dbUser = await User.findOne({email: session.user.email})
    session.user.name = dbUser.username
    return session
  }
  }
  
})

export { authOptions as GET, authOptions as POST }