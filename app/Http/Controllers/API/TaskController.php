<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    public function index(Request $request): JsonResponse
    { 
        $search = $request->input('search');
        $tasks = Task::withTrashed()->orderBy('id','desc');

        if ($request->filled('status')) {
            $tasks->where('status', $request->status);
        }

        if ($search) {
            $tasks->where(function ($query) use ($search) {
                $query->where('title', 'LIKE', "%{$search}%")
                      ->orWhere('description', 'LIKE', "%{$search}%")
                      ->orWhere('status', 'LIKE', "%{$search}%")
                      ->orWhere('due_date', 'LIKE', "%{$search}%");
            });
        }

        return response()->json([
            'success' => true,
            'data' => $tasks->paginate(10),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'required|date',
        ]);

        $task = Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'due_date' => $validated['due_date'],
            'status' => 1,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Task created successfully.',
            'data' => $task,
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $task = Task::withTrashed()->findOrFail($id);
        return response()->json(['success' => true, 'data' => $task]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $task = Task::findOrFail($id);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'required|date',
        ]);

        $task->update($validated);

        return response()->json(['success' => true, 'message' => 'Task updated successfully.', 'data' => $task]);
    }

    public function destroy($id): JsonResponse
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['success' => true, 'message' => 'Task deleted successfully.']);
    }

    public function emptyTrash(): JsonResponse
    {
        $trashedTasks = Task::onlyTrashed();
    
        if ($trashedTasks->count() > 0) {
            $trashedTasks->forceDelete();
            return response()->json([
                'success' => true,
                'message' => 'Trash cleared successfully!'
            ]);
        }
    
        return response()->json([
            'success' => false,
            'message' => 'No tasks in the trash to clear.'
        ], 404);
    }
    

    public function restore($id): JsonResponse
    {
        $task = Task::onlyTrashed()->findOrFail($id);
        $task->restore();
        return response()->json(['success' => true, 'message' => 'Task restored successfully.', 'data' => $task]);
    }

    public function forceDelete($id): JsonResponse
    {
        $task = Task::onlyTrashed()->findOrFail($id);
        $task->forceDelete();
        return response()->json(['success' => true, 'message' => 'Task permanently deleted.']);
    }

    public function updateStatus($id): JsonResponse
    {
        $task = Task::findOrFail($id);
        $task->status = $task->status == 1 ? 0 : 1;
        $task->save();
        return response()->json(['success' => true, 'message' => 'Task status updated successfully.', 'data' => $task]);
    }
}
