import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import User from "@/models/User"
import connectDb from "@/db/connectDb"

export const authOptions = ({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    //signIn callback - used to allow on deny signIn
    async signIn({ user, account, profile}) {
      if (account.provider == 'github' || account.provider == 'google') {
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
            role:"user"
          })
          await newUser.save()
        }
        return true
      }
    },
    //JWT callback for role based access
    async jwt({token,user}){
      await connectDb();

      //run only if login
      if(user){
        const dbUser = await User.findOne({ email: user.email });
        if(dbUser){
          token.role = dbUser.role;
          token.username = dbUser.username;
        }
      }
      
      return token;
    },
    //session callback - used to sync users to db
    async session({session, user, token}) {

      await connectDb();

    const dbUser = await User.findOne({email: session.user.email})
    session.user.role = token.role;
    session.user.name = dbUser.username
    return session
  }
  }
  
})

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };