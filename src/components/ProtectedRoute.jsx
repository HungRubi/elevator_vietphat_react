import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import path from '../util/path';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useSelector(state => state.user);
    console.log(currentUser);
    if (!currentUser) {
        return <Navigate to={path.PAGE404} replace />;
    }
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;