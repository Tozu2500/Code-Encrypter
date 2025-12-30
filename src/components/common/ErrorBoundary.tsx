import React, { ReactNode, ReactElement } from 'react';
import styled from 'styled-components';
import { FiAlertTriangle } from 'react-icons/fi';
import Button from './Button';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

const ErrorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: var(--color-background);
    padding: var(--spacing-xl);
`;

const ErrorContent = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-2xl);
    max-width: 600px;
    text-align: center;
    box-shadow: var(--shadow-lg);
`;

const ErrorIcon = styled.div`
    font-size: var(--font-4xl);
    color: var(--color-error);
    margin-bottom: var(--spacing-lg);
`;

const ErrorTitle = styled.h1`
    font-size: var(--font-2xl);
    font-weight: var(--font-bold);
    color: var(--color-text);
    margin-bottom: var(--spacing-md);
`;

const ErrorMessage = styled.p`
    font-size: var(--font-base);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-lg);
    line-height: 1.6;
`;

const ErrorDetails = styled.div`
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
    text-align: left;
    max-height: 200px;
    overflow-y: auto;
    font-family: 'Courier New', monospace;
    font-size: var(--font-xs);
    color: var(--color-text-secondary);
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: var(--spacing-md);
    justify-content: center;
`;

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Error caught by boundary', error, errorInfo);
        }

        this.setState({
            error,
            errorInfo,
        });
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };
}