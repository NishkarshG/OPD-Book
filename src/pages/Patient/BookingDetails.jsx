import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import '../../styles/pages/BookingDetails.css';

const BookingDetails = () => {
    const navigate = useNavigate();
    const { bookingData, updateBooking, generateToken } = useBooking();
    const { slot, patientDetails, doctor } = bookingData;
    const [formData, setFormData] = useState(patientDetails);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        if (!slot) navigate('/patient/time-slot');
    }, [slot, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            updateBooking('patientDetails', formData);
            generateToken();
            setLoading(false);
            navigate('/patient/confirmation');
        }, 1000);
    };

    if (!slot) return null;

    return (
        <div className="page-container">
            <div className="mb-lg">
                <Button variant="ghost" onClick={() => navigate(-1)}>
                    &larr; Back
                </Button>
            </div>

            <div className="text-center mb-lg">
                <h1>Patient Details</h1>
                <p className="text-muted">
                    Complete your appointment booking with <strong>Dr. {doctor?.name}</strong> at <strong>{slot}</strong>
                </p>
            </div>

            <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-grid">
                    <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. John Doe"
                    />

                    <div className="form-row two-col">
                        <Input
                            label="Age"
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            placeholder="Age"
                        />
                        <Input
                            label="Gender"
                            name="gender"
                            type="select"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            options={[
                                { value: 'Male', label: 'Male' },
                                { value: 'Female', label: 'Female' },
                                { value: 'Other', label: 'Other' }
                            ]}
                        />
                    </div>

                    <Input
                        label="Contact Number"
                        name="contact"
                        type="tel"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        placeholder="Mobile Number"
                    />

                    <div style={{ marginTop: 'var(--spacing-md)' }}>
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            isLoading={loading}
                        >
                            Confirm Booking
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BookingDetails;
