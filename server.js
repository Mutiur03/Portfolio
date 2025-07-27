import { createServer } from "http";
import { parse } from "url";
import next from "next";
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(process.env.PORT || 3000, () => {
    console.log(`${process.env.PORT || 3000} is running`);
  });
});
