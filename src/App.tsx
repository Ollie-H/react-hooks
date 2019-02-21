import React from "react";
import UseGetApiData from "./Hooks/UseReadApiData";

const App = () => {
  const b = UseGetApiData({
    url: "https://hn.algolia.com/api/v1/search?query=1",
    initialData: {}
  });

  return (
    <div>
      <h1 onClick={() => b.performGet()}>GET DATA</h1>
      {b.isLoading && "LOADING!"}
      {!b.isLoading && b.data && JSON.stringify(b.data)}
    </div>
  );
};

export default App;
