import axios from "axios";

const API_URL = "https://localhost:7061/api/Login";

export const loginUser = async (loginData) => {
    const response = await axios.post(
        `${API_URL}/login`,
        loginData
    );

    return response.data;
};

