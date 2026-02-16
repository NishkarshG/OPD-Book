import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import Button from '../../components/Button';
import '../../styles/pages/TimeSlotSelection.css';

const TimeSlotSelection = () => {
    const navigate = useNavigate();
    const { bookingData, updateBooking } = useBooking();
    const { doctor } = bookingData;
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        if (!doctor) {
            navigate('/patient/doctor');
            return; // Prevent further execution
        }

        // Mock slots generation
        const generateSlots = () => {
            const generated = [];
            const startHour = 9;
            const endHour = 17;
            for (let i = startHour; i < endHour; i++) {
                generated.push(`${i}:00`);
                generated.push(`${i}:30`);
            }
            return generated;
        };
        setSlots(generateSlots());
    }, [doctor, navigate]);

    if (!doctor) return null;

    const handleSelect = (slot) => {
        updateBooking('slot', slot);
        navigate('/patient/details');
    };

    return (
        <div className="page-container">
            <div className="mb-lg">
                <Button variant="ghost" onClick={() => navigate(-1)}>
                    &larr; Back
                </Button>
            </div>

            <div className="text-center mb-lg">
                <h1>Select Time Slot</h1>
                <p className="text-muted">
                    Choose a time slot for <strong>Dr. {doctor.name}</strong>
                </p>
            </div>

            <div className="slots-grid">
                {slots.map((slot) => (
                    <Button
                        key={slot}
                        variant="secondary"
                        onClick={() => handleSelect(slot)}
                        fullWidth
                    >
                        {slot}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default TimeSlotSelection;
