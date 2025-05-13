import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider, theme } from 'antd';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // Define public routes that don't require authentication
  const publicRoutes = ['/login'];
  
  // Check if the current route is public
  const isPublicRoute = publicRoutes.includes(router.pathname);
  
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#FF0060',
          colorBgBase: '#150107',
          colorTextBase: '#ffffff',
        },
        components: {
          Button: {
            colorPrimary: '#FF0060',
            algorithm: true,
          },
          Input: {
            colorBgContainer: '#310312',
            colorBorder: '#5A0022',
          },
          Select: {
            colorBgContainer: '#310312',
            colorBorder: '#5A0022',
          },
          Card: {
            colorBgContainer: '#310312',
            colorBorderSecondary: '#5A0022',
          },
          Modal: {
            colorBgElevated: '#310312',
            colorIcon: '#FF0060',
          },
          Table: {
            colorBgContainer: '#150107',
            colorBorderSecondary: '#404968',
          }
        },
      }}
    >
      {isPublicRoute ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </ConfigProvider>
  );
}
