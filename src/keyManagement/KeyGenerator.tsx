import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import { generateRandomKey, generateAESKey, validateKeyStrength } from '@utils/keyGenerator';
import { FiRefreshCw, FiCopy } from 'react-icons/fi';
import { copyToClipboard} from '@utils/helpers';

interface KeyGeneratorProps {
    onKeyGenerated?: (key: string) => void;
}

const GeneratorContainer = styled(Card)`
    padding: var(--spacing-lg);
`;

const Title = styled.h3`
    font-size: var(--font-lg);
    font-weight: var(--font-semibold);
    color: var(--color-text);
    margin-bottom: var(--spacing-md);
`;

const FormGrid = styled.div`
    display: grid;
    gap: var(--spacing-md);
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
`;

const KeyStrengthIndicator = styled.div<{ strength: 'weak' | 'medium' | 'strong' }>`
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    font-size: var(--font-sm);
    font-weight: var(--font-medium);
    text-align: center;
    background-color: ${(props) => {
        switch (props.strength) {
            case 'weak':
                return 'rgba(239, 68, 68, 0.1)';
            case 'medium':
                return 'rgba(245, 158, 11, 0.1)';
            case 'strong':
                return 'rgba(16, 185, 129, 0.1)';
        }
    }};
    color: ${(props) => {
        switch (props.strength) {
            case 'weak':
                return 'var(--color-error)';
            case 'medium':
                return 'var(--color-warning)';
            case 'strong':
                return 'var(--color-success)';
        }
    }};
`;

export const KeyGenerator: React.FC<KeyGeneratorProps> = ({ onKeyGenerated }) => {
    const [generatedKey, setGeneratedKey] = useState('');
    const [keyStrength, setKeyStrength] = useState<{
        strength: 'weak' | 'medium' | 'strong';
        score: number;
    } | null>(null);

    const handleGenerateKey = (length: number = 32) => {
        const key = generateRandomKey(length);
        setGeneratedKey(key);
        setKeyStrength(validateKeyStrength(key));
        onKeyGenerated?.(key);
    };

    const handleGenerateAESKey = (keySize: 128 | 192 | 256 = 256) => {
        const key = generateAESKey(keySize);
        setGeneratedKey(key);
        setKeyStrength(validateKeyStrength(key));
        onKeyGenerated?.(key);
    };

    const handleCopy = () => {
        copyToClipboard(generatedKey);
    };

    return (
        <GeneratorContainer>
            <Title>Key Generator</Title>

            <FormGrid>
                <Input 
                    label="Generate Key"
                    value={generatedKey}
                    readOnly
                    placeholder="Click a button below to generate a key"
                    fullWidth
                />

                {keyStrength && (
                    <KeyStrengthIndicator strength={keyStrength.strength}>
                        Key Strength: {keyStrength.strength.toUpperCase()} (Score: {keyStrength.score}/6)
                    </KeyStrengthIndicator>
                )}

                <ButtonGroup>
                    <Button size="sm" onClick={() => handleGenerateKey(16)}>
                        16-byte Key
                    </Button>
                    <Button size="sm" onClick={() => handleGenerateKey(32)}>
                        32-byte Key
                    </Button>
                    <Button size="sm" onClick={() => handleGenerateKey(64)}>
                        64-byte Key
                    </Button>
                </ButtonGroup>

                <ButtonGroup>
                    <Button size="sm" variant="secondary" onClick={() => handleGenerateAESKey(128)}>
                        AES-128
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => handleGenerateAESKey(192)}>
                        AES-192
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => handleGenerateAESKey(256)}>
                        AES-256
                    </Button>
                </ButtonGroup>

                {generatedKey && (
                    <ButtonGroup>
                        <Button variant="success" onClick={handleCopy} fullWidth>
                            <FiCopy /> Copy Key
                        </Button>
                        <Button variant="secondary" onClick={() => handleGenerateKey(32)}>
                            <FiRefreshCw /> Regenerate
                        </Button>
                    </ButtonGroup>
                )}
            </FormGrid>
        </GeneratorContainer>
    );
};

export default KeyGenerator;