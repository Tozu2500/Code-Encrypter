import { format, formatDistance, formatRelative } from 'date-fns';

// Format bytes to human readable size
export const formatBytes = (bytes: number, decimals: number = 2): string => {
    if (!bytes || bytes === 0) return '0 Bytes';
    if (bytes < 0) return 'Invalid size';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    // Array out of bounds prevention
    const sizeIndex = Math.min(i, sizes.length - 1);

    return `${parseFloat((bytes / Math.pow(k, sizeIndex)).toFixed(dm))} ${sizes[sizeIndex]}`;
};

// Format timestamp to a readable date string
export const formatDate = (timestamp: number, formatStr: string = 'PPpp'): string => {
    if (!timestamp || timestamp < 0) {
        return 'Invalid date';
    }
    return format(new Date(timestamp), formatStr);
};

// Format timestamp to relative time (e.g., 2 hours ago)
export const formatRelativeTime = (timestamp: number): string => {
    return formatDistance(new Date(timestamp), new Date(), { addSuffix: true });
};

// Format timestamp to relative date
export const formatRelativeDate = (timestamp: number): string => {
    return formatRelative(new Date(timestamp), new Date());
};

// Format duration in ms to readable string
export const formatDuration = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
    if (ms < 3600000) return `${(ms / 60000).toFixed(2)}.`;
    return `${(ms / 3600000).toFixed(2)}h`;
};

// Format algorithm name to display-friendly format
export const formatAlgorithmName = (algorithm: string): string => {
    const names: Record<string, string> = {
        AES: 'AES-256',
        DES: 'DES',
        TripleDES: '3DES',
        RSA: 'RSA-2048',
        Rabbit: 'Rabbit',
        RC4: 'RC4',
    };
    return names[algorithm] || algorithm;
};

export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
};

export const formatKeyDisplay = (key: string): string => {
    if (key.length <= 12) return key;
    return `${key.substring(0, 6)}...${key.substring(key.length - 6)}`;
};

export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const camelToTitle = (str: string): string => {
    const result = str.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
};

export const formatPercentage = (value: number, decimals: number = 1): string => {
    return `${value.toFixed(decimals)}%`;
};

export const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const sanitizeFilename = (filename: string): string => {
    return filename.replace(/[^a-z0-9_\-\.]/gi, '_');
};

export const getFileExtension = (filename: string): string => {
    return filename.split(".").pop()?.toLowerCase() || '';
};

export const getFilenameWithoutExtension = (filename: string): string => {
    return filename.substring(0, filename.lastIndexOf(".")) || filename;
};