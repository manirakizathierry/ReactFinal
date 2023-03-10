import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import FormFunctions from './FormFunctions';
import ListFunctions from './ListFunctions';

const Functions = () => {
    const [rowSelected, setRowSelected] = React.useState({});
    return (
        <Card elevation={2} sx={{ height: 400 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4">Functionrrrrs</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormFunctions rowSelected={rowSelected} setRowSelected={setRowSelected} />
                            </Grid>
                            <Grid item xs={12}>
                                <ListFunctions setRowSelected={setRowSelected} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={2} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Functions;
