<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' =>  $this->faker->title(),
            'description' =>  $this->faker->sentence(45),
            'status' =>  $this->faker->boolean(),
            'due_date' =>  $this->faker->dateTimeThisMonth()->format('d-m-Y'),

        ];
    }
}
