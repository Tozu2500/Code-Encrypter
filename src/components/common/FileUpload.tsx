import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FiUpload, FiFile } from 'react-icons/fi';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    accept?: string;
    maxSize?: number;
    label?: string;
}

const UploadContainer = styled.div`
    width: 100%;
`;

const UploadArea = styled.div<{ isDragging: boolean }>`
    border: 2px dashed ${(props) => (props.isDragging ? 'var(--color-primary)' : 'var(--color-border)')};
    border-radius: var(--radius-lg);
    padding: var(--spacing-2xl);
    text-align: center;
    cursor: pointer;
    transition: all var(--transition-fast);
    background-color: ${(props) =>
        props.isDragging ? 'rgba(99, 102, 241, 0.05)' : 'var(--color-surface)'};
    
    &:hover {
        border-color: var(--color-primary);
        background-color: rgba(99, 102, 241, 0.05);
    }
`;

const UploadIcon = styled.div`
    font-size: var(--font-4xl);
    color: var(--color-primary);
    margin-bottom: var(--spacing-md);
`;

const UploadText = styled.p`
    color: var(--color-text);
    font-size: var(--font-base);
    margin-bottom: var(--spacing-xs);
`;

const UploadHint = styled.p`
    color: var(--color-text-secondary);
    font-size: var(--font-sm);
`;

const HiddenInput = styled.input`
    display: none;
`;

const SelectedFile = styled.div`
    margin-top: var(--spacing-md);
    padding: var(--spacing-md);
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
`;

const FileIcon = styled.div`
    font-size: var(--font-xl);
    color: var(--color-primary);
`;

const FileName = styled.span`
    color: var(--color-text);
    font-size: var(--font-sm);
    flex: 1;
`;

export const FileUpload: React.FC<FileUploadProps> = ({
    onFileSelect,
    accept = '*',
    maxSize,
    label = 'Select a file',
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (file: File): boolean => {
        setError(null);

        if (maxSize && file.size > maxSize) {
            const sizeMB = (maxSize / (1024 * 1024)).toFixed(2);
            setError(`File size exceeds the maximum allowed size of ${sizeMB}MB`);
            return false;
        }

        return true;
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (validateFile(file)) {
                setSelectedFile(file);
                onFileSelect(file);
            }
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            if (validateFile(file)) {
                setSelectedFile(file);
                onFileSelect(file);
            }
        }
    };

    return (
        <UploadContainer>
            <UploadArea
                isDragging={isDragging}
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <UploadIcon>
                    <FiUpload />
                </UploadIcon>
                <UploadText>{label}</UploadText>
                <UploadHint>Drag and drop or click to browse</UploadHint>
            </UploadArea>

            <HiddenInput
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={handleFileChange}
            />

            {error && (
                <SelectedFile style={{ borderColor: 'var(--color-error)', color: 'var(--color-error)' }}>
                    <span>{error}</span>
                </SelectedFile>
            )}
            
            {selectedFile && !error && (
                <SelectedFile>
                    <FileIcon>
                        <FiFile />
                    </FileIcon>
                    <FileName>{selectedFile.name}</FileName>
                </SelectedFile>
            )}
        </UploadContainer>
    );
};

export default FileUpload;