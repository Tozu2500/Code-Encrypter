export type EncryptionMode = 'encrypt' | 'decrypt';
export type Algorithm = 'aes' | 'base64' | 'custom';

export interface EncryptionConfig {
    mode: EncryptionMode;
    algorithm: Algorithm;
    key: string;
}

export interface ProcessResult {
    success: boolean;
    data?: string;
    error?: string;
}