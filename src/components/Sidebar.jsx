import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, Settings, PieChart, LogOut, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ isOpen, onClose }) {
    const { logout, user } = useAuth();

    const navItems = [
        { to: "/", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
        { to: "/transactions", icon: <Receipt size={20} />, label: "Transactions" },
        { to: "/analytics", icon: <PieChart size={20} />, label: "Analytics" },
        { to: "/settings", icon: <Settings size={20} />, label: "Settings" },
    ];

    return (
        <aside className={`fixed left-0 top-0 h-screen w-64 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 flex flex-col z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="p-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Expenzo
                </h1>
                <button
                    onClick={onClose}
                    className="p-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 md:hidden rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors"
                    aria-label="Close menu"
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={onClose}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`
                        }
                    >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                {user && (
                    <div className="px-2">
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                )}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
                    <p className="text-sm opacity-90">Pro Plan</p>
                    <p className="text-xs opacity-75 mt-1">Unlock all features</p>
                </div>
                <button 
                    onClick={() => {
                        logout();
                        onClose && onClose();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}

