import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTrash, faPen,faChevronDown,faComment } from "@fortawesome/free-solid-svg-icons";
import {
  Breadcrumb,
  Row,
  Col,
  Button,
  Dropdown,
  Nav,Toast
} from "@themesberg/react-bootstrap";
import heartOutline from "../../assets/heart-outline.png";
import heartFill from "../../assets/heart-fill.png";
import { Link } from "react-router-dom";
import { Routes } from "../../routes";
import { useGetMyBlogsQuery,useDeleteBlogMutation  } from "../../features/api/apiSlice"; // Import the hook for fetching user's blogs
import { useState } from "react";

const comment = 193;
const isLiked = true;

export default () => {
  // Fetch the authenticated user's blogs
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');
  const { data: blogs, isLoading, isError,refetch  } = useGetMyBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();
  const backendBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const handleDelete = async (id) => {
    try {
      await deleteBlog(id).unwrap(); // Call the delete API
      refetch(); // Refetch the blogs after deletion
     
      setToastMessage("Blog deleted successfully!");
      setToastVariant('success');
      setShowToast(true);
    } catch (error) {
      console.error("Failed to delete blog:", error);
      setToastMessage("Failed to delete blog. Please try again.");
      setToastVariant('danger');
      setShowToast(true);
    
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching blogs</div>;

  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>My Blogs</Breadcrumb.Item>
          </Breadcrumb>
          <h4>My Blogs</h4>
          <p className="mb-0">
            Manage your blogs, track their performance, and engage with your
            audience from one place.
          </p>
        </div>
        <Button variant="primary" as={Link} to={Routes.CreateEditBlog.path}>
          Create
        </Button>
      </div>

      <Row className="mb-4">
        {blogs &&
          blogs.map((blog, index) => (
            <Col
              key={index}
              xs={6}
              sm={6}
              md={4}
              xl={4}
              lg={4}
              className="mb-4"
            >
             
              <div className="Blog-card">
              <div className="d-flex justify-content-between">
                
                
                <div className="Blog-card-header">
                  <div className="Blog-profile">
                    <span className="letter">K</span>
                  </div>
                  <div className="Blog-card-title-group">
                    <h5 className="Blog-card-title">{blog?.author?.name}</h5>
                    <div className="Blog-card-date">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                 
                </div>
                <Dropdown as={Nav.Item}>
                    <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                      <div className="media d-flex align-items-center">
                        <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                        <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                      <Dropdown.Item className="fw-bold">
                        <Link as={Link} to={`/EditBlog/${blog._id}`}>
                          <FontAwesomeIcon icon={faPen} className="me-2" /> Edit
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item className="fw-bold"
                        >
                       <div onClick={() => handleDelete(blog._id)}>
                       <FontAwesomeIcon icon={faTrash} className="me-2" />{" "}
                       Delete
                       </div>
                         
                        
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  </div>
                  <Link as={Link} to={`/BlogsDetails/${blog._id}`}>
                <img
                  className="Blog-card-image"
                  src={`${backendBaseUrl}/${blog.image.replace(/\\/g, "/")}`} // Replace backslashes with forward slashes
                  alt="Blog"
                />
                <div className="Blog-card-text">{blog.description}</div></Link>
                <div className="Blog-card-like-bar">
                  {isLiked ? (
                    <img
                      className="Blog-card-like-icon"
                      src={heartFill}
                      alt="Logo"
                    />
                  ) : (
                    <img
                      className="Blog-card-like-icon"
                      src={heartOutline}
                      alt="Logo"
                    />
                  )}
                  <div className="Blog-like-text gap-2 d-flex">
                    <b>{comment}</b><FontAwesomeIcon icon={faComment} />
                  </div>
                </div>
              </div>
            </Col>
          ))}
      </Row>
       <Toast
                  show={showToast}
                  onClose={() => setShowToast(false)}
                  delay={3000}
                  autohide
                  className={`bg-${toastVariant} text-white`}
                  style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}
                >
                  <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
    </>
  );
};
