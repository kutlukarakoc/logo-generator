import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLogoContext } from '../contexts/LogoContext';
import { LogoCard } from '../components/logo-card';
import { saveLogoToStorage } from '../utils/storage';
import { Logo } from '../types';

export function HomeScreen() {
  const [prompt, setPrompt] = useState('');
  const { state, generateLogo } = useLogoContext();
  const [currentLogo, setCurrentLogo] = useState<Logo | null>(null);

  const handleGenerateLogo = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt');
      return;
    }

    try {
      const logoUrl = await generateLogo(prompt);
      
      if (logoUrl) {
        const newLogo: Logo = {
          id: Date.now().toString(),
          prompt: prompt,
          imageUrl: logoUrl,
          createdAt: new Date().toISOString(),
        };
        
        setCurrentLogo(newLogo);
        await saveLogoToStorage(newLogo);
      }
    } catch (error) {
      console.error('Error in handleGenerateLogo:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Logo Generator</Text>
          <Text style={styles.subtitle}>Create beautiful AI-powered logos</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Describe your logo... (e.g., Minimalist tech company logo)"
              value={prompt}
              onChangeText={setPrompt}
              multiline
              numberOfLines={3}
              maxLength={200}
            />
            
            <TouchableOpacity 
              style={[
                styles.generateButton, 
                state.isLoading && styles.disabledButton
              ]}
              onPress={handleGenerateLogo}
              disabled={state.isLoading}
            >
              {state.isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.generateButtonText}>Generate Logo</Text>
              )}
            </TouchableOpacity>
          </View>
          
          {state.error && (
            <Text style={styles.errorText}>{state.error}</Text>
          )}
          
          {currentLogo && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Your Logo</Text>
              <LogoCard logo={currentLogo} />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    backgroundColor: '#f0f2f5',
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  generateButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#95a5a6',
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#e74c3c',
    marginBottom: 16,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 24,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
}); 