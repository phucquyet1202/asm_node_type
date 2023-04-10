import instance from ".";
import ICategory from "../interfaces/category";


export const getAllCate = () => {
    return instance.get("/category")
}

export const addCate = (cate: ICategory) => {
    return instance.post("/category", cate, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    })
}

export const getCateById = (id: string) => {
    return instance.get(`/category/${id}`)
}

export const deleteCate = (id: string) => {
    return instance.delete(`/category/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

export const editCate = (cate: ICategory, id: string) => {
    return instance.put(`/category/${id}`, cate, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}