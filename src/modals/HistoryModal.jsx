const HistoryModal = ({ isOpen, onClose, history, onLoadItem, onClearHistory }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Operation History">
            <div className="space-y-3">
                {history.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>No history yet</p>
                    </div>
                ) : (
                <>
                {history.map((item) => (
                    <div key={item.id} className="bg-gray-900 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                {item.mode === 'encrypt' ? (
                                    <Lock className="w-4 h-4 text-green-500" />
                                ) : (
                                    <Unlock className="w-4 h-4 text-blue-500" />
                                )}
                                <span className="font-semibold capitalize">{item.mode}</span>
                            </div>
                            <span className="text-xs text-gray-500">{Utils.formatDate(item.timestamp)}</span>
                        </div>
                        <div className="text-sm text-gray-400 mb-2">
                            Size: {Utils.formatFileSize(item.size)}
                        </div>
                        <Button size="sm" variant="ghost" onClick={ () => onLoadItem(item)} className="w-full">
                            Load
                        </Button>
                    </div>
                ))}
                <Button variant="danger" onClick={onClearHistory} className="w-full">
                    <Trash2 className="w-4 h-4" />
                    Clear History
                </Button>
                </>
                )}
            </div>
        </Modal>
    );
};