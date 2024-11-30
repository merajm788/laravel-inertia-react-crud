import Sidebar from '@/Layouts/Sidebar';
import Pagination from '@/Components/Pagination';
import Navbar from '@/Layouts/Navbar';
import { useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';

export default function Index({ auth, tasks, laravelVersion, phpVersion }) {
    const { data, setData, patch, post, delete: destroy, get } = useForm({
        page: tasks.current_page,
        search: '',
    });


    const { flash } = usePage().props;

    const handleEmptyTrash = () => {
        if (confirm('Are you sure you want to empty the trash?')) {
            post(route('tasks.emptyTrash'), {
                preserveScroll: true,
                onSuccess: (response) => {
                    setFlashMessage(response.success || 'Task deleted successfully.');
                    setFilteredTasks(prevTasks => prevTasks.filter(task => !task.deleted_at));
                },
                onError: (error) => {
                    console.error('Error emptying trash:', error);
                    setFlashMessage('Failed to empty the trash.', 'danger');
                },
            });
        }
    };
    

    const handleRestore = (id) => {
        if (confirm('Are you sure you want to restore this task?')) {
            patch(route('tasks.restore', id), {}, {
                onSuccess: (response) => {
                    const successMessage = response?.data?.message || 'Task restored successfully.';
                    setFlashMessage(successMessage);  // Set the success message
                    setFilteredTasks(filteredTasks.map(task =>
                        task.id === id ? { ...task, deleted_at: null } : task
                    ));
                },
                onError: (error) => {
                    setFlashMessage('Failed to restore task.', 'danger'); // Error message
                }
            });
        }
    };

    const handleStatusFilterChange = (e) => {
        const selectedStatus = e.target.value;
        setData('status', selectedStatus);
        setIsTyping(true);
    };
    
    

    const handleStatusUpdate = (id) => {
        const taskToUpdate = filteredTasks.find(task => task.id === id);
        const newStatus = taskToUpdate.status === 0 ? 1 : 0;
    
        patch(route('tasks.updateStatus', id), {
            preserveState: true, 
            onSuccess: () => {
                setFlashMessage('Task status updated successfully.');
                setFilteredTasks(filteredTasks.map(task =>
                    task.id === id ? { ...task, status: newStatus } : task
                ));
                get(route('tasks.index', { search: data.search, page: data.page }), {
                    preserveState: true,
                });
            },
            onError: () => {
                setFlashMessage('Failed to update task status.', 'danger');
            }
        });
    };
    
    
    const handleDelete = (id, force = false) => {
        if (confirm(force ? 'Permanently delete this task?' : 'Move this task to trash?')) {
            const routeName = force ? 'tasks.forceDelete' : 'tasks.destroy';
            destroy(route(routeName, id), {
                onSuccess: (response) => {
                    setFlashMessage(response.success || 'Task deleted successfully.');
                    setFilteredTasks(prevTasks => prevTasks.filter(task => task.id !== id));
                },
                onError: (error) => {
                    setFlashMessage('Failed to delete task.', 'danger');
                },
            });
        }
    };

    const [filteredTasks, setFilteredTasks] = useState(tasks.data);
    const [isTyping, setIsTyping] = useState(false);
    const [flashMessage, setFlashMessage] = useState(null); // State for flash message

    useEffect(() => {
        if (flash && flash.success) {
            setFlashMessage(flash.success);
        }
    }, [flash]);

    useEffect(() => {
        if (flashMessage) {
            const timer = setTimeout(() => setFlashMessage(null), 3000); // Clear flash after 3s
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    const handleSearch = (e) => {
        const searchQuery = e.target.value;
        setData('search', searchQuery);
        setIsTyping(true);
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setIsTyping(false);
    
            if (data.search || data.status) {
                setData('page', 1); // Force reset the page to 1
            }
            const queryParams = {
                search: data.search,
                page: data.page,
                status: data.status,  // Include status in query
            };
            console.log(queryParams);
            get(route('tasks.index', queryParams), {
                preserveState: true,
                onSuccess: (page) => {
                    setFilteredTasks(page.props.tasks.data);
                },
            });
        }, 500);
    
        return () => clearTimeout(delayDebounceFn);
    }, [data.search, data.status, data.page]); // Added `data.page` to the dependency array
    
    

    useEffect(() => {
        setFilteredTasks(tasks.data);
    }, [tasks]);

    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Sidebar />
                    <div className="layout-page">
                        <Navbar />
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                {/* Display the flash message */}
                                <FlashMessage message={flashMessage} />

                                <div className="row">
                                    <div className="col-md-12 mb-6 order-0">
                                        <div className="card">
                                            <div className="row">
                                                <h5 className="card-header display-5 w-25">Tasks</h5>
                                                <div className="card-header text-end d-flex justify-content-between align-items-center">
                                                <div className="d-flex w-50">
                                                    <input
                                                        onChange={handleSearch}
                                                        value={data.search}
                                                        placeholder="Search"
                                                        className="border-light border-1 form-control me-3"
                                                        type="text"
                                                    />
                                                    {isTyping && <small className="text-muted ms-2">Searching...</small>}
                                                </div>
                                                <div className="d-flex align-items-center w-50">
                                                    <select
                                                        className="form-control me-3 w-50"
                                                        onChange={handleStatusFilterChange}
                                                        value={data.status || ''}
                                                    >
                                                        <option value="">All Tasks</option>
                                                        <option value="1">Completed</option>
                                                        <option value="0">Pending</option>
                                                    </select>
                                                    <Link href={route('tasks.create')} className="btn btn-success me-3">
                                                        Create
                                                    </Link>
                                                    <Link onClick={handleEmptyTrash} className="btn btn-danger">
                                                        Empty trash
                                                    </Link>
                                                </div>
                                                </div>

                                            </div>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Title</th>
                                                            <th>Description</th>
                                                            <th>Assigned User</th>
                                                            <th>Due Date</th>
                                                            <th>Status</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="table-border-bottom-0">
                                                        {filteredTasks.map((task) => (
                                                            <tr key={task.id} className={task.deleted_at ? 'trashed' : ''}>
                                                                <td className='text-center'>{task.title} </td>
                                                                <td>{task.description.split(' ').slice(0, 15).join(' ') + (task.description.split(' ').length > 20 ? '...' : '')}</td>
                                                                <td>{task.user ? task.user.name : 'No user assigned'}</td>
                                                                <td>{task.due_date}</td>
                                                                <td>
                                                                    {task.deleted_at ? (
                                                                        <span className="badge bg-warning text-white ms-2">Deleted</span>
                                                                    ) : (
                                                                        <>
                                                                        {task.status === 1 ? 'Completed'  : 'Pending'}
                                                                        <br />
                                                                            <label className="switch">
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    checked={task.status === 1} // Check if task is active
                                                                                    onChange={() => handleStatusUpdate(task.id)} // Trigger the status update on change
                                                                                />
                                                                                <span className="slider round"></span> {/* Toggle slider for styling */}
                                                                            </label>
                                                                        </>
                                                                    )}
                                                                </td>

                                                                <td>
                                                                    <div className="dropdown">
                                                                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                            <i className="bx bx-dots-vertical-rounded"></i>
                                                                        </button>
                                                                        <div className="dropdown-menu">
                                                                            {!task.deleted_at ? (
                                                                                <>
                                                                                    <Link className="dropdown-item" href={route('tasks.edit', { task: task.id })}><i className="bx bx-edit-alt me-1"></i> Edit</Link>
                                                                                    <a
                                                                                        className="dropdown-item"
                                                                                        onClick={() => handleDelete(task.id, false)}
                                                                                        href="#"
                                                                                    >
                                                                                        <i className="bx bx-trash me-1"></i> Move to Trash
                                                                                    </a>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <a
                                                                                        className="dropdown-item"
                                                                                        onClick={() => handleRestore(task.id)}
                                                                                        href="#"
                                                                                    >
                                                                                        <i className="bx bx-refresh me-1"></i> Restore
                                                                                    </a>
                                                                                    <a
                                                                                        className="dropdown-item"
                                                                                        onClick={() => handleDelete(task.id, true)}
                                                                                        href="#"
                                                                                    >
                                                                                        <i className="bx bx-trash me-1"></i> Permanently Delete
                                                                                    </a>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                            </tr>
                                                        ))}
                                                    </tbody>

                                                </table>
                                                <div className="d-flex justify-content-md-end m-5">
                                                    <Pagination
                                                        links={tasks.links}
                                                        currentPage={tasks.current_page}
                                                        setCurrentPage={(page) => setData('page', page)}
                                                    />
                                                </div>
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
