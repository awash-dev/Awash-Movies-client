import { useState } from 'react';
import supabase from '../Supbase'; // Adjust the import based on your file structure
import { Link } from 'react-router-dom';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) {
            setError(error.message);
        } else {
            setMessage('Check your email for the password reset link!');
        }
    };

    return (
        <div className='flex flex-col items-center justify-center gap-6 h-screen bg-gray-50'>
            <h2 className='text-3xl font-bold text-gray-700 mb-6'>Reset Password</h2>
            
            <form onSubmit={handleResetPassword} className='flex flex-col gap-6 w-[90%] sm:w-[400px] p-6 bg-white shadow-lg rounded-lg'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='text-gray-600'>Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>

                <button 
                    type='submit'
                    className="p-3 bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer text-white text-lg text-center transition-all duration-300"
                >
                    Send Reset Link
                </button>
                
                <p className="text-center text-gray-600">
                    Remembered your password? 
                    <Link to="/" className="underline text-blue-600">Login</Link>
                </p>
            </form>

            {message && <p className="text-green-500">{message}</p>}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default ResetPassword;
