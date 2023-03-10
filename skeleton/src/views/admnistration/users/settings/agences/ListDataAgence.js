import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import MainCard from 'ui-component/cards/MainCard';
import { StyledTableCell, StyledTableRow, WarningMessage } from 'utils/tools';

export default function ListDataAgence() {
    const [arrayLast, setArrayLast] = useState([]);
    const intl = useIntl();
    return (
        <>
            <MainCard>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">No</StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormattedMessage id="amount-withdraw" />
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <FormattedMessage id="date-operation" />
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {arrayLast.length === 0 ? (
                                <StyledTableCell colSpan={4}>
                                    <WarningMessage message={<FormattedMessage id="aucune-donnee" />} type="info" />
                                </StyledTableCell>
                            ) : (
                                arrayLast.map((data, index) => (
                                    <StyledTableRow hover key={index}>
                                        <StyledTableCell align="left">{index + 1}</StyledTableCell>
                                        <StyledTableCell align="right">{data?.montant.toLocaleString(intl.locale)}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            {new Date(data?.dateRetrait).toLocaleDateString(intl.locale)}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </MainCard>
        </>
    );
}
