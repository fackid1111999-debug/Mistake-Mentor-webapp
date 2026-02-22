import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Code2, 
  FileText, 
  Search, 
  X, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  User,
  Languages,
  Moon,
  Sun,
  Monitor,
  Volume2,
  VolumeX,
  Settings2,
  Terminal,
  Copy,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { analyzeContent } from './services/geminiService';
import { cn } from './lib/utils';
import About from './components/About';

type Theme = 'light' | 'dark' | 'system';

const LANGUAGES = [
  { code: 'English', label: 'English' },
  { code: 'Hindi', label: 'हिन्दी (Hindi)' },
  { code: 'Hinglish', label: 'Hinglish (Hindi + English)' },
  { code: 'Spanish', label: 'Español (Spanish)' },
  { code: 'French', label: 'Français (French)' },
  { code: 'German', label: 'Deutsch (German)' },
  { code: 'Japanese', label: '日本語 (Japanese)' },
];

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'about'>('home');
  const [mode, setMode] = useState<'general' | 'code'>('general');
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState<Theme>('system');
  const [isReading, setIsReading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Theme Logic
  useEffect(() => {
    const root = window.document.documentElement;
    const applyTheme = (t: Theme) => {
      if (t === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.toggle('dark', systemTheme === 'dark');
      } else {
        root.classList.toggle('dark', t === 'dark');
      }
    };

    applyTheme(theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!text && !image) {
      setError('Please provide some code, text, or an image to analyze.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    stopReading();

    try {
      const analysis = await analyzeContent(text, language, image || undefined, mode);
      setResult(analysis || 'No analysis could be generated.');
    } catch (err) {
      setError('Failed to analyze content. Please try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleReading = () => {
    if (isReading) {
      stopReading();
    } else if (result) {
      startReading(result);
    }
  };

  const startReading = (content: string) => {
    // Strip markdown for cleaner reading
    const plainText = content.replace(/[#*`_~]/g, '');
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(plainText);
    
    // Try to find a voice matching the language
    const voices = window.speechSynthesis.getVoices();
    const langMap: Record<string, string> = {
      'English': 'en', 'Hindi': 'hi', 'Hinglish': 'hi', 'Spanish': 'es', 'French': 'fr', 'German': 'de', 'Japanese': 'ja'
    };
    const targetLang = langMap[language] || 'en';
    const voice = voices.find(v => v.lang.startsWith(targetLang));
    if (voice) utterance.voice = voice;

    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);
    
    speechRef.current = utterance;
    setIsReading(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-emerald-100 dark:selection:bg-emerald-900 selection:text-emerald-900 dark:selection:text-emerald-100 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <button 
            onClick={() => setActivePage('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0"
          >
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-xl tracking-tight hidden xs:block">Mistake Mentor</h1>
          </button>
          
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
            <nav className="flex items-center gap-1 shrink-0">
              <button 
                onClick={() => setActivePage('home')}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                  activePage === 'home' ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                )}
              >
                Tool
              </button>
              <button 
                onClick={() => setActivePage('about')}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all whitespace-nowrap",
                  activePage === 'about' ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                )}
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">About Me</span>
              </button>
            </nav>

            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 shrink-0" />

            {/* Theme Switcher */}
            <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl shrink-0">
              <button 
                onClick={() => setTheme('light')}
                className={cn("p-1.5 rounded-lg transition-all", theme === 'light' ? "bg-white dark:bg-zinc-700 shadow-sm text-emerald-600" : "text-zinc-400")}
                title="Light Mode"
              >
                <Sun className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={cn("p-1.5 rounded-lg transition-all", theme === 'dark' ? "bg-white dark:bg-zinc-700 shadow-sm text-emerald-600" : "text-zinc-400")}
                title="Dark Mode"
              >
                <Moon className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setTheme('system')}
                className={cn("p-1.5 rounded-lg transition-all", theme === 'system' ? "bg-white dark:bg-zinc-700 shadow-sm text-emerald-600" : "text-zinc-400")}
                title="System Default"
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {activePage === 'home' ? (
          <motion.main 
            key="home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="max-w-6xl mx-auto px-4 py-6 sm:py-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              
              {/* Input Section */}
              <section className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight">What should I check?</h2>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">Upload a screenshot or paste your content below.</p>
                </div>

                <div className="space-y-4">
                  {/* Mode & Language Bar */}
                  <div className="flex flex-col gap-3 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                        <Settings2 className="w-4 h-4" />
                        <span className="text-sm font-bold">Analysis Settings</span>
                      </div>
                      
                      <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
                        <button 
                          onClick={() => setMode('general')}
                          className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                            mode === 'general' ? "bg-white dark:bg-zinc-700 shadow-sm text-emerald-600" : "text-zinc-400"
                          )}
                        >
                          <FileText className="w-3.5 h-3.5" />
                          General
                        </button>
                        <button 
                          onClick={() => setMode('code')}
                          className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                            mode === 'code' ? "bg-white dark:bg-zinc-700 shadow-sm text-emerald-600" : "text-zinc-400"
                          )}
                        >
                          <Terminal className="w-3.5 h-3.5" />
                          Code Debugger
                        </button>
                      </div>
                    </div>

                    <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 shrink-0">
                        <Languages className="w-4 h-4" />
                        <span className="text-sm font-bold">Output Language:</span>
                      </div>
                      <select 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full sm:flex-1 bg-zinc-50 dark:bg-zinc-800 border-none rounded-lg text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 outline-none p-1.5 cursor-pointer"
                      >
                        {LANGUAGES.map(lang => (
                          <option key={lang.code} value={lang.code}>{lang.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Image Upload Area */}
                  <div 
                    className={cn(
                      "relative group border-2 border-dashed rounded-2xl transition-all duration-200 overflow-hidden",
                      image ? "border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10" : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900"
                    )}
                  >
                    {!image ? (
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-12 flex flex-col items-center justify-center gap-3"
                      >
                        <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Upload className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium">Click to upload image</p>
                          <p className="text-xs text-zinc-400 dark:text-zinc-500">PNG, JPG up to 10MB</p>
                        </div>
                      </button>
                    ) : (
                      <div className="relative aspect-video w-full bg-zinc-900 flex items-center justify-center">
                        <img src={image} alt="Preview" className="max-h-full object-contain" />
                        <button 
                          onClick={clearImage}
                          className="absolute top-3 right-3 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>

                  {/* Text Area */}
                  <div className="relative">
                    <div className="absolute top-3 left-3 text-zinc-400 dark:text-zinc-500">
                      <Code2 className="w-5 h-5" />
                    </div>
                    {text && (
                      <button 
                        onClick={() => setText('')}
                        className="absolute top-3 right-3 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                        title="Clear Text"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <textarea 
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder={mode === 'code' ? "Paste your code snippet here..." : "Or paste your code or text here..."}
                      className="w-full min-h-[200px] pl-10 pr-10 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none font-mono text-sm"
                    />
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || (!text && !image)}
                    className={cn(
                      "w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg",
                      isAnalyzing || (!text && !image)
                        ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
                        : "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98] shadow-emerald-500/20"
                    )}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        <span>Find Errors</span>
                      </>
                    )}
                  </button>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 flex items-start gap-3 text-red-700 dark:text-red-400 text-sm"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p>{error}</p>
                    </motion.div>
                  )}
                </div>
              </section>

              {/* Result Section */}
              <section className="lg:sticky lg:top-28 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Analysis Result</h2>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">Your solution will appear here.</p>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {result && !isAnalyzing && (
                        <>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(result);
                            }}
                            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex-1 sm:flex-none"
                            title="Copy Full Report"
                          >
                            <Copy className="w-4 h-4" />
                            <span className="hidden sm:inline">Copy</span>
                          </button>
                          <button 
                            onClick={toggleReading}
                            className={cn(
                              "flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all flex-1 sm:flex-none",
                              isReading 
                                ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" 
                                : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:scale-105"
                            )}
                          >
                            {isReading ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            <span>{isReading ? 'Stop Reading' : 'Read Report'}</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                <div className="min-h-[400px] rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col">
                  <AnimatePresence mode="wait">
                    {isAnalyzing ? (
                      <motion.div 
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4"
                      >
                        <div className="relative">
                          <div className="w-16 h-16 border-4 border-emerald-100 dark:border-emerald-900/30 rounded-full" />
                          <div className="absolute inset-0 w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-lg">Thinking...</p>
                          <p className="text-zinc-400 dark:text-zinc-500 text-sm">Our AI is scanning for errors and drafting a solution.</p>
                        </div>
                      </motion.div>
                    ) : result ? (
                      <motion.div 
                        key="result"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex-1 p-6 sm:p-8 overflow-y-auto"
                      >
                        <div className="flex items-center gap-2 mb-6 text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider">
                          <CheckCircle2 className="w-4 h-4" />
                          Analysis Complete
                        </div>
                        <div className="markdown-body prose prose-zinc dark:prose-invert max-w-none">
                          <Markdown
                            components={{
                              code({ node, inline, className, children, ...props }: any) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                  <div className="relative group">
                                    <SyntaxHighlighter
                                      style={theme === 'dark' ? atomDark : prism}
                                      language={match[1]}
                                      PreTag="div"
                                      {...props}
                                    >
                                      {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                    <button
                                      onClick={() => {
                                        navigator.clipboard.writeText(String(children));
                                      }}
                                      className="absolute top-2 right-2 p-1.5 bg-zinc-800/50 hover:bg-zinc-800 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                      title="Copy Code"
                                    >
                                      <Copy className="w-4 h-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                );
                              }
                            }}
                          >
                            {result}
                          </Markdown>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 opacity-40 grayscale dark:opacity-20"
                      >
                        <FileText className="w-16 h-16 text-zinc-300 dark:text-zinc-700" />
                        <p className="text-zinc-400 dark:text-zinc-500 max-w-[200px]">Provide content on the left to start the analysis.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </section>
            </div>
          </motion.main>
        ) : (
          <motion.div
            key="about"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <About />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-20 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">Mistake Mentor</span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Empowering learners and developers with instant, AI-driven feedback on their work.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Capabilities</h4>
            <ul className="space-y-2 text-zinc-500 dark:text-zinc-400">
              <li>Python, JS, C++, Java Debugging</li>
              <li>Calculus & Algebra Solutions</li>
              <li>Scientific Paper Analysis</li>
              <li>Grammar & Logic Checking</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Powered by</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400">Gemini 3 Flash</span>
              <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400">React 19</span>
              <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400">Tailwind CSS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
