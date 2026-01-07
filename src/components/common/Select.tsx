import React, { forwardRef } from 'react';
import styled from 'styled-components';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helperText?: string;
    fullWidth?: boolean;
    options: Array<{ value: string | number; label: string }>;
}

const SelectWrapper = styled.div<{ $fullWidth?: boolean }>`
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

const StyledSelect = styled.select<{ $hasError?: boolean }>`
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-base);
    background-color: var(--color-surface);
    color: var(--color-text);
    border: 1px solid ${(props) => (props.$hasError ? 'var(--color-error)' : 'var(--color-border)')};
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    outline: none;
    width: 100%;
    cursor: pointer;

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
`;

const HelperText = styled.span<{ $isError?: boolean }>`
    font-size: var(--font-xs);
    color: ${(props) => (props.$isError ? 'var(--color-error)' : 'var(--color-text-secondary)')};
`;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, helperText, fullWidth = false, options, ...props }, ref) => {
        return (
            <SelectWrapper $fullWidth={fullWidth}>
                {label && <Label>{label}</Label>}
                <StyledSelect ref={ref} $hasError={!!error} {...props}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </StyledSelect>
                {(error || helperText) && (
                    <HelperText $isError={!!error}>{error || helperText}</HelperText>
                )}
            </SelectWrapper>
        );
    }
);

Select.displayName = 'Select';

export default Select;