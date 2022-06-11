import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PropTypes from "prop-types";

const AppPagination = (props) => {
    return (
        <Stack spacing={2}>
            <Pagination count={props.size} onChange={props.onPageChange} page={props.page}/>
        </Stack>
    )
}

AppPagination.propTypes = {
    size: PropTypes.number,
    page: PropTypes.number,
    onPageChange: PropTypes.func
}

export default AppPagination