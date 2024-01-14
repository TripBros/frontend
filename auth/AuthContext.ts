import * as React from 'react';

type AuthContextType = {
  signIn: (token: string) => void;
  signOut: () => void;
  userToken: string | null;
};
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export default AuthContext;