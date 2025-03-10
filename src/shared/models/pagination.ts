export type PaginatedResults<T> = {
    currentPage: number;
    data: T;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}