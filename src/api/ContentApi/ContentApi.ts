import BaseModelAPI from "../BaseModelAPI";
import apiConfig from "../apiConfig";
import axiosClient from "../axiosClient";
import { API_CONTENT_MODEL } from "./const";

class ContentApiRequest extends BaseModelAPI {
    constructor() {
        super(API_CONTENT_MODEL.url);
    }

    async products<T>(urlParams?: any) {
        return this.makeRequest<T>(axiosClient.get, {method: API_CONTENT_MODEL.methods.products.url, urlParams: urlParams});
    }
    async productCategories<T>() {
        return this.makeRequest<T>(axiosClient.get, {method: API_CONTENT_MODEL.methods.productCategories.url});
    }
    async newsList<T>(urlParams?: any) {
        return this.makeRequest<T>(axiosClient.get, {method: API_CONTENT_MODEL.methods.newsList.url, urlParams: urlParams});
    }
}

export default ContentApiRequest;
