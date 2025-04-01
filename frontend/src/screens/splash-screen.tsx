import React, { useEffect, useRef, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getLogosFromStorage } from '../utils/storage';
import { useLogoContext } from '../contexts/LogoContext';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const titleFadeAnim = useRef(new Animated.Value(0)).current;
  const subtitleFadeAnim = useRef(new Animated.Value(0)).current;
  const { dispatch } = useLogoContext();

  useEffect(() => {
    // Start animations in sequence
    Animated.sequence([
      // First animate the logo
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        })
      ]),
      // Then fade in the title
      Animated.timing(titleFadeAnim, {
        toValue: 1,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),
      // Then fade in the subtitle
      Animated.timing(subtitleFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
    
    // Load data from AsyncStorage
    const loadData = async () => {
      try {
        // Fetch saved logos from storage
        const savedLogos = await getLogosFromStorage();
        dispatch({ type: 'SET_LOGOS', payload: savedLogos || [] });
        
        // Use a minimum timeout to ensure animations complete
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        // Finish splash screen
        onFinish();
      } catch (error) {
        console.error('Error loading data:', error);
        // Even if there's an error, continue to the app
        onFinish();
      }
    };
    
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View 
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <LinearGradient
            colors={['#4299e1', '#805ad5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoCircle}
          >
            <Text style={styles.logoText}>LG</Text>
          </LinearGradient>
        </Animated.View>
        
        <Animated.Text style={[
          styles.title,
          { opacity: titleFadeAnim }
        ]}>
          Logo Generator
        </Animated.Text>
        
        <Animated.Text style={[
          styles.subtitle,
          { opacity: subtitleFadeAnim }
        ]}>
          Create amazing logos with AI
        </Animated.Text>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6c5ce7', // Mor arka plan rengi
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff', // Beyaz yazı rengi
    marginBottom: 12,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    color: '#f8f9fa', // Daha açık renk yazı
    textAlign: 'center',
  },
}); 