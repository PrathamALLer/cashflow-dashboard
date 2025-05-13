import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Divider, 
  Space, 
  Alert, 
  notification, 
  Spin 
} from 'antd';
import { 
  MailOutlined, 
  LockOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined 
} from '@ant-design/icons';
import { loginWithEmail, loginWithGoogle } from '../services/authApi';
import { GoogleLogin } from '@react-oauth/google';
import Head from 'next/head';
import Image from 'next/image';

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [googleAuthError, setGoogleAuthError] = useState<string | null>(null);
  const router = useRouter();
  const [form] = Form.useForm();

  // Check if Google client ID is properly configured
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    
    if (!clientId || clientId === 'REPLACE_WITH_YOUR_GOOGLE_CLIENT_ID') {
      setGoogleAuthError(
        'Google Sign-In is not properly configured. Please set up your NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env file.'
      );
    } else {
      setGoogleAuthError(null);
    }
  }, []);

  // Handle email login submission
  const handleEmailLogin = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      
      // Use the auth API to login
      await loginWithEmail(values.email, values.password);
      
      // Show success notification
      notification.success({
        message: 'Login Successful',
        description: 'Welcome back! You have been successfully logged in.',
        icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
        placement: 'topRight',
        duration: 4,
      });

      // Short delay before redirecting to ensure notification is seen
      setTimeout(() => {
        // Redirect to main dashboard
        router.push('/');
      }, 1000);
    } catch (error: any) {
      // Show error notification
      notification.error({
        message: 'Login Failed',
        description: error.message || 'Please check your credentials and try again.',
        icon: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
        placement: 'topRight',
        duration: 5,
      });
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      setLoading(true);
      
      // Call the auth API to login with Google
      await loginWithGoogle(credentialResponse.credential);
      
      // Show success notification
      notification.success({
        message: 'Google Login Successful',
        description: 'Welcome! You have been successfully logged in with Google.',
        icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
        placement: 'topRight',
        duration: 4,
      });

      // Short delay before redirecting to ensure notification is seen
      setTimeout(() => {
        // Redirect to main dashboard
        router.push('/');
      }, 1000);
    } catch (error: any) {
      // Show error notification
      notification.error({
        message: 'Google Login Failed',
        description: error.message || 'An error occurred during Google login. Please try again.',
        icon: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
        placement: 'topRight',
        duration: 5,
      });
      console.error('Google login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | Cashflow Dashboard</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-[#150107] py-12 px-4 sm:px-6 lg:px-8">
        <Card 
          className="w-full max-w-md"
          style={{ 
            backgroundColor: '#310312', 
            borderColor: '#5A0022',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div className="flex flex-col items-center mb-8">
            <div className="mb-6 text-center">
              <Image 
                src="/logo-placeholder.png" 
                alt="Cashflow Logo" 
                width={120} 
                height={120} 
                className="mb-4"
                onError={(e) => {
                  // If image fails to load, fallback to text
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <h1 className="text-2xl font-bold text-white mb-2">Cashflow Dashboard</h1>
              <p className="text-gray-300">Sign in to access your financial insights</p>
            </div>
          </div>

          {googleAuthError && (
            <Alert
              message="Configuration Error"
              description={googleAuthError}
              type="error"
              showIcon
              className="mb-6"
            />
          )}

          <Form
            form={form}
            name="login_form"
            onFinish={handleEmailLogin}
            layout="vertical"
            requiredMark={false}
            initialValues={{ email: '', password: '' }}
          >
            <Form.Item
              name="email"
              label={<span className="text-white">Email</span>}
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input 
                prefix={<MailOutlined className="site-form-item-icon" />} 
                placeholder="Email" 
                size="large"
                style={{ backgroundColor: '#18101c', borderColor: '#5A0022', color: 'white' }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="text-white">Password</span>}
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password 
                prefix={<LockOutlined className="site-form-item-icon" />} 
                placeholder="Password" 
                size="large"
                style={{ backgroundColor: '#18101c', borderColor: '#5A0022', color: 'white' }}
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large"
                className="w-full"
                style={{ 
                  backgroundColor: '#FF0060', 
                  borderColor: '#E81A5F',
                  height: '48px'
                }}
                loading={loading}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <Divider className="text-gray-400">Or</Divider>

          <div className="flex justify-center">
            {!googleAuthError && (
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.error('Google Login Failed');
                  notification.error({
                    message: 'Google Login Failed',
                    description: 'An error occurred during Google login. Please try again.',
                    placement: 'topRight',
                    duration: 5,
                  });
                }}
                useOneTap
              />
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              For development use only. Demo: demo@example.com / password
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Login; 