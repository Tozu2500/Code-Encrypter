import React from 'react';
import styled from 'styled-components';
import { FiCopy, FiDownload, FiEye, FiEyeOff } from 'react-icons/fi';
import Button from '../common/Button';
import Card from '../common/Card';
import { EncryptionResult } from '@customTypes/encryption.types';
import { copyToClipboard, downloadFile } from '@utils/helpers';

interface EncryptionOutputProps {
    result: EncryptionResult;
    onCopy?: () => void;
    onDownload?: () => void;
}

const OutputContainer = styled(Card)`
    margin-top: var(--spacing-lg);
`;

const OutputHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
`;

const OutputTitle = styled.h3`
    font-size: var(--font-lg);
    font-weight: var(--font-semibold);
    color: var(--color-text);
`

const ButtonGroup = styled.textarea`
    display: flex;
    gap: var(--spacing-sm);
`;

const TextArea = styled.textarea`
    width: 100%;
    min-height: 200px;
    padding: var(--spacing-md);
    font-size: var(--font-sm);
    font-family: 'Courier New', monospace;
    background-color: var(--color-background);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    resize: vertical;
    outline: none;
`;

const MetadataGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-md);
    margin-top: var(--spacing-md);
    padding-top: var(--spacing-md);
    border-top: 1px solid var(--color-border);
`;

const MetadataItem = styled.div``;

const MetadataLabel = styled.div`
    font-size: var(--font-xs);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xs);
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const MetadataValue = styled.div`
    font-size: var(--font-base);
    color: var(--color-text);
    font-weight: var(--font-medium);
`;

export const EncryptionOutput: React.FC<EncryptionOutputProps> = ({
    result,
    onCopy,
    onDownload,
}) => {
    const [showKey, setShowKey] = React.useState(false);

    const handleCopy = () => {
        copyToClipboard(result.encrypted);
        onCopy?.();
    };

    const handleDownload = () => {
        downloadFile(result.encrypted, `encrypted_${result.timestamp}.txt`, 'text/plain');
        onDownload?.();
    };

    return (
        <OutputContainer>
            <OutputHeader>
                <OutputTitle>Encryption Result</OutputTitle>
                <ButtonGroup>
                    <Button size="sm" variant="secondary" onClick={handleCopy}>
                        <FiCopy /> Copy
                    </Button>
                    <Button size="sm" variant="secondary" onClick={handleDownload}>
                        <FiDownload /> Download
                    </Button>
                </ButtonGroup>
            </OutputHeader>

            <TextArea value={result.encrypted} readOnly />

            <MetadataGrid>
                <MetadataItem>
                    <MetadataLabel>Algorithm</MetadataLabel>
                    <MetadataValue>{result.algorithm}</MetadataValue>
                </MetadataItem>

                <MetadataItem>
                    <MetadataLabel>Key</MetadataLabel>
                    <MetadataValue style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {showKey ? result.key.substring(0, 16) + '...' : '**********'}
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setShowKey(!showKey)}
                            style={{ padding: '4px 8px', minWidth: 'auto' }}
                            title={showKey ? 'Hide key' : 'Show key'}
                        >
                            {showKey ? <FiEyeOff /> : <FiEye />}
                        </Button>
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => copyToClipboard(result.key)}
                            style={{ padding: '4px 8px', minWidth: 'auto' }}
                            title="Copy full key to clipboard"
                        >
                            <FiCopy />
                        </Button>
                    </MetadataValue>
                </MetadataItem>

                {result.iv && (
                    <MetadataItem>
                        <MetadataLabel>IV</MetadataLabel>
                        <MetadataValue>{result.iv.substring(0, 16)}...</MetadataValue>
                    </MetadataItem>
                )}

                {result.salt && (
                    <MetadataItem>
                        <MetadataLabel>Salt</MetadataLabel>
                        <MetadataValue>{result.salt.substring(0, 16)}...</MetadataValue>
                    </MetadataItem>
                )}

                <MetadataItem>
                    <MetadataLabel>Output Size</MetadataLabel>
                    <MetadataValue>{result.encrypted.length} bytes</MetadataValue>
                </MetadataItem>
            </MetadataGrid>
        </OutputContainer>
    );
};

export default EncryptionOutput;