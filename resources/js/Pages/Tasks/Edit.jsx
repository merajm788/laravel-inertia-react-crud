import Sidebar from '@/Layouts/Sidebar';
import Navbar from '@/Layouts/Navbar';
import { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';
import { Link } from '@inertiajs/react';


export default function Edit({ task , users }) {
    const [flashMessage, setFlashMessage] = useState(null); // State for flash message
    const { data, setData, put, processing, errors } = useForm({
        title: task?.title || '',
        description: task?.description || '',
        due_date: task?.due_date || '',
        user_id: task?.user_id || '',

    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('tasks.update', task.id), {
            onSuccess: () => {
                setFlashMessage('Task updated successfully!');
            },
            onError: () => {
                setFlashMessage('Error updating task.');
            },
        });
    };

    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Sidebar />
                    <div className="layout-page">
                        <Navbar />
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <FlashMessage message={flashMessage} />
                                <div className="row">
                                    <div className="col-md-12 mb-6 order-0">
                                        <div className="card">
                                        <div className="row">
                                                <h6 className="card-header display-5 w-75">Edit Task</h6>
                                                <div className="card-header text-end w-25 form-group">
                                                    <Link href={route('tasks.index')} className="btn btn-success">
                                                        Task Lists
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="row mb-6">
                                                        <label className="col-sm-2 col-form-label" htmlFor="title">
                                                            Title
                                                        </label>
                                                        <div className="col-sm-10">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="title"
                                                                value={data.title}
                                                                onChange={(e) => setData('title', e.target.value)}
                                                                placeholder="Task title"
                                                            />
                                                            {errors.title && <span className="text-danger">{errors.title}</span>}
                                                        </div>
                                                    </div>
                                                 
                                                    <div className="row mb-6">
                                                        <label className="col-sm-2 col-form-label" htmlFor="user">Assign to User</label>
                                                        <div className="col-sm-10">
                                                        <select
                                                            className="form-control"
                                  x                          id="user"
                                                            value={data.user_id}
                                                            onChange={(e) => setData('user_id', e.target.value)}
                                                        >
                                                            <option value="">Select User</option>
                                                            {users.map((user) => (
                                                                <option key={user.id} value={user.id}>
                                                                    {user.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        </div>
                                                        {errors.user_id && <div className="text-danger">{errors.user_id}</div>}
                                                    </div>

                                                    <div className="row mb-6">
                                                        <label className="col-sm-2 col-form-label" htmlFor="description">
                                                            Description
                                                        </label>
                                                        <div className="col-sm-10">
                                                            <textarea
                                                                className="form-control"
                                                                id="description"
                                                                value={data.description}
                                                                onChange={(e) => setData('description', e.target.value)}
                                                                placeholder="Task description"
                                                            />
                                                            {errors.description && <span className="text-danger">{errors.description}</span>}
                                                        </div>
                                                    </div>

                                                    <div className="row mb-6">
                                                        <label className="col-sm-2 col-form-label" htmlFor="due_date">
                                                            Due Date
                                                        </label>
                                                        <div className="col-sm-10">
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                id="due_date"
                                                                value={data.due_date}
                                                                onChange={(e) => setData('due_date', e.target.value)}
                                                            />
                                                            {errors.due_date && <span className="text-danger">{errors.due_date}</span>}
                                                        </div>
                                                    </div>

                                                    <div className="row justify-content-end">
                                                        <div className="col-sm-10">
                                                            <button type="submit" className="btn btn-primary" disabled={processing}>
                                                                {processing ? 'Updating...' : 'Update Task'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
