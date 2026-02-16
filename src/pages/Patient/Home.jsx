import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import '../../styles/pages/Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="page-container home-container">
            <section className="hero-section">
                <h1 className="hero-title">Modern OPD Booking</h1>
                <p className="hero-subtitle">
                    Experience seamless healthcare appointment booking. Skip the queue and book your slot in seconds.
                </p>
                <div className="hero-actions">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => navigate('/patient/department')}
                    >
                        Book Appointment
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => navigate('/patient/live-token')}
                    >
                        Check Live Status
                    </Button>
                </div>
            </section>

            <section className="features-grid">
                <div className="feature-card">
                    <div className="feature-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                    </div>
                    <h3 className="feature-title">Easy Booking</h3>
                    <p className="feature-description">Select department, doctor, and time slot with just a few clicks.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                    </div>
                    <h3 className="feature-title">Real-time Updates</h3>
                    <p className="feature-description">Track your token status live and arrive just in time.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </div>
                    <h3 className="feature-title">Confirmed Slots</h3>
                    <p className="feature-description">Get instant confirmation and digital receipts for your appointments.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;


