# Employee Management App (Assessment)

## Tech Stack
- Backend: Laravel 11, PHP 8.x, MySQL
- Frontend: React (provided separately)

## Setup Backend
1. composer install
2. cp .env.example .env
3. Update DB config in .env
4. php artisan key:generate
5. php artisan migrate
6. php artisan serve

## API Endpoints
- POST   /api/auth/register
- POST   /api/auth/login
- GET    /api/employees
- POST   /api/employees
- GET    /api/employees/{id}
- PUT    /api/employees/{id}
- DELETE /api/employees/{id}
