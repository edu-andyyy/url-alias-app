import React from 'react';
import { Link } from 'react-router-dom';
import { PowerOff, Home } from 'lucide-react';

const LinkInactivePage: React.FC = () => {
  return (
    <div className="py-16 px-6 sm:px-8 flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-50 min-h-[calc(100vh-64px)]">
      <div className="text-center max-w-md p-8">
        <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <PowerOff className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Ссылка деактивирована</h1>
        <p className="text-gray-600 mb-8">
          Эта короткая ссылка была деактивирована владельцем и больше не работает.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            <Home className="w-5 h-5" />
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LinkInactivePage;
