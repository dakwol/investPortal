import BaseModelAPI from "../BaseModelAPI";
import apiConfig from "../apiConfig";
import axiosClient from "../axiosClient";
import { API_BRAND_MODEL } from "./const";

class BrandApiRequest extends BaseModelAPI {
    constructor() {
        super(API_BRAND_MODEL.url);
    }

}

export default BrandApiRequest;
