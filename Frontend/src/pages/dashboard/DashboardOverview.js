import React from "react";
import { Card, Row, Col,Breadcrumb , Button} from "@themesberg/react-bootstrap";
import BlogPerformanceChart from "./BlogPerformanceChart";
import MostPopularBlogsChart from "./MostPopularBlogsChart";
import Slider from "react-slick";
import FriendActivityChart from "./FriendActivityChart";
import MessageActivityChart from "./MessageActivityChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBlog,faHome,
  faThumbsUp,
  faComment,
  faUserFriends,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import heartOutline from "../../assets/heart-outline.png";
import heartFill from "../../assets/heart-fill.png"; 
import { blogs } from "../../data/tables";
import { Link } from "react-router-dom";
import { Routes } from "../../routes";
const like = 193;
const isLiked = true;
const DashboardOverview = () => {
 // Retrieve the token and user from localStorage
 const token = localStorage.getItem('token');
 const user = JSON.parse(localStorage.getItem('user'));

 // Log the token and user
 console.log('Token:', token);
 console.log('User:', user);
  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // Custom Next Arrow
  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-next" onClick={onClick}>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    );
  }

  // Custom Previous Arrow
  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-prev" onClick={onClick}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
    );
  }
  return (
    <>
       <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
            <div className="d-block mb-4 mb-xl-0">
              <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
             
                <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
              </Breadcrumb>
              <h4>Dashboard</h4>
              <p className="mb-0">
        Welcome to your personalized dashboard! Here, you can manage your blogs, track engagement, and connect with friends.
      </p>
            </div>
          </div>
  <div className="p-4">

        {/* Quick Stats */}
        <Row className="mb-4">
          <Col xs={12} md={6} lg={3}>
            <Card>
              <Card.Body className="text-center">
                <FontAwesomeIcon
                  icon={faBlog}
                  className="text-primary mb-3"
                  size="3x"
                />
                <h5>Total Blogs</h5>
                <p className="display-4">10</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Card>
              <Card.Body className="text-center">
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  className="text-success mb-3"
                  size="3x"
                />
                <h5>Total Likes</h5>
                <p className="display-4">150</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Card>
              <Card.Body className="text-center">
                <FontAwesomeIcon
                  icon={faComment}
                  className="text-warning mb-3"
                  size="3x"
                />
                <h5>Total Comments</h5>
                <p className="display-4">50</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Card>
              <Card.Body className="text-center">
                <FontAwesomeIcon
                  icon={faUserFriends}
                  className="text-info mb-3"
                  size="3x"
                />
                <h5>Total Friends</h5>
                <p className="display-4">25</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      {/* Graphs */}
      <Row className="mb-4">
        <Col xs={12} lg={6}>
          <Card>
            <Card.Body>
              <h5>Blog Performance Over Time</h5>
              <BlogPerformanceChart />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card>
            <Card.Body>
              <h5>Most Popular Blogs</h5>
              <MostPopularBlogsChart />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={12} lg={6}>
          <Card>
          
            <Card.Body>
              <h5>Message Activity</h5>
              <MessageActivityChart />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card>
            <Card.Body>
              <h5>Friend Activity</h5>
              <FriendActivityChart />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
          <Col xs={12}>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5>Recent Blogs</h5>
                  <Button variant="primary" size="sm">
                    See All
                  </Button>
                </div>
                
                <Slider {...sliderSettings}>
                
              
                  {blogs.map((blog) => (
                    <div key={blog.id} className="px-2">
                      <Card>
                        <Card.Body>
                        <div className="Blog-card">
              <div className="Blog-card-header">
                <div className="Blog-profile">
                  <span className="letter">K</span>
                </div>
                <div className="Blog-card-title-group">
                  <h5 className="Blog-card-title">{blog.title}</h5>
                  <div className="Blog-card-date">{blog.date}</div>
                </div>
              </div>
              <Link as={Link} to={Routes.BlogsDetails.path}>
              <img className="Blog-card-image" src={blog.image} alt="Logo" />
              {/* <div className="Blog-card-text">{blog.description}</div> */}
              </Link>
           
              <div className="Blog-card-like-bar">
                {isLiked ? (
                  <img className="Blog-card-like-icon" src={heartFill} alt="Logo" />
                ) : (
                  <img className="Blog-card-like-icon" src={heartOutline} alt="Logo" />
                )}
                <div className="Blog-like-text">
                  <b>{like}</b> kişi bu tarifi beğendi.
                </div>
              </div>
            </div>
                          
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </Slider>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </div>
    </>
    
  );
};

export default DashboardOverview;