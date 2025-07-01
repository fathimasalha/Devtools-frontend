import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const OutputPanelActions = ({ code, language }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `beautified.${language}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  return (
    <>
      <button onClick={handleCopy} className="action-button" title="Copy to clipboard">
        {copied ? (
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        )}
      </button>
      <button onClick={handleDownload} className="action-button" title="Download code">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </button>
    </>
  );
};

const OutputPanel = ({ code, language, hideActions }) => {
  return (
    <div className="output-panel">
      {code && !hideActions && (
        <div className="output-actions">
          <OutputPanelActions code={code} language={language} />
        </div>
      )}
      <Editor
        height="400px"
        language={language}
        value={code}
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          lineNumbers: 'on',
          renderWhitespace: 'selection',
          tabSize: 2,
        }}
      />
    </div>
  );
};

OutputPanel.Actions = OutputPanelActions;
export default OutputPanel; 