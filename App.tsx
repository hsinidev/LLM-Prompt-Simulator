
import React, { useState, useCallback } from 'react';
import { DEFAULT_SYSTEM_PROMPT } from './constants';
import { generateResponse } from './services/geminiService';
import TextArea from './components/TextArea';
import GenerateButton from './components/GenerateButton';
import ResponseDisplay from './components/ResponseDisplay';

const App: React.FC = () => {
  const [systemPrompt, setSystemPrompt] = useState<string>(DEFAULT_SYSTEM_PROMPT);
  const [userQuery, setUserQuery] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!userQuery.trim()) {
      setError('User Query cannot be empty.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse('');

    try {
      const result = await generateResponse(systemPrompt, userQuery);
      setResponse(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to generate response: ${err.message}`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [systemPrompt, userQuery]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            LLM Prompt Simulator
          </h1>
          <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
            Craft your system prompt, enter a query, and get a simulated response.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6 flex flex-col">
            <TextArea
              label="System Context"
              id="system-prompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={12}
            />
            <TextArea
              label="User Query"
              id="user-query"
              placeholder="e.g., Explain the theory of relativity in simple terms."
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              rows={5}
            />
            <div className="mt-auto pt-4">
              <GenerateButton
                onClick={handleGenerate}
                isLoading={isLoading}
                disabled={isLoading || !userQuery.trim()}
              />
            </div>
          </div>

          {/* Output Section */}
          <div className="flex flex-col">
            <ResponseDisplay
              response={response}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Google Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
