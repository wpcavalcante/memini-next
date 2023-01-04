import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({

    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret : process.env.GITHUB_CLIENT_SECRET,
        
        }),
    ],

        secret: process.env.NEXT_PUBLIC_SECRET,

       callbacks:{
        async session({session, profile}: any){
            try{
                return{
                    ...session,
                    id:profile.sub
                }
            }
            catch{
                return{
                    ...session,
                    id:null
                }
            }
        },
        async signIn({user, account, profile}: any){
           const {email} = user
           try{
            return true
           }
           catch(error){
            console.log("Ops, algo deu errado:", error)
            return false
           }
        }
    } 
      

})

