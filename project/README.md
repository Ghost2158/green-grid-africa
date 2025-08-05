# GreenGrid Africa - Enhanced Energy Management Platform

A comprehensive energy management platform with realistic authentication, profile completion, and Supabase integration.

## Features

### 🔐 Enhanced Authentication
- **Real Supabase Integration**: Users can sign up and sign in with real authentication
- **Demo Accounts**: Pre-configured demo accounts for testing
- **Profile Completion Flow**: Step-by-step profile completion for new users
- **Role-based Access**: Different dashboards for consumers, operators, and admins

### 👤 Profile Management
- **Profile Completion Modal**: Guided profile setup for new users
- **Profile Editing**: Users can view and edit their profile information
- **Profile Fields**: Full name, date of birth, address, country, state, phone number

### 🎨 Enhanced UI/UX
- **Modern Design**: Eye-appealing gradients and animations
- **Responsive Layout**: Works on all device sizes
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages

### 📊 Dashboard Features
- **Consumer Dashboard**: Personal energy insights and usage tracking
- **Operator Dashboard**: System management and technical controls
- **Admin Dashboard**: User management and system administration
- **Analytics**: Energy performance analysis
- **Site Monitoring**: Real-time monitoring of installations
- **AI Predictions**: Machine learning forecasting
- **Alerts**: Intelligent monitoring and notifications

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Supabase Setup

To enable real backend functionality, you need to configure Supabase:

1. **Create a Supabase Project**:
   - Go to [https://supabase.com](https://supabase.com)
   - Create a new project or use an existing one

2. **Get Your Credentials**:
   - Go to Settings > API in your Supabase dashboard
   - Copy the Project URL and anon/public key

3. **Create Environment File**:
   - Create a `.env` file in the project root
   - Add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Run Database Migrations**:
   - The SQL migration files in `supabase/migrations/` will create the necessary tables
   - You can run these in your Supabase SQL editor

**Note**: If Supabase is not configured, the app will use mock data for development purposes.

### 3. Start Development Server
```bash
npm run dev
```

## Demo Accounts

For testing purposes, the following demo accounts are available:

- **Consumer**: user@greengrid.com / password123
- **Operator**: operator@greengrid.com / password123
- **Admin**: admin@greengrid.com / admin123 (Admin Code: ADMIN2024)

## User Flow

1. **Loading Screen**: Application starts with a loading animation
2. **Authentication**: Users can sign in or create a new account
3. **Profile Completion**: New users are prompted to complete their profile
4. **Dashboard Access**: Users are redirected to their appropriate dashboard
5. **Profile Management**: Users can access and edit their profile from the sidebar

## Database Schema

The application uses a `users` table with the following fields:
- `id` (UUID, Primary Key)
- `email` (VARCHAR, Unique)
- `password_hash` (VARCHAR)
- `name` (VARCHAR)
- `role` (VARCHAR: 'user', 'operator', 'admin')
- `full_name` (VARCHAR)
- `date_of_birth` (DATE)
- `address` (TEXT)
- `country` (VARCHAR)
- `state` (VARCHAR)
- `phone_number` (VARCHAR)
- `profile_completed` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)
- `last_login` (TIMESTAMP)
- `is_active` (BOOLEAN)

## Technologies Used

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Supabase** for backend and authentication
- **Lucide React** for icons
- **React Router** for navigation

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── charts/         # Data visualization
│   ├── layout/         # Layout components
│   └── ui/            # Reusable UI components
├── contexts/           # React contexts
├── pages/             # Page components
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── App.tsx           # Main application component
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License. 