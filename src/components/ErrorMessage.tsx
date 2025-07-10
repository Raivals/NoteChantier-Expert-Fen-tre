import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="flex items-center mb-4 text-red-600">
        <AlertCircle className="w-8 h-8 mr-2" />
        <h3 className="text-lg font-semibold">Erreur</h3>
      </div>
      <p className="mb-4 text-center text-gray-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Réessayer</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;