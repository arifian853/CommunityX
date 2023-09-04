import { Navigate, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ isAuthenticated, ...props }) => {
  if (isAuthenticated) {
    return <Route {...props} />;
  } else {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" replace />;
  }
}

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
