import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Card } from '../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function Analytics() {
    const { expenses } = useExpenses();
    const [timeFilter, setTimeFilter] = useState('date'); // 'date', 'month', 'year'

    // Aggregate by selected time filter
    const aggregatedData = expenses.reduce((acc, exp) => {
        if (!exp.date) return acc;
        let key = exp.date;
        if (timeFilter === 'month') {
            key = exp.date.substring(0, 7); // YYYY-MM
        } else if (timeFilter === 'year') {
            key = exp.date.substring(0, 4); // YYYY
        }

        const existing = acc.find(item => item.name === key);
        if (existing) {
            existing.amount += exp.amount;
        } else {
            acc.push({ name: key, amount: exp.amount });
        }
        return acc;
    }, []).sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="space-y-6">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Analytics</h1>
                    <p className="text-slate-500">Deep dive into your spending habits</p>
                </div>
                <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    {['date', 'month', 'year'].map(filter => (
                        <button
                            key={filter}
                            onClick={() => setTimeFilter(filter)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                                timeFilter === filter 
                                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </header>

            <Card>
                <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-white capitalize">{timeFilter}ly Spending Trend</h3>
                <div className="h-[300px] md:h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={aggregatedData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Legend />
                            <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Spending" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
}
