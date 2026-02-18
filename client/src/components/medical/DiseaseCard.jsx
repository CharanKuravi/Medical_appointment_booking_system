import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DiseaseCard({ disease, isSelected, onClick }) {
    return (
        <motion.button
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            whileHover={{ x: 4 }}
            onClick={onClick}
            className={cn(
                "w-full text-left p-4 md:p-5 rounded-2xl transition-all duration-300",
                "border group",
                isSelected
                    ? "bg-gradient-to-r from-blue-50 to-blue-100/50 border-blue-200 shadow-md"
                    : "bg-white border-slate-100 hover:border-blue-100 hover:shadow-sm"
            )}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                        isSelected
                            ? "bg-blue-500 text-white"
                            : "bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500"
                    )}>
                        <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className={cn(
                            "font-semibold transition-colors",
                            isSelected ? "text-blue-700" : "text-slate-800"
                        )}>
                            {disease.name}
                        </h3>
                        <p className="text-sm text-slate-500 line-clamp-1">
                            {disease.description}
                        </p>
                    </div>
                </div>
                <ChevronRight className={cn(
                    "w-5 h-5 transition-all",
                    isSelected
                        ? "text-blue-500 rotate-90"
                        : "text-slate-300 group-hover:text-blue-400"
                )} />
            </div>
        </motion.button>
    );
}
