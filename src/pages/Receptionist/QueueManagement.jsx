import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import Button from '../../components/Button';
import '../../styles/pages/QueueManagement.css';

const QueueManagement = () => {
    const navigate = useNavigate();
    const { queue, currentPatient, callNext, completeCurrent, skipCurrent } = useBooking();

    const pendingPatients = queue.filter(p => p.status === 'pending');
    const completedCount = queue.filter(p => p.status === 'completed').length;

    return (
        <div className="page-container">
            <div className="mb-lg">
                <Button variant="ghost" onClick={() => navigate('/receptionist/dashboard')}>
                    &larr; Dashboard
                </Button>
            </div>

            <div className="queue-layout">
                {/* Sidebar Stats */}
                <div className="queue-sidebar">
                    <div className="stats-card">
                        <div className="stats-title">Waiting</div>
                        <div className="stats-count">{pendingPatients.length}</div>
                    </div>
                    <div className="stats-card">
                        <div className="stats-title">Completed Today</div>
                        <div className="stats-count success">{completedCount}</div>
                    </div>
                </div>

                {/* Main Action Area */}
                <div className="queue-main">
                    <h1 className="mb-lg">Queue Management</h1>

                    {currentPatient ? (
                        <div className="current-patient-card">
                            <span style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Serving Now</span>
                            <div className="token-large">{currentPatient.token}</div>
                            <div className="patient-name-large">{currentPatient.name}</div>

                            <div className="action-buttons">
                                <Button size="lg" variant="primary" onClick={completeCurrent}>
                                    Mark Completed
                                </Button>
                                <Button size="lg" variant="outline" onClick={skipCurrent}>
                                    Skip Patient
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="next-patient-section mb-lg">
                            <h2>Ready for next patient?</h2>
                            <p className="text-muted mb-lg">Call the next patient in the queue to start consultation.</p>
                            <Button size="lg" variant="primary" onClick={callNext} disabled={pendingPatients.length === 0}>
                                Call Next Patient
                            </Button>
                        </div>
                    )}

                    <h3 className="mb-lg">Up Next</h3>
                    {pendingPatients.length > 0 ? (
                        <div className="upcoming-list">
                            {pendingPatients.slice(0, 5).map(p => (
                                <div key={p.token} className="queue-item">
                                    <span className="queue-item-token">{p.token}</span>
                                    <span className="queue-item-name">{p.name}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="card text-center text-muted">
                            No patients waiting in queue.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QueueManagement;
