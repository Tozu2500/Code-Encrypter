import React from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import { HistoryEntry } from '@customTypes/history.types';
import { formatDate, formatDuration, formatBytes } from '@utils/formatters';
import { FiTrash2 } from 'react-icons/fi';
import Button from '../common/Button';

interface HistoryItemProps {
    entry: HistoryEntry;
    onDelete?: (id: string) => void;
}

const ItemContainer = styled(Card)`
    padding: var(--spacing-md);
    cursor: pointer;
    transition: all var(--transition-fast);

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }
`;

const ItemHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: var(--spacing-sm);
`;

const ItemInfo = styled.div`
    flex: 1;
`;

const ItemType = styled.div`
    font-size: var(--font-base);
    font-weight: var(--font-semibold);
    color: var(--color-text);
    text-transform: capitalize;
    margin-bottom: var(--spacing-xs);
`;

const ItemMeta = styled.div`
    font-size: var(--font-sm);
    color: var(--color-text-secondary);
`;

const StatusBadge = styled.span<{ success: boolean }>`
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-xs);
    font-weight: var(--font-medium);
    background-color: ${(props) =>
        props.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
    color: ${(props) => (props.success ? 'var(--color-success)' : 'var(--color-error)')};
`;

const ItemDetails = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spacing-sm);
    padding-top: var(--spacing-sm);
    border-top: 1px solid var(--color-border);
`;

const DetailItem = styled.div``;

const DetailLabel = styled.div`
    font-size: var(--font-xs);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xs);
`;

const DetailValue = styled.div`
    font-size: var(--font-sm);
    color: var(--color-text);
    font-weight: var(--font-medium);
`;

export const HistoryItem: React.FC<HistoryItemProps> = ({ entry, onDelete }) => {
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this history entry?')) {
            onDelete?.(entry.id);
        }
    };

    return (
        <ItemContainer>
            <ItemHeader>
                <ItemInfo>
                    <ItemType>{entry.type} Operation</ItemType>
                    <ItemMeta>{formatDate(entry.timestamp, 'PPpp')}</ItemMeta>
                </ItemInfo>
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
                    <StatusBadge success={entry.success}>
                        {entry.success ? 'Success' : 'Failed'}
                    </StatusBadge>
                    {onDelete && (
                        <Button size="sm" variant="danger" onClick={handleDelete}>
                            <FiTrash2 />
                        </Button>
                    )}
                </div>
            </ItemHeader>

            <ItemDetails>
                <DetailItem>
                    <DetailLabel>Algorithm</DetailLabel>
                    <DetailValue>{entry.algorithm}</DetailValue>
                </DetailItem>

                <DetailItem>
                    <DetailLabel>Input Size</DetailLabel>
                    <DetailValue>{formatBytes(entry.inputSize)}</DetailValue>
                </DetailItem>

                <DetailItem>
                    <DetailLabel>Output Size</DetailLabel>
                    <DetailValue>{formatBytes(entry.outputSize)}</DetailValue>
                </DetailItem>

                <DetailItem>
                    <DetailLabel>Duration</DetailLabel>
                    <DetailValue>{formatDuration(entry.duration)}</DetailValue>
                </DetailItem>

                {entry.filename && (
                    <DetailItem>
                        <DetailLabel>File Name</DetailLabel>
                        <DetailValue>{entry.fileName}</DetailValue>
                    </DetailItem>
                )}
            </ItemDetails>

            {!entry.success && entry.error && (
                <div style={{ marginTop: 'var(--spacing-sm)', padding: 'var(--spacing-sm)', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--color-error)' }}>
                        Error: {entry.error}
                    </div>
                </div>
            )}
        </ItemContainer>
    );
};

export default HistoryItem;