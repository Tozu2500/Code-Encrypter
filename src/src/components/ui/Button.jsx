const Button = ({ children, onClick, variant = 'primary', disabled, className = '', size = 'md '}) => {
    const baseClasses = 'rounded-lg font-medium transition-all duration-200 flex items-center gap-2 justify-center';
    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg'
    };

    const variants = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400 shadow-lg hover:shadow-xl',
        secondary: 'bg-gray-700 hover:bg-gray-600 text-white disabled:bg-gray-500',
        success: 'bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400 shadow-lg',
        danger: 'bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-400',
        ghost: 'bg-transparent hover:bg-gray-700 text-gray-300 border border-gray-600'
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${sizes[size]} ${variants[variant]} ${className} disabled:cursor-not-allowed`}
        >
            {children}
        </button>
    );
};