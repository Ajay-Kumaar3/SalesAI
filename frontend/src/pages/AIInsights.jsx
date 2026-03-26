import React, { useState } from 'react';
import { Sparkles, Loader2, Target, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';
import { aiService } from '../services/api';

const AIInsights = () => {
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const res = await aiService.getInsights();
      setInsights(res.data.insights);
    } catch (err) {
      console.error(err);
      setInsights("Error generating insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI Business Insights</h1>
          <p className="text-slate-500">Automated analysis of your Audit Logs to identify trends and anomalies.</p>
        </div>
        <button 
          onClick={fetchInsights}
          disabled={loading}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
          <span>{loading ? 'Analyzing...' : 'Generate Insights'}</span>
        </button>
      </div>

      {!insights && !loading && (
        <div className="card text-center py-20 bg-emerald-50/20 border-emerald-100 border-dashed border-2">
          <Sparkles className="mx-auto text-emerald-200 mb-4" size={56} />
          <h2 className="text-xl font-bold text-slate-800">Ready for Analysis</h2>
          <p className="text-slate-500 max-w-sm mx-auto mt-2">
            Click the button above to analyze your recent database transactions and get actionable tips.
          </p>
        </div>
      )}

      {loading && (
        <div className="space-y-4">
          <div className="card h-12 bg-emerald-50/50 animate-pulse border-none"></div>
          <div className="card h-32 bg-slate-50 animate-pulse border-none"></div>
          <div className="card h-24 bg-slate-50 animate-pulse border-none"></div>
        </div>
      )}

      {insights && !loading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="card border-emerald-200 bg-emerald-50/30">
             <div className="flex gap-4">
               <div className="p-3 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-200 h-fit">
                 <Sparkles size={24} />
               </div>
               <div className="flex-1 whitespace-pre-line text-slate-800 leading-relaxed font-normal">
                 {insights}
               </div>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="card border-l-4 border-l-emerald-500">
                <div className="flex gap-3 mb-2">
                  <TrendingUp className="text-emerald-500" size={20} />
                  <h3 className="font-bold">Growth Potential</h3>
                </div>
                <p className="text-sm text-slate-600">Based on your activity, focus on replenishing high-turnover inventory.</p>
             </div>
             <div className="card border-l-4 border-l-amber-500">
                <div className="flex gap-3 mb-2">
                  <AlertCircle className="text-amber-500" size={20} />
                  <h3 className="font-bold">Manual Review needed</h3>
                </div>
                <p className="text-sm text-slate-600">Consider reviewing the latest large-scale updates for accuracy.</p>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AIInsights;
