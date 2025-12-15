const TextArea = ({ value, onChange, placeholder, rows = 10, className = '', readOnly = false }) => {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            readOnly={readOnly}
            className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-mono text-sm resize-none ${className}`}
        />
    );
};