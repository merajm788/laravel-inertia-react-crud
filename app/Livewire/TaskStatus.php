<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Task;

class TaskStatus extends Component
{
    public $tasks;

    public function mount($tasks)
    {
        $this->tasks = $tasks;
    }

    public function update($taskId)
    {
        $task = Task::find($taskId);

        if ($task) {
            $task->status = $task->status === 1 ? 0 : 1;
            $task->save();

            // Update the local task state
            $this->tasks = $this->tasks->map(function ($t) use ($task) {
                return $t['id'] == $task->id ? $task : $t;
            });

            session()->flash('success', 'Task status updated successfully.');
        } else {
            session()->flash('error', 'Task not found.');
        }
    }

    public function render()
    {
        return view('livewire.task-status');
    }
}
