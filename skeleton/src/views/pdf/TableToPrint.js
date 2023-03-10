import React from 'react';
import Header from './Header';
import PropTypes from 'prop-types';
import './style.css';

const TableToPrint = React.forwardRef((props, ref) => (
    <div ref={ref}>
        <Header title={props?.title} />
        <div className="contentBody">{props?.body}</div>
    </div>
));

TableToPrint.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.node.isRequired
};

export default TableToPrint;
