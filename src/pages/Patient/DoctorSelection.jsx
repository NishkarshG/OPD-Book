import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import Button from '../../components/Button';
import '../../styles/pages/DoctorSelection.css';

const DoctorSelection = () => {
    const navigate = useNavigate();
    const { bookingData, doctors, updateBooking } = useBooking();
    const { department } = bookingData;

    useEffect(() => {
        if (!department) {
            navigate('/patient/department');
        }
    }, [department, navigate]);

    if (!department) return null;

    const filteredDoctors = doctors.filter(doc => doc.departmentId === department.id);

    const handleSelect = (doctor) => {
        updateBooking('doctor', doctor);
        navigate('/patient/time-slot');
    };

    return (
        <div className="page-container">
            <div className="mb-lg">
                <Button variant="ghost" onClick={() => navigate(-1)}>
                    &larr; Back
                </Button>
            </div>

            <div className="text-center mb-lg">
                <h1>Select Doctor</h1>
                <p className="text-muted">
                    Available doctors in <strong>{department.name}</strong>
                </p>
            </div>

            {filteredDoctors.length === 0 ? (
                <div className="text-center card">
                    <p className="text-muted">No doctors available in this department currently.</p>
                </div>
            ) : (
                <div className="doctor-list">
                    {filteredDoctors.map((doc) => (
                        <div
                            key={doc.id}
                            className="doctor-card"
                            onClick={() => handleSelect(doc)}
                        >
                            <div className="doctor-info">
                                <h3>{doc.name}</h3>
                                <div className="doctor-status">Available</div>
                            </div>
                            <div className="doctor-arrow">
                                &#10095;
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DoctorSelection;
