import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import OutputPanel from './OutputPanel';
import './Beautifier.css';

const languages = [
  { value: 'auto', label: 'Auto Detect' },
  { value: 'js', label: 'JavaScript' },
  { value: 'css', label: 'CSS' },
  { value: 'html', label: 'HTML' },
  { value: 'json', label: 'JSON' },
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python' }
];

const Beautifier = () => {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('auto');
  const [detectedLanguage, setDetectedLanguage] = useState('');

  // Function to detect language based on code content
  const detectLanguage = (code) => {
    if (!code.trim()) return 'auto';
    const trimmedCode = code.trim();
    if (trimmedCode.startsWith('{') && trimmedCode.endsWith('}')) {
      try {
        JSON.parse(trimmedCode);
        return 'json';
      } catch (e) {}
    }
    if (trimmedCode.includes('<html') || 
        trimmedCode.includes('<!DOCTYPE') || 
        trimmedCode.includes('<head') || 
        trimmedCode.includes('<body') ||
        (trimmedCode.includes('<') && trimmedCode.includes('>') && trimmedCode.includes('</'))) {
      return 'html';
    }
    if (trimmedCode.includes('public class') || 
        trimmedCode.includes('public static void main') ||
        trimmedCode.includes('import java.') ||
        trimmedCode.includes('System.out.println') ||
        trimmedCode.includes('String[] args')) {
      return 'java';
    }
    if (trimmedCode.includes('def ') || 
        trimmedCode.includes('class ') ||
        trimmedCode.includes('import ') ||
        trimmedCode.includes('from ') ||
        trimmedCode.includes('print(') ||
        trimmedCode.includes('if __name__') ||
        trimmedCode.includes('elif ') ||
        trimmedCode.includes('except ') ||
        trimmedCode.includes('finally:') ||
        trimmedCode.includes('with ') ||
        trimmedCode.includes('for ') ||
        trimmedCode.includes('while ') ||
        trimmedCode.includes('try:') ||
        trimmedCode.includes('raise ') ||
        trimmedCode.includes('assert ') ||
        trimmedCode.includes('lambda ') ||
        trimmedCode.includes('self.') ||
        trimmedCode.includes('super(') ||
        trimmedCode.includes('open(') ||
        trimmedCode.includes('json.') ||
        trimmedCode.includes('requests.') ||
        trimmedCode.includes('os.') ||
        trimmedCode.includes('sys.') ||
        trimmedCode.includes('re.') ||
        trimmedCode.includes('datetime.') ||
        trimmedCode.includes('collections.') ||
        trimmedCode.includes('itertools.') ||
        trimmedCode.includes('functools.') ||
        trimmedCode.includes('typing.') ||
        trimmedCode.includes('pathlib.') ||
        trimmedCode.includes('argparse.') ||
        trimmedCode.includes('logging.') ||
        trimmedCode.includes('unittest.') ||
        trimmedCode.includes('pytest.') ||
        trimmedCode.includes('numpy.') ||
        trimmedCode.includes('pandas.') ||
        trimmedCode.includes('matplotlib.') ||
        trimmedCode.includes('seaborn.') ||
        trimmedCode.includes('scikit-learn') ||
        trimmedCode.includes('tensorflow.') ||
        trimmedCode.includes('torch.') ||
        trimmedCode.includes('flask.') ||
        trimmedCode.includes('django.') ||
        trimmedCode.includes('fastapi.') ||
        trimmedCode.includes('uvicorn.') ||
        trimmedCode.includes('pydantic.') ||
        trimmedCode.includes('sqlalchemy.') ||
        trimmedCode.includes('async def') ||
        trimmedCode.includes('await ') ||
        trimmedCode.includes('asyncio.') ||
        trimmedCode.includes('aiohttp.') ||
        trimmedCode.includes('async with') ||
        trimmedCode.includes('async for')) {
      return 'python';
    }
    if (trimmedCode.includes('{') && trimmedCode.includes('}') && 
        (trimmedCode.includes(':') || trimmedCode.includes(';')) &&
        !trimmedCode.includes('function') && 
        !trimmedCode.includes('var ') && 
        !trimmedCode.includes('let ') && 
        !trimmedCode.includes('const ') &&
        !trimmedCode.includes('console.log') &&
        !trimmedCode.includes('if(') &&
        !trimmedCode.includes('for(') &&
        !trimmedCode.includes('while(')) {
      return 'css';
    }
    if (trimmedCode.includes('function') || 
        trimmedCode.includes('var ') || 
        trimmedCode.includes('let ') || 
        trimmedCode.includes('const ') ||
        trimmedCode.includes('console.log') ||
        trimmedCode.includes('if(') ||
        trimmedCode.includes('for(') ||
        trimmedCode.includes('while(') ||
        trimmedCode.includes('=>') ||
        trimmedCode.includes('()') ||
        trimmedCode.includes('{}')) {
      return 'js';
    }
    return 'auto';
  };

  const handleInputChange = (value) => {
    setInputCode(value);
    setSelectedLanguage('auto');
    setDetectedLanguage('');
  };

  const handleInputBlur = () => {
    if (inputCode.trim()) {
      const detected = detectLanguage(inputCode);
      if (detected !== 'auto') {
        setDetectedLanguage(detected);
        setSelectedLanguage(detected);
      }
    }
  };

  const beautifyCode = async () => {
    if (!inputCode.trim()) {
      setError('Please enter some code to beautify');
      return;
    }
    setLoading(true);
    setError('');
    setDetectedLanguage('');
    try {
      // Always use the /api/beautify/ endpoint
      let languageToSend = selectedLanguage;
      if (selectedLanguage === 'auto') {
        languageToSend = detectLanguage(inputCode);
      }
      // Map frontend codes to backend expected values
      const langMap = {
        js: 'javascript',
        python: 'python',
        html: 'html',
        css: 'css',
        json: 'json',
        java: 'java',
      };
      languageToSend = langMap[languageToSend] || languageToSend;
      const endpoint = 'http://localhost:8000/api/beautify/';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: inputCode, language: languageToSend }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to beautify code');
      }
      setOutputCode(data.beautified_code);
      if (data.language) {
        setDetectedLanguage(data.language);
        if (selectedLanguage === 'auto') {
          setSelectedLanguage(data.language);
        }
      } else {
        setDetectedLanguage(selectedLanguage);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getLanguageDisplayName = (langCode) => {
    const lang = languages.find(l => l.value === langCode);
    return lang ? lang.label : langCode.toUpperCase();
  };

  return (
    <div className="beautifier-page beautifier-fadein-up">
      <header className="beautifier-header">
        <h1>Beautifier</h1>
        <p>Beautify your code with elegant precision</p>
      </header>
      <main className="beautifier-main">
        <div className="language-selector">
          <label htmlFor="language">Select Language:</label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {languages.map(lang => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
                {detectedLanguage === lang.value && selectedLanguage === 'auto' ? ' (detected)' : ''}
              </option>
            ))}
          </select>
        </div>
        <div className="button-container">
          <button 
            onClick={beautifyCode} 
            disabled={loading}
            className="beautify-button"
          >
            <i className="fas fa-magic" style={{ marginRight: '0.5rem' }}></i>
            {loading ? 'Beautifying...' : 'Beautify Code'}
          </button>
        </div>
        <div className="code-panels">
          <div className="code-panel">
            <h2>Input Code</h2>
            <CodeEditor
              value={inputCode}
              onChange={handleInputChange}
              language={selectedLanguage === 'auto' ? 'plaintext' : selectedLanguage}
              onBlur={handleInputBlur}
              onMouseLeave={handleInputBlur}
            />
          </div>
          <div className="code-panel">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0 }}>
                Beautified Code
                {outputCode && (
                  <span style={{ fontSize: '0.8rem', color: '#00bcd4', fontWeight: 400, marginLeft: '0.5rem' }}>
                    ({getLanguageDisplayName(detectedLanguage || selectedLanguage)})
                  </span>
                )}
              </h2>
              {outputCode && (
                <div className="output-actions">
                  <OutputPanel.Actions code={outputCode} language={detectedLanguage || selectedLanguage} />
                </div>
              )}
            </div>
            <OutputPanel
              code={outputCode}
              language={detectedLanguage || selectedLanguage}
              hideActions={true}
            />
          </div>
        </div>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </main>
      
    </div>
  );
};

export default Beautifier; 