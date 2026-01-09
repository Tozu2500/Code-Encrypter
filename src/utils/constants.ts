



export const APP_NAME = "Code Encrypter";
export const APP_VERSION = "1.0.0";

export const ENCRYPTION_ALGORITHMS = [
    { value: 'AES', label: 'AES (Advanced Encryption Standard)', recommended: true },
    { value: 'DES', label: 'DES (Data Encryption Standard)' },
    { value: 'TripleDES', label: 'Triple DES (3DES)' },
    { value: 'RSA', label: 'RSA (Rivest-Shamir-Adleman)' },
    { value: 'Rabbit', label: 'Rabbit Stream Cipher' },
] as const;

export const ENCRYPTION_MODES = [
    { value: 'CBC', label: 'CBC (Cipher Block Chaining)' },
    { value: 'ECB', label: 'ECB (Electronic Codebook)' },
    { value: 'CFB', label: 'CFB (Cipher Feedback)' },
    { value: 'OFB', label: 'OFB (Output Feedback)' },
    { value: 'CTR', label: 'CTR (Counter)' },
] as const;

export const KEY_SIZES = [
    { value: 128, label: '128-bit' },
    { value: 192, label: '192-bit' },
    { value: 256, label: '256-bit (Recommended)' },
] as const;

// File constants
export const MAX_FILE_SIZE = 10 * 1024 * 1024;  // 10 MB
export const SUPPORTED_FILE_TYPES = [
    '.txt', '.js', '.ts', '.jsx', '.tsx', '.json', '.xml', '.html', '.css',
    '.py', '.java', '.cpp', '.c', '.h', '.cs', '.php', '.rb', '.go', '.rs',
    '.sql', '.md', '.yaml', '.yml', '.toml', '.sh', '.bat'
];

// Storage keys
export const STORAGE_KEYS = {
    SETTINGS: 'code_encrypter_settings',
    KEYS: 'code_encrypter_keys',
    HISTORY: 'code_encrypter_history',
    THEME: 'code_encrypter_theme',
} as const;

// Default settings
export const DEFAULT_SETTINGS = {
    theme: 'dark' as const,
    autoSaveKeys: true,
    defaultAlgorithm: 'AES',
    maxFileSize: MAX_FILE_SIZE,
    enableHistory: true,
    historyLimit: 100,
    confirmBeforeDelete: true,
    showAdvancedOptions: false,
};

// Toast durations
export const TOAST_DURATION = {
    SHORT: 3000,
    MEDIUM: 5000,
    LONG: 7000,
} as const;

// Encryption constants
export const ENCRYPTION_ITERATIONS = 10000;
export const RSA_CHUNK_SIZE = 100;
export const AES_KEY_SIZE = 256;
export const ENCRYPTION_IV_SIZE = 16;
export const ENCRYPTION_SALT_SIZE = 16;

// Routes
export const ROUTES = {
    HOME: '/',
    ENCRYPT: '/encrypt',
    DECRYPT: '/decrypt',
    KEYS: '/keys',
    HISTORY: '/history',
    SETTINGS: '/settings',
    ABOUT: '/about',
} as const;

// Animation variants
export const FADE_IN_VARIANT = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
};

export const SLIDE_UP_VARIANT = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Error messages
export const ERROR_MESSAGES = {
    FILE_TOO_LARGE: 'File size exceeds the maximum allowed size',
    UNSUPPORTED_FILE_TYPE: 'File type is not supported',
    ENCRYPTION_FAILED: 'Encryption failed, please try again',
    DECRYPTION_FAILED: 'Decryption failed, invalid key or corrupted data',
    INVALID_KEY: 'Invalid encryption key',
    NO_FILE_SELECTED: 'Please select a file',
    STORAGE_FULL: 'Local storage is full. Please clear some data',
    INVALID_INPUT: 'Invalid input provided',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
    ENCRYPTION_SUCCESS: 'Encryption completed successfully',
    DECRYPTION_SUCCESS: 'Decryption completed successfully',
    KEY_GENERATED: 'Key generated successfully',
    KEY_SAVED: 'Key saved successfully',
    KEY_DELETED: 'Key deleted successfully',
    FILE_SAVED: 'File saved successfully',
    SETTINGS_SAVED: 'Settings saved successfully',
} as const;