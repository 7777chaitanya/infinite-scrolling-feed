import { createMachine } from "xstate";
const feedMachine = createMachine({
  id: "feed",
  initial: "fetchingFeeds",
  states: {
    fetchingFeeds: {
      tags: "fetchingFeeds",
      invoke: {
        src: "fetchFeeds",
        onDone: {
          actions: ["setFetchedFeedToContext"],
          target: "idle",
        },
        onError: {
          actions: [
            (ctx, event) =>
              window.alert(
                `failed to fetch feed for page number ${ctx.pageNumber}`
              ),
          ],
          // TODO: handle error scenario later
        },
      },
    },
    idle: {
      on: {
        INCREMENT_PAGE_NUMBER: {
          actions: ["incrementPageNumber"],
          target: "fetchingFeeds",
        },
      },

      //   FETCH_FEED: {
      //     target: "fetchingFeeds",
      //   },
    },
  },
});

export default feedMachine;
