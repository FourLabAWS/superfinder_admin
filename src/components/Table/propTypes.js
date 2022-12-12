import PropTypes from 'prop-types';
import { EnhancedTableHead, EnhancedTableToolbar } from './TableMethods';

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
