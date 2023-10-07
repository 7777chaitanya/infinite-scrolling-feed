export const fetchFeeds = (ctx, event) => {
  return fetch(`https://feed-app-service.onrender.com/feed/${ctx.pageNumber}`)
    .then((res) => res.json())
    .then((data) => data);
};
