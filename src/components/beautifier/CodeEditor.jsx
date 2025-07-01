import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ value, onChange, language, onBlur, onMouseLeave }) => {
  const handleEditorChange = (newValue) => {
    onChange(newValue);
  };

  return (
    <div className="code-editor" onBlur={onBlur} onMouseLeave={onMouseLeave} tabIndex={0}>
      <Editor
        height={window.innerWidth < 600 ? '40vw' : '400px'}
        language={language}
        value={value}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
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

export default CodeEditor; 