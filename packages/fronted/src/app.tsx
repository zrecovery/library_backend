import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <div class="p-4" style="height: 96vh">
            <Nav />

            <Suspense>{props.children}</Suspense>
          </div>
        </>
      )}
    >
      <Suspense>
        <FileRoutes />
      </Suspense>
    </Router>
  );
}