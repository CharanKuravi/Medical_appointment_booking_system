import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function AlphabetPicker({ selectedLetter, onSelectLetter }) {
    return (
        <div className="w-full">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {alphabet.map((letter, index) => (
                    <motion.button
                        key={letter}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02, duration: 0.3 }}
                        onClick={() => onSelectLetter(letter)}
                        className={cn(
                            "w-10 h-10 md:w-12 md:h-12 rounded-xl font-medium text-lg transition-all duration-300",
                            "hover:scale-110 hover:shadow-lg",
                            selectedLetter === letter
                                ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200"
                                : "bg-white text-slate-600 hover:bg-blue-50 border border-slate-100"
                        )}
                    >
                        {letter}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
