const Toast = ({ message, type = 'info', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const types = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        info: 'bg-blue-600',
        warning: 'bg-yellow-600'
    };

    const icons = {
        success: <CheckCircle className="w-5 h-5" />,
        error: <AlertCircle className="w-5 h-5" />,
        info: <Info className="w-5 h-5 " />,
        warning: <AlertCircle className="w-5 h-5" />
    };

    return (
        <div className={`fixed top-4 right-4 ${types[type]} text-white px-6 py-3 rounded-lg shadow-2x1 z-50 flex items-center gap-3 animate-slide-in`}>
            {icons[type]}
            <span>{message}</span>
        </div>
    );
};