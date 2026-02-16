import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import '../../styles/variables.css';

const OverrideToken = () => {
    const navigate = useNavigate();
    const { overrideQueue, queue } = useBooking();
    const [token, setToken] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const exists = queue.find(p => p.token === token);
        if (!exists) {
            alert("Token not found in queue");
            return;
        }

        overrideQueue(token);
        alert(`Token ${token} moved to top of priority queue.`);
        navigate('/receptionist/queue');
    };

    return (
        <div className="page-container" style={{ padding: 'var(--spacing-lg)' }}>
            <Button variant="ghost" onClick={() => navigate('/receptionist/queue')} style={{ marginBottom: 'var(--spacing-md)' }}>
                ← Queue
            </Button>
            <h1>Override Token</h1>
            <p style={{ color: 'var(--text-muted)' }}>Move a token to the front of the queue.</p>

            <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
                <Input
                    label="Token Number"
                    placeholder="e.g. OPD-123"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                />
                <Button type="submit" variant="warning" fullWidth style={{ backgroundColor: 'var(--warning)', color: 'white' }}>Prioritize Token</Button>
            </form>
        </div>
    );
};

export default OverrideToken;
