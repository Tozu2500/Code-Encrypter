export class FileHandler {

    static async readFile(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    resolve(e.target.result as string);
                } else {
                    reject(new Error('Failed to read the file'));
                }
            };
            reader.onerror = () => reject(new Error('File reading error'));
            reader.readAsText(file);
        });
    }

    static downloadFile(content: string, filename: string): void {
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    static copyToClipboard(text: string): Promise<void> {
        return navigator.clipboard.writeText(text);
    }
}