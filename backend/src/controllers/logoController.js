const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

const generateLogo = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    const response = await axios.post(
      'https://api.replicate.com/v1/predictions',
      {
        version: '67ed00e8999fecd32035074fa0f2e9a31ee03b57a8415e6a5e2f93a242ddd8d2',
        input: {
          width: 1024,
          height: 1024,
          prompt: prompt,
          refine: 'no_refiner',
          scheduler: 'K_EULER',
          lora_scale: 0.6,
          num_outputs: 1,
          guidance_scale: 7.5,
          apply_watermark: true,
          high_noise_frac: 0.8,
          negative_prompt: '',
          prompt_strength: 0.8,
          num_inference_steps: 50,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json',
          'Prefer': 'wait',
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error generating logo:', error);
    res.status(500).json({ error: 'Failed to generate logo' });
  }
};

const checkLogoStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: 'Prediction ID is required' });
      return;
    }

    const response = await axios.get(
      `https://api.replicate.com/v1/predictions/${id}`,
      {
        headers: {
          Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error checking logo status:', error);
    res.status(500).json({ error: 'Failed to check logo status' });
  }
};

module.exports = {
  generateLogo,
  checkLogoStatus
}; 