import axios from 'axios';

const RequestURL = process.env.REACT_APP_ROOTURL;

// const newToken ="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJiZTZldjFxNTBxWkg2d01NYWN2MENVX0RJeVdXeS1Kc1YwSld5c3RGSTBNIn0.eyJleHAiOjE2NzUyNzYwNDYsImlhdCI6MTY3NTI0MDA0NiwianRpIjoiM2FlOTA5YjktOGYxZC00NWY1LTkwNGYtNDc0MjM4ZDg3NjY5IiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMjAuMTc6ODA4MC9yZWFsbXMvYnVkZ2V0Iiwic3ViIjoiZTE0N2UyZGQtZThkYy00MTBlLWIwZTEtMzRlZDhiOGNlOWZjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicGlwIiwic2Vzc2lvbl9zdGF0ZSI6IjdhMjBiMWU1LThhNWMtNDE1ZS05MDM4LTg5NzJhNTNmODYyNCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovLzE5Mi4xNjguNDAuMTA2OjMwMDAiXSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiN2EyMGIxZTUtOGE1Yy00MTVlLTkwMzgtODk3MmE1M2Y4NjI0IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtYW4ifQ.LCTxm4Vjk_7etdhrV6OYnW2d9GXkxXBTeEUQHUOzTOdbflN2dvKukOG693RfeRHS3IwPovZsWQgCmFzVBULckBu1EhZvr4w0RVhdZi4gBEmMqhb8H-SgzWpw5OJB8IcySm7mwMUwHWhMY45CryH7gwMxPksbaSQ7UdO2g1neMMqtr9uMuipA4fPF51mNXnN54GFV-zUryB6w9goKaGScKdosloVR8nhK06MwS7RdzY5G7F_8Y1lCVXX4wzB4p0-FPsOthqCrqsJGlx9IG9MZX7Eo8kzhIR2jM2j9jTmpoFEUYGRK_B55ggProhGPJJQZdXQwzh_hjNDd5K6Ivd1Ynw"
export const instance = axios.create({
    baseURL: `http://192.168.40.43:8089`,
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Accept-Language': 'us'
        // ,
        // 'Authorization': `Bearer ${newToken}`
    }
});

async function addCategorie(categorie) {
    return instance
        .post(`/axeStrategique/`, categorie)
        .then((res) => res.data)
        .catch((err) => {
            throw err;
        });
}

async function getAllCategorie(params) {
    return instance
        .get(`/axeStrategique/`, {
            params: {
                sort: params ? `code,${params.sort}` : '',
                title: params ? params.title : '',
                page: params ? params.page : null,
                size: params ? params.size : null
            }
        })
        .then((res) => res.data)
        .catch((err) => {
            throw err;
        });
}

async function updateCategorie(axe, id) {
    return instance
        .put(`/axeStrategique/${id}`, axe)
        .then((res) => res.data)
        .catch((err) => {
            throw err;
        });
}
async function deleteCategorie(id) {
    return instance
        .delete(`/axeStrategique/${id}`)
        .then((res) => res.data)
        .catch((err) => {
            throw err;
        });
}

export const categorieApi = {
    addCategorie,
    getAllCategorie,
    updateCategorie,
    deleteCategorie
};
export const tt = {};
