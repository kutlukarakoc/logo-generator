export interface Logo {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
  style?: LogoStyle;
}

export enum LogoStyle {
  SIGNATURE = "signature",
  MASCOT = "mascot",
  CLASSIC = "classic",
  GRUNGE = "grunge",
  TEXT_LOGO = "textLogo",
  MINIMALIST = "minimalist",
  GEOMETRIC = "geometric",
  FUTURISTIC = "futuristic",
  ELEGANT = "elegant",
  ABSTRACT = "abstract",
  CORPORATE = "corporate",
  HAND_DRAWN = "handDrawn",
  SYMBOLIC = "symbolic",
  VINTAGE = "vintage",
  ART_DECO = "artDeco",
  MODERN = "modern",
  MONOGRAM = "monogram",
  NEON = "neon",
  GRADIENT = "gradient",
  HOLOGRAPHIC = "holographic",
  VIBRANT = "vibrant",
  COLORFUL_3D = "colorful3D",
  POP_ART = "popArt"
}

export const LogoStyleDescriptions: Record<LogoStyle, string> = {
  [LogoStyle.SIGNATURE]: "Create a handwritten signature-style logo with fluid, elegant lines and natural pen strokes",
  [LogoStyle.MASCOT]: "Design a mascot logo with a character or animal that represents the brand's personality",
  [LogoStyle.CLASSIC]: "Create a timeless classic logo with balanced proportions and traditional elements",
  [LogoStyle.GRUNGE]: "Design a distressed grunge-style logo with rough textures and raw, edgy aesthetics",
  [LogoStyle.TEXT_LOGO]: "Create a typography-focused logo with creatively arranged letters and custom fonts",
  [LogoStyle.MINIMALIST]: "Design a minimalist logo with clean lines, simple shapes, and plenty of negative space",
  [LogoStyle.GEOMETRIC]: "Create a geometric logo with precise shapes, patterns, and mathematical harmony",
  [LogoStyle.FUTURISTIC]: "Design a forward-thinking futuristic logo with innovative shapes and cutting-edge aesthetics",
  [LogoStyle.ELEGANT]: "Create a sophisticated elegant logo with refined typography, graceful curves, and luxurious details",
  [LogoStyle.ABSTRACT]: "Minimalist abstract logo, sleek and modern design, geometric shapes, smooth curves, bold and clean lines, high contrast, simple yet unique composition, vector-based, professional and elegant, no text, no background, balanced symmetry, creative and artistic approach, harmonious color palette, futuristic and innovative feel",
  [LogoStyle.CORPORATE]: "Create a professional corporate logo with clean lines, balanced composition, and trustworthy appearance",
  [LogoStyle.HAND_DRAWN]: "Design a hand-drawn logo with authentic sketched elements, organic imperfections, and artistic charm",
  [LogoStyle.SYMBOLIC]: "Create a symbolic logo with meaningful iconography that represents core brand values",
  [LogoStyle.VINTAGE]: "Design a vintage logo with retro elements, nostalgic colors, and traditional craftsmanship",
  [LogoStyle.ART_DECO]: "Create an Art Deco style logo with geometric patterns, bold shapes, and 1920s-inspired elegance",
  [LogoStyle.MODERN]: "Design a contemporary modern logo with current design trends and progressive aesthetics",
  [LogoStyle.MONOGRAM]: "Create a monogram logo with stylized initials or letter combinations arranged in a distinctive, memorable way",
  [LogoStyle.NEON]: "Design a vibrant neon logo with glowing effects, bright colors, and electric luminescence that stands out on dark backgrounds",
  [LogoStyle.GRADIENT]: "Create a modern gradient logo with smooth color transitions, flowing hues, and contemporary color combinations that create depth and dimension",
  [LogoStyle.HOLOGRAPHIC]: "Design a holographic style logo with iridescent colors, prismatic effects, and color-shifting elements that create a futuristic and premium appearance",
  [LogoStyle.VIBRANT]: "Create a logo with bold, saturated colors, high contrast, and energetic elements that convey enthusiasm and excitement",
  [LogoStyle.COLORFUL_3D]: "Design a three-dimensional logo with colorful elements, realistic shadows, highlights, and depth that make it pop out visually",
  [LogoStyle.POP_ART]: "Create a pop art inspired logo with bold outlines, comic-like elements, bright colors, and retro patterns reminiscent of 1960s pop culture"
};

export interface LogoGenerationResponse {
  id: string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed';
  output?: string[];
  error?: string;
}

export interface AppState {
  logos: Logo[];
  isLoading: boolean;
  error: string | null;
}

export type AppAction = 
  | { type: 'ADD_LOGO'; payload: Logo }
  | { type: 'SET_LOGOS'; payload: Logo[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }; 