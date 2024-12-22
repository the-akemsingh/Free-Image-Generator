"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
                <motion.header 
                    className="hero bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 md:p-12 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Create stunning images with AI
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-lg md:text-xl mb-6"
                    >
                        It's free, unlimited, and no sign-in required!
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-lg md:text-xl mb-6"
                    >
                        Generate any type of image you want without any limitations.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        <Link href="/generate" passHref>
                            <motion.a
                                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-full transition duration-300 hover:bg-purple-100"
                            >
                                Start Generating
                            </motion.a>
                        </Link>
                    </motion.div>
                </motion.header>

                <main className="p-6 md:p-8">
                    <motion.section 
                        className="image-gallery"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center"
                        >
                            AI Image Generator Examples
                        </motion.h2>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            variants={containerVariants}
                        >
                            {exampleImages.map((image, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="gallery-item bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                                    whileHover={{ 
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    <div className="relative">
                                        <Image 
                                            src={image.url} 
                                            alt={image.prompt} 
                                            width={400} 
                                            height={400} 
                                            className="w-full h-56 object-cover"
                                        />
                                        <motion.div 
                                            className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 * index }}
                                        >
                                            {image.category}
                                        </motion.div>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-gray-700 text-sm">{image.prompt}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.section>
                </main>
            </motion.div>
        </div>
    );
}

const exampleImages = [
    {
        prompt: "A man standing on a balcony overlooking NYC at night with city lights bokeh",
        url: "/a_man_standing_on_a_balcony_in_nyc_at_night.png",
        category: "Urban & Architecture"
    },
    {
        prompt: "Professional portrait of a man in casual attire with natural window lighting",
        url: "/a_man.png",
        category: "Portraits"
    },
    {
        prompt: "White Porsche GT3 RS with black racing stripe, architectural background",
        url: "/a_man_standing_near_a_porche_gt3_rs.png",
        category: "Automotive"
    },
    {
        prompt: "An astronaut riding a horse in a desert with floating planets, digital art style",
        url: "/astronaut_riding_a_horse.png",
        category: "Surreal & Creative"
    },
    {
        prompt: "McLaren supercar in orange, parked in Beverly Hills with palm trees at sunset",
        url: "/mc_laren_parked_in_beverly_hills.png",
        category: "Automotive"
    },
    {
        prompt: "Man overlooking Manhattan skyline during sunset from observation deck",
        url: "/a_man_standing_in_a_balcony_overlooking_nyc.png",
        category: "Urban & Architecture"
    }
];