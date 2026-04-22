import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export type TransitionType = 'minecraft' | 'wave';

interface TransitionContextType {
    isTransitioning: boolean;
    transitionType: TransitionType;
    startTransition: (targetPath: string, type: TransitionType) => void;
    finishTransition: () => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionType, setTransitionType] = useState<TransitionType>('minecraft');
    const navigate = useNavigate();

    const startTransition = useCallback((targetPath: string, type: TransitionType) => {
        setTransitionType(type);
        setIsTransitioning(true);
        // Navigate halfway through the animation (0.8s)
        setTimeout(() => {
            navigate(targetPath);
        }, 800);
    }, [navigate]);

    const finishTransition = useCallback(() => {
        setIsTransitioning(false);
    }, []);

    return (
        <TransitionContext.Provider value={{ isTransitioning, transitionType, startTransition, finishTransition }}>
            {children}
        </TransitionContext.Provider>
    );
}

export function useTransition() {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error('useTransition must be used within a TransitionProvider');
    }
    return context;
}
