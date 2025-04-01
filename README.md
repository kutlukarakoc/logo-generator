# AI Logo Generator

An AI-powered logo generator application built with React Native, Expo, and Node.js. This application allows users to generate custom logos by providing text prompts. Generated logos can be downloaded, shared, and viewed in a history section.

## Features

- Generate custom logos using AI
- Save generated logos to your device
- Share logos with others
- View history of previously generated logos
- Simple and intuitive interface

## Tech Stack

### Frontend
- React Native
- Expo
- TypeScript
- React Navigation
- AsyncStorage for local storage

### Backend
- Node.js
- Express.js
- TypeScript
- Replicate API for logo generation

## Getting Started

### Prerequisites

- Node.js (v20 or later recommended)
- npm or yarn
- Expo CLI
- Replicate API key (get one from [Replicate](https://replicate.com))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-logo-generator.git
cd ai-logo-generator
```

2. Install dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables:

Create a `.env` file in the backend directory:
```
PORT=3000
REPLICATE_API_TOKEN=your_replicate_api_token
```

4. Start the backend server:

```bash
cd backend
npm run dev
```

5. Start the frontend application:

```bash
cd frontend
npm start
```

6. Scan the QR code with the Expo Go app on your mobile device or run it in an emulator.

## Usage

1. Enter a prompt for your logo in the input field (e.g., "Minimalist tech company logo")
2. Tap "Generate Logo" and wait for the AI to create your logo
3. Once generated, you can download or share the logo
4. View your logo history in the History tab

## License

This project is licensed under the MIT License - see the LICENSE file for details. 