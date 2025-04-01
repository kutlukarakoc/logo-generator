import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { LogoStyle } from '../types';

interface StyleOption {
  id: LogoStyle;
  name: string;
  image: any; // In a real app, you would use proper image imports
}

// These are placeholder images - in a real implementation, you would use actual style preview images
const styleOptions: StyleOption[] = [
  { id: LogoStyle.HAND_DRAWN, name: 'Hand-drawn', image: require('../../assets/styles/handdrawn.png') },
  { id: LogoStyle.GRUNGE, name: 'Grunge', image: require('../../assets/styles/grunge.png') },
  { id: LogoStyle.VINTAGE, name: 'Vintage', image: require('../../assets/styles/vintage.png') },
  { id: LogoStyle.VIBRANT, name: 'Vibrant', image: require('../../assets/styles/vibrant.png') },
  { id: LogoStyle.SYMBOLIC, name: 'Symbolic', image: require('../../assets/styles/symbolic.png') },
  { id: LogoStyle.ELEGANT, name: 'Elegant', image: require('../../assets/styles/elegant.png') },
  { id: LogoStyle.HOLOGRAPHIC, name: 'Holographic', image: require('../../assets/styles/holographic.png') },
  { id: LogoStyle.TEXT_LOGO, name: 'Text Logo', image: require('../../assets/styles/text.png') },
  { id: LogoStyle.SIGNATURE, name: 'Signature', image: require('../../assets/styles/signature.png') },
  { id: LogoStyle.MASCOT, name: 'Mascot', image: require('../../assets/styles/mascot.png') },
  { id: LogoStyle.CLASSIC, name: 'Classic', image: require('../../assets/styles/classic.png') },
  { id: LogoStyle.MINIMALIST, name: 'Minimalist', image: require('../../assets/styles/minimalist.png') },
  { id: LogoStyle.GEOMETRIC, name: 'Geometric', image: require('../../assets/styles/geometric.png') },
  { id: LogoStyle.FUTURISTIC, name: 'Futuristic', image: require('../../assets/styles/futuristic.png') },
  { id: LogoStyle.ABSTRACT, name: 'Abstract', image: require('../../assets/styles/abstract.png') },
  { id: LogoStyle.CORPORATE, name: 'Corporate', image: require('../../assets/styles/corporate.png') },
  { id: LogoStyle.ART_DECO, name: 'Art Deco', image: require('../../assets/styles/artdeco.png') },
  { id: LogoStyle.MODERN, name: 'Modern', image: require('../../assets/styles/modern.png') },
  { id: LogoStyle.MONOGRAM, name: 'Monogram', image: require('../../assets/styles/monogram.png') },
  { id: LogoStyle.NEON, name: 'Neon', image: require('../../assets/styles/neon.png') },
  { id: LogoStyle.GRADIENT, name: 'Gradient', image: require('../../assets/styles/gradient.png') },
  { id: LogoStyle.COLORFUL_3D, name: '3D Colorful', image: require('../../assets/styles/colorful3d.png') },
  { id: LogoStyle.POP_ART, name: 'Pop Art', image: require('../../assets/styles/popart.png') },
];

interface StyleSelectorProps {
  selectedStyle: LogoStyle | null;
  onSelectStyle: (style: LogoStyle) => void;
}

export function StyleSelector({ selectedStyle, onSelectStyle }: StyleSelectorProps) {
  const { width } = useWindowDimensions();
  const itemSize = 90; // Fixed size for each style option
  const itemMargin = 10;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Select a Style</Text>
      
      <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.styleGrid}
      >
        {styleOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.styleOption,
              { width: itemSize, height: itemSize + 30 }, // Extra height for the text
              selectedStyle === option.id && styles.selectedOption,
            ]}
            onPress={() => onSelectStyle(option.id)}
          >
            <Image
              source={option.image}
              style={styles.styleImage}
              resizeMode="cover"
            />
            <Text style={styles.styleName}>{option.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  styleGrid: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  styleOption: {
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    backgroundColor: '#f4f4f4',
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: '#3498db',
  },
  styleImage: {
    width: '100%',
    height: '70%',
    backgroundColor: '#e0e0e0',
  },
  styleName: {
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 8,
    fontWeight: '500',
  },
}); 