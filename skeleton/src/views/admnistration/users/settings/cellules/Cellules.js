import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import FormCellules from './FormCellules';
import ListCellules from './ListCellules';

const Cellules = () => {
    const [rowSelected, setRowSelected] = React.useState({});
    return (
        <Card elevation={2} sx={{ height: 400 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Cellules</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormCellules rowSelected={rowSelected} setRowSelected={setRowSelected} />
                    </Grid>
                    <Grid item xs={12}>
                        <ListCellules setRowSelected={setRowSelected} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Cellules;
