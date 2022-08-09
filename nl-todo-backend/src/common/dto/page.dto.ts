
export enum Order {
    ASC = "ASC",
    DESC = "DESC",
}

export class PageDto<T> {
    readonly results: T[];

    readonly page: number;

    readonly take: number;

    readonly count: number;

    readonly totalPages: number;

    readonly hasPreviousPage: boolean;

    readonly hasNextPage: boolean;

    constructor(results: T[], count: number, pageOptionsDto: PageOptionsDto) {
        this.results = results;
        this.count = count;
        this.page = pageOptionsDto.page;
        this.take = pageOptionsDto.take;
        this.totalPages = Math.ceil(this.count / this.take);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.totalPages;
    }
}

export class PageOptionsDto {
    readonly order?: Order = Order.ASC;

    readonly page?: number = 1;

    readonly take?: number = 10;

    get skip(): number {
        return (this.page - 1) * this.take;
    }
}