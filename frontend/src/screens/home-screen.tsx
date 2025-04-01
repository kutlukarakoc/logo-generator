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
import { StyleSelector } from '../components/style-selector';
import { LogoModal } from '../components/logo-modal';
import { saveLogoToStorage } from '../utils/storage';
import { Logo, LogoStyle, LogoStyleDescriptions } from '../types';
import { LinearGradient } from 'expo-linear-gradient';

export function HomeScreen() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<LogoStyle | null>(null);
  const { state, generateLogo } = useLogoContext();
  const [currentLogo, setCurrentLogo] = useState<Logo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectStyle = (style: LogoStyle) => {
    setSelectedStyle(style);
  };

  const handleGenerateLogo = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt');
      return;
    }

    try {
      // Create the prompt based on whether a style is selected
      let fullPrompt = '';
      
      if (selectedStyle) {
        // If style is selected, append the style description
        const styleDescription = LogoStyleDescriptions[selectedStyle];
        fullPrompt = `${prompt}. ${styleDescription}`;
      } else {
        // If no style is selected, just add a generic logo design suffix
        fullPrompt = `${prompt}. Logo design`;
      }
      
      const logoUrl = await generateLogo(fullPrompt);
      
      if (logoUrl) {
        const newLogo: Logo = {
          id: Date.now().toString(),
          prompt: prompt,
          imageUrl: logoUrl,
          createdAt: new Date().toISOString(),
          style: selectedStyle || undefined,
        };
        
        setCurrentLogo(newLogo);
        await saveLogoToStorage(newLogo);
        
        // Show the modal with the generated logo
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error in handleGenerateLogo:', error);
    }
  };
  
  const handleCloseModal = () => {
    setModalVisible(false);
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
            <Text style={styles.inputLabel}>Your Logo Idea</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your brand name, industry, and the elements you want to appear in the logo."
              value={prompt}
              onChangeText={setPrompt}
              multiline
              numberOfLines={3}
              maxLength={200}
            />
          </View>
          
          <StyleSelector 
            selectedStyle={selectedStyle}
            onSelectStyle={handleSelectStyle}
          />
          
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={handleGenerateLogo}
            disabled={state.isLoading}
            style={styles.generateButtonContainer}
          >
            <LinearGradient
              colors={['#4299e1', '#805ad5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.generateButton,
                state.isLoading && styles.disabledButton
              ]}
            >
              {state.isLoading ? (
                <ActivityIndicator color="#fff" size="large" />
              ) : (
                <Text style={styles.generateButtonText}>Generate Logo</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
          
          {state.error && (
            <Text style={styles.errorText}>{state.error}</Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      
      <LogoModal 
        visible={modalVisible}
        logo={currentLogo}
        onClose={handleCloseModal}
      />
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
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  input: {
    fontSize: 16,
    backgroundColor: '#f0f2f5',
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  generateButtonContainer: {
    marginTop: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 7,
  },
  generateButton: {
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  disabledButton: {
    opacity: 0.6,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
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