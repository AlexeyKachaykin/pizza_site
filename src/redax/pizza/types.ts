

export type Pizza = {
    id: string;
    title: string;
    price: number;
    types: number[];

    imageUrl: string;
    sizes: number[];
}
export enum Status {
    LOADING = 'loading',
    SUCCESS = "success",
    ERROR = "error",
}
export interface PizzaSliceState {
    items: Pizza[];
    status: Status
};
export type SearchPizzaParams = {
    sortBy: string, order: string, category: string, search: string, currentPage: string
}