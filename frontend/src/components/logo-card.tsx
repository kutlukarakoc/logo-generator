import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useWindowDimensions } from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { Logo } from "../types";

interface LogoCardProps {
  logo: Logo;
  showPrompt?: boolean;
}

export function LogoCard({ logo, showPrompt = true }: LogoCardProps) {
  const { width } = useWindowDimensions();
  const cardWidth = width > 600 ? 500 : width - 40;

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
        Alert.alert("Success", "Logo saved to your gallery");
      } else {
        Alert.alert("Error", "Failed to download the logo");
      }
    } catch (error) {
      console.error("Error saving logo to gallery:", error);
      Alert.alert("Error", "An error occurred while saving the logo");
    }
  };

  const shareLogo = async () => {
    try {
      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert(
          "Sharing not available",
          "Sharing is not available on this device"
        );
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
          mimeType: "image/png",
          dialogTitle: "Share your logo",
        });
      } else {
        Alert.alert("Error", "Failed to prepare logo for sharing");
      }
    } catch (error) {
      console.error("Error sharing logo:", error);
      Alert.alert("Error", "An error occurred while sharing the logo");
    }
  };

  return (
    <View style={[styles.container, { width: cardWidth }]}>
      <Image
        source={{ uri: logo.imageUrl }}
        style={styles.image}
        resizeMode="contain"
      />

      {showPrompt && (
        <Text style={styles.prompt} numberOfLines={2}>
          {logo.prompt}
        </Text>
      )}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={downloadLogo}>
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={shareLogo}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 250,
    backgroundColor: "#f0f0f0",
  },
  prompt: {
    fontSize: 14,
    color: "#333",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  buttonsContainer: {
    flexDirection: "row",
    padding: 12,
  },
  button: {
    flex: 1,
    backgroundColor: "#3498db",
    paddingVertical: 10,
    borderRadius: 6,
    marginHorizontal: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
