import { useMachine } from "@xstate/react";
import React, { useRef, useEffect } from "react";
import feedMachine from "../../machines/feedMachine";
import "./styles.css";
import { timeStampToLocaleString } from "../../utils";

const Feed = () => {
  const [state, send] = useMachine(
    feedMachine.withContext({
      pageNumber: 1,
      feedData: [],
    })
  );

  const lastFeedItemRef = useRef();

  const feed = state.context.feedData;
  const lastFeedItemIndex = feed.length - 1;
  console.log(state);

  useEffect(() => {
    let observer;
    if (lastFeedItemRef.current) {
      let options = {
        // root: document.querySelector("#scrollArea"),
        rootMargin: "0px",
        threshold: 0.5,
      };
      let callback = (entries) => {
        const entry = entries[0];
        console.log(entry);
        if (entry.isIntersecting) {
          console.log("isIntersection if ocndition");
          send("INCREMENT_PAGE_NUMBER");
          // send("FETCH_FEED");
        }
      };

      observer = new IntersectionObserver(callback, options);
      observer.observe(lastFeedItemRef.current);
    }

    return () => {
      if (lastFeedItemRef.current && observer) {
        observer.disconnect();
      }
    };
  }, [feed]);

  return (
    <div id="feedContainer">
      {feed.map((eachFeedItem, index) => {
        const {
          field_photo_image_section: imageUrl,
          title,
          last_update,
        } = eachFeedItem.node;
        return (
          <>
            {index === lastFeedItemIndex ? (
              <div ref={lastFeedItemRef} id="feedItemContainer">
                <img src={imageUrl} alt="Broken" height={200} width={300} />
                <div id="titleAndLastUpdatedDate">
                  <h3>{title}</h3>
                  <h6>{timeStampToLocaleString(last_update)}</h6>{" "}
                </div>
              </div>
            ) : (
              <div id="feedItemContainer">
                <img
                  src={imageUrl}
                  alt="Broken"
                  height={200}
                  width={300}
                  id="image"
                />
                <div id="titleAndLastUpdatedDate">
                  <h3>{title}</h3>
                  <h6>{timeStampToLocaleString(last_update)}</h6>{" "}
                </div>
              </div>
            )}
          </>
        );
      })}
      {state.hasTag("fetchingFeeds") && <h1>Loading...</h1>}
    </div>
  );
};

export default Feed;
