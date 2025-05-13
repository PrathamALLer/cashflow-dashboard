import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Spin } from 'antd';
import { isAuthenticated, getUserProfile } from '../services/authApi';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [authStatus, setAuthStatus] = useState({
    isAuthenticated: false,
    loading: true,
  });
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if the user is authenticated
        const authenticated = isAuthenticated();

        if (authenticated) {
          // Verify the token is still valid
          try {
            const userData = await getUserProfile();
            setAuthStatus({
              isAuthenticated: true,
              loading: false,
            });
          } catch (error) {
            // If there's an error fetching the user profile, redirect to login
            setAuthStatus({
              isAuthenticated: false,
              loading: false,
            });
            router.replace('/login');
          }
        } else {
          setAuthStatus({
            isAuthenticated: false,
            loading: false,
          });
          
          // Redirect to login if not authenticated
          router.replace('/login');
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setAuthStatus({
          isAuthenticated: false,
          loading: false,
        });
        
        // Redirect to login on error
        router.replace('/login');
      }
    };

    // Skip auth check for login page
    if (router.pathname === '/login') {
      setAuthStatus({
        isAuthenticated: true,
        loading: false,
      });
      return;
    }

    checkAuth();
  }, [router]);

  // Show loading spinner while checking authentication
  if (authStatus.loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#150107',
        }}
      >
        <Spin 
          size="large" 
          tip="Loading..." 
          style={{ color: 'white' }}
        />
      </div>
    );
  }

  // Render children if authenticated or if this is the login page
  return authStatus.isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute; 