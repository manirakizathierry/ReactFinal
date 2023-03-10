import axios from 'axios';

const RequestURL = process.env.REACT_APP_ROOTURL;

// const newToken ="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJiZTZldjFxNTBxWkg2d01NYWN2MENVX0RJeVdXeS1Kc1YwSld5c3RGSTBNIn0.eyJleHAiOjE2NzUzNjQxNDksImlhdCI6MTY3NTMyODE0OSwianRpIjoiMzFkM2M0NTgtM2Q2My00NTQ5LTgzZTYtY2FmNmJhZWY2Y2ZkIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMjAuMTc6ODA4MC9yZWFsbXMvYnVkZ2V0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImUxNDdlMmRkLWU4ZGMtNDEwZS1iMGUxLTM0ZWQ4YjhjZTlmYyIsInR5cCI6IkJlYXJlciIsImF6cCI6InBpcCIsInNlc3Npb25fc3RhdGUiOiIzMmE4ZTE2MC04Y2E5LTRjNGEtOGZjZC02ZjhmYTdhYjc5ZjkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly8xOTIuMTY4LjQwLjEwNjozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJyZWFsbS1yb2xlIiwib2ZmbGluZV9hY2Nlc3MiLCJhZG1pbiIsImRlZmF1bHQtcm9sZXMtYnVkZ2V0IiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiIzMmE4ZTE2MC04Y2E5LTRjNGEtOGZjZC02ZjhmYTdhYjc5ZjkiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6Im1hbiJ9.B-HETVkN7x46nnF8bzZGdgGbPKHB_SKhSaQCxU1azNI_efwlHd-6MWc28d035t9BpH5DB8a6iHcoMNaQ6nN4LXLiThoJ11djE1ZfnC_6rnaTjuLLOk02XPO0RnbuahzvS4yQlxHXX5A6S7rqnpFeOn7cwkMhRg0U_YmvdyW-bXXv2YFcMXBaDhCx2B2h283svHFSDfrFgu7mDlpPaCbzUTz41_G6APdk2KJh_hL21iuXQiltAfRitdCE1-uQ5hK4sXfZx86RqZa8bOui0MxUta-jvfkvvQ2MeOblq1YUuR9x6jJXvxbFZ3u4hjDWeVKXknuDK-yi1iGhCb_wXOTrJg"

export const instance = axios.create({
    baseURL: `http://192.168.40.43:8081`,
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Accept-Language': 'us'
        // ,
        // 'Authorization': `Bearer ${newToken}`
    }
});

async function addArticle(article) {
    return instance
        .post(`/objectif/`, article)
        .then((res) => res.data)
        .catch((err) => {
            throw err;
        });
}
async function updateArticle(article, id) {
    return instance
        .put(`/objectif/${id}`, article)
        .then((res) => res.data)
        .catch((err) => {
            throw err;
        });
}

async function getAllArticle(params) {
    return instance
        .get(`/objectif/`, {
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
async function deleteArticle(id) {
    return instance
        .delete(`/objectif/${id}`)
        .then((res) => res.data)
        .catch((err) => {
            throw err;
        });
}
async function getAllArticleActive() {
    return instance
        .get(`/objectif/actif/`)
        .then((res) => res.data)
        .catch((err) => {
            throw err;
        });
}

export const articleApi = {
    addArticle,
    updateArticle,
    getAllArticle,
    deleteArticle,
    getAllArticleActive
};
export const tt = {};
