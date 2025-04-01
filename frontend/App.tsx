import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogoProvider } from './src/contexts/LogoContext';
import { AppNavigator } from './src/navigation/app-navigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <LogoProvider>
        <AppNavigator />
      </LogoProvider>
    </SafeAreaProvider>
  );
}
