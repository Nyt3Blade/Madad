import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserDetails {
  id: string;
  email: string;
  name: string;
  farms: number;
}

interface UserContextType {
  userDetails: UserDetails | null;
  setUserDetails: (user: UserDetails | null) => void;
  loading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        console.log('Fetching user details...');
        const response = await fetch('http://localhost:5000/basic_details', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log('Received user details:', data);

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch user details');
        }

        setUserDetails(data.user);
        console.log('Updated user details in context:', data.user);
      } catch (err) {
        console.error('Error in fetchUserDetails:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 