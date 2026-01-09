import React from 'react';
import styled from 'styled-components';
import Select from '../common/Select';
import { HistoryFilter as HistoryFilterType, OperationType } from '@customTypes/history.types';
import { EncryptionAlgorithm } from '@customtypes/encryption.types';
import { ENCRYPTION_ALGORITHMS } from '@utils/constants';

interface HistoryFilterProps {
    filter: HistoryFilterType;
    onFilterChange: (filter: HistoryFilterType) => void;
}

const FilterContainer = styled.div`
    padding: var(--spacing-lg);
    background-color: var(--color-surface);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    margin-bottom: var(--spacing-lg);
`;

const FilterGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-md);
`;

const FilterTitle = styled.h3`
    font-size: var(--font-lg);
    font-weight: var(--font-semibold);
    color: var(--color-text);
    margin-bottom: var(--spacing-md);
`;

export const HistoryFilter: React.FC<HistoryFilterProps> = ({ filter, onFilterChange }) => {
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange({
            ...filter,
            type: e.target.value ? (e.target.value as OperationType) : undefined,
        });
    };

    const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange({
            ...filter,
            algorithm: e.target.value ? (e.target.value as EncryptionAlgorithm) : undefined;
        });
    };

    const handleSuccessOnlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFilterChange({
            ...filter,
            successOnly: e.target.checked,
        });
    };

    return (
        <FilterContainer>
            <FilterTitle>Filter History</FilterTitle>
            <FilterGrid>
                <Select
                    label="Operation Type"
                    value={filter.type || ''}
                    onChange={handleTypeChange}
                    options={[
                        { value: '', label: 'All Types' },
                        { value: 'encrypt', label: 'Encrypt' },
                        { value: 'decrypt', label: 'Decrypt' },
                        { value: 'key-generate', label: 'Key Generate' },
                    ]}
                    fullWidth
                />

                <Select 
                    label="Algorithm"
                    value={filter.algorithm || ''}
                    onChange={handleAlgorithmChange}
                    options={[
                        { value: '', label: 'All Algorithms' },
                        ...ENCRYPTION_ALGORITHMS.map((alg) => ({
                            value: alg.value,
                            label: alg.label,
                        })),
                    ]}
                    fullWidth
                />

                <div style={{ display: 'flex', alignItems: 'center', paddingTop: 'var(--spacing-lg)' }}>
                    <input
                        type="checkbox"
                        id="successOnly"
                        checked={filter.successOnly || false}
                        onChange={handleSuccessOnlyChange}
                        style={{ marginRight: 'var(--spacing-sm)' }}
                    />
                    <label htmlFor="successOnly" style={{ fontSize: 'var(--font-sm)', color: 'var(--color-text)' }}>
                        Show successful only
                    </label>
                </div>
            </FilterGrid>
        </FilterContainer>
    );
};

export default HistoryFilter;