<?php

use App\Http\Controllers\API\TaskController;
use Illuminate\Support\Facades\Route;


Route::prefix('tasks')->group(function () {
    Route::get('/', [TaskController::class, 'index']);
    Route::post('/', [TaskController::class, 'store']);
    Route::get('/{id}', [TaskController::class, 'show']);
    Route::put('/{id}', [TaskController::class, 'update']);
    Route::delete('/{id}', [TaskController::class, 'destroy']);
    Route::post('/{id}/restore', [TaskController::class, 'restore']);
    Route::post('/{id}/force-delete', [TaskController::class, 'forceDelete']);
    Route::patch('/{id}/status', [TaskController::class, 'updateStatus']);
    Route::post('/empty-trash', [TaskController::class, 'emptyTrash']);
});
