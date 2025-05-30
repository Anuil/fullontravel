import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.log(error);
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by Error Boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.children;
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.elementType,
};

export default ErrorBoundary;
