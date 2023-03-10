import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import DeleteDialog from 'ui-component/DeleteDialog';

const UserModalDelete = ({ modalDelete, handleCloseModal, handleSubmit }) => {
    return (
        <DeleteDialog
            btnName={<FormattedMessage id="delete" />}
            handleSubmit={handleSubmit}
            title={<FormattedMessage id="do-you-want-delete" />}
            open={modalDelete}
            handleClose={handleCloseModal}
        />
    );
};

export default UserModalDelete;
