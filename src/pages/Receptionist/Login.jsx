import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import '../../styles/pages/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        // Mock login
        setTimeout(() => {
            setLoading(false);
            navigate('/receptionist/dashboard');
        }, 1000);
    };

    return (
        <div className="page-container login-container">
            <div className="login-card">
                <h1 className="login-title">Receptionist Login</h1>
                <form onSubmit={handleLogin} className="login-form">
                    <Input label="Username" placeholder="admin" required />
                    <Input label="Password" type="password" placeholder="password" required />
                    <Button type="submit" fullWidth isLoading={loading} variant="primary">
                        Login
                    </Button>
                </form>
                <div style={{ textAlign: 'center', marginTop: 'var(--spacing-lg)' }}>
                    <a href="/" style={{ color: 'var(--primary)', fontWeight: 500 }}>
                        &larr; Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
