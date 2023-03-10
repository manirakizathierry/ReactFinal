import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Tab, Tabs, Tooltip, Fab } from '@mui/material';

// project imports
import Profile from './Profile';
import CreateUser from './CreateUser';
// import PersonalAccount from './PersonalAccount';
// import MyAccount from './MyAccount';
// import ChangePassword from './ChangePassword';
// import Settings from './Settings';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
// import * as userAPI from 'api/userAPI';

// assets
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import UserList from './UserList';
import AddIcon from '@mui/icons-material/AddTwoTone';
import Position from '../positions/index';
import UserSettings from '../settings/UserSettings';
import { getUserArch } from 'api/userAPI';
import { connect, useDispatch } from 'react-redux';

// tabs panel
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// tabs option
const tabsOption = [
    {
        label: 'Gérer les utilisateurs',
        icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Affectation utilisateur',
        icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    }
];
// ==============================|| PROFILE 1 ||============================== //

const Account = ({ getUserArch }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        const tab = ['agence', 'departement', 'service', 'fonction', 'tache'];
        for (let i = 0; i < tab.length; i += 1) {
            // console.log(tab[i]);
            getUserArch(tab[i]);
        }
    }, []);

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="simple tabs example"
                        variant="scrollable"
                        sx={{
                            mb: 3,
                            '& a': {
                                minHeight: 'auto',
                                minWidth: 10,
                                py: 1.5,
                                px: 1,
                                mr: 2.25,
                                color: theme.palette.grey[600],
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            },
                            '& a.Mui-selected': {
                                color: theme.palette.primary.main
                            },
                            '& .MuiTabs-indicator': {
                                bottom: 2
                            },
                            '& a > svg': {
                                marginBottom: '0px !important',
                                mr: 1.25
                            }
                        }}
                    >
                        {tabsOption.map((tab, index) => (
                            <Tab key={index} component={Link} to="#" icon={tab.icon} label={tab.label} {...a11yProps(index)} />
                        ))}
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <UserList />
                        {/* <CreateUser /> */}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Position />
                    </TabPanel>
                </Grid>
            </Grid>
        </MainCard>
    );
};

Account.propTypes = {
    getUserArch: PropTypes.func.isRequired
};

export default connect(null, { getUserArch })(Account);
