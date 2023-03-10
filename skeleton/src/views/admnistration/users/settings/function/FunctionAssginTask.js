import { useState, useEffect } from 'react';
import { TabPanel, a11yProps } from 'utils/tools';
import AddTaskIcon from '@mui/icons-material/AddTask';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import MainCard from 'ui-component/cards/MainCard';
import { Grid, Tab, Tabs, useTheme, Link, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';
import UserList from '../../account/UserList';
import AffectationList from '../../managerUser/position/AffectationList';
import { FormattedMessage } from 'react-intl';
import AssignedTask from '../assigned/AssignedTask';
import FunctionNew from './FunctionNew';
import { useSelector } from 'react-redux';

const tabsOption = [
    {
        label: <FormattedMessage id="add-function" />,
        icon: <FormatListNumberedIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: <FormattedMessage id="add-task" />,
        icon: <AddTaskIcon sx={{ fontSize: '1.3rem' }} />
    }
];

function FunctionAssginTask() {
    const theme = useTheme();
    const [value, setValue] = useState(0);
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
                        <FunctionNew />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <AssignedTask />
                    </TabPanel>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default FunctionAssginTask;
