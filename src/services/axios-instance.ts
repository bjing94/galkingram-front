import axios from "axios";
import axiosConfig from "../configuration/axios.config";

const axiosInstance = axios.create(axiosConfig);

export default axiosInstance;
