export type Theme = 'light' | 'dark' | 'auto';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

export interface AppSettings {
    theme: Theme;
    autoSaveKeys: boolean;
    defaultAlgorithm: string;
    maxFileSize: number;
    enableHistory: boolean;
    historyLimit: number;
    confirmBeforeDelete: boolean;
    showAdvancedOptions: boolean;
}

export interface AppState {
    isLoading: boolean;
    error: string | null;
    settings: AppSettings;
    toasts: ToastMessage[];
}

export interface Route {
    path: string;
    name: string;
    icon?: string;
}

export interface MenuItemType {
    id: string;
    label: string;
    icon: any;
    path: string;
    disabled?: boolean;
}