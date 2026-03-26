import React, { useState, useEffect } from 'react';
import { History, Filter, Search } from 'lucide-react';
import { auditService } from '../services/api';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ table_name: '', action_type: '' });

  useEffect(() => {
    fetchLogs();
  }, [filter]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await auditService.getAll(filter);
      setLogs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (type) => {
    switch (type) {
      case 'INSERT': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'UPDATE': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'DELETE': return 'bg-rose-50 text-rose-700 border-rose-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Audit Logs</h1>
          <p className="text-slate-500">Track every data change with the Database Time Machine.</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <select 
          className="input-field max-w-xs"
          value={filter.table_name}
          onChange={(e) => setFilter({...filter, table_name: e.target.value})}
        >
          <option value="">All Tables</option>
          <option value="Customers">Customers</option>
          <option value="Products">Products</option>
          <option value="Orders">Orders</option>
        </select>
        <select 
          className="input-field max-w-xs"
          value={filter.action_type}
          onChange={(e) => setFilter({...filter, action_type: e.target.value})}
        >
          <option value="">All Actions</option>
          <option value="INSERT">Insert</option>
          <option value="UPDATE">Update</option>
          <option value="DELETE">Delete</option>
        </select>
      </div>

      <div className="space-y-4">
        {loading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="card h-20 animate-pulse"></div>
          ))
        ) : logs.length === 0 ? (
          <div className="card text-center py-12">
            <Search className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500">No logs found for the selected filters.</p>
          </div>
        ) : logs.map((log) => (
          <div key={log.AuditID} className="card p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getActionColor(log.action_type)}`}>
                  {log.action_type}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Modified <span className="text-emerald-600">{log.table_name}</span> (ID: {log.record_id})
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 overflow-hidden max-w-md">
                 {log.old_value && (
                   <div className="text-[10px] bg-slate-50 p-1.5 rounded border border-slate-100 opacity-50 truncate">
                     <span className="font-bold uppercase text-slate-400">Old:</span> {JSON.stringify(log.old_value)}
                   </div>
                 )}
                 {log.new_value && (
                   <div className="text-[10px] bg-emerald-50/50 p-1.5 rounded border border-emerald-100 truncate">
                     <span className="font-bold uppercase text-emerald-600">New:</span> {JSON.stringify(log.new_value)}
                   </div>
                 )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditLogs;
