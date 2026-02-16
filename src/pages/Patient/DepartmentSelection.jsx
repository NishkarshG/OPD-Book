import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import Button from '../../components/Button';
import '../../styles/pages/DepartmentSelection.css';

const DepartmentSelection = () => {
    const navigate = useNavigate();
    const { departments, updateBooking } = useBooking();

    const handleSelect = (dept) => {
        updateBooking('department', dept);
        navigate('/patient/doctor');
    };

    return (
        <div className="page-container">
            <div className="mb-lg">
                <Button variant="ghost" onClick={() => navigate(-1)}>
                    &larr; Back
                </Button>
            </div>

            <div className="text-center mb-lg">
                <h1>Select Department</h1>
                <p className="text-muted">
                    Choose the medical department for your consultation.
                </p>
            </div>

            <div className="department-grid">
                {departments.map((dept) => (
                    <div
                        key={dept.id}
                        className="department-card"
                        onClick={() => handleSelect(dept)}
                    >
                        <div className="department-icon">
                            {/* Placeholder icons based on name */}
                            {dept.icon === 'heart' && '❤️'}
                            {dept.icon === 'bone' && '🦴'}
                            {dept.icon === 'baby' && '👶'}
                            {dept.icon === 'stethoscope' && '🩺'}
                            {!['heart', 'bone', 'baby', 'stethoscope'].includes(dept.icon) && '🏥'}
                        </div>
                        <h3 className="department-name">{dept.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DepartmentSelection;
