<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
class DashboardController extends Controller
{
    public function index() {

        $pendingTasks = Task::where('status', 0)->count();
        
        $completedTasks = Task::where('status', 1)->count();
        return Inertia::render('Dashboard', [
            'pendingTasks' => $pendingTasks,
            'completedTasks' => $completedTasks,
            'allTasks' => Task::count(),
            'deletedTasks' => Task::onlyTrashed()->count(),
        ]);
    }
    
}
