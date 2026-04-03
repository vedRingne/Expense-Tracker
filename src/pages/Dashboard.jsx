import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Card } from '../components/ui/Card';
import { DollarSign, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function Dashboard() {
    const { expenses } = useExpenses();

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Calculate category data for Pie Chart
    const categoryData = expenses.reduce((acc, exp) => {
        const existing = acc.find(item => item.name === exp.category);
        if (existing) {
            existing.value += exp.amount;
        } else {
            acc.push({ name: exp.category, value: exp.amount });
        }
        return acc;
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    return (
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Dashboard</h1>
                <p className="text-slate-500 dark:text-slate-400">Overview of your finances</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-blue-100 mb-1">Total Expenses</p>
                            <h3 className="text-3xl font-bold">₹{totalExpenses.toFixed(2)}</h3>
                        </div>
                        <div className="p-2 bg-white/20 rounded-lg">
                            <DollarSign className="text-white" size={24} />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-sm mb-1">Transaction Count</p>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{expenses.length}</h3>
                        </div>
                        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                            <Activity size={24} />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-sm mb-1">High Spending Category</p>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white capitalize">
                                {categoryData.sort((a, b) => b.value - a.value)[0]?.name || '-'}
                            </h3>
                        </div>
                        <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-white">Expenses by Category</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-white">Recent Transactions</h3>
                    <div className="space-y-4">
                        {expenses.slice(0, 5).map(expense => (
                            <div key={expense.id} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                        <DollarSign size={18} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-800 dark:text-white">{expense.description}</p>
                                        <p className="text-xs text-slate-500">{expense.date}</p>
                                    </div>
                                </div>
                                <span className="font-semibold text-slate-800 dark:text-white">₹{expense.amount.toFixed(2)}</span>
                            </div>
                        ))}
                        {expenses.length === 0 && <p className="text-slate-500 text-center py-4">No transactions yet</p>}
                    </div>
                </Card>
            </div>
        </div>
    );
}
