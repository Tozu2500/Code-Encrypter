import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
}

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: var(--z-modal);
    padding: var(--spacing-lg);
`;

const ModalContent = styled(motion.div)<{ $size?: string }>`
    background-color: var(--color-surface);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    max-height: 90vh;
    overflow-y: auto;
    width: 100%;

    ${(props) => {
        switch (props.$size) {
            case 'sm':
                return 'max-width: 400px;';
            case 'lg':
                return 'max-width: 800px;';
            default:
                return 'max-width: 600px;';
        }
    }}
`;

const ModalHeader = styled.div`
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ModalTitle = styled.h2`
    font-size: var(--font-xl);
    font-weight: var(--font-semibold);
    color: var(--color-text);
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: var(--font-2xl);
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: var(--spacing-xs);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);

    &:hover {
        background-color: var(--color-border);
        color: var(--color-text);
    }
`;

const ModalBody = styled.div`
    padding: var(--spacing-lg);
`;

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
}) => {
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Body scroll prevention when modal open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <Overlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleOverlayClick}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <ModalContent
                        $size={size}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {title && (
                            <ModalHeader>
                                <ModalTitle id="modal-title">{title}</ModalTitle>
                                <CloseButton onClick={onClose} aria-label="Close modal">&times;</CloseButton>
                            </ModalHeader>
                        )}
                        <ModalBody>{children}</ModalBody>
                    </ModalContent>
                </Overlay>
            )}
        </AnimatePresence>
    );
};

export default Modal;