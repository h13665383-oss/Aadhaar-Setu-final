import React, { createContext, useContext, useState, useEffect } from 'react';
import dashboardDataRaw from '../data/dashboardData.json';

// Types derived from our processed JSON
export interface StateData {
    name: string;
    enrollments: number;
    age_0_5: number;
    age_5_17: number;
    age_18_greater: number;
    districts: number;
}

export interface DistrictData {
    name: string;
    state: string;
    enrollments: number;
    age_0_5: number;
    age_5_17: number;
    age_18_greater: number;
}

export interface TrendData {
    name: string;
    value: number;
}

interface DashboardData {
    states: StateData[];
    districts: DistrictData[];
    trends: TrendData[];
}

export interface Appointment {
    id: string;
    name: string;
    date: string;
    time: string;
    center: string;
    status: 'Confirmed' | 'Pending' | 'Completed';
    type: string;
}

export interface Grievance {
    id: string;
    subject: string;
    date: string;
    status: 'Open' | 'In Progress' | 'Resolved';
    priority: 'High' | 'Medium' | 'Low';
}

interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

interface DataContextType {
    data: DashboardData | null;
    loading: boolean;
    appointments: Appointment[];
    grievances: Grievance[];
    notifications: Notification[];
    bookAppointment: (apt: Omit<Appointment, 'id' | 'status'>) => void;
    resolveGrievance: (id: string) => void;
    addNotification: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
    removeNotification: (id: string) => void;
    exportData: (type: 'csv' | 'pdf') => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    // Initial Mock State for Interactivity
    const [appointments, setAppointments] = useState<Appointment[]>([
        { id: '1', name: 'Ramesh Gupta', date: '2025-04-10', time: '10:00 AM', center: 'Block Office A', status: 'Confirmed', type: 'New Enrollment' },
        { id: '2', name: 'Anita Desai', date: '2025-04-12', time: '02:00 PM', center: 'CSC Center 4', status: 'Pending', type: 'Biometric Update' },
    ]);

    const [grievances, setGrievances] = useState<Grievance[]>([
        { id: 'GRV-001', subject: 'Enrollment Rejected - Doc Mismatch', date: '2025-04-01', status: 'Open', priority: 'High' },
        { id: 'GRV-002', subject: 'Address Update Delay', date: '2025-03-28', status: 'In Progress', priority: 'Medium' },
        { id: 'GRV-003', subject: 'Center Closed during hours', date: '2025-03-25', status: 'Resolved', priority: 'Low' },
    ]);

    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        // Attempt to fetch from real backend
        fetch('/api/dashboard/data')
            .then(res => {
                if (!res.ok) throw new Error('Backend unavailable');
                return res.json();
            })
            .then(fetchedData => {
                console.log("Connected to Backend Data Source");
                setData(fetchedData);
                setLoading(false);
                addNotification('Connected', 'Live backend data loaded successfully', 'success');
            })
            .catch(err => {
                console.warn("Backend connection failed, falling back to static data:", err);
                addNotification('Offline Mode', 'Backend unconnected. Using cached static data.', 'info');
                // Fallback to static JSON
                setTimeout(() => {
                    setData(dashboardDataRaw as DashboardData);
                    setLoading(false);
                }, 800);
            });
    }, []);

    const addNotification = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => {
        const id = Date.now().toString();
        setNotifications(prev => [...prev, { id, title, message, type }]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            removeNotification(id);
        }, 3000);
    };

    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const bookAppointment = (apt: Omit<Appointment, 'id' | 'status'>) => {
        const newApt: Appointment = {
            ...apt,
            id: Date.now().toString(),
            status: 'Confirmed'
        };
        setAppointments([...appointments, newApt]);
        addNotification('Appointment Booked', `Successfully booked for ${newApt.name}`, 'success');
    };

    const resolveGrievance = (id: string) => {
        setGrievances(prev => prev.map(g =>
            g.id === id ? { ...g, status: 'Resolved' } : g
        ));
        addNotification('Grievance Resolved', `Grievance #${id} has been marked as resolved.`, 'success');
    };

    const exportData = (type: 'csv' | 'pdf') => {
        addNotification('Export Started', `Generating ${type.toUpperCase()} report...`, 'info');
        setTimeout(() => {
            addNotification('Download Ready', `Your ${type.toUpperCase()} report has been downloaded.`, 'success');
        }, 1500);
    };

    return (
        <DataContext.Provider value={{
            data,
            loading,
            appointments,
            grievances,
            notifications,
            bookAppointment,
            resolveGrievance,
            addNotification,
            removeNotification,
            exportData
        }}>
            {children}

            {/* Global Notification Toast Container */}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                {notifications.map(n => (
                    <div key={n.id} className={`p-4 rounded-lg shadow-lg text-white transform transition-all animate-in slide-in-from-right-full ${n.type === 'success' ? 'bg-green-600' :
                        n.type === 'error' ? 'bg-red-600' : 'bg-blue-600'
                        }`}>
                        <h4 className="font-bold text-sm">{n.title}</h4>
                        <p className="text-xs opacity-90">{n.message}</p>
                    </div>
                ))}
            </div>
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
