import { Outlet, Link } from "react-router-dom"
import { Radio, Tabs } from 'antd';
import MyPosts from './myPosts';
import SinglePostView from "./SinglePostView";
import React, { useEffect, useState } from 'react';
import axios from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from '../../redux/user';
import notIcon from "./../../images/icon_notification.png";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pendingPosts, setPendingRequest] = useState([]);
  const [approvedPosts, setApprovedRequest] = useState([]);
  const [completedPosts, setCompletedPosts] = useState([]);

  const [pendingCounter, setPendingCounter] = useState(0);
  const [approvedCounter, setApprovedCounter] = useState(0);
  const [completedCounter, setCompletedCounter] = useState(0);

  const [singleView, setSingleView] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  useEffect(() => {
    dispatch(setLoader({ loader: true }))
    fetchMyPosts();
    fetchUserProfile()

  }, []);

  const filterPosts = allPosts => {
    let pendingPosts = [];
    let approvedPosts = [];
    let completedPosts = [];

    allPosts.forEach((post, index) => {
      if (post.status === "PENDING") {
        pendingPosts.push(post);
      } else if (post.status === "BOOKED") {
        approvedPosts.push(post);
      } else {
        completedPosts.push(post);
      }
    });

    setPendingRequest(pendingPosts);
    setApprovedRequest(approvedPosts);
    setCompletedPosts(completedPosts);

    setPendingCounter(pendingPosts.length);
    setApprovedCounter(approvedPosts.length);
    setCompletedCounter(completedPosts.length);
  };


  const [formData, setFormData] = useState({
    profilePhoto: "",
    name: "",
    // lName: "",
    age: "",
    gender: "male",
    contactNumber: "",
    interest: "",
    emergencyContact: ""
  });

  const fetchUserProfile = async () => {
    try {
      const getProfile = await axios.getRequest("user", true);
      if (getProfile) {
        setFormData(getProfile);
      }

    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchMyPosts = async () => {
    try {
      setSingleView(false);
      dispatch(setLoader({ loader: true }))
      const response = await axios.getRequest("getPostByUser", true);
      dispatch(setLoader({ loader: false }))
      if (response.success === true && response.posts && response.posts.length > 0) {
        filterPosts(response.posts);
      }
    } catch (err) {
      dispatch(setLoader({ loader: false }))
      console.log(err)
    }
  };

  const changeSingleView = (post) => {

    setSingleView(!singleView);
    setCurrentPost(post);
  }

  return (
    <>
      {
        singleView == false && (
          <div className="dashBoardElder">

            <div className="dashBoardElderHeader">
              <h1>Hi, {formData.name}</h1>
              <div className="topIcons">
                <img src={notIcon} alt="notification icon" />
                <Link to='/elder/profile'><img src={formData.profilePhoto} alt="iconProfile" /></Link>
              </div>
            </div>
            <div className="dashElderNav">
              <div className="dashElderEvent">
                <h2>Join our Events</h2>
                <h4>Join us for our upcoming session.</h4>
                <Link to='/elder/event'><button className="eventMore">Join</button></Link>

              </div>
              <div className="dashElderUnanswered">
                <h2>Active Posts</h2>
                <div className="unansCount">{approvedCounter}</div>
              </div>
              <div className="dashElderPending">
                <h2>All Posts</h2>
                <div className="pendingCount">{pendingCounter}</div>
              </div>
            </div>

            <div id="postsSection">
              <div id="postsSectionNav">
                <h1>My Posts</h1>
                <button id="createPost" onClick={() => { navigate("/elder/addPost") }}><Link to='/elder/addPost'>Create Post</Link></button>
              </div>

              <Tabs className="tabs"
                defaultActiveKey="1"
                type="card"
                items={
                  [
                    {
                      label: `All Posts(${pendingCounter})`,
                      key: "1",
                      // children: <MyPosts posts={pendingPosts} changeSingleView={changeSingleView} fetchMyPosts={fetchMyPosts} />,
                      children: (
                        <>
                          <MyPosts posts={pendingPosts} changeSingleView={changeSingleView} fetchMyPosts={fetchMyPosts} />
                          {pendingPosts.length === 0 && <div className="noPost">No Posts To Show</div>}
                        </>
                      )
                    },
                    {
                      label: `Active Posts(${approvedCounter})`,
                      key: "2",
                      // children: <MyPosts posts={approvedPosts} changeSingleView={changeSingleView} fetchMyPosts={fetchMyPosts} />,

                      children: (
                        <>
                          <MyPosts posts={approvedPosts} changeSingleView={changeSingleView} fetchMyPosts={fetchMyPosts} />
                          {approvedPosts.length === 0 && <div className="noPost">No Active Posts</div>}
                        </>
                      )
                    },
                    {
                      label: `History(${completedCounter})`,
                      key: "3",
                      // children: <MyPosts posts={completedPosts} changeSingleView={changeSingleView} fetchMyPosts={fetchMyPosts} />,

                      children: (
                        <>
                          <MyPosts posts={completedPosts} changeSingleView={changeSingleView} fetchMyPosts={fetchMyPosts} />
                          {completedPosts.length === 0 && <div className="noPost">No History Posts</div>}
                        </>
                      ),
                    }
                  ]
                }
              />

            </div>
          </div>
        )
      }

      {
        singleView == true && (
          <div>
            <SinglePostView currentPost={currentPost} changeSingleView={changeSingleView} fetchMyPosts={fetchMyPosts} />
          </div>
        )
      }
    </>
  );
}
export default Dashboard;
