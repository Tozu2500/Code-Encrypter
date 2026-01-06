import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingProps {
    size?: 'sm' | 'md' | 'lg';
    fullScreen?: boolean;
}

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const LoadingContainer = styled.div<{ $fullScreen?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    ${(props) =>
        props.$fullScreen &&
        `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--color-background);
        z-index: var(--z-modal);
        `}
    ${(props) => !props.$fullScreen && 'padding: var(--spacing-xl);'}
`;

const Spinner = styled.div<{ $size?: string }>`
    ${(props) => {
        switch (props.$size) {
            case 'sm':
                return `
                    width: 24px;
                    height: 24px;
                    border-width: 2px;
                `;
            case 'lg':
                return `
                    width: 64px;
                    height: 64px;
                    border-width: 4px;
                `;
            default:
                return `
                    width: 40px;
                    height: 40px;
                    border-width: 3px;
                `;
        }
    }}
    border: solid var(--color-primary);
    border-right-color: transparent;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
`;

const LoadingText = styled.p`
    margin-top: var(--spacing-md);
    color: var(--color-text-secondary);
    font-size: var(--font-sm);
`;

export const Loading: React.FC<LoadingProps & { text?: string }> = ({
    size = 'md',
    fullScreen = false,
    text,
}) => {
    return (
        <LoadingContainer $fullScreen={fullScreen}>
            <div style={{ textAlign: 'center' }}>
                <Spinner $size={size} />
                {text && <LoadingText>{text}</LoadingText>}
            </div>
        </LoadingContainer>
    );
};

export default Loading;