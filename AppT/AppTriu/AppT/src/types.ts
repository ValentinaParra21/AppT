export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
    Home: undefined; 
    Menu: undefined;
    Pedidos: undefined;
    Reservas: undefined; 
    Register: undefined;
  };
  
  export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    user: any | null;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface LoginResponse {
    token: string;
    user: any;
  }
  
  export interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
  }
