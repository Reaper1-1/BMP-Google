import React, { useState } from 'react';
import { AppConfig, Platform } from '../types';
import { Smartphone, Wifi, Battery, Signal } from 'lucide-react';

interface PhonePreviewProps {
  config: AppConfig;
}

export const PhonePreview: React.FC<PhonePreviewProps> = ({ config }) => {
  const [iframeError, setIframeError] = useState(false);

  // Reset error if URL changes
  React.useEffect(() => {
    setIframeError(false);
  }, [config.url]);

  const isIOS = config.platform === Platform.IOS;

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 animate-fade-in">
      <div className="mb-4 text-sm text-gray-500 font-medium">
        Live Preview ({config.platform})
      </div>

      {/* Phone Frame */}
      <div 
        className={`
          relative bg-white border-gray-800 shadow-2xl overflow-hidden transition-all duration-500 ease-in-out
          ${isIOS ? 'rounded-[3rem] border-[8px]' : 'rounded-[1.5rem] border-[6px]'}
        `}
        style={{ 
          width: '340px', 
          height: '680px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* Dynamic Island / Notch Area */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-white z-20 flex items-center justify-between px-6 text-[10px] font-semibold select-none pointer-events-none">
          <span>9:41</span>
          
          {isIOS && (
            <div className="absolute left-1/2 transform -translate-x-1/2 top-2 w-24 h-6 bg-black rounded-full z-30 flex items-center justify-center">
                {/* Camera dot */}
                <div className="w-16 h-16 rounded-full bg-gray-900/50"></div>
            </div>
          )}
          
          <div className="flex items-center space-x-1">
            <Signal size={12} />
            <Wifi size={12} />
            <Battery size={12} />
          </div>
        </div>

        {/* Status Bar Background (Optional) */}
        {config.showStatusBar && (
          <div 
            className="absolute top-0 left-0 right-0 h-8 z-10 opacity-20 pointer-events-none"
            style={{ backgroundColor: config.primaryColor }}
          />
        )}

        {/* App Content (Iframe) */}
        <div className="w-full h-full pt-8 bg-gray-100 overflow-hidden relative">
            {config.url && !iframeError ? (
                <iframe 
                    src={config.url} 
                    className="w-full h-full border-none bg-white"
                    title="App Preview"
                    onError={() => setIframeError(true)}
                    sandbox="allow-same-origin allow-scripts allow-forms"
                />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4 bg-gray-50">
                    {config.url && iframeError ? (
                        <>
                            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-2">
                                <Smartphone size={32} />
                            </div>
                            <h3 className="font-bold text-gray-800">Preview Not Available</h3>
                            <p className="text-sm text-gray-500">
                                This website ({config.url}) cannot be embedded in a frame due to security settings (X-Frame-Options).
                            </p>
                            <p className="text-xs text-gray-400">The native app build will still work correctly.</p>
                        </>
                    ) : (
                        <>
                             <div 
                                className="w-20 h-20 rounded-2xl shadow-lg flex items-center justify-center text-white mb-4"
                                style={{ backgroundColor: config.primaryColor }}
                             >
                                <span className="text-2xl font-bold">{config.name.charAt(0) || 'A'}</span>
                             </div>
                             <h2 className="text-xl font-bold text-gray-900">{config.name || 'Your App Name'}</h2>
                             <p className="text-gray-500 text-sm px-4">{config.tagline || 'Your awesome tagline goes here.'}</p>
                             
                             <div className="w-full max-w-[200px] h-10 bg-gray-200 rounded-lg animate-pulse mt-8" />
                             <div className="w-full max-w-[160px] h-32 bg-gray-200 rounded-lg animate-pulse mt-2" />
                        </>
                    )}
                </div>
            )}
        </div>

        {/* Home Indicator (iOS) */}
        {isIOS && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full z-20 pointer-events-none opacity-80"></div>
        )}
      </div>
      
      <div className="mt-6 flex space-x-2">
         <div className="w-2 h-2 rounded-full bg-gray-300"></div>
         <div className="w-2 h-2 rounded-full bg-blue-600"></div>
         <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};
