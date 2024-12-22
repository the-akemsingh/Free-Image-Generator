"use server"

import axios from 'axios'

export async function GenerateImage(prompt: string) {
  if (!process.env.HF_TOKEN) {
    throw new Error('HF_TOKEN is not configured')
  }

  try {
    console.log(`Generating image for prompt: "${prompt}"...`)

    const response = await axios({
      method: 'post',
      url: 'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev',
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      data: { inputs: prompt },
      responseType: 'arraybuffer',
    })

    //@ts-ignore
    const base64Image = Buffer.from(response.data ).toString('base64');
    const contentType = response.headers['content-type'];

    return { 
      imageBase64: `data:${contentType};base64,${base64Image}` 
    };

  } catch (error) {
    console.error('Error generating image:', error)
    return { 
      error: 'Failed to generate image' 
    }
  }
}