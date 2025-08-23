import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Tag, Printer } from 'lucide-react';
import Barcode from 'react-barcode';
import { useReactToPrint } from 'react-to-print';
import { useApp } from '../../contexts/AppContext';
import NeuCard from '../Layout/NeuCard';
import NeuButton from '../Layout/NeuButton';

export default function Labels() {
  const { darkMode, products, settings } = useApp();
  const printAreaRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printAreaRef.current,
    documentTitle: 'Etiquetas-Produtos',
  });

  return (
    <>
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NeuCard darkMode={darkMode} neonBorder className="print:hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 animate-glow">
                Geração de Etiquetas
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Visualize e imprima as etiquetas dos seus produtos.
              </p>
            </div>
            <NeuButton darkMode={darkMode} neon onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Imprimir Todas
            </NeuButton>
          </div>
        </NeuCard>

        <div ref={printAreaRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {products.map((product) => {
            const barcodeValue = (product.barcode || '').replace(/\D/g, '').slice(0, 12);
            const isValidForEan13 = barcodeValue.length === 12;

            return (
              <div
                key={product.id}
                className="bg-gray-200 rounded-md p-1 shadow-md flex flex-col justify-between items-center text-center text-black"
                style={{ width: '160px', height: '100px', pageBreakInside: 'avoid' }}
              >
                <div>
                  {settings.companyLogo && (
                    <img src={settings.companyLogo} alt="Logo" className="h-4 max-w-full mx-auto mb-1 object-contain" />
                  )}
                  <p className="text-xs font-extrabold w-full leading-tight break-all px-1">
                    {product.name}
                  </p>
                </div>
                
                <div className="w-full my-1 flex-shrink-0">
                  {isValidForEan13 ? (
                    <Barcode 
                      value={barcodeValue} 
                      format="EAN13"
                      width={1.2}
                      height={25}
                      fontSize={10}
                      margin={2}
                      background="transparent"
                    />
                  ) : (
                    <div className="h-[41px] flex items-center justify-center text-red-500 text-[8px] px-2 font-semibold">
                      Código de barras inválido para EAN-13 (precisa de 12 dígitos numéricos).
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <p className="text-lg font-black leading-none">
                    {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
