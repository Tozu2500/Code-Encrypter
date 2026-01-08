import React from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import Button from '../common/Button';
import FileUpload from '../common/FileUpload';
import { useApp } from '@context/AppContext';
import { useFileHandler } from '@hooks/useFileHandler';
import { useEncryption } from '@hooks/useEncryption';
import { FileService } from '@services/fileService';
import { EncryptionAlgorithm } from '@customTypes/encryption.types';
import { generateId } from '@utils/helpers';

// Main container for encryptor UI
const EncryptorContainer = styled.div`
    width: 100%;
`;

const FormGrid = styled.div`
    display: grid;
    gap: var(--spacing-lg);
`;

// Props for the FileEncryptor component
interface FileEncryptorProps {
    // Algorithm to use for encryption
    algorithm: EncryptionAlgorithm;
    // Encryption key/pass provided by the user
    encryptionKey: string;
}

/** FileEncryptor Component
 * 
 * Handles the file encryption workflow:
 * 1. User selects file to encrypt
 * 2. Component reads the file content
 * 3. Encrypts content with the provided key
 * 4. Allows downloading the encrypted file
 * 
 */
export const FileEncryptor: React.FC<FileEncryptorProps> = ({ algorithm, encryptionKey }) => {
    // File handling state and methods
    const { handleFile, fileData } = useFileHandler();

    // Encryption state and operations
    const { encrypt, isEncrypting } = useEncryption();

    // Global app notifications
    const { addToast } = useApp();



    const handleFileSelect = async (file: File) => {
        try {
            // Read file
            await handleFile(file);

            // Notify user for successful load
            addToast('success', 'File loaded successfully');
        } catch (error) {
            // Notify the user of the error
            addToast('error', 'Failed to load file');
        }
    };

    const handleEncryptFile = async () => {
        if (!fileData) {
            addToast('error', 'Please select a file first');
            return;
        }

        if (!encryptionKey) {
            addToast('error', 'Please provide an encryption key');
            return;
        }

        try {
            const result = await encrypt(fileData.content as string, encryptionKey, algorithm);

            const encryptedFile = FileService.createEncryptedFile(
                generateId(),
                fileData.name,
                result.encrypted,
                algorithm,
                fileData.size,
                fileData.type
            );

            FileService.saveEncryptedFile(encryptedFile);
            addToast('success', 'File encrypted and downloaded successfully');
        } catch (error) {
            addToast('error', 'File encryption failed');
        }
    };

    return (
        <EncryptorContainer>
            <Card title="File Encryption">
                <FormGrid>
                    <FileUpload onFileSelect={handleFileSelect} label="Select file to encrypt" />

                    {fileData && (
                        <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }}>
                            <p style={{ margin: 0, fontSize: 'var(--font-sm)' }}>
                                <strong>File:</strong> {fileData.name}
                            </p>
                            <p style={{ margin: 0, fontSize: 'var(--font-sm)', marginTop: 'var(--spacing-xs)' }}>
                                <strong>Size:</strong> {(fileData.size / 1024).toFixed(2)} KB
                            </p>
                        </div>
                    )}

                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleEncryptFile}
                        isLoading={isEncrypting}
                        disabled={!fileData || !encryptionKey}
                        fullWidth
                    >
                        Encrypt File
                    </Button>
                </FormGrid>
            </Card>
        </EncryptorContainer>
    );
};

export default FileEncryptor;