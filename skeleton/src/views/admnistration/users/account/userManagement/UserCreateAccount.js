import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { Box, Grid, Tab, Tabs, useTheme } from '@mui/material';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import AddUser from './adduser/addUser';
import AssignUser from './assignuser/assignUser';
import { FormattedMessage } from 'react-intl';

// tabs
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

const tabsOption = [
    {
        label: <FormattedMessage id="manager-user" />,
        icon: <Diversity3Icon sx={{ fontSize: '1.4rem' }} />
    },
    {
        label: <FormattedMessage id="assigned-user" />,
        icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    }
];
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

export default function UserCreateAccount() {
    const [value, setValue] = React.useState(0);
    const theme = useTheme();

    const userLocal = JSON.parse(window.localStorage.getItem('users'));

    React.useEffect(() => {}, [userLocal]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                        <AddUser />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <AssignUser />
                    </TabPanel>
                </Grid>
            </Grid>
        </MainCard>
    );
}
