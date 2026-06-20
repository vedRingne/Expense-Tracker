/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // Sync with Firebase real-time database based on user
    useEffect(() => {
        if (!user) {
            setExpenses([]);
            setLoading(false);
            return;
        }
        
        const q = query(
            collection(db, 'expenses'),
            where("userId", "==", user.uid)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const expensesData = [];
            querySnapshot.forEach((docSnap) => {
                expensesData.push({ id: docSnap.id, ...docSnap.data() });
            });
            
            // Sort by creation time descending (newest first)
            expensesData.sort((a, b) => {
                if (b.createdAt && a.createdAt) {
                    return b.createdAt - a.createdAt;
                }
                return 0;
            });
            
            setExpenses(expensesData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching expenses from Firebase: ", error);
            setLoading(false);
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, [user]);

    const addExpense = async (expense) => {
        if (!user) return;
        try {
            await addDoc(collection(db, 'expenses'), {
                ...expense,
                amount: parseFloat(expense.amount),
                createdAt: Date.now(),
                userId: user.uid
            });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const deleteExpense = async (id) => {
        if (!user) return;
        try {
            await deleteDoc(doc(db, 'expenses', id));
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    return (
        <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, loading }}>
            {children}
        </ExpenseContext.Provider>
    );
}

export function useExpenses() {
    return useContext(ExpenseContext);
}
