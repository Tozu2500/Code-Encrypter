import React from 'react';
import { Shield } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="w-12 h-12 text-purple-400" />
                <h1 className="text-4xl font-bold text-white">Code Encryption Suite</h1>
            </div>
            <p className="text-purple-200">Secure your code with military-grade encryption</p>
        </div>
    );
};