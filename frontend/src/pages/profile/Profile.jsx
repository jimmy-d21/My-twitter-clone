import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { dummyAllPosts } from "../../assets/assets";
import { MdModeEditOutline } from "react-icons/md";
import { HiLink } from "react-icons/hi";
import { IoCalendarSharp } from "react-icons/io5";
import { formatMemberSinceDate } from "../../utils/formatDate";
import { useRef } from "react";
import { useEffect } from "react";
import PostContainer from "../../components/PostContainer";
import { useContext } from "react";
import ProfileSkeleton from "../../components/skeletons/ProfileSkeleton";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";

const Profile = ({ setUserProfileDetails, setcommentDetails }) => {
  const { username } = useParams();

  const [isUpdating, setIsUpdating] = useState(false);
  const {
    fetchUserProfile,
    userProfile,
    fetchUpdateUserProfile,
    fetchFollorUnfollow,
  } = useContext(UserContext);
  const { authUser } = useContext(AuthContext);

  const [feedTypes, setFeedTypes] = useState("Posts");
  const navigate = useNavigate();

  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const coverImageRef = useRef(null);
  const profileImageRef = useRef(null);
  const scrollToRef = useRef(null);

  const isMyProfile = userProfile?.username === authUser?.username;
  const isFollowing = userProfile?.followers.includes(authUser?._id);

  const totalPosts = dummyAllPosts.filter((p) => p.owner.username === username);

  const loadUser = async () => {
    await fetchUserProfile(username);
  };

  useEffect(() => {
    loadUser();
  }, [username]);

  const handleImgChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (type === "coverImage") {
        console.log("Cover Image uploaded:", reader.result);
        setCoverImage(reader.result);
      }
      if (type === "profileImage") {
        console.log("Profile Image uploaded:", reader.result);
        setProfileImage(reader.result);
      }
    };
    reader.onerror = () => {
      console.error("Error reading file");
      alert("Error reading file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    setIsUpdating(true);
    try {
      await fetchUpdateUserProfile(
        { coverImage, profileImage },
        userProfile?.username
      );
    } catch (error) {
      console.log(`Error in : handleUpload`);
    } finally {
      setIsUpdating(false);
      profileImageRef.current.value = null;
      coverImageRef.current.value = null;
      setProfileImage(null);
      setCoverImage(null);
    }
  };

  const handleFollowUnFollow = async () => {
    try {
      await fetchFollorUnfollow(userProfile?._id);
      await fetchUserProfile(userProfile?.username);
    } catch (error) {
      toast.error("handleFollowUnfollow Error");
    }
  };

  // Scroll to top when username or feedTypes changes
  useEffect(() => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollTop = 0;
    }
  }, [feedTypes, username]);

  if (!userProfile) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="h-screen flex flex-col w-full">
      {/* Profile Header */}
      <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-600">
        <div
          onClick={() => {
            navigate(-1);
            scrollTo(0, 0);
          }}
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-gray-700"
        >
          <IoIosArrowRoundBack className="h-7 w-7 text-gray-200 font-semibold " />
        </div>
        <div className="flex flex-col">
          <h1 className="text-white font-semibold">{username}</h1>
          <p className="text-sm text-gray-500">{totalPosts.length} posts</p>
        </div>
      </div>

      {/* This is the scrollable area - attach ref here */}
      <div
        ref={scrollToRef}
        className="flex-1 flex flex-col w-full overflow-y-scroll [&::-webkit-scrollbar]:hidden"
      >
        {/* Profile Main */}
        <div className="w-full flex flex-col">
          {/* Cover Image */}
          <div className="relative group/cover">
            <img
              src={
                coverImage ||
                userProfile?.coverImage ||
                "/avatar-placeholder.png"
              }
              className="w-full h-48 object-cover"
              alt="cover"
            />
            {isMyProfile && (
              <div
                className="absolute top-3 right-3 h-10 w-10 rounded-full bg-gray-800 bg-opacity-75 flex items-center justify-center cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200"
                onClick={() => coverImageRef.current?.click()}
              >
                <MdModeEditOutline className="text-white h-6 w-6" />
              </div>
            )}
            <input
              type="file"
              hidden
              accept="image/*"
              ref={coverImageRef}
              onChange={(e) => handleImgChange(e, "coverImage")}
            />
          </div>

          {/* Profile Image and Edit Button */}
          <div className="w-full flex justify-between py-5 px-5">
            <div className="-mt-20 w-32 h-32 rounded-full overflow-hidden z-30 relative border-2 border-gray-900 group/avatar">
              <img
                src={
                  profileImage ||
                  userProfile?.profileImage ||
                  "/avatar-placeholder.png"
                }
                alt="profile"
                className="w-full h-full object-cover"
              />
              {isMyProfile && (
                <div
                  className="absolute top-4 right-4 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer opacity-0 group-hover/avatar:opacity-100 transition duration-200"
                  onClick={() => profileImageRef.current?.click()}
                >
                  <MdModeEditOutline className="text-white h-5 w-5" />
                </div>
              )}
              <input
                type="file"
                hidden
                accept="image/*"
                ref={profileImageRef}
                onChange={(e) => handleImgChange(e, "profileImage")}
              />
            </div>
            {isMyProfile && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setUserProfileDetails(userProfile)}
                  className="border border-gray-300 h-8 px-3 text-white rounded-full text-xs cursor-pointer transition-all duration-300 hover:bg-gray-900 hover:border-gray-400"
                >
                  Edit profile
                </button>
                {(coverImage || profileImage) && (
                  <button
                    onClick={handleUpload}
                    className="border border-gray-300 h-8 px-3 text-white rounded-full text-xs cursor-pointer transition-all duration-300 hover:bg-gray-900 hover:border-gray-400"
                  >
                    {isUpdating ? "Uploading..." : "Upload"}
                  </button>
                )}
              </div>
            )}
            {!isMyProfile && (
              <button
                onClick={handleFollowUnFollow}
                className="border border-gray-300 h-8 px-4 text-semibold text-white rounded-full text-xs cursor-pointer transition-all duration-300 hover:bg-gray-900 hover:border-gray-400"
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>

          {/* User Info Section */}
          <div className="my-3 px-5 flex flex-col gap-1 pt-5">
            <h1 className="text-white text-md font-semibold">
              {userProfile?.fullname}
            </h1>
            <h3 className="text-gray-500 text-xs">@{userProfile?.username}</h3>
            <p className="text-white text-xs mt-1">{userProfile?.bio}</p>
            <div className="my-4 flex items-center gap-3">
              {userProfile?.links && (
                <div className="flex items-center gap-2">
                  <HiLink className="h-4 w-4 text-gray-500 font-bolder" />
                  <a
                    href={userProfile?.links}
                    target="_blank"
                    className="text-blue-400 text-xs cursor-pointer hover:underline"
                  >
                    {userProfile?.links}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2">
                <IoCalendarSharp className="h-4 w-4 text-gray-600 font-bolder" />
                <span className="text-gray-500 text-xs">
                  {formatMemberSinceDate(userProfile?.createdAt)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="text-xs text-white font-semibold">
                  {userProfile?.following.length}
                </span>
                <span className="text-xs text-gray-600">Following</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-white font-semibold">
                  {userProfile?.followers.length}
                </span>
                <span className="text-xs text-gray-600">Followers</span>
              </div>
            </div>
          </div>

          {/* Feed Type Selector */}
          <div className="flex items-center justify-between border-b border-gray-600 pb-1">
            <div
              className="flex-1 flex flex-col items-center cursor-pointer pt-3"
              onClick={() => setFeedTypes("Posts")}
            >
              <span className="text-center text-gray-300 text-sm font-light">
                Posts
              </span>
              <span
                className={`h-1 rounded-full mt-3 transition-all duration-200 ${
                  feedTypes === "Posts"
                    ? "w-12 bg-blue-500"
                    : "w-0 bg-transparent"
                }`}
              ></span>
            </div>
            <div
              className="flex-1 flex flex-col items-center cursor-pointer pt-3 "
              onClick={() => setFeedTypes("Likes")}
            >
              <span className="text-center text-gray-300 text-sm font-light">
                Likes
              </span>
              <span
                className={`h-1 rounded-full mt-3 transition-all duration-200 ${
                  feedTypes === "Likes"
                    ? "w-12 bg-blue-500"
                    : "w-0 bg-transparent"
                }`}
              ></span>
            </div>
          </div>
        </div>

        {/* Profile Posts */}
        <div className="flex flex-col flex-1">
          <PostContainer
            feedTypes={feedTypes}
            setcommentDetails={setcommentDetails}
            username={userProfile?.username}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
