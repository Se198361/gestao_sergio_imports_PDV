import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Receipt = React.forwardRef(({ sale }, ref) => {
  const { settings } = useApp();

  return (
    <div ref={ref} className="bg-receipt-yellow text-black font-mono p-4 text-sm w-full">
      <div className="text-center">
        {settings.companyLogo && (
          <img src={settings.companyLogo} alt="Logo" className="w-20 h-auto mx-auto mb-2" />
        )}
        <p className="font-bold">{settings.companyName || 'Sua Empresa'}</p>
        <p>{settings.address || 'Seu Endereço'}</p>
        <p>CNPJ: {settings.cnpj || '00.000.000/0001-00'}</p>
        <p>Tel: {settings.phone || '(00) 00000-0000'}</p>
      </div>

      <hr className="border-black border-dashed my-2" />

      <div className="text-center">
        <p>CUPOM FISCAL</p>
        <p>{format(new Date(sale.date), "dd/MM/yyyy 'às' HH:mm:ss", { locale: ptBR })}</p>
      </div>

      <hr className="border-black border-dashed my-2" />

      <div>
        <p>Venda: #{sale.id}</p>
        <p>Cliente: {sale.client?.name || 'Não identificado'}</p>
        <p>Operador: ADMIN</p>
      </div>

      <hr className="border-black border-dashed my-2" />

      <div className="text-center font-bold">
        <p>ITENS</p>
      </div>
      
      <table className="w-full my-2">
        <thead>
          <tr>
            <th className="text-left">Qtd</th>
            <th className="text-left">Descrição</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {sale.items.map((item, index) => (
            <tr key={index}>
              <td className="align-top">{item.quantity}x</td>
              <td>{item.name}</td>
              <td className="text-right align-top">
                {item.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr className="border-black border-dashed my-2" />

      <div className="space-y-1">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>{sale.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
        {sale.discount > 0 && (
          <div className="flex justify-between">
            <span>Desconto:</span>
            <span>- {sale.discount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg">
          <span>TOTAL:</span>
          <span>{sale.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
      </div>

      <hr className="border-black border-dashed my-2" />

      <div className="text-center font-bold">
        <p>PAGAMENTO</p>
      </div>
      <div className="flex justify-between mt-1">
        <span>Forma:</span>
        <span>{sale.paymentMethod}</span>
      </div>
      {sale.paymentMethod === 'credit' && (
        <div className="flex justify-between text-xs">
          <span>Parcelamento:</span>
          <span>{sale.paymentDetails.installments}x de {sale.paymentDetails.installmentValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
      )}

      {sale.paymentMethod === 'pix' && settings.pixQrCode && (
        <div className="text-center mt-4">
          <img src={settings.pixQrCode} alt="QR Code PIX" className="w-32 h-32 mx-auto" />
          <p className="text-xs mt-1">Apresente este QR para o cliente ou imprima conforme exibido.</p>
        </div>
      )}

      <hr className="border-black border-dashed my-2" />

      <div className="text-center">
        <p className="font-bold">POLÍTICA DE TROCA</p>
        <p className="text-xs">{settings.exchangePolicy || 'Consulte a política de troca na loja.'}</p>
        <p className="text-xs mt-1">Prazo para Troca (dias): {settings.exchangeDeadline || 7}</p>
      </div>

      <hr className="border-black border-dashed my-2" />

      <div className="text-center text-xs mt-4">
        <p>Obrigado pela preferência,</p>
        <p>Volte sempre!</p>
        <p>Louvado seja o Senhor!</p>
      </div>
    </div>
  );
});

export default Receipt;
