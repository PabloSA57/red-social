"use client";
import PostService from "@/app/services/post";
import { Likes } from "@/app/types/likes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";
import { BiHeart, BiSolidHeart } from "react-icons/bi";

const BtnLike = ({
  likes,
  isLike,
  postId,
  userId,
}: {
  likes: Likes[];
  isLike: boolean;
  postId: number;
  userId: string;
}) => {
  const [allLikes, setAllLikes] = useState(likes.length);
  const [like, setLike] = useState(isLike);
  const supabase = createClientComponentClient();
  const postService = new PostService(supabase);
  const handleLike = async () => {
    updateLike(like);

    if (like) {
      //deslike
      const { data, error } = await postService.like_deslike(postId, "deslike");
      console.log(data, error);
      if (error) {
        updateLike(false);
      }
    } else {
      //like
      const { data, error } = await postService.like_deslike(postId, "like");
      if (error) {
        updateLike(true);
      }
    }
  };

  const updateLike = (state: boolean) => {
    setLike(!state);
    state ? setAllLikes((prev) => prev - 1) : setAllLikes((prev) => prev + 1);
  };
  return (
    <div className="flex flex-col mr-2 justify-center items-center">
      <button
        className={`text-3xl ${like ? "text-red-700" : ""}`}
        onClick={handleLike}
      >
        {like ? <BiSolidHeart /> : <BiHeart />}
      </button>

      <span>{allLikes}</span>
    </div>
  );
};

export default BtnLike;
