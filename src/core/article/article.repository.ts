import { QueryResult } from "../query-result.model";
import type { Article } from "./article.model";

export interface Query {
  love?: boolean;
  keyword?: string;
}

export abstract class ArticleRepository {
  abstract getArticleById(id: number): Promise<Article>;
  abstract createArticle(article: Article): Promise<void>;
  abstract updateArticle(article: Article): Promise<void>;
  abstract deleteArticle(id: number): Promise<void>;
  abstract searchArticles(
    query: Query,
    limit: number,
    offset: number,
  ): Promise<QueryResult<Article[]>>;
}
