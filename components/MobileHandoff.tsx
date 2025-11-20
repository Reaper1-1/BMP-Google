import React from 'react';
import { Copy, Terminal, CheckCircle2, Smartphone, Globe, Database, Shield, Bot } from 'lucide-react';

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="absolute top-2 right-2 p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-md hover:bg-gray-100"
      title="Copy to clipboard"
    >
      {copied ? <CheckCircle2 size={16} className="text-green-600" /> : <Copy size={16} />}
    </button>
  );
};

const InlineCopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="ml-2 text-gray-400 hover:text-indigo-600 transition-colors p-0.5"
      title="Copy ID"
    >
      {copied ? <CheckCircle2 size={12} className="text-green-600" /> : <Copy size={12} />}
    </button>
  );
};

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = 'json' }) => (
  <div className="relative group mt-2">
    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto border border-gray-800">
      <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">{code}</pre>
    </div>
    <CopyButton text={code} />
    {language && (
        <div className="absolute top-0 left-0 px-2 py-1 text-[10px] font-medium text-gray-500 uppercase select-none">
            {language}
        </div>
    )}
  </div>
);

const Section: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6 shadow-sm">
    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center space-x-2">
      <Icon size={20} className="text-indigo-600" />
      <h3 className="font-bold text-gray-900">{title}</h3>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

export const MobileHandoff: React.FC = () => {
  const appStoreDescription = `The Better Man Project isn’t for the perfect—it’s for the man in the fight.

The one who’s tired of drifting. Tired of hiding. Tired of feeling like he’s alone. 

This app is your wake-up call. 

FEATURES:
• Daily Devotionals: Rooted in Scripture, designed for men.
• Bible Studies: Deep context and historical insight, not fluff.
• AI Coaching: 24/7 guidance for prayer, leadership, and emotional resilience.
• Private Journal: Secure, encrypted space to process your walk.
• Brotherhood: Tools to help you rebuild your mind, reclaim your faith, and rise with purpose.

You were made for more. Stand up. Lock in. Become the man God called you to be.`;

  const nativelyConfig = {
    project_id: "ceb7078a-5a5e-4567-9456-23b6fbd2943b",
    base_url: "https://thebettermanproject.org",
    permissions: {
      push_notifications: true,
      camera: false,
      location: false,
      biometrics: true
    },
    theme: {
      primary: "#C19A6B",
      background: "#1C1C1C",
      status_bar: "light"
    },
    features: {
      pull_to_refresh: true,
      native_navigation: false,
      offline_mode: true
    }
  };

  const agents = [
    { id: "prayer_coach", name: "Prayer Coach", desc: "Intercession & Prayer Guide" },
    { id: "leadership_mentor", name: "Leadership Mentor", desc: "Calling & Integrity" },
    { id: "emotional_intelligence_coach", name: "EQ Coach", desc: "Relational Wisdom" },
    { id: "devotional_guide", name: "Devotional Guide", desc: "Scripture Context" },
    { id: "journal_coach", name: "Journal Coach", desc: "Reflection & Processing" },
    { id: "breakup_coach", name: "Breakup Coach", desc: "Toxic Relationship Recovery" },
    { id: "habits_coach", name: "Habits Coach", desc: "Accountability & Discipline" },
    { id: "breakthrough_coach", name: "Breakthrough Coach", desc: "Inner Freedom" },
    { id: "bible_study_agent", name: "Bible Study Agent", desc: "Deep Analysis" },
    { id: "workflow_meta_agent", name: "Workflow Orchestrator", desc: "Meta-Agent & Planning" },
    { id: "builder_handoff_agent", name: "Builder Handoff", desc: "Tech Spec Generator" }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-20">
      
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 rounded-2xl p-8 text-white shadow-xl border-l-4 border-[#C19A6B]">
        <h1 className="text-3xl font-serif font-bold mb-2 text-[#C19A6B]">Builder Handoff Spec</h1>
        <p className="text-stone-300 text-lg">
          Configuration reference for Natively wrapper and App Store submission.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm">v1.0.0</span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm">Production</span>
            <span className="px-3 py-1 rounded-full bg-[#C19A6B]/20 border border-[#C19A6B] text-[#C19A6B] text-sm font-medium">Priority: High</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Natively Configuration */}
        <Section title="Natively Project Config" icon={Smartphone}>
          <p className="text-gray-600 mb-4">
            Use these settings in the Natively console to configure the mobile wrapper.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
             <div>
                <span className="text-gray-500 block">Project URL</span>
                <a href="https://natively.dev/project/ceb7078a-5a5e-4567-9456-23b6fbd2943b" className="text-indigo-600 hover:underline font-medium truncate block">
                    natively.dev/project/...
                </a>
             </div>
             <div>
                <span className="text-gray-500 block">Target URL</span>
                <a href="https://thebettermanproject.org" className="text-indigo-600 hover:underline font-medium">
                    https://thebettermanproject.org
                </a>
             </div>
          </div>
          <CodeBlock code={JSON.stringify(nativelyConfig, null, 2)} />
        </Section>

        {/* App Store Metadata */}
        <Section title="Store Listing Copy" icon={Globe}>
          <div className="space-y-4">
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">App Name</label>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 font-medium text-gray-900 flex justify-between items-center">
                    The Better Man Project
                    <CopyButton text="The Better Man Project" />
                </div>
            </div>
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Subtitle</label>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-900 flex justify-between items-center">
                    Faith. Discipline. Brotherhood.
                    <CopyButton text="Faith. Discipline. Brotherhood." />
                </div>
            </div>
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Description</label>
                <div className="relative">
                    <textarea 
                        readOnly 
                        className="w-full h-48 p-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm resize-none focus:outline-none"
                        value={appStoreDescription}
                    />
                    <CopyButton text={appStoreDescription} />
                </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Agent Schema */}
      <Section title="Agent Configuration Schema" icon={Database}>
        <p className="text-gray-600 mb-4">
            The app relies on the following 11 specialist agents. Ensure these keys match the <code>AGENTS.md</code> or backend configuration.
        </p>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {agents.map(agent => (
                <div key={agent.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col transition-shadow hover:shadow-md">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-start space-x-3">
                             <div className="p-2 bg-white rounded-md border border-gray-200 text-indigo-600">
                                <Bot size={20} />
                             </div>
                             <div>
                                <h4 className="font-bold text-gray-900 text-sm">{agent.name}</h4>
                                <div className="text-gray-500 text-xs mt-0.5">{agent.desc}</div>
                             </div>
                        </div>
                        <div className="flex items-center bg-white border border-gray-200 rounded px-2 py-1 shadow-sm">
                            <code className="font-mono text-xs text-indigo-600 select-all">{agent.id}</code>
                            <InlineCopyButton text={agent.id} />
                        </div>
                    </div>
                    
                    <div className="mt-2 bg-white border border-gray-200 rounded p-3 flex-grow relative group">
                         <div className="flex justify-between items-center mb-2">
                             <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">System Prompt Template</div>
                             <span className="text-[10px] text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">Markdown</span>
                         </div>
                         <code className="text-xs text-gray-500 font-mono block whitespace-pre-wrap leading-relaxed h-24 overflow-y-auto custom-scrollbar">
                            {`# SYSTEM PROMPT FOR: ${agent.name}\n\n[Include Unified Style Guide Reference]\n\n"You are the ${agent.name} for The Better Man Project. You help men with..."\n\n## Your Role\n- [Specific responsibility 1]\n- [Specific responsibility 2]\n\n## Instructions\n- [Instruction 1]\n- [Instruction 2]\n\n## Output Format\nPlain text with..."`}
                         </code>
                    </div>
                </div>
            ))}
        </div>
      </Section>

      {/* Security & Environment */}
      <Section title="Environment & Security" icon={Shield}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <h4 className="font-bold text-gray-900 mb-2">Environment Variables</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                          <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">NEXT_PUBLIC_SUPABASE_URL</code>
                          <span className="text-xs text-gray-400">(Production)</span>
                      </li>
                      <li className="flex items-center gap-2">
                          <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
                          <span className="text-xs text-gray-400">(Public)</span>
                      </li>
                      <li className="flex items-center gap-2">
                          <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">OPENAI_API_KEY</code>
                          <span className="text-xs text-red-400 font-medium">(Secret - Server Only)</span>
                      </li>
                      <li className="flex items-center gap-2">
                          <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">BASE44_API_KEY</code>
                          <span className="text-xs text-red-400 font-medium">(Secret - Agent Ops)</span>
                      </li>
                  </ul>
              </div>
              <div>
                   <h4 className="font-bold text-gray-900 mb-2">Feature Flags</h4>
                   <div className="space-y-2">
                       <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
                           <span className="text-sm font-medium">feature_new_dashboard</span>
                           <span className="text-xs font-bold text-green-600 px-2 py-0.5 bg-green-100 rounded-full">ENABLED</span>
                       </div>
                       <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
                           <span className="text-sm font-medium">feature_biometrics</span>
                           <span className="text-xs font-bold text-green-600 px-2 py-0.5 bg-green-100 rounded-full">ENABLED</span>
                       </div>
                       <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
                           <span className="text-sm font-medium">feature_beta_agents</span>
                           <span className="text-xs font-bold text-yellow-600 px-2 py-0.5 bg-yellow-100 rounded-full">TESTING</span>
                       </div>
                   </div>
              </div>
          </div>
      </Section>

      <div className="text-center text-gray-400 text-sm pt-8">
        Generated by The Better Man Project - Mobile Handoff Agent
      </div>
    </div>
  );
};