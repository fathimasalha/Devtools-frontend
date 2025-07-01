import React, { useState, useRef } from 'react';
import './WordCount.css';

const countWords = (text) => {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
};
const countChars = (text) => text.replace(/\n/g, '').length;
const countCharsNoSpaces = (text) => text.replace(/\s/g, '').length;
const countSentences = (text) => {
  const matches = text.match(/[^.!?\s][^.!?]*(?:[.!?](?!['"]?\s|$)[^.!?]*)*[.!?]?['"]?(?=\s|$)/g);
  return matches ? matches.length : 0;
};
const countParagraphs = (text) => {
  return text.trim() === '' ? 0 : text.replace(/\n{2,}/g, '\n').split(/\n/).filter(p => p.trim() !== '').length;
};
const estimateReadingTime = (words) => {
  if (words === 0) return '0 m 0 s';
  const totalSeconds = Math.round((words / 200) * 60);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins} m ${secs} s`;
};

const WordCount = () => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // Auto-resize textarea
  const handleInput = (e) => {
    setText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wordlycount.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const words = countWords(text);
  const chars = countChars(text);
  const charsNoSpaces = countCharsNoSpaces(text);
  const sentences = countSentences(text);
  const paragraphs = countParagraphs(text);
  const readingTime = estimateReadingTime(words);

  return (
    <div className="wordlycount-container font-inter" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}>
      {/* Blurred gradient background like homepage */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          style={{ left: '10%', top: '20%' }} />
        <div className="absolute w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          style={{ right: '10%', bottom: '20%' }} />
      </div>
      <div className="wordlycount-card animate-fadein-up relative z-10">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-tight text-white leading-tight md:leading-none text-center mb-2 animate-fadein-slow gradient-text" style={{ background: 'linear-gradient(90deg, #fff 40%, #bdbdbd 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Word Count</h1>
        <p className="text-center text-gray-300 text-base md:text-lg mb-2 animate-fadein-slow">A modern, minimalist word and character counter for writers, students, and professionals.</p>
        <div style={{ position: 'relative' }}>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleInput}
            placeholder="Start typing or paste your text here..."
            className="wordlycount-textarea animate-fadein"
            style={{ fontFamily: 'Inter, Roboto, Arial, sans-serif', overflow: 'hidden' }}
          />
          {text && (
            <button
              aria-label="Clear input"
              onClick={() => setText('')}
              className="absolute top-2 right-2 bg-gray-700 hover:bg-red-500 text-white rounded-full p-1 shadow focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200 animate-fadein"
              style={{ zIndex: 2 }}
            >
              {/* X/Circle-X Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
        <div className="wordlycount-stats animate-fadein">
          <div className="wordlycount-stat-grid w-full md:w-auto">
            <Stat label="Words" value={words} />
            <Stat label="Characters" value={chars} />
            <Stat label="Sentences" value={sentences} />
            <Stat label="Paragraphs" value={paragraphs} />
            <Stat label="Characters without spaces" value={charsNoSpaces} />
            <Stat label="Reading time" value={readingTime} />
          </div>
          {text.trim() && (
            <div className="flex gap-3 justify-center md:items-end">
              <button onClick={handleCopy} aria-label="Copy to clipboard" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fadein flex items-center justify-center">
                {copied ? (
                  // Tick Icon
                  <svg className="icon-pulse" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  // Copy Icon
                  <svg className="icon-pulse" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                )}
              </button>
              <button onClick={handleDownload} aria-label="Download as text file" className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 text-white shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 animate-fadein flex items-center justify-center">
                {/* Download Icon */}
                <svg className="icon-pulse" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="wordlycount-stat animate-fadein stat-bounce-hover" tabIndex={0}>
    <span className="wordlycount-stat-value">{value}</span>
    <span className="wordlycount-stat-label">{label}</span>
  </div>
);

export default WordCount;
