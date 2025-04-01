import React, { useState, useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogoProvider } from "./src/contexts/LogoContext";
import { AppNavigator } from "./src/navigation/app-navigator";
import { SplashScreen } from "./src/screens/splash-screen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const onSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <SafeAreaProvider>
      <LogoProvider>
        {showSplash ? (
          <SplashScreen onFinish={onSplashFinish} />
        ) : (
          <AppNavigator />
        )}
      </LogoProvider>
    </SafeAreaProvider>
  );
}
