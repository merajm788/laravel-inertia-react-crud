import { Link } from '@inertiajs/react';

export default function Sidebar() {
    return (
        <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
            {/* Branding Section */}
            <div class="app-brand demo">
                <Link href={route('index')} class="app-brand-link">
                    <span class="display-6  menu-text text-left fw-bold">QWI Assignment</span>
                </Link>
            </div>

            {/* Menu Header */}
            <li class="menu-header small text-uppercase">
                <span class="menu-header-text">Tasks &amp; Employees</span>
            </li>

            {/* Menu List */}
            <ul class="menu-item-list">
                <li class="menu-item">
                    <Link href={route('index')} class="menu-link">
                        <i class="menu-icon tf-icons bx bx-home"></i>  {/* Use a home icon for Dashboard */}
                        <div class="text-truncate">Dashboard</div>
                    </Link>
                </li>

                <li class="menu-item">
                    <Link href={route('tasks.index')} class="menu-link">
                        <i class="menu-icon tf-icons bx bx-task"></i>  {/* Use task icon for Tasks */}
                        <div class="text-truncate">Tasks</div>
                    </Link>
                </li>
            </ul>
        </aside>
    );
}
