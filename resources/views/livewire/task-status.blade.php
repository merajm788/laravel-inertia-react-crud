<div>
    @if (session()->has('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @elseif (session()->has('error'))
        <div class="alert alert-danger">{{ session('error') }}</div>
    @endif

    <table class="table">
        <thead>
            <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($tasks as $task)
                <tr>
                    <td>{{ $task['title'] }}</td>
                    <td>{{ $task['status'] ? 'Completed' : 'Pending' }}</td>
                    <td>
                        <label class="switch">
                            <input 
                                type="checkbox" 
                                wire:click="updateStatus({{ $task['id'] }})" 
                                {{ $task['status'] ? 'checked' : '' }}
                            />
                            <span class="slider round"></span>
                        </label>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
