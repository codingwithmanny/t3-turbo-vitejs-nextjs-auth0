// Imports
// ========================================================
import { Auth0Provider } from "@auth0/auth0-react";

// Root Provider
// ========================================================
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN || window.AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID || window.AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE || window.AUTH0_AUDIENCE,
      }}
    >
      {children}
    </Auth0Provider>
  );
};

// Exports
// ========================================================
export default AuthProvider;
