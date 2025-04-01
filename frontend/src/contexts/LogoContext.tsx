import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, AppAction, Logo } from '../types';
import { getLogosFromStorage } from '../utils/storage';
import { ENDPOINTS } from '../utils/config';

const initialState: AppState = {
  logos: [],
  isLoading: false,
  error: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_LOGO':
      return {
        ...state,
        logos: [action.payload, ...state.logos],
      };
    case 'SET_LOGOS':
      return {
        ...state,
        logos: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

interface LogoContextProps {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  generateLogo: (prompt: string) => Promise<string | null>;
}

const LogoContext = createContext<LogoContextProps | undefined>(undefined);

export function LogoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const loadLogos = async () => {
      const savedLogos = await getLogosFromStorage();
      dispatch({ type: 'SET_LOGOS', payload: savedLogos });
    };

    loadLogos();
  }, []);

  const generateLogo = async (prompt: string): Promise<string | null> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const response = await fetch(ENDPOINTS.GENERATE_LOGO, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate logo');
      }

      const data = await response.json();
      
      // Poll for the result
      const maxAttempts = 30;
      let attempts = 0;
      let logoUrl: string | null = null;
      
      while (attempts < maxAttempts) {
        attempts++;
        const statusResponse = await fetch(ENDPOINTS.CHECK_STATUS(data.id));
        const statusData = await statusResponse.json();
        
        if (statusData.status === 'succeeded' && statusData.output && statusData.output.length > 0) {
          logoUrl = statusData.output[0];
          break;
        }
        
        if (statusData.status === 'failed') {
          throw new Error('Logo generation failed');
        }
        
        // Wait 2 seconds before polling again
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      if (!logoUrl) {
        throw new Error('Timeout waiting for logo generation');
      }
      
      return logoUrl;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return null;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <LogoContext.Provider value={{ state, dispatch, generateLogo }}>
      {children}
    </LogoContext.Provider>
  );
}

export function useLogoContext() {
  const context = useContext(LogoContext);
  if (context === undefined) {
    throw new Error('useLogoContext must be used within a LogoProvider');
  }
  return context;
} 