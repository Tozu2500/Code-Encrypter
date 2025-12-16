const SettingsModal = ({ isOpen, onClose, settings, onSettingsChange }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Settings">
            <div className="space-y-6">
                <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Password Generator Options</h4>
                    <div className="space-y-2">
                        {['uppercase', 'lowercase', 'numbers', 'symbols'].map(option => (
                            <label key={option} className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.passwordOptions[option]}
                                    onChange={ (e) => onSettingsChange({
                                        ...settings,
                                        passwordOptions: { ...settings.passwordOptions, [option]: e.target.checked }
                                    })}
                                    className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm capitalize">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">
                        Password Length: {settings.passwordLength}
                    </label>
                    <input
                        type="range"
                        min="8"
                        max="64"
                        value={settings.passwordLength}
                        onChange={ (e) => onSettingsChange ({...settings, passwordLength: parseInt(e.target.value) })}
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={settings.autoHash}
                            onChange={ (e) => onSettingsChange({...settings, autoHash: e.target.checked })}
                            className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">Automatically generate hash of output</span>
                    </label>
                </div>
            </div>
        </Modal>
    );
};