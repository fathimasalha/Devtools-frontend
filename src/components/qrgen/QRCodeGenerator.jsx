import React, { useRef, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { toPng } from 'html-to-image';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import './QRCodeGenerator.css';
import { QRCodeSVG } from 'qrcode.react';

const isValidInput = (value) => {
  // Accepts any non-empty string, basic URL validation if it looks like a URL
  if (!value.trim()) return false;
  if (/^https?:\/\//.test(value)) {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }
  return true;
};

const shapeOptions = [
  { label: 'Squares', value: 'squares' },
  { label: 'Dots', value: 'dots' },
];
const frameOptions = [
  { label: 'None', value: 'none' },
  { label: 'Rounded', value: 'rounded' },
  { label: 'Circle', value: 'circle' },
];

const QRCodeGenerator = () => {
  const [input, setInput] = useState('');
  const [touched, setTouched] = useState(false);
  const [qrStyle, setQrStyle] = useState('squares');
  const [frame, setFrame] = useState('none');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [logo, setLogo] = useState(null);
  const qrExportRef = useRef(null);
  const svgRef = useRef();

  const valid = isValidInput(input);

  // Frame/quiet zone logic
  let quietZone = 0;
  let logoPaddingStyle = 'square';
  if (frame === 'rounded') {
    quietZone = 16;
    logoPaddingStyle = 'circle';
  } else if (frame === 'circle') {
    quietZone = 32;
    logoPaddingStyle = 'circle';
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setLogo(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async (type) => {
    try {
      if (type === 'png') {
        if (!qrExportRef.current) return;
        const node = qrExportRef.current;
        const dataUrl = await toPng(node, { cacheBust: true, backgroundColor: bgColor });
        const link = document.createElement('a');
        link.download = `qr-code.png`;
        link.href = dataUrl;
        link.click();
      } else {
        // SVG: use the svgRef to get the SVG element directly
        const svg = svgRef.current;
        if (!svg) throw new Error('SVG not found');
        const serializer = new XMLSerializer();
        let source = serializer.serializeToString(svg);
        if (!source.match(/^<\?xml/)) {
          source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
        }
        const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'qr-code.svg';
        link.href = url;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    } catch (err) {
      alert('Failed to export QR code.');
    }
  };

  return (
    <motion.div
      className="qrgen-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="qrgen-header">
        <h1>QR Code Generator</h1>
        <p>Generate and download QR codes for any text or URL. Fast, beautiful, and private.</p>
      </div>
      <div className="qrgen-main">
        <div className="qrgen-card flex flex-col items-center">
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-white/20 bg-black/60 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 transition-all"
            placeholder="Enter text or URL..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onBlur={() => setTouched(true)}
            maxLength={256}
          />
          {touched && !valid && (
            <div className="text-red-400 text-sm mb-2">Please enter valid text or a valid URL.</div>
          )}
          {/* Customization Controls */}
          <div className="qrgen-controls w-full">
            <div>
              <label className="block text-xs text-gray-300 mb-1">Shape</label>
              <select className="rounded px-2 py-1 bg-black/60 text-white border border-white/20" value={qrStyle} onChange={e => setQrStyle(e.target.value)}>
                {shapeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-300 mb-1">Frame</label>
              <select className="rounded px-2 py-1 bg-black/60 text-white border border-white/20" value={frame} onChange={e => setFrame(e.target.value)}>
                {frameOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-300 mb-1">Foreground</label>
              <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-8 h-8 p-0 border-none bg-transparent" />
            </div>
            <div>
              <label className="block text-xs text-gray-300 mb-1">Background</label>
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-8 h-8 p-0 border-none bg-transparent" />
            </div>
            <div>
              <label className="block text-xs text-gray-300 mb-1">Logo</label>
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="text-xs" />
            </div>
          </div>
          {/* QR Preview and Download Buttons Row */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-8 w-full justify-center">
            <motion.div
              className="bg-white rounded-xl p-4 shadow-lg my-6 md:my-0"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: valid && input ? 1 : 0.8, opacity: valid && input ? 1 : 0.5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div ref={qrExportRef}>
                <QRCode
                  value={valid && input ? input : ' '}
                  size={180}
                  qrStyle={qrStyle}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  quietZone={quietZone}
                  logoImage={logo}
                  logoWidth={logo ? 40 : undefined}
                  logoHeight={logo ? 40 : undefined}
                  logoPadding={logo ? 4 : undefined}
                  logoPaddingStyle={logo ? logoPaddingStyle : undefined}
                />
              </div>
            </motion.div>
            {/* Visually hidden export QR code for SVG download */}
            <div style={{ position: 'absolute', left: '-9999px', top: 0, width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
              <QRCodeSVG
                value={valid && input ? input : ' '}
                size={256}
                bgColor={bgColor}
                fgColor={fgColor}
                level="Q"
                includeMargin={frame !== 'none'}
                ref={svgRef}
              />
            </div>
            {/* Download Buttons: only show if QR is valid and present */}
            {valid && input && (
              <div className="flex flex-row md:flex-col gap-4 mt-4 md:mt-0 md:ml-4 items-center">
                <button
                  className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium shadow transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  onClick={() => handleDownload('png')}
                  aria-label="Download PNG"
                >
                  <Download size={22} />
                  PNG
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium shadow transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  onClick={() => handleDownload('svg')}
                  aria-label="Download SVG"
                >
                  <Download size={22} />
                  SVG
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QRCodeGenerator; 