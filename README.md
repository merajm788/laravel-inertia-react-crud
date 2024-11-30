# Laravel Project Setup Guide
# Prerequisites
Ensure you have the following installed on your system:

# PHP (>= 8.1)

# Composer (Dependency Manager for PHP)

# Node.js (>= 16.x)

# NPM or Yarn (Package Manager)

# Database (MySQL, PostgreSQL, SQLite, etc.)

# Step 1: Clone the Repository

Clone the project repository and navigate to the project folder:

git clone git@github.com:merajm788/laravel-inertia-react-crud.git
cd laravel-inertia-react-crud

# Step 2: Install Dependencies
1. Install PHP Dependencies
composer install
2. Install JavaScript Dependencies
npm install
Alternatively, if you prefer Yarn:

yarn install

# Step 3: Configure Environment Variables
Copy the example .env file to create your own .env:

cp .env.example .env

Update the .env file with your specific settings:

APP_NAME=YourAppName

APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Step 4: Generate Application Key
php artisan key:generate

# Step 5: Set Up the Database
Create the database using your preferred database management tool (MySQL, PostgreSQL, etc.).

Run Migrations to set up the database schema:

php artisan migrate
(Optional) Seed the Database with sample data:

php artisan db:seed

# Step 6: Run the Development Server
Start the Laravel development server:

php artisan serve
Visit the application at http://localhost:8000.

Useful Commands
Clear Cache
Clear various caches in your Laravel application:

php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
Run Queue Workers
php artisan queue:work
Create a Storage Link
php artisan storage:link
