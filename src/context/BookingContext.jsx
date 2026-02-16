import React, { createContext, useState, useContext, useEffect } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    // State for the current booking flow
    const [bookingData, setBookingData] = useState({
        department: null,
        doctor: null,
        slot: null,
        patientDetails: {
            name: '',
            age: '',
            gender: '',
            contact: '',
        },
        token: null,
    });

    // Mock data for Departments, Doctors, Slots
    // In a real app, this would come from an API
    const departments = [
        { id: 1, name: 'Cardiology', icon: 'heart' },
        { id: 2, name: 'Orthopedics', icon: 'bone' },
        { id: 3, name: 'Pediatrics', icon: 'baby' },
        { id: 4, name: 'General Medicine', icon: 'stethoscope' },
    ];

    const doctors = [
        { id: 1, name: 'Dr. Smith', departmentId: 1, available: true },
        { id: 2, name: 'Dr. Johnson', departmentId: 1, available: true },
        { id: 3, name: 'Dr. Williams', departmentId: 2, available: true },
    ];

    const updateBooking = (field, value) => {
        setBookingData((prev) => ({ ...prev, [field]: value }));
    };

    const resetBooking = () => {
        setBookingData({
            department: null,
            doctor: null,
            slot: null,
            patientDetails: { name: '', age: '', gender: '', contact: '' },
            token: null,
        });
    };

    const [queue, setQueue] = useState([
        { token: 'OPD-101', status: 'pending', name: 'Alice' },
        { token: 'OPD-102', status: 'pending', name: 'Bob' },
        { token: 'OPD-103', status: 'pending', name: 'Charlie' },
    ]);
    const [currentPatient, setCurrentPatient] = useState(null);

    const generateToken = () => {
        // Mock token generation
        const token = `OPD-${Math.floor(Math.random() * 1000)}`;
        setBookingData((prev) => ({ ...prev, token }));
        setQueue(prev => [...prev, { token, status: 'pending', name: bookingData.patientDetails.name || 'Walk-in' }]);
        return token;
    };

    const callNext = () => {
        const next = queue.find(p => p.status === 'pending');
        if (next) {
            setCurrentPatient(next);
            setQueue(prev => prev.map(p => p.token === next.token ? { ...p, status: 'serving' } : p));
        } else {
            alert("No pending patients");
        }
    };

    const completeCurrent = () => {
        if (currentPatient) {
            setQueue(prev => prev.map(p => p.token === currentPatient.token ? { ...p, status: 'completed' } : p));
            setCurrentPatient(null);
        }
    };

    const skipCurrent = () => {
        if (currentPatient) {
            setQueue(prev => prev.map(p => p.token === currentPatient.token ? { ...p, status: 'skipped' } : p));
            setCurrentPatient(null);
        }
    };

    const overrideQueue = (tokenToPrioritize) => {
        setQueue(prev => {
            const patient = prev.find(p => p.token === tokenToPrioritize);
            if (!patient) return prev;

            // Move to top of pending
            const others = prev.filter(p => p.token !== tokenToPrioritize);
            return [{ ...patient, status: 'pending' }, ...others];
        });
    };

    const value = {
        bookingData,
        updateBooking,
        resetBooking,
        generateToken,
        departments,
        doctors,
        queue,
        currentPatient,
        callNext,
        completeCurrent,
        skipCurrent,
        overrideQueue
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};
