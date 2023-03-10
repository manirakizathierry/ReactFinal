import { Grid, Stack, Typography } from '@mui/material';
import Moment from 'moment';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import logo from '../../assets/images/Coat_of_arms_of_Burundi.svg.png';

function Header({ title }) {
    const date = new Date().toISOString();
    return (
        <Grid container spacing={0} direction="column">
            <Grid item xs={2} className="date">
                <Stack alignItems="flex-end">{Moment(date).format('MMMM Do, YYYY')}</Stack>

                <Grid container style={{ width: '40%' }} direction="column" spacing={-1} alignItems="center">
                    {/* <img src="http://www.africa2trust.com/wba/Logos/ASR27884374.gif" alt="logo" style={{ width: 50 }} /> */}
                    <Grid item>
                        <img src={logo} alt="Coatn of arms of Burundi" style={{ width: 50 }} />
                    </Grid>
                    <Grid item>
                        <h3 style={{ textAlign: 'center', margin: '0px auto', display: 'block' }}>
                            {' '}
                            <FormattedMessage id="republic-of-burundi" />
                        </h3>
                        <h5 style={{ textAlign: 'center', margin: '0px auto', display: 'block' }}>
                            <FormattedMessage id="minister-finance-budget" />
                        </h5>
                    </Grid>
                </Grid>
            </Grid>
            <Grid className="titleContainer" item xs={12}>
                <Typography style={{ fontSize: '20px' }} display="inline" className="title">
                    {title}
                </Typography>
            </Grid>
        </Grid>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired
};

export default Header;
