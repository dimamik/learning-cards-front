import axios from "axios";
import HttpStatus from "@/shared/HttpStatus";
import AuthService from "@/services/AuthService";


export default {
    getAllCollections(page) {
        return axios.get("collections", { params: { page, size: 10 } })
            .then(r => {
                if (r.status === HttpStatus.OK) {
                    return r.data;
                }
            })
            .catch(e => console.log(e));
    },

    getCollectionsByUser(userId, page) {
        return axios.get("collections/user/" + userId, { params: { page, size: 10 } })
            .then(r => {
                if (r.status === HttpStatus.OK) {
                    return r.data;
                }
            })
            .catch(e => console.log(e));
    },

    getSingleCollection(collectionId) {
        return axios.get("collections/" + collectionId)
            .then(r => {
                if (r.status === HttpStatus.OK) {
                    return r.data;
                }
            })
            .catch(e => console.log(e));
    },

    getCurrentUserCollections(page) {
        return this.getCollectionsByUser(AuthService.current.userID, page)
    },

    addCollection(collectionDescription, collectionName) {
        return axios.post(
            "current-user/collections",
            {collectionDescription, collectionName}
        ).then(r => {
            if (r.status === HttpStatus.OK) {
                return r.data;
            }
        }).catch(e => console.log(e));
    },

    deleteCollection(collection_id) {
        return axios.delete(
            "current-user/collections",
            {data: {collection_id}}
        ).then(r => {
            if (r.status === HttpStatus.OK) {
                return r.data;
            }
        }).catch(e => console.log(e));
    },

    getCurrentUserFavourites(page) {
        // WARNING IS BROKEN IF NOT LOGGED IN
        return axios.get("current-user/favorite", { params: { page, size: 10 } })
            .then(r => {
                if (r.status === HttpStatus.OK) {
                    return r.data;
                }
            })
            .catch(e => console.log(e));
    },
//    /current-user/favorite/<collection_id>

    addCollectionToUserFavourites(collectionId) {
        return axios.post(
            "current-user/favorite/" + collectionId,
        ).then(r => {
            if (r.status === HttpStatus.OK) {
                return r.data;
            }
        }).catch(e => console.log(e));
    },

    deleteCollectionFromUserFavourites(collectionId) {
        return axios.delete(
            "current-user/favorite/" + collectionId,
        ).then(r => {
            if (r.status === HttpStatus.OK) {
                return r.data;
            }
        }).catch(e => console.log(e));
    },

    addCardToCollection(collectionId, cardInside) {
        return axios.post(
            "collections/" + collectionId,
            {cardInside}
        ).then(r => {
            if (r.status === HttpStatus.OK) {
                return r.data;
            }
        }).catch(e => console.log(e));
    },

    deleteCardFromCollection(collectionId, cardID) {
        return axios.delete(
            "collections/" + collectionId,
            {data: {cardID}}
        ).then(r => {
            if (r.status === HttpStatus.OK) {
                return r.data;
            }
        }).catch(e => console.log(e));
    },
}