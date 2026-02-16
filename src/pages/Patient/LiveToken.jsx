import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import Button from '../../components/Button';
import '../../styles/variables.css';

const LiveToken = () => {
    const navigate = useNavigate();
    const { bookingData } = useBooking();
    const { token } = bookingData;
    const [currentToken, setCurrentToken] = useState(0);
    const [yourTokenNumber] = useState(token ? parseInt(token.split('-')[1]) : 0);
    const [estimatedTime, setEstimatedTime] = useState(0);

    useEffect(() => {
        // Mock live updates
        const interval = setInterval(() => {
            setCurrentToken(prev => {
                if (yourTokenNumber && prev < yourTokenNumber) {
                    return prev + 1;
                }
                return prev;
            });
        }, 5000); // Update every 5 seconds for demo

        // Set initial current token slightly behind
        if (yourTokenNumber > 5) {
            setCurrentToken(yourTokenNumber - 5);
        } else {
            setCurrentToken(1);
        }

        return () => clearInterval(interval);
    }, [yourTokenNumber]);

    useEffect(() => {
        if (yourTokenNumber && currentToken) {
            const diff = yourTokenNumber - currentToken;
            setEstimatedTime(diff * 10); // 10 mins per patient
        }
    }, [currentToken, yourTokenNumber]);

    return (
        <div className="page-container" style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}>
            <Button variant="ghost" onClick={() => navigate('/')} style={{ marginBottom: 'var(--spacing-md)', alignSelf: 'flex-start' }}>
                ← Home
            </Button>

            <h1>Live Status</h1>

            {!token ? (
                <div style={{ padding: 'var(--spacing-xl)', color: 'var(--text-muted)' }}>
                    <p>You have no active appointment.</p>
                    <Button variant="primary" onClick={() => navigate('/')}>Book Now</Button>
                </div>
            ) : (
                <>
                    <div style={{ display: 'flex', gap: 'var(--spacing-lg)', justifyContent: 'center', margin: 'var(--spacing-xl) 0' }}>
                        <div style={{ border: '1px solid #e2e8f0', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-lg)', width: '150px' }}>
                            <h3 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>Current Token</h3>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{currentToken}</div>
                        </div>
                        <div style={{ border: '2px solid var(--primary)', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-lg)', width: '150px', backgroundColor: '#eff6ff' }}>
                            <h3 style={{ margin: 0, color: 'var(--primary)', fontSize: '0.875rem' }}>Your Token</h3>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{yourTokenNumber}</div>
                        </div>
                    </div>

                    {currentToken < yourTokenNumber ? (
                        <div style={{ padding: 'var(--spacing-lg)', backgroundColor: '#f0f9ff', borderRadius: 'var(--radius-md)' }}>
                            <p style={{ margin: 0 }}>Estimated Wait Time</p>
                            <h2 style={{ margin: 'var(--spacing-xs) 0', color: 'var(--primary)' }}>~ {estimatedTime} Mins</h2>
                            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>{yourTokenNumber - currentToken} people ahead of you</p>
                        </div>
                    ) : (
                        <div style={{ padding: 'var(--spacing-lg)', backgroundColor: 'var(--success)', color: 'white', borderRadius: 'var(--radius-md)' }}>
                            <h2>It's your turn!</h2>
                            <p>Please proceed to the doctor's cabin.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default LiveToken;
