export interface Logo {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
}

export interface LogoGenerationResponse {
  id: string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed';
  output?: string[];
  error?: string;
}

export interface AppState {
  logos: Logo[];
  isLoading: boolean;
  error: string | null;
}

export type AppAction = 
  | { type: 'ADD_LOGO'; payload: Logo }
  | { type: 'SET_LOGOS'; payload: Logo[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }; 