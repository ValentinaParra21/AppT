// types.ts

export type User = {
    Correo: string;
    rol: string;
    token: string;
  };
  
  export type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (Correo: string, password: string) => Promise<void>;
    logout: () => void;
    error: string | null;
    clearError: () => void;
  };
  
  // Para React Navigation (Stack Navigation)
  export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    ProtectedScreen: undefined;
  };
  