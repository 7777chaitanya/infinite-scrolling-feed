export const fetchFeeds = (ctx, event) => {
  return fetch(`http://localhost:5000/feed/${ctx.pageNumber}`)
    .then((res) => res.json())
    .then((data) => data);
};
