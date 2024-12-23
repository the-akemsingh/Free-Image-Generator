"use client";

import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import SuggestedPrompts from "@/components/suggested-prompts";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function generateImage() {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}`,
        { prompt },
        { responseType: "blob" }
      );

      const imageBlob = response.data;
      //@ts-ignore
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImageUrl(imageObjectURL);
      setErrorMessage(null);
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while generating the image.");
    } finally {
      setIsLoading(false);
    }
  }

  function downloadImage() {
    if (!imageUrl) return;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "generated-image.png";
    link.click();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="w-full max-w-xl px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-2xl rounded-2xl p-8 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Enter the prompt</h1>
          <p className="text-gray-600 mb-6">
            Unleash your creativity.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <input
              className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a prompt (e.g., 'a beautiful sunset')"
              aria-label="Image prompt"
            />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            onClick={generateImage}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2" size={20} />
                Generating...
              </span>
            ) : (
              "Generate Image"
            )}
          </motion.button>
          <div>
            *This may take some time to generate. But it will be worth the wait :{")"}
          </div>

          <AnimatePresence>
            {imageUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mt-6"
              >
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Generated Image:</h2>
                <img
                  src={imageUrl}
                  alt="Generated Image"
                  className="w-full rounded-lg shadow-md mb-4"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  onClick={downloadImage}
                >
                  Download Image
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {errorMessage && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 mt-4"
            >
              {errorMessage}
            </motion.p>
          )}
          <SuggestedPrompts setPrompt={setPrompt} />
        </motion.div>
      </div>
    </div>
  );
}










// "use client";


// import ExampleGallery from "@/components/example-gallery";
// import React, { useState } from "react";


// export default function Home() {



//     return (
//         <div>
//             <ExampleGallery ></ExampleGallery>
//         </div>
//     );
// }
