
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Row, Col } from '@themesberg/react-bootstrap'; 
import heartOutline from "../../assets/heart-outline.png";
import heartFill from "../../assets/heart-fill.png"; 
import { Link } from "react-router-dom";
import { Routes } from "../../routes";
import { useGetBlogsQuery } from '../../features/api/apiSlice' // Import the hook
const like = 193;
const isLiked = true;
export default () => {
  const { data: blogs, isLoading, isError } = useGetBlogsQuery();
console.log("blogs",blogs)
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching blogs</div>;
  const backendBaseUrl = process.env.REACT_APP_API_BASE_URL
  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item active>Blogs</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Blogs</h4>
          <p className="mb-0">
            Explore a wide range of blogs posted by our community. Discover new ideas, insights, and stories.
          </p>
        </div>
      </div>

      <Row className="mb-4">
        {blogs.map((blog, index) => (
          <Col key={index} xs={6} sm={6} md={4} xl={4} lg={4} className="mb-4">
            <div className="Blog-card">
              <div className="Blog-card-header">
                <div className="Blog-profile">
                  <span className="letter">{blogs?.author?.name[0]}</span>
                </div>
                <div className="Blog-card-title-group">
                  <h5 className="Blog-card-title">{blog?.author?.name}</h5>
                  <div className="Blog-card-date">{new Date(blog.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
              <Link as={Link} to={`/BlogsDetails/${blog._id}`}>
              <img
                  className="Blog-card-image"
                  src={`${backendBaseUrl}/${blog.image.replace(/\\/g, "/")}`} // Replace backslashes with forward slashes
                  alt="Blog"
                />
                <div className="Blog-card-text">{blog.description}</div>
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
          </Col>
        ))}
      </Row>
    </>
  );
};