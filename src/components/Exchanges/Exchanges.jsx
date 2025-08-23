import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Plus } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import NeuCard from '../Layout/NeuCard';
import NeuButton from '../Layout/NeuButton';
import NeuInput from '../Layout/NeuInput';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const exchangeReasons = [
  'Defeito de fabricação',
  'Tamanho/Modelo incorreto',
  'Não gostei do produto',
  'Outro motivo'
];

const statusOptions = ['Pendente', 'Concluída', 'Cancelada'];

export default function Exchanges() {
  const { darkMode, exchanges, addExchange, updateExchange } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    saleId: '',
    reason: exchangeReasons[0],
    description: '',
    status: 'Pendente'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (id, newStatus) => {
    updateExchange(id, newStatus);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExchange({
      ...formData,
      date: new Date().toISOString(),
    });
    setFormData({ saleId: '', reason: exchangeReasons[0], description: '', status: 'Pendente' });
    setShowForm(false);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NeuCard darkMode={darkMode} neonBorder>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white animate-glow">
              Sistema de Trocas
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Gerencie as trocas de produtos.
            </p>
          </div>
          <NeuButton darkMode={darkMode} neon onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 mr-2" />
            {showForm ? 'Cancelar Troca' : 'Registrar Nova Troca'}
          </NeuButton>
        </div>
      </NeuCard>

      {showForm && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <NeuCard darkMode={darkMode}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-semibold dark:text-white">Nova Troca</h3>
              <NeuInput darkMode={darkMode} label="ID da Venda Original" name="saleId" value={formData.saleId} onChange={handleChange} required />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Motivo</label>
                <select name="reason" value={formData.reason} onChange={handleChange} className="w-full p-3 bg-gray-100 dark:bg-gray-900 border-0 rounded-lg dark:text-white" style={{ boxShadow: darkMode ? 'inset 4px 4px 8px #1a1a1a, inset -4px -4px 8px #2e2e2e' : 'inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff' }}>
                  {exchangeReasons.map(reason => <option key={reason} value={reason}>{reason}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Descrição</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full p-3 bg-gray-100 dark:bg-gray-900 border-0 rounded-lg dark:text-white" style={{ boxShadow: darkMode ? 'inset 4px 4px 8px #1a1a1a, inset -4px -4px 8px #2e2e2e' : 'inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff' }}></textarea>
              </div>
              <div className="flex justify-end">
                <NeuButton type="submit" darkMode={darkMode} variant="primary">Registrar Troca</NeuButton>
              </div>
            </form>
          </NeuCard>
        </motion.div>
      )}

      <NeuCard darkMode={darkMode}>
        <h3 className="text-xl font-semibold mb-4 dark:text-white">Histórico de Trocas</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Data</th>
                <th scope="col" className="px-6 py-3">ID Venda</th>
                <th scope="col" className="px-6 py-3">Motivo</th>
                <th scope="col" className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {exchanges.sort((a, b) => new Date(b.date) - new Date(a.date)).map((exchange) => (
                <tr key={exchange.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4 dark:text-white">{format(new Date(exchange.date), "dd/MM/yyyy", { locale: ptBR })}</td>
                  <td className="px-6 py-4 dark:text-white">#{exchange.saleId}</td>
                  <td className="px-6 py-4 dark:text-white">{exchange.reason}</td>
                  <td className="px-6 py-4">
                    <select
                      value={exchange.status}
                      onChange={(e) => handleStatusChange(exchange.id, e.target.value)}
                      className="px-2 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700 dark:text-white border-transparent focus:border-transparent focus:ring-0"
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {exchanges.length === 0 && (
            <div className="text-center py-8">
              <RefreshCw className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Nenhuma troca registrada.</p>
            </div>
          )}
        </div>
      </NeuCard>
    </motion.div>
  );
}
