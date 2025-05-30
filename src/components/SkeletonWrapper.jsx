import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PropTypes from 'prop-types';

const SkeletonWrapper = ({  width = '100%', height = '100%', count = 1, style = {} }) => (
    <Skeleton width={width} height={height} count={count} style={style} />
);

SkeletonWrapper.propTypes = {
    width: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    height: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    count: PropTypes.number,
    style: PropTypes.object,
};

export default SkeletonWrapper;