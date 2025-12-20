import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import Button from '../common/Button';
import FileUpload from '../common/FileUpload';
import { useApp } from '@context/AppContext';
import { useDecryption } from '@hooks/useDecryption';
import { FileService } from '@services/fileService';
import { EncryptedFile } from '@customTypes/file.types';

const DecryptorContainer = styled.div`
    width: 100%;
`;

const FormGrid = styled.div`
    display: grid;
    gap: var(--spacing-lg);
`;

const FileInfo = styled.div`
    padding: var(--spacing-md);
    background-color: var(--color-surface);
    border-radius: var(--radius-md);
    font-size: var(--font-sm);
`;

interface FileDecryptorProps {
    decryptionKey: string;
}

export const FileDecryptor: React.FC<FileDecryptorProps> = ({ decryptionKey }) => {
    const [encryptedFile, setEncryptedFile] = useState<EncryptedFile | null>(null);
    const { decrypt: isDecrypting } = useDecryption();
    const { addToast } = useApp();

    const handleFileSelect = async (file: File) => {
        try {
            const fileData = await FileService.readEncryptedFile(file);
            setEncryptedFile(fileData);
            addToast('success', 'Encrypted file loaded successfully');
        } catch (error) {
            addToast('error', 'Failed to load encrypted file. Make sure it\'s a valid encrypted file');
        }
    };

    const handleDecryptFile = async () => {
        if (!encryptedFile) {
            addToast('error', 'Please select an encrypted file first');
            return;
        }

        if (!decryptionKey) {
            addToast('error', 'Please provide a decryption key');
            return;
        }

        try {
            const validAlgorithms = ["AES", "DES", "TripleDES", "RSA", "Rabbit", "RC4"];
            if (!validAlgorithms.includes(encryptedFile.algorithm)) {
                addToast('error', 'Invalid encryption algorithm in file');
                return;
            }

            const result = await decrypt(encryptedFile.encryptedContent, {
                algorithm: encryptedFile.algorithm as any,
                key: decryptionKey,
            });

            if (result.success) {
                FileService.saveDecryptedFile(result.decrypted, encryptedFile.originalName);
                addToast('success', 'File decrypted and downloaded successfully');
            } else {
                addToast('error', 'Decryption failed - check your key');
            }
        } catch (error) {
            addToast('error', 'File decryption failed');
        }
    };

    return (
        <DecryptorContainer>
            <Card title="File Decryption">
                <FormGrid>
                    <FileUpload
                        onFileSelect={handleFileSelect}
                        accept=".json"
                        label="Select encrypted file (.json)"
                    />
                    
                    {encryptedFile && (
                        <FileInfo>
                            <p style={{ margin: 0}}>
                                <strong>Original File:</strong> {encryptedFile.originalName}
                            </p>
                            <p style={{ margin: 0, marginTop: 'var(--spacing-xs) '}}>
                                <strong>Algorithm:</strong> {encryptedFile.algorithm}
                            </p>
                            <p style={{ margin: 0, marginTop: 'var(--spacing-xs)' }}>
                                <strong>Encrypted Size:</strong> {(encryptedFile.size / 1024).toFixed(2)} KB
                            </p>
                        </FileInfo>
                    )}

                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleDecryptFile}
                        isLoading={isDecrypting}
                        disabled={!encryptedFile || !decryptionKey}
                        fullWidth
                    >
                        Decrypt File
                    </Button>
                </FormGrid>
            </Card>
        </DecryptorContainer>
    );
};

export default FileDecryptor;