const Input = ({ type = 'text', value, onChange, placeholder, className = '', icon, onIconClick }) => {
    return (
        <div className="relative">
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${icon ? 'pr-10' : ''} ${className}`}
            />
            {icon && (
                <button
                    type="button"
                    onClick={onIconClick}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                    {icon}
                </button>
            )}
        </div>
    );
};