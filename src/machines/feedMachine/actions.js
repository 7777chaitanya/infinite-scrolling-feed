import { assign } from "@xstate/immer";

export const x = (ctx, event) => {};

export const setFetchedFeedToContext = assign((ctx, event) => {
  ctx.feedData = [...ctx.feedData, ...event.data];
});

export const incrementPageNumber = assign((ctx, event) => {
  ctx.pageNumber++;
});
