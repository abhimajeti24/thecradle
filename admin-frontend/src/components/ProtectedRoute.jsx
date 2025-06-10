import { useAuth } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from './Loader';

export function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return <div>
      <Loader />
    </div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
}