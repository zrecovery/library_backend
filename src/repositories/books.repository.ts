import type { Book } from "../models/book.model";
import type { BooksRepositoryPort } from "../usecases/book.usecase";
import { PrismaClient } from "@prisma/client";

const LIMIT = 20;

export class BookRepository implements BooksRepositoryPort {
    #client: PrismaClient

    constructor() {
        this.#client = new PrismaClient();
    }

    public getList = async (limit: number = LIMIT, offset = 0): Promise<Book[]> => {
        return await this.#client.article.groupBy({
            by: [`serial_name`, `author`],
            orderBy: [{
                "author": `desc`
            },
            {
                "serial_name": `desc`
            }],
            skip: offset,
            take: limit
        }).then(res => { return res })
    }


}
