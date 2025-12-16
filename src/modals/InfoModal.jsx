const InfoModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="About Encryption Suite">
            <div className="space-y-4 text-sm text-gray-300">
                <div>
                    <h4 className="font-semibold text-white mb-2">Encryption Algorithm</h4>
                    <p>This application uses AES-256-GCM (Advanced encryption standard with Galois/Counter mode), which is a high-grade encryption standard.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-2">Key Derivation</h4>
                    <p>Passwords are processed using PBKDF2 (Password-Based key derivation function 2) with SHA-256 and 100k iterations, making brute-force computationally expensive.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-2">Security Features</h4>
                    <ul className="list-disc list-inside space-y-1 m1-2">
                        <li>Unique salt and IV for each encryption operation</li>
                        <li>No password or data is stored</li>
                        <li>Client-side encryption (nothing sent to servers)</li>
                        <li>Secure random number generation</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-2">Best Practices</h4>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Use strong, unique passwords (16+ characters)</li>
                        <li>Never share your encryption password</li>
                        <li>Store passwords securely (a password manager)</li>
                        <li>Back up encrypted data separately</li>
                    </ul>
                </div>
            </div>
        </Modal>
    );
};