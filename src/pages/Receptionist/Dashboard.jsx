import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import '../../styles/pages/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="page-container">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <Button variant="ghost" onClick={() => navigate('/')}>Logout</Button>
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h2 className="card-title">Queue Management</h2>
                    <p className="card-description">Manage active tokens, call next patient, skip or complete.</p>
                    <Button fullWidth onClick={() => navigate('/receptionist/queue')}>Go to Queue</Button>
                </div>

                <div className="dashboard-card">
                    <h2 className="card-title">Walk-in Booking</h2>
                    <p className="card-description">Book appointment for walk-in patients.</p>
                    <Button fullWidth variant="secondary" onClick={() => navigate('/receptionist/walk-in')}>Book Walk-in</Button>
                </div>

                <div className="dashboard-card">
                    <h2 className="card-title">Override Token</h2>
                    <p className="card-description">Force specific tokens for emergencies.</p>
                    <Button fullWidth variant="outline" onClick={() => navigate('/receptionist/override')}>Override</Button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
