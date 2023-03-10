import PropTypes from "prop-types";
import { useState } from "react";
import { lazy } from "react";
import { useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
     Box,
     Button,
     Grid,
     Stack,
     Tab,
     Tabs,
     TextField,
     Typography,
} from "@mui/material";

// project imports
import { gridSpacing } from "store/constant";
import SubCard from "ui-component/cards/SubCard";
// import TableCustomized from "views/forms/tables/TablesCustomized";

//components
import Loadable from "ui-component/Loadable";

// assets
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import CreditCardTwoToneIcon from "@mui/icons-material/CreditCardTwoTone";
import VpnKeyTwoToneIcon from "@mui/icons-material/VpnKeyTwoTone";
import Add from "@mui/icons-material/Add";

const ChartAccountDetails = Loadable(
     lazy(() => import("views/forms/tables/TablesCustomized"))
);

// tab content
function TabPanel({ children, value, index, ...other }) {
     return (
          <div
               role="tabpanel"
               hidden={value !== index}
               id={`vertical-tabpanel-${index}`}
               aria-labelledby={`vertical-tab-${index}`}
               {...other}
          >
               {value === index && (
                    <Box
                         sx={{
                              p: 0,
                         }}
                    >
                         {children}
                    </Box>
               )}
          </div>
     );
}

TabPanel.propTypes = {
     children: PropTypes.node,
     index: PropTypes.any.isRequired,
     value: PropTypes.any.isRequired,
};

function a11yProps(index) {
     return {
          id: `vertical-tab-${index}`,
          "aria-controls": `vertical-tabpanel-${index}`,
     };
}

// ================================// STATIC DATA//=================================//

const Datas = [
     {
          id: 1,
          name: "Capital",
          details: [
               {
                    id: 1,
                    category: "Sells",
                    number: 12001,
                    shownName: "Capital 1",
                    included: true,
               },
               {
                    id: 2,
                    category: "Buy",
                    number: 12005,
                    shownName: "Capital 2",
                    included: false,
               },
          ],
     },
     {
          id: 2,
          name: "Real Estate",
          details: [
               {
                    id: 1,
                    category: "Computers",
                    number: 20001,
                    shownName: "Estate",
                    included: true,
               },
          ],
     },
     {
          id: 3,
          name: "Inventory",
          details: [
               {
                    id: 1,
                    category: "Stock",
                    number: 30002,
                    shownName: "Real stock",
                    included: true,
               },
          ],
     },
     {
          id: 4,
          name: "Third Party",
          details: [
               {
                    id: 1,
                    category: "",
                    number: "",
                    shownName: "",
                    included: true,
               },
          ],
     },
     {
          id: 5,
          name: "Financial",
          details: [
               {
                    id: 1,
                    category: "",
                    number: "",
                    shownName: "",
                    included: false,
               },
          ],
     },
     {
          id: 6,
          name: "Expenses",
          details: [
               {
                    id: 1,
                    category: "",
                    number: "",
                    shownName: "",
                    included: true,
               },
          ],
     },
     {
          id: 7,
          name: "Products",
          details: [
               {
                    id: 1,
                    category: "",
                    number: "",
                    shownName: "",
                    included: false,
               },
          ],
     },
     {
          id: 8,
          name: "special accounts",
          details: [
               {
                    id: 1,
                    category: "",
                    number: "",
                    shownName: "",
                    included: true,
               },
          ],
     },
];

// ================================|| UI TABS - VERTICAL ||================================ //

export default function VerticalTabs() {
     const theme = useTheme();
     const customization = useSelector((state) => state.customization);

     const [value, setValue] = useState(0);
     const handleChange = (event, newValue) => {
          setValue(newValue);
     };

     return (
          <div>
               <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={4} md={3}>
                         <Tabs
                              value={value}
                              onChange={handleChange}
                              orientation="vertical"
                              variant="scrollable"
                              sx={{
                                   "& .MuiTabs-flexContainer": {
                                        borderBottom: "none",
                                   },
                                   "& button": {
                                        borderRadius: `${customization.borderRadius}px`,
                                        color:
                                             theme.palette.mode === "dark"
                                                  ? theme.palette.grey[600]
                                                  : theme.palette.grey[600],
                                        minHeight: "auto",
                                        minWidth: "100%",
                                        py: 1.5,
                                        px: 2,
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "flex-start",
                                        textAlign: "left",
                                        justifyContent: "flex-start",
                                   },
                                   "& button.Mui-selected": {
                                        color: theme.palette.primary.main,
                                        background:
                                             theme.palette.mode === "dark"
                                                  ? theme.palette.dark.main
                                                  : theme.palette.grey[50],
                                   },
                                   "& button > svg": {
                                        marginBottom: "0px !important",
                                        marginRight: 1.25,
                                        marginTop: 1.25,
                                        height: 20,
                                        width: 20,
                                   },
                                   "& button > div > span": {
                                        display: "block",
                                   },
                                   "& > div > span": {
                                        display: "none",
                                   },
                              }}
                         >
                              {Datas.map((item) => (
                                   <Tab
                                        id={item.id}
                                        icon={<PersonOutlineTwoToneIcon />}
                                        label={
                                             <Grid container direction="column">
                                                  <Typography
                                                       variant="subtitle1"
                                                       color="inherit"
                                                  >
                                                       {item.name}
                                                  </Typography>
                                                  <Typography
                                                       component="div"
                                                       variant="caption"
                                                       sx={{
                                                            textTransform:
                                                                 "capitalize",
                                                       }}
                                                  >
                                                       Update Profile Security
                                                  </Typography>
                                             </Grid>
                                        }
                                        {...a11yProps(item.id)}
                                   />
                              ))}
                         </Tabs>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                         {Datas.map((item) => (
                              <TabPanel
                                   //    id={item.id}
                                   value={value}
                                   index={item.id - 1}
                              >
                                   <SubCard>
                                        <Stack spacing={gridSpacing}>
                                             <Stack
                                                  spacing={2}
                                                  direction="row"
                                                  alignContent="center"
                                                  justifyContent="flex-end"
                                             >
                                                  <TextField
                                                       id="search-zone"
                                                       label="Search ..."
                                                  />
                                                  <Button
                                                       variant="contained"
                                                       startIcon={<Add />}
                                                       sx={{
                                                            background:
                                                                 theme.palette
                                                                      .success
                                                                      .dark,
                                                            "&:hover": {
                                                                 background:
                                                                      theme
                                                                           .palette
                                                                           .success
                                                                           .main,
                                                            },
                                                       }}
                                                  >
                                                       New Account
                                                  </Button>
                                             </Stack>
                                             <ChartAccountDetails
                                                  title={item.name}
                                                  data={item.details}
                                             />
                                        </Stack>
                                   </SubCard>
                              </TabPanel>
                         ))}
                    </Grid>
               </Grid>
          </div>
     );
}
