<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class TaskController extends Controller
{
    public function index(Request $request){ 
        $search = $request->input('search');
        $status = $request->input('status');
        
        $tasks = Task::with('user')->withTrashed()->orderBy('id', 'desc');
        
        if ($search) {
            $tasks->where(function($query) use ($search) {
                $query->where('title', 'LIKE', "%{$search}%")
                      ->orWhere('description', 'LIKE', "%{$search}%")
                      ->orWhere('due_date', 'LIKE', "%{$search}%");
            });
        }
    
        if (isset($status) && is_numeric($status)) {
            $tasks->where('status', $status);
        }
        if ($search || isset($status)) {
            return Inertia::render('Tasks/Index', [
                'tasks' => $tasks->paginate(99999),  // If search or status is applied, paginate all results
            ]);
        } else {
            return Inertia::render('Tasks/Index', [
                'tasks' => $tasks->paginate(10),  // Default pagination if no filter
            ]);
        }
    }

    public function emptyTrash()
    {
        Task::onlyTrashed()->forceDelete();
        return redirect()->back()->with('success', 'Trash cleared successfully!');
    }

    public function edit(Task $task)
    {
        $users = User::all();
        return inertia('Tasks/Edit', [
            'task' => $task,
            'users' => $users,
        ]);
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'required|date',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $task->update($validated);

        return redirect()->back()->with('success', 'Task updated successfully!');
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'required|date',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $task = Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'due_date' => $validated['due_date'],
            'user_id' => $validated['user_id'],
            'status' => 1,
        ]);

        return redirect()->route('tasks.create')->with('flash', [
            'success' => 'Task created successfully.',
        ]);
    }

    public function create(){
        $users = User::all();
        return Inertia::render('Tasks/Create',[
            'users' => $users,
        ]);
    }

    public function destroy($id): RedirectResponse
    {
        $task = Task::findOrFail($id);
        $task->delete(); // Soft delete
        $tasks = Task::withTrashed()->paginate(10);
        return Redirect::route('tasks.index');

    }

    public function updateStatus(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->status = $task->status == 1 ? 0 : 1;
        $task->save();
        return Redirect::route('tasks.index');
    }
    
    public function restore($id): RedirectResponse
    {
        $task = Task::onlyTrashed()->findOrFail($id);
        $task->restore();
        $tasks = Task::withTrashed()->paginate(10);
        return Redirect::route('tasks.index');


    }
    

    public function forceDelete($id)
    {
        $task = Task::onlyTrashed()->findOrFail($id);
        $task->forceDelete();
    }
}