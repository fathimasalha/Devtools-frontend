import React, { useState, useRef } from 'react';
import RentReceiptForm from './RentReceiptForm';
import ReceiptPreview from './ReceiptPreview';
import './RentReceipt.css';
import { Download as DownloadIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const initialForm = {
  landlord: '',
  tenant: '',
  address: '',
  rentAmount: '',
  rentMonth: '',
  paymentMode: '',
  pan: '',
  receiptDate: new Date().toISOString().slice(0, 10),
  periodFrom: '',
  periodTo: '',
};

const RentReceiptPage = () => {
  const [form, setForm] = useState(initialForm);
  const [template, setTemplate] = useState(1);
  const previewRef = useRef(null);

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    const input = previewRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    // Calculate image dimensions to fit A4
    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
    pdf.save('rent-receipt.pdf');
  };

  return (
    <div className="rent-receipt-page min-h-screen bg-gray-50 py-8 px-2 md:px-0">
      <h1 className="mt-8 md:mt-12 text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-green-700 drop-shadow break-words leading-tight">Rent Receipt Generator</h1>
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-8">
        <RentReceiptForm form={form} setForm={setForm} />
        <div className="flex-1 flex flex-col items-center">
          <div className="flex gap-2 mb-4">
            <button type="button" className={`px-4 py-2 rounded font-semibold border ${template === 1 ? 'bg-green-600 text-white border-green-600' : 'bg-white text-green-700 border-green-400'}`} onClick={() => setTemplate(1)}>1</button>
            <button type="button" className={`px-4 py-2 rounded font-semibold border ${template === 2 ? 'bg-green-600 text-white border-green-600' : 'bg-white text-green-700 border-green-400'}`} onClick={() => setTemplate(2)}>2</button>
          </div>
          <div ref={previewRef} className="w-full flex flex-col items-center">
            <ReceiptPreview form={form} template={template} />
          </div>
          <button onClick={handleDownloadPDF} className="mt-4 flex items-center gap-2 bg-green-700 text-white px-6 py-2 rounded font-semibold hover:bg-green-800 transition">
            <DownloadIcon size={18} /> Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentReceiptPage; 