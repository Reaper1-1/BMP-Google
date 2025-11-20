import React, { useState } from 'react';
import { AppConfig, Platform, ViewMode } from './types';
import { ConfigurationForm } from './components/ConfigurationForm';
import { PhonePreview } from './components/PhonePreview';
import { MobileHandoff } from './components/MobileHandoff';
import { Layout, Layers, ChevronRight, Download, Save, FileText, Settings } from 'lucide-react';

const App: React.FC = () => {
  // Initial State - Better Man Project Defaults
  const [config, setConfig] = useState<AppConfig>({
    name: "The Better Man Project",
    url: "https://thebettermanproject.org",
    platform: Platform.IOS,
    primaryColor: "#C19A6B", // Bronze
    tagline: "Reclaim your faith. Rise with purpose.",
    description: "Tools for the man in the fight: Daily devotionals, Bible studies, AI coaching, and brotherhood. You were made for more.",
    showStatusBar: true
  });

  const [viewMode, setViewMode] = useState<ViewMode>('config');
  const [isBuilding, setIsBuilding] = useState(false);

  const handleBuild = () => {
    setIsBuilding(true);
    // Simulate build process
    setTimeout(() => {
      setIsBuilding(false);
      alert(`Build initiated for ${config.platform}! Check your email for the .ipa/.apk file.`);
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 h-16 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-indigo-600">
              <Layers size={28} strokeWidth={2.5} />
              <span className="text-xl font-bold tracking-tight text-gray-900">Natively</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
               <ChevronRight size={16} />
               <span className="text-gray-600 font-medium hover:text-indigo-600 cursor-pointer">Projects</span>
               <ChevronRight size={16} />
               <span className="text-gray-900 font-medium truncate max-w-[200px]">{config.name}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Switcher */}
            <div className="hidden md:flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                <button 
                    onClick={() => setViewMode('config')}
                    className={`
                        flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all
                        ${viewMode === 'config' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}
                    `}
                >
                    <Settings size={14} />
                    <span>App Config</span>
                </button>
                <button 
                    onClick={() => setViewMode('handoff')}
                    className={`
                        flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all
                        ${viewMode === 'handoff' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}
                    `}
                >
                    <FileText size={14} />
                    <span>Mobile Handoff Spec</span>
                </button>
            </div>

            <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

            <button 
                onClick={handleBuild}
                disabled={isBuilding}
                className="flex items-center space-x-2 px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all shadow-sm hover:shadow text-sm font-medium"
            >
                {isBuilding ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Building...</span>
                    </>
                ) : (
                    <>
                        <Download size={18} />
                        <span>Build App</span>
                    </>
                )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        
        {viewMode === 'config' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-8rem)]">
            {/* Left Column: Configuration */}
            <div className="lg:col-span-5 xl:col-span-4 h-full flex flex-col">
                <ConfigurationForm config={config} onChange={setConfig} />
            </div>

            {/* Right Column: Preview */}
            <div className="lg:col-span-7 xl:col-span-8 h-full flex items-center justify-center bg-gray-100/50 rounded-2xl border border-gray-200/60 backdrop-blur-sm">
                <PhonePreview config={config} />
            </div>
            </div>
        ) : (
            <MobileHandoff />
        )}
        
      </main>

      {/* Mobile-only view switcher (bottom bar) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white p-2 border-t border-gray-200 flex justify-around z-50">
            <button 
                onClick={() => setViewMode('config')}
                className={`flex flex-col items-center p-2 rounded-lg ${viewMode === 'config' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500'}`}
            >
                <Settings size={20} />
                <span className="text-[10px] mt-1 font-medium">Config</span>
            </button>
            <button 
                onClick={() => setViewMode('handoff')}
                className={`flex flex-col items-center p-2 rounded-lg ${viewMode === 'handoff' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500'}`}
            >
                <FileText size={20} />
                <span className="text-[10px] mt-1 font-medium">Specs</span>
            </button>
      </div>

    </div>
  );
};

export default App;
