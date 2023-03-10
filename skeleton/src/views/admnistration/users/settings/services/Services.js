import { Search } from '@mui/icons-material';
import { Grid, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import HeaderComponent from 'ui-component/HeaderComponent';
import FormServices from './FormServices';
import ListServices from './ListServices';

const Services = () => {
    const [rowSelected, setRowSelected] = React.useState({});
    return (
        <>
            <HeaderComponent header="service" />
            <MainCard sx={{ mt: 1 }}>
                <Grid item xs={12}>
                    <FormServices rowSelected={rowSelected} setRowSelected={setRowSelected} />
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
                    <ListServices setRowSelected={setRowSelected} />
                </Grid>
            </MainCard>
        </>
    );
};

export default Services;
