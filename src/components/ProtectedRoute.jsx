import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import path from '../util/path';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
    const { currentUser, accessToken } = useSelector((state) => state.user);
    const sessionResolved = useSelector((state) => state.auth.sessionResolved);

    if (currentUser) {
        return children;
    }
    if (accessToken && !sessionResolved) {
        return null;
    }
    return <Navigate to={path.PAGE404} replace />;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;