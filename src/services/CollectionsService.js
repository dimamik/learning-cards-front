import axios from "axios";
import HttpStatus from "@/shared/HttpStatus";
import AuthService from "@/services/AuthService";


export default {
    getAllCollections() {
        return axios.get("collections")
            .then(r => {
                if (r.status === HttpStatus.OK) {
                    return r.data;
                }
            })
            .catch(e => console.log(e));
    },

    getCollectionsByUser(userId) {
        return axios.get("collections/user/" + userId)
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

    getCurrentUserCollections() {
        // WARNING IS BROKEN IF NOT LOGGED IN
        return this.getCollectionsByUser(AuthService.current.userID)
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

    getCurrentUserFavourites() {
        // WARNING IS BROKEN IF NOT LOGGED IN
        return axios.get("current-user/favorite")
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