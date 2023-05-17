import NextAuth from 'next-auth'
import { useRouter } from "next/router";
import CredentialsProvider  from 'next-auth/providers/credentials'
//import GoogleProvider from 'next-auth/providers/google'
//import EmailProvider from 'next-auth/providers/email' //Recovery/forgot password link


export default NextAuth({
  providers: [
    // OAuth authentication providers...

    //email/password sign in
    CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Email',
        credentials: {
            username: { label: "Username", type: "text", placeholder: "email" },
            password: { label: "Password", type: "password" }
          },
        async authorize(credentials, req) {
            const res = await fetch("http://localhost:3000/api/loginHelper", {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" }
              });
            const user = await res.json();
            
        
              // If no error and we have user data, return it
              
              if (res.ok && user.data) {
                console.log("user in ...nextAuth");
                console.log(user);

                return user.data;
              }
              // Return null if user data could not be retrieved
              return null
            }
    }),
    
  ],

  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
        token.name = user?.name;
        token.img = user?.img;
        token.fname = user?.fname;
        token.lname = user?.lname;
      }
      return token
    },
    session({ session, token }) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.img = token.img;
        session.user.firstName = token.fname;
        session.user.lastName = token.lname;
        return session;
      },
  }


})