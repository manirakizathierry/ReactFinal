import { Add, Print, Refresh } from "@mui/icons-material";
import { Grid, Stack } from "@mui/material";
import { categorieApi } from "api/gestionCommerciale/categorie/categorieApi";
import {useEffect, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { SNACKBAR_OPEN } from "store/actions";
import ButtonComponent from "ui-component/ButtonComponent";
import MainCard from "ui-component/cards/MainCard";
import ListSearchComponent from "ui-component/ListSearchComponent";
import TablesCustomizedComponent from "ui-component/TablesCustomizedComponent";
import TypographyListDescription from "ui-component/TypographyListDescription";
import TypographyListHeader from "ui-component/TypographyListHeader";

import PdfCustom from "views/pdf/PdfCustom";
import TableToPrint from "views/pdf/TableToPrint";

export default function Categorie(){
    const dispatch = useDispatch();
    const intl = useIntl();
    const [loading, setLoading] = useState(false);
    const [openSpinnerLoader, setOpenSpinnerLoader] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [searchVal, setSearchVal] = useState('');
    const [blackLabel, setBlackLabel] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [categorieArray, setCategorieArray] = useState([]);
    const [tableToExport, setTableToExport] = useState('');
    const [loadingError, setLoadingError] = useState(false);
    const [page, setPage] = useState({ title: '', page: 0, size: 10, length: 1, totalItems: 0 });
    const componentRef = useRef(null);
    const [gridSpacing,setGridSping]=useState(false);
   
    const [categorieToEdit, setCategorieToEdit] = useState({
        code: '',
        libelle: '',
        dateDebut: null,
        dateFin: null
    });
    const title = <FormattedMessage id="list-axis" />;

        // table header
        const headers = [
            `${intl.formatMessage({ id: 'code' })}`,
            `${intl.formatMessage({ id: 'libelle' })}`,
            `${intl.formatMessage({ id: 'start-dat' })}#center`,
            `${intl.formatMessage({ id: 'end-date' })}#center`
        ];

        const onGetAllCategorie = (pages) => {
            if (pages) {
                setPage(pages);
            }
    
            setLoading(true);
            setLoadingError(false);
            setCategorieArray([]);
            categorieApi
                .getAllCategorie(pages !== undefined ? pages : page)
                .then((res) => {
                    console.log('res====>>', res);
                    setCategorieArray(res.data.contents);
                    setPage({
                        ...page,
                        size: pages !== undefined ? pages.size : page.size,
                        page: res.data.currentPage,
                        length: res.data.totalPages,
                        totalItems: res.data.totalItems,
                        sort: pages !== undefined ? pages.sort : page.sort
                        // title:pages!==undefined?
                    });
                    setLoading(false);
                })
                .catch((error) => {
                    console.log('res====>>', error);
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: `${error.response?.data.message ? error.response.data.message : error.message}`,
                        variant: 'alert',
                        alertSeverity: 'error',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        close: true
                    });
                    setLoading(false);
                    setLoadingError(true);
                });
        };

        const handleClickOpenCreateOrEditDialog = (categorie) => {
            if (categorie) {
                const updateData = categorieArray.find((categorieUpdate) => categorieUpdate.id === categorie.id);
                console.log('update====>>', updateData);
                setCategorieToEdit({
                    id: updateData.id,
                    code: updateData.code,
                    libelle: updateData.libelle,
                    startDate: updateData.dateDebutS,
                    endDate: updateData.dateFinS ? updateData.dateFinS : null
                });
            } else {
                setCategorieToEdit({
                    code: '',
                    libelle: '',
                    startDate: null,
                    endDate: null
                });
            }
    
            setOpenDialog(true);
        };

        const handleClickCloseCreateOrEditDialog = (categorie) => {
            if (categorie) {
                onGetAllCategorie();
            }
            setCategorieToEdit({
                code: '',
                libelle: '',
                startDate: null,
                endDate: null
            });

        }      
    // table paginate
    const paginate = (e, values) => {
        onGetAllCategorie({
            ...page,
            page: values - 1
        });
    };

    const handleSort = () => {
        onGetAllCategorie({
            ...page,
            sort: page?.sort === 'asc' ? 'desc' : 'asc'
        });
    };

    const getSearchData = () => {
        onGetAllCategorie({
            ...page,
            page: 0,
            size: 10,
            title: searchVal
        });
    };
    // console.log(searchVal);

    const handleSearch = (searchVal) => {
        if (searchVal === '') getSearchData();
        setSearchVal(searchVal.target.value.trim());
    };

    const handlePrint = useReactToPrint({
        content: () => {
            const tableStat = componentRef.current;
            const PrintElem = document.createElement('div');
            PrintElem.appendChild(tableStat);
            return PrintElem;
        }
    });

    const closeModal = () => {
        setOpenDialog(false);
        setCategorieToEdit({
            code: '',
            libelle: '',
            dateDebut: null,
            dateFin: null
        });
    };
    
    const handleChangeRowsPerPage = (e) => {
        const value = e.target.value;

        onGetAllCategorie({
            ...page,
            size: value,
            page: 0
        });
    };
    const handlecloseModale = () => {
        setOpenDeleteModal(false);
        setCategorieToEdit({
            code: '',
            libelle: '',
            dateDebut: null,
            dateFin: null
        });
    };
    const handleDeleteItem = (data) => {
        setOpenDeleteModal(true);
        setCategorieToEdit(data);
    };
    const handleDeleteItemFunction = () => {
        setOpenSpinnerLoader(true);
        categorieApi
            .deleteCategorie(categorieToEdit.id)
            .then((res) => {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: res.message,
                    variant: 'alert',
                    alertSeverity: 'success',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    close: true
                });

                onGetAllCategorie();
                setCategorieToEdit({
                    code: '',
                    libelle: '',
                    startDate: null,
                    endDate: null
                });
                setOpenSpinnerLoader(false);
                setOpenDeleteModal(false);
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: `${error.response?.data.message ? error.response.data.message : error.message}`,
                    variant: 'alert',
                    alertSeverity: 'error',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    close: true
                });

                setOpenSpinnerLoader(false);
            });
    };

    function displayArrangedData() {
        return categorieArray
            ? categorieArray.map((categorie) => ({
                  id: categorie.id,
                  code: categorie.code,
                  libelle: categorie.libelle,
                  dateDebut: `${categorie.dateDebutS}#right`,
                  dateFin: categorie.dateFinS ? `${categorie.dateFinS}#right` : null
              }))
            : [];
    }
    useEffect(() => {
        onGetAllCategorie();
    }, []);
    
    
    return(
        <>
            <div style={{ display: 'none' }}>
                <TableToPrint ref={componentRef} title={title} body={<PdfCustom headers={headers} rows={categorieArray} />} />
            </div>
            <Grid container spacing={1}>
                <Grid item xs={12} lg={12}>
                    <TypographyListHeader text={<FormattedMessage id="categorie" />} />
                    <TypographyListDescription text={<FormattedMessage id="axis-descri" />} />
                </Grid>
                <Grid item xs={12} lg={12} mb={-1}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <ListSearchComponent
                                    setFilterValue={setSearchVal}
                                    filterValue={searchVal}
                                    filter={getSearchData}
                                    loading={loading}
                                    handleChange={handleSearch}
                                />
                                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                    {!loadingError && (
                                        <ButtonComponent
                                            refresh
                                            startIcon={<Refresh />}
                                            text={<FormattedMessage id="refresh" />}
                                            handleClick={() => {
                                                setPage((p) => ({ ...p, code: '', page: 0, size: 10 }));
                                                onGetAllCategorie();
                                                setSearchVal('');
                                            }}
                                            size="small"
                                        />
                                    )}
                                    <ButtonComponent
                                        startIcon={<Print />}
                                        text={<FormattedMessage id="print" />}
                                        handleClick={handlePrint}
                                        size="small"
                                        variant="contained"
                                        disabled={loading || loadingError || categorieArray?.length < 1}
                                    />

                                    <ButtonComponent
                                        startIcon={<Add />}
                                        text={<FormattedMessage id="add-axe-strategique" />}
                                        handleClick={() => handleClickOpenCreateOrEditDialog()}
                                        size="small"
                                        variant="contained"
                                        disabled={loading || loadingError || categorieArray?.length < 1}
                                    />
                                </Stack>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            {!loadingError ? (
                                <TablesCustomizedComponent
                                    sort={[0]}
                                    rows={displayArrangedData()}
                                    setTableToExport={setTableToExport}
                                    headers={headers}
                                    loading={loading}
                                    handleSort={handleSort}
                                    page={page}
                                    actions
                                    editFunction={handleClickOpenCreateOrEditDialog}
                                    deleteFunction={handleDeleteItem}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    paginate={paginate}
                                    stickyHeader
                                />
                            ) : (
                                <MainCard>
                                    <Stack justifyContent="center" alignItems="center">
                                        <ButtonComponent
                                            startIcon={<Refresh />}
                                            text={<FormattedMessage id="refresh" />}
                                            handleClick={() => onGetAllCategorie()}
                                            size="small"
                                            variant="contained"
                                            // disabled={loading || loadingError || axeStrategiqueArray?.length > 1}
                                        />
                                    </Stack>
                                </MainCard>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <AddNewAxeStrategique
                open={openDialog}
                handleSubmit={handleClickCloseCreateOrEditDialog}
                axeToEdit={categorieToEdit}
                closeModal={closeModal}
                // snackAlert={snackAlert}
            />

        </>

    );
}
