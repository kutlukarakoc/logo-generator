import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { Logo } from '../types';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { Ionicons } from '@expo/vector-icons';

interface LogoModalProps {
  visible: boolean;
  logo: Logo | null;
  onClose: () => void;
}

export function LogoModal({ visible, logo, onClose }: LogoModalProps) {
  if (!logo) return null;

  const downloadLogo = async () => {
    try {
      // Get current permission status
      const { status } = await MediaLibrary.getPermissionsAsync();
      
      // If we don't have permission, directly request system permission
      if (status !== 'granted') {
        const { status: newStatus } = await MediaLibrary.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          Alert.alert('Permission denied', 'Unable to save logo without gallery permission.');
          return;
        }
      }
      
      // Proceed with download after permission is granted
      saveToGallery();
    } catch (error) {
      console.error('Error checking permissions:', error);
      Alert.alert('Error', 'An error occurred while checking permissions.');
    }
  };

  const saveToGallery = async () => {
    try {
      // Create a file name
      const fileName = `logo-${logo.id}.png`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      // Download the image
      const downloadResult = await FileSystem.downloadAsync(
        logo.imageUrl,
        fileUri
      );

      if (downloadResult.status === 200) {
        // Save to media library
        await MediaLibrary.createAssetAsync(downloadResult.uri);
        Alert.alert('Success!', 'Logo saved to your gallery');
      } else {
        Alert.alert('Error', 'Failed to download the logo');
      }
    } catch (error) {
      console.error('Error saving logo to gallery:', error);
      Alert.alert('Error', 'An error occurred while saving the logo');
    }
  };

  const shareLogo = async () => {
    try {
      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        alert('Sharing is not available on this device');
        return;
      }

      // Create a temporary file
      const fileName = `logo-${logo.id}.png`;
      const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

      // Download the image
      const downloadResult = await FileSystem.downloadAsync(
        logo.imageUrl,
        fileUri
      );

      if (downloadResult.status === 200) {
        // Share the image
        await Sharing.shareAsync(fileUri, {
          mimeType: 'image/png',
          dialogTitle: 'Share your logo',
        });
      } else {
        alert('Error: Failed to prepare logo for sharing');
      }
    } catch (error) {
      console.error('Error sharing logo:', error);
      alert('Error: An error occurred while sharing the logo');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Your Logo is Ready!</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close-circle" size={28} color="#6c5ce7" />
            </Pressable>
          </View>
          
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: logo.imageUrl }} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          
          <Text style={styles.prompt}>{logo.prompt}</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={downloadLogo}>
              <Ionicons name="download-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>Download</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={shareLogo}>
              <Ionicons name="share-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.createNewButton} 
            onPress={onClose}
          >
            <Text style={styles.createNewText}>Create Another Logo</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.9,
    maxWidth: 500,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  logoContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  prompt: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    backgroundColor: '#6c5ce7',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  createNewButton: {
    borderWidth: 1,
    borderColor: '#6c5ce7',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  createNewText: {
    color: '#6c5ce7',
    fontWeight: '600',
  },
}); 