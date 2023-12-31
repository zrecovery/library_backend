import { expect, spyOn, test } from "bun:test";
import { ArticleService } from "./article.service";
import type { Query } from "./article.repository";
import { ArticleMockRepository } from "@/infrastructure/mock/article.mock.repository";
import type { Article } from "./article.model";

const articleMockRepository = new ArticleMockRepository();
const articleService = new ArticleService(articleMockRepository);

test("通过id获取文章", async () => {
  const article = await articleService.getById(1);
  expect(article).toStrictEqual({
    id: 1,
    title: "测试标题",
    book: "测试系列",
    author: "测试作者",
    chapter_order: 1,
    body: "测试内容",
    love: false,
  });
});

test("通过作者id获取文章", async () => {
  const articles = await articleService.getByAuthorId(1, 10, 0);
  expect(articles).toStrictEqual([
    {
      id: 1,
      title: "测试标题",
      book: "测试系列",
      author: "测试作者1",
      chapter_order: 1,
      body: "测试内容",
      love: false,
    },
    {
      id: 2,
      title: "测试标题",
      book: "测试系列",
      author: "测试作者1",
      chapter_order: 1,
      body: "测试内容",
      love: false,
    },
  ]);
});

test("获取所有文章", async () => {
  const query: Query = {
    love: false,
  };
  const mockArticles: Article[] = [
    {
      id: 1,
      title: "测试标题",
      book: "测试系列",
      author: "测试作者",
      chapter_order: 1,
      body: "测试内容",
      love: false,
    },
    {
      id: 2,
      title: "测试标题",
      book: "测试系列",
      author: "测试作者",
      chapter_order: 1,
      body: "测试内容",
      love: false,
    },
  ];
  const spyFn = spyOn(articleMockRepository, "searchArticles");
  spyFn.mockReturnValue(Promise.resolve(mockArticles));
  const articles = await articleService.getList(query, 10, 0);
  expect(spyFn).toHaveBeenCalled();
  expect(articles).toStrictEqual(mockArticles);
});
