import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import '../../styles/pages/WalkInBooking.css';

const WalkInBooking = () => {
    const navigate = useNavigate();
    const { updateBooking, generateToken, departments, doctors } = useBooking();
    const [name, setName] = useState('');
    const [selectedDept, setSelectedDept] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        updateBooking('patientDetails', { name, type: 'walk-in' });
        // updateBooking('department', departments.find(d => d.id == selectedDept));
        // updateBooking('doctor', doctors.find(d => d.id == selectedDoctor));

        const token = generateToken();
        alert(`Walk-in Token Generated: ${token}`);
        navigate('/receptionist/queue');
    };

    return (
        <div className="page-container">
            <div className="mb-lg">
                <Button variant="ghost" onClick={() => navigate('/receptionist/dashboard')}>
                    &larr; Dashboard
                </Button>
            </div>

            <div className="text-center mb-lg">
                <h1>Walk-in Booking</h1>
                <p className="text-muted">Register a new walk-in patient.</p>
            </div>

            <form onSubmit={handleSubmit} className="walkin-form">
                <div className="form-group">
                    <Input
                        label="Patient Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Full Name"
                    />
                    <Input
                        label="Department"
                        type="select"
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                        options={[{ value: '', label: 'Select Department' }, ...departments.map(d => ({ value: d.id, label: d.name }))]}
                        required
                    />
                    <Input
                        label="Doctor"
                        type="select"
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        options={[{ value: '', label: 'Select Doctor' }, ...doctors.filter(d => d.departmentId == selectedDept).map(d => ({ value: d.id, label: d.name }))]}
                        required
                    />
                    <div style={{ marginTop: 'var(--spacing-md)' }}>
                        <Button type="submit" variant="primary" fullWidth size="lg">Generate Token</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default WalkInBooking;
