import { Add, Print, Refresh } from "@mui/icons-material";
import { Grid, Stack } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import PdfCustom from "views/pdf/PdfCustom";
import ButtonComponent from "ui-component/ButtonComponent";
import MainCard from "ui-component/cards/MainCard";
import ListSearchComponent from "ui-component/ListSearchComponent";
import TablesCustomizedComponent from "ui-component/TablesCustomizedComponent";
import TypographyListDescription from "ui-component/TypographyListDescription";
import TypographyListHeader from "ui-component/TypographyListHeader";
import TableToPrint from "views/pdf/TableToPrint"; 
import { useEffect, useRef ,useState} from "react";
import { SNACKBAR_OPEN } from "store/actions";
import { useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { articleApi } from "api/gestionCommerciale/article/articleApi";

export default function Index(){

    const componentRef = useRef(null);
    const title = <FormattedMessage id="list-axis" />;
    const intl = useIntl();
    const dispatch = useDispatch();

    const headers = [
        `${intl.formatMessage({ id: 'code' })}`,
        `${intl.formatMessage({ id: 'libelle' })}`,
        `${intl.formatMessage({ id: 'start-dat' })}#center`,
        `${intl.formatMessage({ id: 'end-date' })}#center`
    ];

    const [articleArray, setArticleArray] = useState([]);
    const [gridSpacing,setGridSping]=useState(false);
    const [searchVal,setSearchVal]=useState(false);
    const [loading,setLoading]=useState(false);
    const [loadingError,setLoadingError]=useState(false);
    const [openDialog,setOpenDialog]=useState(false);
    const [openDeleteModal,setOpenDeleteModal]=useState(false);
    const [openSpinnerLoader,setOpenSpinnerLoader]=useState(false);
    const [tableToExport, setTableToExport] = useState('');
    const [articleToEdit,setArticleToEdit]=useState({
        axeStrategique: null,
        titleBudgetaire: null,
        code: '',
        libelle: '',
        startDate: null,
        endDate: null
    })

    const [page, setPage] = useState({ title: '', page: 0, size: 10, length: 1, totalItems: 0 });

    const onGetAllArticle = (pages) => {
        if (pages) {
            setPage(pages);
        }

        setLoading(true);
        setLoadingError(false);
        setArticleArray([]);
        articleApi
            .getAllCategorie(pages !== undefined ? pages : page)
            .then((res) => {
                console.log('res====>>', res);
                setArticleArray(res.data.contents);
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

      // table paginate
      const paginate = (e, values) => {
        onGetAllArticle({
            ...page,
            page: values - 1
        });
    };

    const handleSort = () => {
        onGetAllArticle({
            ...page,
            sort: page?.sort === 'asc' ? 'desc' : 'asc'
        });
    };

    const getSearchData = () => {
        onGetAllArticle ({
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
        setArticleToEdit({
        axeStrategique: null,
        titleBudgetaire: null,
        code: '',
        libelle: '',
        startDate: null,
        endDate: null
        });
    };
    
    const handleChangeRowsPerPage = (e) => {
        const value = e.target.value;

        onGetAllArticle({
            ...page,
            size: value,
            page: 0
        });
    };
    const handlecloseModale = () => {
        setOpenDeleteModal(false);
        setArticleToEdit({
            axeStrategique: null,
            titleBudgetaire: null,
            code: '',
            libelle: '',
            startDate: null,
            endDate: null        });
    };
    const handleDeleteItem = (data) => {
        setOpenDeleteModal(true);
        setArticleToEdit(data);
    };

    const handleDeleteItemFunction = () => {
        setOpenSpinnerLoader(true);
        articleApi
            .deleteArticle(articleToEdit.id)
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

                onGetAllArticle();
                setArticleToEdit({
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
        return articleArray
            ? articleArray.map((article) => ({
                  id: article.id,
                  axeStrategique:article.axeStrategique,
                  titleBudgetaire:article.titleBudgetaire,
                  code: article.code,
                  libelle: article.libelle,
                  dateDebut: `${article.dateDebutS}#right`,
                  dateFin: article.dateFinS ? `${article.dateFinS}#right` : null
              }))
            : [];
    }
    useEffect(() => {
        onGetAllArticle();
    }, []);

    const handleClickOpenCreateOrEditDialog = (article) => {
        if (article) {
            const updateData = articleArray.find((articleUpdate) => articleUpdate.id === article.id);
            console.log('update====>>', updateData);
            setArticleToEdit({
                id: updateData.id,
                code: updateData.code,
                libelle: updateData.libelle,
                startDate: updateData.dateDebutS,
                endDate: updateData.dateFinS ? updateData.dateFinS : null
            });
        } else {
            setArticleToEdit({
                code: '',
                libelle: '',
                startDate: null,
                endDate: null
            });
        }

        setOpenDialog(true);
    };
       


 return(
        <>
            <div style={{ display: 'none' }}>
                <TableToPrint ref={componentRef} title={title} body={<PdfCustom headers={headers} rows={articleArray} />} />
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
                                                onGetAllArticle()
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
                                        disabled={loading || loadingError || articleArray?.length < 1}
                                    />

                                    <ButtonComponent
                                        startIcon={<Add />}
                                        text={<FormattedMessage id="add-axe-strategique" />}
                                        handleClick={() => handleClickOpenCreateOrEditDialog()}
                                        size="small"
                                        variant="contained"
                                        disabled={loading || loadingError || articleArray?.length < 1}
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
                                            handleClick={() => onGetAllArticle()}
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
          

        </>

    );
}