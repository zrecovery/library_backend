import type { Author } from "@/core/author/author.model";
import type AuthorRepository from "@/core/author/author.repository";
import type { PrismaClient } from "@prisma/client";

export class AuthorPrismaRepository implements AuthorRepository {
  readonly #client: PrismaClient;

  constructor(client: PrismaClient) {
    this.#client = client;
  }

  public getList = async (
    limit?: number | undefined,
    offset?: number | undefined,
  ): Promise<Author[]> => {
    return this.#client.author.findMany({
      skip: offset,
      take: limit,
    });
  };
}
