import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import Button from '../../components/Button';
import '../../styles/pages/Confirmation.css';

const Confirmation = () => {
    const navigate = useNavigate();
    const { bookingData } = useBooking();
    const { token, department, doctor, slot, patientDetails } = bookingData;

    useEffect(() => {
        if (!token) navigate('/');
    }, [token, navigate]);

    if (!token) return null;

    return (
        <div className="page-container">
            <div className="confirmation-card">
                <div className="token-header">
                    <div className="token-number">{token}</div>
                    <div className="token-label">Live Token Number</div>
                </div>

                <div className="confirmation-details">
                    <div className="detail-row">
                        <span className="detail-label">Patient Name</span>
                        <span className="detail-value">{patientDetails.name}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Department</span>
                        <span className="detail-value">{department?.name}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Doctor</span>
                        <span className="detail-value">{doctor?.name}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Time Slot</span>
                        <span className="detail-value">{slot}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Date</span>
                        <span className="detail-value">{new Date().toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="confirmation-actions">
                    <Button onClick={() => window.print()} variant="primary" fullWidth>
                        Print Ticket / Save PDF
                    </Button>
                    <Button onClick={() => navigate('/')} variant="outline" fullWidth>
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
