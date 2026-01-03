import React, { forwardRef } from 'react';
import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    fullWidth?: boolean;
}

const InputWrapper = styled.div<{ $fullWidth?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    ${(props) => props.$fullWidth && 'width: 100%;'}
`;

const Label = styled.label`
    font-size: var(--font-sm);
    font-weight: var(--font-medium);
    color: var(--color-text);
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-base);
    background-color: var(--color-surface);
    color: var(--color-text);
    border: 1px solid ${(props) => (props.$hasError ? 'var(--color-error)' : 'var(--color-border)')};
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    outline: none;
    width: 100%;

    &:focus {
        border-color: ${(props) => (props.$hasError ? 'var(--color-error)' : 'var(--color-primary)')};
        box-shadow: 0 0 0 3px
            ${(props) =>
                props.$hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)'};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    &::placeholder {
        color: var(--color-text-secondary);
    }
`;

const HelperText = styled.span<{ $isError?: boolean }>`
    font-size: var(--font-xs);
    color: ${(props) => (props.$isError ? 'var(--color-error)' : 'var(--color-text-secondary)')};
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, fullWidth = false, ...props }, ref) => {
        return (
            <InputWrapper $fullWidth={fullWidth}>
                {label && <Label>{label}</Label>}
                <StyledInput ref={ref} $hasError={!!error} {...props} />
                {(error || helperText) && (
                    <HelperText $isError={!!error}>{error || helperText}</HelperText>
                )}
            </InputWrapper>
        );
    }
);

Input.displayName = 'Input';

export default Input;