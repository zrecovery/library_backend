import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import Elysia from "elysia";
import { articleModule } from "./src/article";
import { opentelemetry } from "@elysiajs/opentelemetry";

import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";

export const app = new Elysia()
  .use(swagger())
  .use(cors({ origin: "localhost:3002" }))
  .use(
    opentelemetry({
      spanProcessors: [new BatchSpanProcessor(new OTLPTraceExporter())],
    }),
  )
  .group("/api", (api) => api.use(articleModule.controller))
  .listen(3001);

export type Server = typeof app;
