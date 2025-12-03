import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectRole, selectCheckingAuth } from '../slices/authSlice';

/**
 * Higher-order component to protect routes based on authentication and role
 * @param {React.Component} WrappedComponent - Component to wrap
 * @param {string} requiredRole - Required role to access the route (e.g., 'education', 'library')
 */
const withAuth = (WrappedComponent, requiredRole = null) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const userRole = useSelector(selectRole);
    const checkingAuth = useSelector(selectCheckingAuth);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Check auth from localStorage on mount (for page refresh)
      const token = localStorage.getItem('accessToken');
      const storedRole = localStorage.getItem('userRole');

      if (!token) {
        // Not authenticated - redirect to login
        router.replace('/login');
        return;
      }

      if (requiredRole) {
        const normalizedUserRole = (storedRole || userRole || '').toLowerCase();
        const normalizedRequiredRole = requiredRole.toLowerCase();

        if (normalizedUserRole !== normalizedRequiredRole) {
          // User doesn't have the required role - redirect to their dashboard
          if (normalizedUserRole) {
            router.replace(`/(${normalizedUserRole})/dashboard`);
          } else {
            router.replace('/login');
          }
          return;
        }
      }

      setIsAuthorized(true);
      setIsLoading(false);
    }, [isAuthenticated, userRole, router]);

    // Show loading state while checking auth
    if (isLoading || checkingAuth) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    // Only render the component if authorized
    if (!isAuthorized) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  // Copy display name for debugging
  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthenticatedComponent;
};

export default withAuth;
