// Imports
// ========================================================
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { setToken } from "../trpc";

// Root Provider
// ========================================================
const MiddlewareProvider = ({ children }: { children: React.ReactNode }) => {
  // State / Props
  const { user, isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  // Hooks
  useEffect(() => {
    console.log({ user });
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        setToken(token);
      } catch (error) {
        console.error({ error });
        // Uncomment if you want the user to be redirected automatically
        // loginWithRedirect({
        //   appState: {
        //     returnTo: `${window.location.pathname}`
        //   }
        // });
      }
    })();
  }, []);

  // Render
  // - Replace this code if you want the user to be authenticated to access the page
  // if (isLoading || !isAuthenticated) return <><main><div className="p-8"><p>Loading...</p></div></main></>
  if (isLoading) return <><main><div className="p-8"><p>Loading...</p></div></main></>

  // Render
  return <>
    {children}
  </>
};

// Exports
// ========================================================
export default MiddlewareProvider;