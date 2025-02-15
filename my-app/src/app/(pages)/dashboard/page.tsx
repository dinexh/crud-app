"use client";
import { useEffect, useState } from 'react';
import { FiPlus, FiCheck, FiTrash2, FiLogOut, FiClock, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import toast, { Toaster, Toast } from 'react-hot-toast';
import './page.css';
import { useRouter } from 'next/navigation';

interface Task {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'completed';
}

export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [userName, setUserName] = useState<string>('');
    const router = useRouter();

    // Custom toast functions
    const showSuccessToast = (message: string) => {
        toast.custom(
            (t: Toast) => (
                <div className={`toast-custom toast-success ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
                    <span className="toast-icon"><FiCheckCircle size={20} /></span>
                    {message}
                </div>
            ),
            { duration: 2000 }
        );
    };

    const showErrorToast = (message: string) => {
        toast.custom(
            (t: Toast) => (
                <div className={`toast-custom toast-error ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
                    <span className="toast-icon"><FiAlertCircle size={20} /></span>
                    {message}
                </div>
            ),
            { duration: 3000 }
        );
    };

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth');
        }
        fetchTasks();
        fetchUserProfile();
    }, [router]);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setTasks(data);
            } else {
                showErrorToast('Failed to fetch tasks');
            }
        } catch (error) {
            showErrorToast('Error connecting to server');
        }
    };

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/user/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setUserName(data.firstName || 'User');
            } else {
                showErrorToast('Failed to fetch user profile');
            }
        } catch (error) {
            showErrorToast('Error connecting to server');
        }
    };

    const handleAddTask = async () => {
        if (!newTask.title.trim()) {
            showErrorToast('Please enter a task title');
            return;
        }

        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask),
            });
            if (res.ok) {
                setNewTask({ title: '', description: '' });
                fetchTasks();
                showSuccessToast('Task added successfully');
            } else {
                showErrorToast('Failed to add task');
            }
        } catch (error) {
            showErrorToast('Error connecting to server');
        }
    };

    const handleToggleStatus = async (id: number) => {
        try {
            const res = await fetch('/api/tasks', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            if (res.ok) {
                fetchTasks();
                showSuccessToast('Task status updated');
            } else {
                showErrorToast('Failed to update task');
            }
        } catch (error) {
            showErrorToast('Error connecting to server');
        }
    };

    const handleDeleteTask = async (id: number) => {
        try {
            const res = await fetch('/api/tasks', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            if (res.ok) {
                fetchTasks();
                showSuccessToast('Task deleted successfully');
            } else {
                showErrorToast('Failed to delete task');
            }
        } catch (error) {
            showErrorToast('Error connecting to server');
        }
    };

    const handleLogout = () => {
        // Add your logout logic here
        localStorage.removeItem('token');
        router.push('/auth');
        showSuccessToast('Logged out successfully');
    };

    return (
        <div className="dashboard-component">
            <div className="dashboard-component-header">
                <div className="dashboard-component-header-in-one">
                    <h2>Task Dashboard</h2>
                </div>
                <div className="dashboard-component-header-in-two">
                    <h2>Welcome, {userName}</h2>
                    <button  onClick={handleLogout}>
                        <FiLogOut /> Logout
                    </button>
                </div>
            </div>
            <div className="dashboard-component-body">
                <div className="task-form">
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        className="task-input"
                    />
                    <input
                        type="text"
                        placeholder="Task Description"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        className="task-input"
                    />
                    <button 
                        onClick={handleAddTask} 
                        className="btn btn-primary"
                    >
                        <FiPlus /> Add Task
                    </button>
                </div>

                <ul className="task-list">
                    {tasks.map((task) => (
                        <li 
                            key={task.id} 
                            className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}
                        >
                            <div className="task-content">
                                <h3 className={`task-title ${task.status === 'completed' ? 'completed' : ''}`}>
                                    {task.title}
                                </h3>
                                <p className={`task-description ${task.status === 'completed' ? 'completed' : ''}`}>
                                    {task.description}
                                </p>
                                <span className={`task-status ${
                                    task.status === 'completed' ? 'status-completed' : 'status-pending'
                                }`}>
                                    {task.status === 'completed' ? <FiCheck /> : <FiClock />}
                                    {task.status}
                                </span>
                            </div>
                            <div className="task-actions">
                                <button
                                    onClick={() => handleToggleStatus(task.id)}
                                    className={`btn ${
                                        task.status === 'completed'
                                            ? 'btn-warning'
                                            : 'btn-success'
                                    }`}
                                >
                                    {task.status === 'completed' ? (
                                        <><FiClock /> Mark Pending</>
                                    ) : (
                                        <><FiCheck /> Complete</>
                                    )}
                                </button>
                                <button 
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="btn btn-danger"
                                >
                                    <FiTrash2 /> Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
