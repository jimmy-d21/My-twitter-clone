import React, { useContext, useState } from "react";
import SelectFeedTypes from "../../components/SelectFeedTypes";
import PostContainer from "../../components/PostContainer";
import CreatePost from "../../components/CreatePost";
import { useRef } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const Home = ({ setcommentDetails }) => {
  const { authUser } = useContext(AuthContext);
  const [feedTypes, setFeedTypes] = useState("For you");
  const scrollToRef = useRef();

  const isLoading = !authUser;

  useEffect(() => {
    scrollToRef.current.scrollTo(0, 0);
  }, [feedTypes]);
  return (
    <div className="h-screen flex flex-col">
      <SelectFeedTypes feedTypes={feedTypes} setFeedTypes={setFeedTypes} />

      <div
        ref={scrollToRef}
        className="flex flex-col overflow-y-scroll h-screen [&::-webkit-scrollbar]:hidden"
      >
        <CreatePost
          isLoading={isLoading}
          authUser={authUser}
          feedTypes={feedTypes}
        />
        <PostContainer
          feedTypes={feedTypes}
          setcommentDetails={setcommentDetails}
          userId={authUser?._id}
        />
      </div>
    </div>
  );
};

export default Home;
