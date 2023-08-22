import { IProduct } from "../interfaces/product"
import instance from "./index"

export const getAll = () => {
    return instance.get("/products")
}

export const addProduct = (product: IProduct) => {
    return instance.post("/products", product, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    })
}

export const getById = (id: string) => {
    return instance.get(`/products/${id}`)
}

export const deleProduct = (id: string) => {
    return instance.delete(`/products/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

export const editProduct = (product: IProduct, id: string) => {
    return instance.put(`/products/${id}`, product, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}