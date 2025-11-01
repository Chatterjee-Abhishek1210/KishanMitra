import { createContext, useContext, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  email: string;
  uid: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading] = useState(false);
  const { toast } = useToast();

  const signUp = async (email: string, password: string, name: string) => {
    // TODO: Implement Firebase authentication
    toast({
      title: "Account created!",
      description: "Welcome to AI-Kisan (Demo mode)",
    });
    setUser({ email, uid: '123' });
  };

  const signIn = async (email: string, password: string) => {
    // TODO: Implement Firebase authentication
    toast({
      title: "Welcome back!",
      description: "Successfully signed in (Demo mode)",
    });
    setUser({ email, uid: '123' });
  };

  const signInWithGoogle = async () => {
    // TODO: Implement Firebase Google authentication
    toast({
      title: "Welcome!",
      description: "Successfully signed in with Google (Demo mode)",
    });
    setUser({ email: 'demo@example.com', uid: '123' });
  };

  const logout = async () => {
    setUser(null);
    toast({
      title: "Goodbye!",
      description: "Successfully signed out",
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
