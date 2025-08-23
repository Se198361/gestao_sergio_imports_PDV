import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import NeuCard from '../Layout/NeuCard';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Sales() {
  const { darkMode, sales } = useApp();

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NeuCard darkMode={darkMode} neonBorder>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 animate-glow">
            Relatório de Vendas
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Visualize o histórico de todas as vendas realizadas.
          </p>
        </div>
      </NeuCard>

      <NeuCard darkMode={darkMode}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">ID Venda</th>
                <th scope="col" className="px-6 py-3">Data</th>
                <th scope="col" className="px-6 py-3">Itens</th>
                <th scope="col" className="px-6 py-3">Total</th>
                <th scope="col" className="px-6 py-3">Pagamento</th>
              </tr>
            </thead>
            <tbody>
              {sales.sort((a, b) => new Date(b.date) - new Date(a.date)).map((sale) => (
                <motion.tr
                  key={sale.id}
                  className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  layout
                >
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    #{sale.id}
                  </th>
                  <td className="px-6 py-4">{format(new Date(sale.date), "dd/MM/yyyy HH:mm", { locale: ptBR })}</td>
                  <td className="px-6 py-4">{sale.items.reduce((acc, item) => acc + item.quantity, 0)}</td>
                  <td className="px-6 py-4 font-bold">{sale.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td className="px-6 py-4">{sale.paymentMethod}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {sales.length === 0 && (
            <div className="text-center py-8">
              <BarChart3 className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Nenhuma venda registrada.</p>
            </div>
          )}
        </div>
      </NeuCard>
    </motion.div>
  );
}
