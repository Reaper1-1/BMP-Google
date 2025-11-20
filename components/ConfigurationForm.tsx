import React, { useState } from 'react';
import { AppConfig, Platform } from '../types';
import { generateAppSuggestions } from '../services/gemini';
import { Sparkles, Loader2, CheckCircle2, Globe, Palette, Smartphone, Type } from 'lucide-react';

interface ConfigurationFormProps {
  config: AppConfig;
  onChange: (newConfig: AppConfig) => void;
}

export const ConfigurationForm: React.FC<ConfigurationFormProps> = ({ config, onChange }) => {
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = async () => {
    if (!config.url) return;
    
    setIsOptimizing(true);
    try {
      const suggestion = await generateAppSuggestions(config.name || "My App", config.url);
      onChange({
        ...config,
        tagline: suggestion.tagline,
        description: suggestion.description,
        primaryColor: suggestion.primaryColor
      });
    } catch (error) {
      console.error("Optimization failed", error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleChange = (field: keyof AppConfig, value: any) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">App Configuration</h2>
        <button
          onClick={handleOptimize}
          disabled={isOptimizing || !config.url}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${!config.url 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 shadow-md hover:shadow-lg'
            }
          `}
        >
          {isOptimizing ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Sparkles size={16} />
          )}
          <span>{isOptimizing ? 'Optimizing...' : 'Auto-Fill with AI'}</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <Globe size={14} /> General
          </h3>
          
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
              <input
                type="url"
                value={config.url}
                onChange={(e) => handleChange('url', e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors bg-gray-50 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">App Name</label>
              <input
                type="text"
                value={config.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="My Awesome App"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Branding */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <Palette size={14} /> Branding
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={config.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className="h-10 w-10 rounded cursor-pointer border border-gray-300 p-1"
              />
              <input
                type="text"
                value={config.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none uppercase"
                pattern="^#[0-9A-F]{6}$"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
            <input
              type="text"
              value={config.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              placeholder="Short catchy phrase"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
             <textarea
                value={config.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                placeholder="Describe your app functionality..."
             />
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Platform Settings */}
        <div className="space-y-4">
           <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <Smartphone size={14} /> Platform
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preview Device</label>
            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={() => handleChange('platform', Platform.IOS)}
                    className={`
                        flex items-center justify-center space-x-2 py-2 px-4 rounded-lg border transition-all
                        ${config.platform === Platform.IOS 
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-medium' 
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}
                    `}
                >
                    <span className="text-lg"></span>
                    <span>iOS</span>
                </button>
                <button
                    onClick={() => handleChange('platform', Platform.ANDROID)}
                    className={`
                         flex items-center justify-center space-x-2 py-2 px-4 rounded-lg border transition-all
                        ${config.platform === Platform.ANDROID 
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-medium' 
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}
                    `}
                >
                    {/* Simple robot icon rep */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.3765 13.8533 8 12 8s-3.5902.3765-5.1367.9503L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/></svg>
                    <span>Android</span>
                </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded border ${config.showStatusBar ? 'bg-indigo-600 border-indigo-600' : 'border-gray-400 bg-white'}`}>
                      {config.showStatusBar && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                  <label className="text-sm text-gray-700 cursor-pointer select-none" onClick={() => handleChange('showStatusBar', !config.showStatusBar)}>
                      Show Status Bar
                  </label>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
