import FeedParser from "feedparser";
import request from "request"; // for fetching the feed

const API_ENDPOINT = `https://www.merriam-webster.com/wotd/feed/rss2`;

exports.handler = async () => {
  return new Promise((resolve, reject) => {
    const req = request(`${API_ENDPOINT}`);
    const feedparser = new FeedParser();

    req.on("error", error => {
      reject({ statusCode: 422, body: String(error) });
    });

    req.on("response", res => {
      if (res.statusCode !== 200) {
        req.emit("error", new Error("Bad status code"));
      } else {
        req.pipe(feedparser);
      }
    });

    feedparser.on("error", error => {
      reject({ statusCode: 422, body: String(error) });
    });

    feedparser.on("readable", () => {
      const { title, description, date, link } = feedparser.read();

      resolve({
        statusCode: 200,
        body: JSON.stringify({ title, description, date, link })
      });
    });
  });
};
