import Sidebar from '@/Layouts/Sidebar';
import Navbar from '@/Layouts/Navbar';
import { Link } from '@inertiajs/react';

export default function Dashboard({ completedTasks, pendingTasks, allTasks, deletedTasks }) {

  return (
      <>
      <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
              <Sidebar/>
              <div className="layout-page">
                  <Navbar/>
                  <div className="content-wrapper">
                      <div className="container-xxl flex-grow-1 container-p-y">
                          <div className="row">
                              <div className="col-lg-12 col-md-4 order-1">
                                  <div className="row">
                                      <div className="col-md-6 mb-6">
                                          <div className="card h-100">
                                              <div className="card-body">
                                                  <div className="card-title d-flex align-items-start justify-content-between mb-4">
                                                      <div className="avatar flex-shrink-0">
                                                          <img
                                                              src="../assets/img/icons/unicons/chart-success.png"
                                                              alt="chart success"
                                                              className="rounded" />
                                                      </div>
                                                  </div>
                                                  <p className="mb-1">Completed Tasks</p>
                                                  <h4 className="card-title mb-3">{completedTasks}</h4> {/* Display the completed tasks count */}
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-md-6 mb-6">
                                          <div className="card h-100">
                                              <div className="card-body">
                                                  <div className="card-title d-flex align-items-start justify-content-between mb-4">
                                                      <div className="avatar flex-shrink-0">
                                                          <img
                                                              src="../assets/img/icons/unicons/wallet-info.png"
                                                              alt="wallet info"
                                                              className="rounded" />
                                                      </div>
                                                  </div>
                                                  <p className="mb-1">Pending Tasks</p>
                                                  <h4 className="card-title mb-3">{pendingTasks}</h4> {/* Display the pending tasks count */}
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-md-6 mb-6">
                                          <div className="card h-100">
                                              <div className="card-body">
                                                  <div className="card-title d-flex align-items-start justify-content-between mb-4">
                                                      <div className="avatar flex-shrink-0">
                                                          <img
                                                              src="../assets/img/icons/unicons/wallet-info.png"
                                                              alt="wallet info"
                                                              className="rounded" />
                                                      </div>
                                                  </div>
                                                  <p className="mb-1">All Tasks</p>
                                                  <h4 className="card-title mb-3">{allTasks}</h4> {/* Display the pending tasks count */}
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-md-6 mb-6">
                                          <div className="card h-100">
                                              <div className="card-body">
                                                  <div className="card-title d-flex align-items-start justify-content-between mb-4">
                                                      <div className="avatar flex-shrink-0">
                                                          <img
                                                              src="../assets/img/icons/unicons/chart-success.png"
                                                              alt="chart success"
                                                              className="rounded" />
                                                      </div>
                                                  </div>
                                                  <p className="mb-1">Deleted Tasks</p>
                                                  <h4 className="card-title mb-3">{deletedTasks}</h4> {/* Display the completed tasks count */}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="content-backdrop fade"></div>
                  </div>
              </div>
          </div>
          <div className="layout-overlay layout-menu-toggle"></div>
      </div>
      </>
  );
}

