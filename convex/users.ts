import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { parseArgs } from "util";

export const CreateUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        picture: v.string(), 
    },
    handler: async (ctx, args) => {
        //If user already exist in Table
        const user = await ctx.db
            .query("users")
            .filter(q => q.eq(q.field("email"), args.email))
            .collect();

        if (user?.length === 0) {
            //If not Then Only -> Add User
            const data=
             {
                name: args.name,
                email: args.email,
                picture: args.picture,
                credits: 5000, 
            };

            const result = await ctx.db.insert("users", data);
            return result;
        }

        return user[0];
    }
})

export const GetUser=query({
    args:{
        email:v.string()
    },
    handler:async(ctx, args)=>{
        const user = await ctx.db.query('users')
            .filter(q => q.eq(q.field("email"), args.email))
            .collect();
            return user[0]
        

    }
})

export const getUser = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.db.query("users").first();
    return user;
  },
});