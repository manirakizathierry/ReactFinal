import { Grid } from '@mui/material';
import Agences from './agences/Agences';
import AssignedTask from './assigned/AssignedTask';
// import Cellules from './cellules/Cellules';
import Department from './departments/Department';
import FunctionUser from './functions/FunctionUser';
import Services from './services/Services';

const UserSettings = () => {
    return (
        <Grid container spacing={2}>
            {/* <Grid item xs={12} md={6} lg={6} xl={6}>
                <Agences />
            </Grid> */}
            {/* <Grid item xs={12} md={6} lg={6} xl={6}>
                <Department />
            </Grid> */}
            <Grid item xs={12} md={6} lg={6} xl={6}>
                <Services />
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={6}>
                <FunctionUser />
            </Grid>
            <Grid item xs={12}>
                <AssignedTask />
            </Grid>
        </Grid>
    );
};

export default UserSettings;
