import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Card } from '../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function Analytics() {
    const { expenses } = useExpenses();

    // Aggregate by date (simple implementation)
    const dailyData = expenses.reduce((acc, exp) => {
        const existing = acc.find(item => item.date === exp.date);
        if (existing) {
            existing.amount += exp.amount;
        } else {
            acc.push({ date: exp.date, amount: exp.amount });
        }
        return acc;
    }, []).sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Analytics</h1>
                <p className="text-slate-500">Deep dive into your spending habits</p>
            </header>

            <Card>
                <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-white">Daily Spending Trend</h3>
                <div className="h-[300px] md:h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dailyData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" />
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
