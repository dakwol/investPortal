import BaseModelAPI from "../BaseModelAPI";
import apiConfig from "../apiConfig";
import axiosClient from "../axiosClient";
import { API_CATEGORIES_MODEL } from "./const";

class CategoriesApiRequest extends BaseModelAPI {
    constructor() {
        super(API_CATEGORIES_MODEL.url);
    }

    async productCategories<T>() {
        return this.makeRequest<T>(axiosClient.get, {method: API_CATEGORIES_MODEL.methods.categories.url});
    }
}

export default CategoriesApiRequest;
