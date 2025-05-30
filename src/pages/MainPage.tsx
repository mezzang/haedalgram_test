// src/pages/MainPage.tsx

import { useEffect, useState } from "react";
import Navigation from "../components/navigation/Navigation";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Post from "../components/post/Post";
import { TPost } from "../types";
import AddPostButton from "../components/post/AddPostButton";
import axios from "axios";
import { HOST } from "../config";
import FollowingItem from "../components/follow/FollowingItem";

type Data = {
  id: number;
  username: string;
  imageData: string | null;
};

const Main = styled.main`
  width: 600px;
  position: absolute;
  left: 50%;
  transform: translate(-40%);
`;

const PostSection = styled.section``;

const FollowingSection = styled.section`
  height: 100px;

  display: flex;
  flex-direction: row;

  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MainPage = () => {
  const { isLoggedIn, user } = useUserStore();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Array<TPost>>([]);
  const [following, setFollowing] = useState<Data[]>([]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/sign");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    axios
      .get(`${HOST}/posts/user/${user?.id}`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      });
  }, [user?.id]);

  useEffect(() => {
    axios
      .get(`${HOST}/posts/following`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setFollowing(res.data);
      });
  }, [user?.id]);

  return (
    <>
      <Navigation />
      <AddPostButton />
      <Main>
        <FollowingSection>
          {following.map((_following) => (
            <FollowingItem
              key={_following.id}
              id={_following.id}
              imageData={_following.imageData}
              username={_following.username}
            />
          ))}
        </FollowingSection>
        <PostSection>
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              user={post.user}
              imageData={post.imageData}
              content={post.content}
              likeCount={post.likeCount}
              isLike={post.isLike}
              createdAt={post.createdAt}
            />
          ))}
        </PostSection>
      </Main>
    </>
  );
};

export default MainPage;
