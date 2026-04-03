import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Card } from '../components/ui/Card';
import { Download, Trash2, Moon, Sun } from 'lucide-react';

export default function Settings() {
    const { expenses } = useExpenses();

    const handleExport = () => {
        const headers = ['ID,Description,Amount,Category,Date'];
        const csvContent = expenses.map(e =>
            `${e.id},"${e.description}",${e.amount},${e.category},${e.date}`
        ).join('\n');

        const blob = new Blob([headers + '\n' + csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `expenses-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const clearData = () => {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Settings</h1>
                <p className="text-slate-500">App preferences</p>
            </header>

            <Card className="space-y-6">
                <div>
                    <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Data Management</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                        <button
                            onClick={handleExport}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl font-medium transition-colors"
                        >
                            <Download size={20} />
                            Export to CSV
                        </button>

                        <button
                            onClick={clearData}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-medium transition-colors"
                        >
                            <Trash2 size={20} />
                            Clear All Data
                        </button>
                    </div>
                </div>
            </Card>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400 text-sm">
                <p>Current Version: 1.0.0 (Pro)</p>
            </div>
        </div>
    );
}
