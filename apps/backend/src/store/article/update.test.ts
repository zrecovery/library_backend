import { describe, expect, test } from "bun:test";
import { type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { StoreErrorType } from "../store.error";
import { findArticleById } from "../test/query";
import { update } from "./update";
import { withTestDb, expectError } from "../../utils/test";
import type * as schema from "../../store/scheme";

describe("Article Update", () => {
  const cases = [
    {
      title:
        "should update a new article content with existed author, series and create new series and author",
      input: {
        id: 1,
        title: "new blog",
        body: "new blog body",
        author: { name: "new author" },
        chapter: { title: "new books", order: 1 },
      },
      error: undefined,
      expect: {
        articles: {
          id: 1,
          title: "new blog",
          body: "new blog body",
        },
        people: { name: "new author" },
        chapters: { order: 1 },
        series: { title: "new books" },
      },
    },
  ];

  cases.map((c) => {
    test(
      c.title,
      withTestDb(async (db: PostgresJsDatabase<typeof schema>) => {
        db.transaction(async (trx) => {
          const result = await update(db)(c.input.id, c.input);
          if (c.error) {
            expectError(Promise.reject(result), StoreErrorType.ValidationError);
          } else {
            const article = findArticleById(db)(c.input.id);
            expect(article).toMatchObject({
              id: c.expect.articles.id,
              title: c.expect.articles.title,
              body: c.expect.articles.body,
              authors: { name: c.expect.people.name },
              chapters: { order: c.expect.chapters.order },
              series: { title: c.expect.series.title },
            });
          }
        });
      }),
    );
  });
});