import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key exists:', !!supabaseAnonKey);

// Check if we have valid Supabase credentials
const hasValidSupabaseConfig = supabaseUrl && 
                              supabaseAnonKey && 
                              supabaseUrl !== 'https://your-project.supabase.co' && 
                              supabaseAnonKey !== 'your-anon-key' &&
                              !supabaseUrl.includes('your-project') &&
                              !supabaseAnonKey.includes('your-anon-key');

if (!hasValidSupabaseConfig) {
  console.warn('Supabase not properly configured. Using mock data for development.');
  console.warn('To enable real backend functionality, create a .env file with your Supabase credentials.');
} else {
  console.log('Supabase properly configured. Using real backend functionality.');
}

export const supabase = createClient(supabaseUrl || 'https://your-project.supabase.co', supabaseAnonKey || 'your-anon-key');

// Helper functions for user management
export const createUser = async (userData: {
  email: string;
  password: string;
  name: string;
  role: string;
}) => {
  console.log('Creating user:', userData.email);
  
  // Sign up with Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
  });

  if (error) {
    console.error('Supabase auth signup error:', error);
    throw error;
  }

  // Wait for the user session to be available
  let userId = data.user?.id;
  if (!userId) {
    // Try to get the user from the current session
    const session = supabase.auth.getSession ? (await supabase.auth.getSession()).data.session : null;
    userId = session?.user?.id;
  }
  if (!userId) {
    console.error('User ID not found after signup');
    throw new Error('User ID not found after signup');
  }

  console.log('User created with ID:', userId);

  // Insert user profile into users table
  const { error: profileError } = await supabase
    .from('users')
    .insert({
      id: userId,
      email: userData.email,
      password_hash: '', // We don't store password hash in this table
      name: userData.name,
      role: userData.role,
      profile_completed: false
    });

  if (profileError) {
    console.error('Profile insert error:', profileError);
    throw profileError;
  }

  console.log('User profile created successfully');
  return { user: { id: userId } };
};

export const signInUser = async (email: string, password: string) => {
  console.log('Signing in user:', email);
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Sign in error:', error);
    throw error;
  }
  
  console.log('User signed in successfully');
  return data;
};

export const getUserProfile = async (email: string) => {
  console.log('Getting user profile for email:', email);
  
  // Check if Supabase is properly configured
  const hasValidSupabaseConfig = supabaseUrl && 
                                supabaseAnonKey && 
                                supabaseUrl !== 'https://your-project.supabase.co' && 
                                supabaseAnonKey !== 'your-anon-key' &&
                                !supabaseUrl.includes('your-project') &&
                                !supabaseAnonKey.includes('your-anon-key');
  
  if (!hasValidSupabaseConfig) {
    console.log('Supabase not configured, returning mock profile data');
    // Return mock profile data for development
    return {
      fullName: 'John Doe',
      dateOfBirth: '1990-01-01',
      address: '123 Main Street, City, Country',
      country: 'Nigeria',
      state: 'Lagos',
      phoneNumber: '+234 123 456 7890',
      profileCompleted: true
    };
  }
  
  try {
    console.log('Fetching profile from Supabase for email:', email);
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    if (data) {
      console.log('Raw user profile data from Supabase:', data);
      const profile = {
        fullName: data.full_name || '',
        dateOfBirth: data.date_of_birth || '',
        address: data.address || '',
        country: data.country || '',
        state: data.state || '',
        phoneNumber: data.phone_number || '',
        profileCompleted: data.profile_completed || false
      };
      console.log('Processed profile data:', profile);
      return profile;
    }

    console.log('No user profile found for email:', email);
    return null;
  } catch (error) {
    console.error('Exception in getUserProfile:', error);
    return null;
  }
};

export const updateUserProfile = async (userId: string, profileData: {
  full_name: string;
  date_of_birth: string;
  address: string;
  country: string;
  state: string;
  phone_number: string;
}) => {
  console.log('Updating profile for user ID:', userId);
  console.log('Profile data to update:', profileData);
  
  // Check if Supabase is properly configured
  const hasValidSupabaseConfig = supabaseUrl && 
                                supabaseAnonKey && 
                                supabaseUrl !== 'https://your-project.supabase.co' && 
                                supabaseAnonKey !== 'your-anon-key' &&
                                !supabaseUrl.includes('your-project') &&
                                !supabaseAnonKey.includes('your-anon-key');
  
  if (!hasValidSupabaseConfig) {
    console.log('Supabase not configured, simulating profile update');
    // Simulate successful update for development
    return {
      fullName: profileData.full_name,
      dateOfBirth: profileData.date_of_birth,
      address: profileData.address,
      country: profileData.country,
      state: profileData.state,
      phoneNumber: profileData.phone_number,
      profileCompleted: true
    };
  }
  
  try {
    console.log('Updating profile in Supabase for user ID:', userId);
    const { data, error } = await supabase
      .from('users')
      .update({
        ...profileData,
        profile_completed: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Update profile error:', error);
      throw error;
    }
    
    console.log('Profile updated successfully in Supabase:', data);
    
    // Get the email from the updated data to fetch the profile
    if (data && data.email) {
      return await getUserProfile(data.email);
    } else {
      console.error('No email found in updated profile data');
      return null;
    }
  } catch (error) {
    console.error('Exception in updateUserProfile:', error);
    throw error;
  }
};

export const updateLastLogin = async (userId: string) => {
  const { error } = await supabase
    .from('users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', userId);

  if (error) {
    console.error('Update last login error:', error);
    throw error;
  }
}; 