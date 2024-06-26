import type { Article } from "@src/model";
import { BaseRepository } from "./base.repository.port";

export abstract class ArticleRepository extends BaseRepository<Article> {}
