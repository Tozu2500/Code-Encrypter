import React from 'react';
import styled from 'styled-components';

interface CardProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
    padding?: string;
}

const StyledCard = styled.div<{ $padding?: string }>`
    background-color: var(--color-surface);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    border: 1px solid var(--color-border);
    overflow: hidden;
    transition: box-shadow var(--transition-fast);

    &:hover {
        box-shadow: var(--shadow-lg);
    }
    
    ${(props) => props.$padding && `padding: ${props.$padding};`}
`;

const CardHeader = styled.div`
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);
`;

const CardTitle = styled.h3`
    font-size: var(--font-lg);
    font-weight: var(--font-semibold);
    color: var(--color-text);
    margin: 0;
`;

const CardBody = styled.div`
    padding: var(--spacing-lg);
`;

export const Card: React.FC<CardProps> = ({ children, title, className, padding }) => {
    if (title) {
        return (
            <StyledCard className={className}>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardBody>{children}</CardBody>
            </StyledCard>
        );
    }

    return (
        <StyledCard className={className} $padding={padding || 'var(--spacing-lg)'}>
            {children}
        </StyledCard>
    );
};

export default Card;