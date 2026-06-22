import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Card } from '../components/ui/Card';
import { Plus, Search, Filter, Trash2, ArrowDownUp } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import ExpenseForm from '../components/ExpenseForm';

export default function Transactions() {
    const { expenses, deleteExpense } = useExpenses();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredExpenses = expenses.filter(expense => {
        const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = [
        { value: "all", label: "All Categories" },
        { value: "food", label: "Food" },
        { value: "transport", label: "Transport" },
        { value: "entertainment", label: "Entertainment" },
        { value: "utilities", label: "Utilities" },
        { value: "shopping", label: "Shopping" },
        { value: "health", label: "Health" },
        { value: "other", label: "Other" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Transactions</h1>
                    <p className="text-slate-500">Manage your expenses</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all"
                >
                    <Plus size={20} />
                    Add Expense
                </button>
            </div>

            <Card className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search expenses..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter size={20} className="text-slate-400" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                        >
                            {categories.map(cat => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </Card>

            {/* Mobile View: Card List */}
            <div className="md:hidden space-y-4">
                {filteredExpenses.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 p-8 text-center text-slate-500 rounded-2xl border border-slate-100 dark:border-slate-800">
                        No transactions found.
                    </div>
                ) : (
                    filteredExpenses.map((expense) => (
                        <div key={expense.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center shadow-sm">
                            <div className="space-y-1.5 flex-1 pr-4">
                                <p className="font-semibold text-slate-900 dark:text-white leading-tight">{expense.description}</p>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    <span className="capitalize px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                                        {expense.category}
                                    </span>
                                    {expense.paymentMode && (
                                        <span className="capitalize px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-[10px] font-semibold">
                                            {expense.paymentMode}
                                        </span>
                                    )}
                                    <span className="text-[11px] text-slate-400">{expense.date}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-slate-900 dark:text-white">₹{expense.amount.toFixed(2)}</span>
                                <button
                                    onClick={() => deleteExpense(expense.id)}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment Mode</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredExpenses.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                                        No transactions found.
                                    </td>
                                </tr>
                            ) : (
                                filteredExpenses.map((expense) => (
                                    <tr key={expense.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                                            {expense.description}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                                            <span className="capitalize px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-medium">
                                                {expense.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                                            {expense.paymentMode ? (
                                                <span className="capitalize px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs font-medium">
                                                    {expense.paymentMode}
                                                </span>
                                            ) : (
                                                <span className="text-slate-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                                            {expense.date}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white text-right">
                                            ₹{expense.amount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => deleteExpense(expense.id)}
                                                className="text-slate-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Expense">
                <ExpenseForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
}
