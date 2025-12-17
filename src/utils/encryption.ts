export class EncryptionService {

    // A simple XOR-based encryption (for demos)
    static simpleEncrypt(text: string, key: string): string {
        if (!key) return text;
        let result = '';
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(
                text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
            );
        }
        return btoa(result);
    }

    static simpleDecrypt(encrypted: string, key: string): string {
        if (!key) return encrypted;
        try {
            const decoded = atob(encrypted);
            let result = '';
            for (let i = 0; i < decoded.length; i++) {
                result += String.fromCharCode(
                    decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
                );
            }
            return result;
        } catch {
            throw new Error('Invalid encrypted data or wrong key');
        }
    }

    static base64Encode(text: string): string {
        return btoa(unescape(encodeURIComponent(text)));
    }

    static base64Decode(text: string): string {
        try {
            return decodeURIComponent(escape(atob(text)));
        } catch {
            throw new Error('Invalid Base64 data');
        }
    }

    static customCipher(text: string, key: string, reverse = false): string {
        if (!key) return text;
        const shift = key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 26;
        let result = '';

        for (let char of text) {
            if (/[a-zA-Z]/.test(char)) {
                const base = char === char.toUpperCase() ? 65 : 97;
                const offset = char.charCodeAt(0) - base;
                const newOffset = reverse
                    ? (offset - shift + 26) % 26
                    : (offset + shift) % 26;
                result += String.fromCharCode(base + newOffset);
            } else {
                result += char;
            }
        }
        return result;
    }

    static generateKey(length: number = 32): string {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        let key = '';
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);
        for (let i = 0; i < length; i++) {
            key += chars.charAt(array[i] % chars.length);
        }
        return key;
    }
}