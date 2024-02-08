import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => [
  { title: "New Remix App" },
  { name: "description", content: "Welcome to Remix!" },
];

export function loader({ context }: LoaderFunctionArgs) {
  const { appVersion } = context;
  const message = "Hello World from Remix Vite loader";
  return { message, appVersion };
}

export default function Index() {
  const { message, appVersion } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1 className="text-3xl font-bold text-purple-500">
        Welcome to Remix Vite !
      </h1>
      <label htmlFor="inputField" className="mr-4">
        Should persist state across HMR:
      </label>
      <input
        id="inputField"
        type="text"
        placeholder="HMR test"
        className="rounded-lg border px-4 py-1"
      />
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
            className="text-blue-500"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>

      <div>{message}</div>
      <div>appVersion: {appVersion}</div>
    </div>
  );
}
