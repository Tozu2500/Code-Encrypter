import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastMessage as ToastMessageType } from '@customTypes/app.types';
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

interface ToastProps {
    toasts: ToastMessageType[];
    removeToast: (id: string) => void;
}

const ToastContainer = styled.div`
    position: fixed;
    top: var(--spacing-lg);
    right: var(--spacing-lg);
    z-index: var(--z-toast);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    max-width: 400px;
`;

const ToastItem = styled(motion.div)<{ $type: string }>`
    background-color: var(--color-surface);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    padding: var(--spacing-md);
    display: flex;
    align-items: start;
    gap: var(--spacing-sm);
    border-left: 4px solid
        ${(props) => {
            switch (props.$type) {
                case 'success':
                    return 'var(--color-success)';
                case 'error':
                    return 'var(--color-error)';
                case 'warning':
                    return 'var(--color-warning)';
                default:
                    return 'var(--color-info)';
            }
        }};
`;

const IconWrapper = styled.div<{ $type: string }>`
    color: ${(props) => {
        switch (props.$type) {
            case 'success':
                return 'var(--color-success)';
            case 'error':
                return 'var(--color-error)';
            case 'warning':
                return 'var(--color-warning)';
            default:
                return 'var(--color-info)';
        }
    }};
    font-size: var(--font-xl);
    flex-shrink: 0;
`;

const ToastContent = styled.div`
    flex: 1;
`;

const ToastMessage = styled.p`
    color: var(--color-text);
    font-size: var(--font-sm);
    margin: 0;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 0;
    font-size: var(--font-lg);
    flex-shrink: 0;
    transition: color var(--transition-fast);

    &:hover {
        color: var(--color-text);
    }
`;

const getIcon = (type: string) => {
    switch (type) {
        case 'success':
            return <FiCheckCircle />;
        case 'error':
            return <FiXCircle />;
        case 'warning':
            return <FiAlertCircle />;
        default:
            return <FiInfo />
    }
};

export const Toast: React.FC<ToastProps> = ({ toasts, removeToast }) => {
    return (
        <ToastContainer>
            <AnimatePresence>
                {toasts.map((toast) => (
                    <ToastItem
                        key={toast.id}
                        $type={toast.type}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <IconWrapper $type={toast.type}>{getIcon(toast.type)}</IconWrapper>
                        <ToastContent>
                            <ToastMessage>{toast.message}</ToastMessage>
                        </ToastContent>
                        <CloseButton onClick={() => removeToast(toast.id)}>&times;</CloseButton>
                    </ToastItem>
                ))}
            </AnimatePresence>
        </ToastContainer>
    );
};

export default Toast;