const Utils = {
    generatePassword(length = 32, options = { numbers: true, symbols: true, uppercase: true, lowercase: true }) {
        let chars = '';
        if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (options.numbers) chars += '0123456789';
        if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let result = '';
        const randomValues = crypto.getRandomValues(new Uint8Array(length));
        for (let i = 0; i < length; i++) {
            result += chars[randomValues[i] % chars.length];
        }
        return result;
    },

    copyToClipboard(text) {
        navigator.clipboard.writeText(text);
    },

    downloadFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    },

    async readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    },

    formatFileSize(bytes) {
        if (!Number.isFinite(bytes) || bytes <= 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        let i = Math.floor(Math.log(bytes) / Math.log(k));
        // clamp index to available size units to avoid out-of-range access
        i = Math.max(0, Math.min(i, sizes.length - 1));
        const value = bytes / Math.pow(k, i);
        return Math.round(value * 100) / 100 + ' ' + sizes[i];
    },

    formatDate(date) {
        return new Date(date).toLocaleString();
    },

    calculatePasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (password.length >= 16) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        return Math.min(5, strength);
    }
};