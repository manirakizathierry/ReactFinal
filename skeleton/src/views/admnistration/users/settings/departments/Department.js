import { Grid, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import HeaderComponent from 'ui-component/HeaderComponent';
import FormDepartment from './FormDepartment';
import ListDepartment from './ListDepartment';
import MainCard from 'ui-component/cards/MainCard';
import { Search } from '@mui/icons-material';

const Department = () => {
    const [rowSelected, setRowSelected] = React.useState({});
    return (
        <>
            <HeaderComponent header="departments" />
            <MainCard sx={{ mt: 1 }}>
                <Grid item xs={12}>
                    <FormDepartment rowSelected={rowSelected} setRowSelected={setRowSelected} />
                </Grid>
            </MainCard>
            <MainCard
                sx={{ mt: 1 }}
                title={
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search fontSize="small" />
                                </InputAdornment>
                            )
                        }}
                        onChange={(e) => console.log(e.target.value)}
                        placeholder="Rechercher"
                        // value={search}
                        size="small"
                    />
                }
            >
                <Grid item xs={12}>
                    <ListDepartment setRowSelected={setRowSelected} />
                </Grid>
            </MainCard>
        </>
    );
};

export default Department;
