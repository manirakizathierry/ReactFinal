import { Grid, Tab, Tabs, useTheme, Link } from '@mui/material';
import React, { useState } from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import { TabPanel, a11yProps } from './TapPanel';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import { FormattedMessage } from 'react-intl';
import UserList from './account/UserList';
import AffectationList from './position/AffectationList';
import { useDispatch } from 'react-redux';
// import { UserManager } from 'api/life/userManager/UserManager';
import { getAllAgence, getAllservice, getAlldepartement, getAllFonction } from 'store/userManagement/actionAgeDepSerFxTach/action';

// tabs option
const tabsOption = [
    {
        label: <FormattedMessage id="manager-user" />,
        icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: <FormattedMessage id="assigned-user" />,
        icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    }
];

export default function AccountAffectation() {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const onGetAllAgence = () => {
    //     UserManager.getAllAgenceApi()
    //         .then((res) => {
    //             console.log(res.result);
    //             dispatch(getAllAgence(res.result));
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };
    // const onGetAllDepartement = () => {
    //     UserManager.getAlldepartementApi()
    //         .then((res) => {
    //             console.log(res.result);
    //             dispatch(getAlldepartement(res.result));
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    // const onGetAllFonction = () => {
    //     UserManager.getAllFonctionApi()
    //         .then((res) => {
    //             console.log(res.result);
    //             dispatch(getAllFonction(res.result));
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };
    // const onGetAllService = () => {
    //     UserManager.getAllServiceApi()
    //         .then((res) => {
    //             console.log(res.result);
    //             dispatch(getAllservice(res.result));
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };
    const jwtken = window.localStorage.getItem('jwtToken');

    // React.useEffect(() => {
    //     onGetAllAgence();
    //     onGetAllDepartement();
    //     onGetAllFonction();
    //     onGetAllService();
    // }, []);

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
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <AffectationList />
                    </TabPanel>
                </Grid>
            </Grid>
        </MainCard>
    );
}
