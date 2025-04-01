import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logo } from '../types';

const LOGOS_STORAGE_KEY = '@logos';

export async function saveLogoToStorage(logo: Logo): Promise<void> {
  try {
    const existingLogosString = await AsyncStorage.getItem(LOGOS_STORAGE_KEY);
    const existingLogos: Logo[] = existingLogosString ? JSON.parse(existingLogosString) : [];
    
    const updatedLogos = [logo, ...existingLogos];
    await AsyncStorage.setItem(LOGOS_STORAGE_KEY, JSON.stringify(updatedLogos));
  } catch (error) {
    console.error('Error saving logo to storage:', error);
    throw error;
  }
}

export async function getLogosFromStorage(): Promise<Logo[]> {
  try {
    const logosString = await AsyncStorage.getItem(LOGOS_STORAGE_KEY);
    return logosString ? JSON.parse(logosString) : [];
  } catch (error) {
    console.error('Error getting logos from storage:', error);
    return [];
  }
}

export async function clearLogosFromStorage(): Promise<void> {
  try {
    await AsyncStorage.removeItem(LOGOS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing logos from storage:', error);
    throw error;
  }
} 