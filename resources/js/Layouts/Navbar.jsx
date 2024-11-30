import { Link } from '@inertiajs/react';

export default function Navbar() {
    return (
        <nav
            class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
        >
            <div class="layout-menu-toggle navbar-nav align-items-xl-center me-4 me-xl-0 d-xl-none">
                <Link class="nav-item nav-link px-0 me-xl-6" href="javascript:void(0)">
                    <i class="bx bx-menu bx-md"></i>
                </Link>
            </div>

            <div class="navbar-nav-right d-flex align-items-center justify-content-between w-100" id="navbar-collapse">
                <div class="navbar-nav align-items-center">
                    <div class="nav-item d-flex align-items-center">
                        <h2>Nav Items Goes Here :-</h2>
                    </div>
                </div>

                {/* Right-aligned logout link */}
                <div class="nav-item">
                    <Link href={route('logout')} class="btn btn-outline-danger h-50 px-4 py-2 rounded-3 shadow-sm hover-shadow-lg" method="post">
                        Logout
                    </Link>
                </div>
            </div>
        </nav>
    );
}
