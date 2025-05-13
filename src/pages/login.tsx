import Login from '../components/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated, getUserProfile } from '../services/authApi';

export default function LoginPage() {
  const router = useRouter();
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = isAuthenticated();
      if (authenticated) {
        try {
          // Just check if token is valid
          await getUserProfile();
          router.replace('/');
        } catch (error) {
          // If error fetching profile, stay on login page
          console.error('Error verifying authentication:', error);
        }
      }
    };

    checkAuth();
  }, [router]);

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Login />
    </GoogleOAuthProvider>
  );
} 