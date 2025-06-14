import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  isDarkMode: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, isDarkMode }) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '');
  };

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        defaultLanguage="c"
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme={isDarkMode ? 'vs-dark' : 'light'}
        options={{
          minimap: { 
            enabled: window.innerWidth > 1024,
            side: 'right',
            size: 'proportional'
          },
          fontSize: window.innerWidth < 640 ? 12 : window.innerWidth < 1024 ? 13 : 14,
          lineHeight: 1.6,
          padding: { 
            top: window.innerWidth < 640 ? 12 : 16, 
            bottom: window.innerWidth < 640 ? 12 : 16 
          },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          insertSpaces: true,
          wordWrap: 'on',
          lineNumbers: window.innerWidth < 640 ? 'off' : 'on',
          glyphMargin: false,
          folding: window.innerWidth > 768,
          lineDecorationsWidth: window.innerWidth < 640 ? 0 : 10,
          lineNumbersMinChars: window.innerWidth < 640 ? 0 : 3,
          renderLineHighlight: 'line',
          contextmenu: window.innerWidth > 768,
          quickSuggestions: {
            other: true,
            comments: false,
            strings: false
          },
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: 'on',
          tabCompletion: 'on',
          wordBasedSuggestions: 'matchingDocuments',
          scrollbar: {
            vertical: 'hidden',
            horizontal: 'hidden',
            useShadows: false,
            verticalHasArrows: false,
            horizontalHasArrows: false,
            verticalScrollbarSize: 0,
            horizontalScrollbarSize: 0,
          },
          overviewRulerBorder: false,
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          renderWhitespace: 'none',
          renderControlCharacters: false,
          fontLigatures: true,
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          mouseWheelZoom: window.innerWidth > 1024,
          multiCursorModifier: 'ctrlCmd',
          accessibilitySupport: 'auto',
        }}
      />
    </div>
  );
};

export default CodeEditor;