import {HttpRequestHub} from "../httpRequestHub";


export const getUserMe = () => {
    const config = {
        method: "GET",
        url: `userme/`,
    };
    return HttpRequestHub(config);
};

export const getUsersApi = () => {
    const config = {
        method: "GET",
        url: `users/`,
    };
    return HttpRequestHub(config);
};

export const updateUserStatus = (id, status) => {
    const config = {
        method: "PUT",
        url: `users/${id}`,
        data: {
            status
        }
    };
    return HttpRequestHub(config);
}

export const deleteUserApi = (id) => {
    const config = {
        method: "DELETE",
        url: `users/${id}`
    };
    return HttpRequestHub(config);
}
