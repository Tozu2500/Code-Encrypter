const HistoryModule = {
    maxItems: 10,

    getHistory() {
        const history = [];
        return history;
    },

    addItem(item) {
        const history = this.getHistory();
        history.unshift({
            ...item,
            id: Date.now(),
            timestamp: new Date().toISOString()
        });

        if (history.length > this.maxItems) {
            history.pop();
        }

        localStorage.setItem('history', JSON.stringify(history));
    },

    clearHistory() {
        localStorage.removeItem('history');
    }
};