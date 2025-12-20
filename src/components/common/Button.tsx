import React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    isLoading?: boolean;
    'aria-label'?: string;
}

const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' | 'success'; $size?: 'sm' | 'md' | 'lg'; $fullWidth?: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    font-weight: var(--font-medium);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    cursor: pointer;
    border: none;
    outline: none;

    /* Size vars */
    ${(props) => {
        switch (props.$size) {
            case 'sm':
                return `
                    padding: var(--spacing-sm) var(--spacing-md);
                    font-size: var(--font-sm);
                `;
            case 'lg':
                return `
                    padding: var(--spacing-md) var(--spacing-xl);
                    font-size: var(--font-lg);
                `;
            default:
                return `
                    padding: var(--spacing-sm) var(--spacing-lg);
                    font-size: var(--font-base);
                `;
        }
    }}

    /* Color vars */
    ${(props) => {
        switch (props.$variant) {
            case 'secondary':
                return `
                    background-color: var(--color-surface);
                    color: var(--color-text);
                    border: 1px solid var(--color-border);

                    &:hover:not(:disabled) {
                        background-color: var(--color-border);
                    }
                `;
            case 'danger':
                return `
                    background-color: var(--color-error);
                    color: white;

                    &:hover:not(:disabled) {
                        opacity: 0.9;
                    }
                `;
            case 'success':
                return `
                    background-color: var(--color-success);
                    color: white;

                    &:hover:not(:disabled) {
                        opacity: 0.9;
                    }
                `;
            default:
                return `
                    background-color: var(--color-primary);
                    color: white;

                    &:hover:not(:disabled) {
                        background-color: var(--color-primary-hover);
                    }
                `;
        }
    }}

    ${(props) => props.$fullWidth && 'width: 100%;'}

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    &:active:not(:disabled) {
        transform: scale(0.98);
    }
`;

const Spinner = styled.span`
    display: inline-block;
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
`;

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    isLoading = false,
    disabled,
    ...props
}) => {
    return (
        <StyledButton
            $variant={variant}
            $size={size}
            $fullWidth={fullWidth}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Spinner />}
            {children}
        </StyledButton>
    );
};

export default Button;