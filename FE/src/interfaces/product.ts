export interface IProduct {
    _id: string,
    name: string,
    categoryId: string,
    price: number,
    original_price: number,
    description: string,
    images: { base_url: string }[],
    brand: { _id: string, name: string, slug: string },
    specifications: ISpecification[],
    short_description: string,

}

interface ISpecification {
    name: string,
    attributes: { code: string, value: string, name: string }[]
}
