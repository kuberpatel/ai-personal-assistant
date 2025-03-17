"use client"
import React, { useState, useEffect } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { AuthContext } from '@/context/AuthContext';
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

// Define a type for your user
interface User {
  picture?: string;
  name?: string;
  email?: string;
  // add other user properties you need
}

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
     const [user, setUser] = useState<User | null>(null); 
     const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

     useEffect(() => {
       // 1. Check if we have a saved token
       const token = localStorage.getItem('user_token');
       
       if (token) {
         const getUserData = async () => {
           try {
             // 2. Use token to get fresh user data from Google
             const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
               headers: {
                 Authorization: `Bearer ${token}`,
               },
             });
             const userData = await response.json();
             
             // 3. If we got user data, save it to React state
             if (userData) {
               setUser({
                 name: userData.name,
                 email: userData.email,
                 picture: userData.picture
               });
             }
           } catch (error) {
             // 4. If something goes wrong, remove the bad token
             console.error('Error fetching user data:', error);
             localStorage.removeItem('user_token');
           }
         };
         getUserData();
       }
     }, []); // Empty array means this runs once when component loads

     return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <ConvexProvider client={convex}>
        <AuthContext.Provider value={{user, setUser}}>
          {/* @ts-ignore -- NextThemesProvider types issue */}
          <NextThemesProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </NextThemesProvider>
        </AuthContext.Provider>
      </ConvexProvider>
    </GoogleOAuthProvider>
  );
}

export default Provider;
