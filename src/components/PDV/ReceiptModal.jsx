import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReactToPrint } from 'react-to-print';
import { X, Printer } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import NeuCard from '../Layout/NeuCard';
import NeuButton from '../Layout/NeuButton';
import Receipt from './Receipt';

export default function ReceiptModal({ sale, onClose }) {
  const { darkMode } = useApp();
  const componentToPrintRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentToPrintRef.current,
    documentTitle: `Recibo-Venda-${sale.id}`,
    pageStyle: `
      @page {
        size: 80mm auto;
        margin: 5mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }
      }
    `,
  });

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <NeuCard darkMode={darkMode}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Recibo da Venda
              </h2>
              <button onClick={onClose} className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Hidden component for printing */}
            <div className="hidden">
              <Receipt sale={sale} ref={componentToPrintRef} />
            </div>

            {/* Visible component for user */}
            <div className="max-h-[60vh] overflow-y-auto mb-6 p-2 bg-gray-200 dark:bg-gray-800 rounded-lg">
              <Receipt sale={sale} />
            </div>

            <div className="flex space-x-4">
              <NeuButton darkMode={darkMode} variant="secondary" onClick={onClose} className="flex-1">
                Fechar
              </NeuButton>
              <NeuButton 
                darkMode={darkMode} 
                variant="primary" 
                onClick={handlePrint} 
                className="flex-1"
              >
                <Printer className="w-4 h-4 mr-2" />
                Imprimir
              </NeuButton>
            </div>
          </NeuCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
