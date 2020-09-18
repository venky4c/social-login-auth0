import createAuth0Client from "@auth0/auth0-spa-js";
import React, { useState, useEffect, createContext } from "react";

export const Auth0Context = createContext();

export function Auth0Provider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [auth0Client, setAuth0Client] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initAuth0();
    async function initAuth0() {
      // wrap inside an async fn as it has an await
      const auth0 = await createAuth0Client({
        // pass a client object
        domain: "dev-rjn0mx5q.us.auth0.com",
        client_id: "i4pWu1TjXhbZY5U6FyPHnEvyc0b5yw0n",
        //redirect_uri: window.location.origin,
      });
      console.log("auth0:", auth0);
      setAuth0Client(auth0);

      //handle redirect when user comes back

      //check if a user is authenticated and set it to state
      const isAuthenticated = await auth0.isAuthenticated();
      console.log("isAuthenticated:", isAuthenticated);

      setIsAuthenticated(isAuthenticated);

      //check if authenticated go grab the user  and set it to state
      if (isAuthenticated) {
        const user = await auth0.getUser();
        setUser(user);
      }
      setIsLoading(false);
    }
  }, []); //pass an empty array to make sure it runs only once
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        // login: (...p) => auth0Client.loginWithRedirect(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
}
