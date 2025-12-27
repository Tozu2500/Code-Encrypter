import React from 'react';
import styled from 'styled-components';
import { Select } from '../common/Select';
import Card from '../common/Card';
import { ENCRYPTION_ALGORITHMS } from '@utils/constants';
import { EncryptionAlgorithm } from '@customTypes/encryption.types';

interface AlgorithmSelectorProps {
    value: EncryptionAlgorithm;
    onChange: (algorithm: EncryptionAlgorithm) => void;
    showDetails?: boolean;
}

const SelectorContainer = styled.div`
    width: 100%;
`;

const AlgorithmDetails = styled(Card)`
    margin-top: var(--spacing-md);
    padding: var(--spacing-md);
`;

const DetailTitle = styled.h4`
    font-size: var(--font-base);
    font-weight: var(--font-semibold);
    color: var(--color-text);
    margin-bottom: var(--spacing-sm);
`;

const DetailText = styled.p`
    font-size: var(--font-sm);
    color: var(--color-text-secondary);
    line-height: 1.6;
`;

const algorithmDescriptions: Record<EncryptionAlgorithm, string> = {
    AES: 'Advanced Encryption Standard (AES) is a symmetric encryption algorithm widely used. Offers strong security with 128, 192 and 256-bit keys.',
    DES: 'Data Encryption Standard (DES) is a symmetric-key algorithm. Considered outdated for high-security apps, but remains useful for legacy system compatibility.',
    TripleDES: 'Triple DES applies the DES algorithm three times to each data block, providing better security than the default DES. The downside is, that it is slower.',
    RSA: 'RSA is an asymmetric cryptographic algorithm using public and private keys. It is perfect for secure key exchange and digital signatures, but slower for bulk data.',
    Rabbit: 'Rabbit is a high-speed stream cipher optimized for software implementation. It offers good security with great performance.'
};

export const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
    value,
    onChange,
    showDetails = true,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value as EncryptionAlgorithm);
    };

    return (
        <SelectorContainer>
            <Select
                label="Encryption Algorithm"
                value={value}
                onChange={handleChange}
                options={ENCRYPTION_ALGORITHMS.map((alg) => ({
                    value: alg.value,
                    label: alg.label,
                }))}
                fullWidth
            />

            {showDetails && (
                <AlgorithmDetails>
                    <DetailTitle>{value} Algorithm</DetailTitle>
                    <DetailText>{algorithmDescriptions[value]}</DetailText>
                </AlgorithmDetails>
            )}
        </SelectorContainer>
    );
};

export default AlgorithmSelector;