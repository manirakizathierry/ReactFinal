import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { Box, Tab, Tabs } from '@mui/material';

// project imports
import Profile from './Profile';
import Security from './Security';
import MainCard from 'ui-component/cards/MainCard';

// tabs
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

const UserProfile = () => {
    const [value, setValue] = React.useState(0);

    const userLocal = JSON.parse(window.localStorage.getItem('users'));

    React.useEffect(() => {}, [userLocal]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainCard title="Account">
            <div>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    onChange={handleChange}
                    sx={{
                        mb: 3,
                        minHeight: 'auto',
                        '& button': {
                            minWidth: 100
                        },
                        '& a': {
                            minHeight: 'auto',
                            minWidth: 10,
                            py: 1.5,
                            px: 1,
                            mr: 2.25,
                            color: 'grey.600'
                        },
                        '& a.Mui-selected': {
                            color: 'primary.main'
                        }
                    }}
                    aria-label="simple tabs example"
                    variant="scrollable"
                >
                    <Tab component={Link} to="#" label="Profile" {...a11yProps(0)} />
                    <Tab component={Link} to="#" label="Security" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Profile userLocal={userLocal} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Security userLocal={userLocal} />
                </TabPanel>
            </div>
        </MainCard>
    );
};

export default UserProfile;
