"use client";
import { useEffect, useState } from 'react';

interface Task {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'completed';
}

export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const res = await fetch('/api/tasks');
        if (res.ok) {
            const data = await res.json();
            setTasks(data);
        } else {
            console.error('Failed to fetch tasks:', res.statusText);
        }
    };

    const handleAddTask = async () => {
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask),
        });
        if (res.ok) {
            setNewTask({ title: '', description: '' });
            fetchTasks();
        }
    };

    const handleToggleStatus = async (id: number) => {
        const res = await fetch('/api/tasks', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        if (res.ok) {
            fetchTasks();
        }
    };

    const handleDeleteTask = async (id: number) => {
        const res = await fetch('/api/tasks', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        if (res.ok) {
            fetchTasks();
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="border p-2 mr-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Task Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="border p-2 mr-2 rounded"
                />
                <button 
                    onClick={handleAddTask} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Add Task
                </button>
            </div>

            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li 
                        key={task.id} 
                        className={`border p-4 rounded-lg flex justify-between items-center ${
                            task.status === 'completed' ? 'bg-gray-50' : 'bg-white'
                        }`}
                    >
                        <div className="flex-1">
                            <h3 className={`font-bold ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                                {task.title}
                            </h3>
                            <p className={task.status === 'completed' ? 'text-gray-500' : ''}>
                                {task.description}
                            </p>
                            <span className={`text-sm ${
                                task.status === 'completed' ? 'text-green-500' : 'text-yellow-500'
                            }`}>
                                {task.status}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleToggleStatus(task.id)}
                                className={`px-4 py-2 rounded ${
                                    task.status === 'completed'
                                        ? 'bg-yellow-500 hover:bg-yellow-600'
                                        : 'bg-green-500 hover:bg-green-600'
                                } text-white transition-colors`}
                            >
                                {task.status === 'completed' ? 'Mark Pending' : 'Complete'}
                            </button>
                            <button 
                                onClick={() => handleDeleteTask(task.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
