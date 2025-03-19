import React, { useState }  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEye,
  faClock,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  Breadcrumb,
  Row,
  Col,
  Form,
  Button,Toast,
} from "@themesberg/react-bootstrap";
import heartOutline from "../../assets/heart-outline.png";
import heartFill from "../../assets/heart-fill.png";
import food from "../../assets/food.jpg";
import Rating from "react-rating-stars-component";
import { useGetBlogByIdQuery, useAddCommentMutation  } from "../../features/api/apiSlice";
import { useParams } from "react-router-dom";

const recipeAuthor = "Efecan";
const recipeItem = {
  title: "Avokado Ezmeli Taco",
  date: "8 Haziran 2021, Salı",
  image: food,
  category: "Vegan Recipes",
  description:
    "Bu kremsi ve baharatlı avokado sosu, günlük taco'larınızı hazırlamak için harika seçeneklerden biri. Geleneksel olarak flautas veya taquitos ile servis edilir, ancak bazı vegan enchiladalara da harika bir katkı sağlar. Bu kremsi ve baharatlı avokado sosu, günlük taco'larınızı hazırlamak için harika seçeneklerden biri. Geleneksel olarak flautas veya taquitos ile servis edilir, ancak bazı vegan enchiladalara da harika bir katkı sağlar.",
  likes: 193,
  isLiked: true,
  comments: [
    {
      id: 1,
      author: "John Doe",
      text: "This recipe is amazing! I tried it and loved it.",
    },
    {
      id: 2,
      author: "Jane Smith",
      text: "Perfect for a quick dinner. Highly recommended!",
    },
  ],
};
// Helper function to format the time difference
const formatTimeDifference = (createdAt) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInSeconds = Math.floor((now - createdDate) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} min${minutes > 1 ? "s" : ""}`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""}`;
  }
};
export default () => {
  const { id } = useParams();
  const backendBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const { data: blogs,refetch, isLoading: isBlogLoading } = useGetBlogByIdQuery(id, {
    skip: !id,
  });
  const [addComment, { isLoading: isAddingComment }] = useAddCommentMutation();
  const [commentText, setCommentText] = useState("");
  const [showToast, setShowToast] = useState(false); // State to control toast visibility
  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const [toastVariant, setToastVariant] = useState("success");
  // console.log("blog", blogs);
  const timeDifference = blogs?.createdAt
    ? formatTimeDifference(blogs.createdAt)
    : "";
    const handleCommentSubmit = async (e) => {
      e.preventDefault();
  
      if (!commentText.trim()) {
        alert("Please enter a comment.");
        return;
      }
  
      try {
        await addComment({ id, text: commentText }).unwrap();
        setToastMessage("Comment added successfully!"); // Set success message
        setToastVariant("success"); // Set toast variant to success
        setShowToast(true); // Show toast
        refetch(); // Refetch blog data to update comments
        setCommentText(""); // Clear the comment input
      } catch (error) {
        console.error("Failed to post comment:", error);
        setToastMessage("Failed to add comment. Please try again."); // Set error message
        setToastVariant("danger"); // Set toast variant to error
        setShowToast(true); // Show toast
      }
    };
  
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
            <Breadcrumb.Item active>Blog Detail</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Blog Detail</h4>
          <p className="mb-0">
            Dive deep into this blog post. Read the full story, engage with the
            author, and share your thoughts.
          </p>
        </div>
      </div>

      <>
        <div className="Blog-Detail-card mb-4">
          <Row>
            <Col xs={12} md={6}>
              <div className="Blog-Detail-Image">
                <img
                  src={`${backendBaseUrl}/${blogs?.image.replace(/\\/g, "/")}`}
                  alt="Blog"
                />
                <div className="Blog-Detail-Like">
                  {recipeItem.isLiked ? (
                    <img src={heartFill} alt="Liked" />
                  ) : (
                    <img src={heartOutline} alt="Not Liked" />
                  )}
                  <span>{recipeItem.likes} kişi bu tarifi beğendi.</span>
                </div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="Blog-Detail-Content">
                {/* Avatar before the title */}
                <div className="Blog-Detail-Author">
                  <div className="Blog-Detail-Title-Avatar">
                    <span>{blogs?.author?.name[0]}</span>
                  </div>
                  <h1 className="Blog-Detail-Title">{blogs?.author?.name}</h1>
                </div>

                <div className="Blog-Detail-Meta">
                  <span className="Blog-Detail-Date">{blogs?.title}</span>
                  <span className="Blog-Detail-Category">
                    {new Date(blogs?.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="Blog-Detail-Rating">
                  <Rating
                    count={5}
                    value={4.5}
                    size={24}
                    activeColor="#ffd700"
                    edit={false}
                  />
                  <span>(45 reviews)</span>
                </div>

                {/* Views Count */}
                <div className="Blog-Detail-Views">
                  <FontAwesomeIcon icon={faEye} />
                  <span>1200 views</span>
                </div>

                {/* Preparation Time */}
                <div className="Blog-Detail-PrepTime">
                  <FontAwesomeIcon icon={faClock} />
                  <span>{timeDifference}</span>
                </div>

                {/* Difficulty Level */}
                <div className="Blog-Detail-Difficulty">
                  <span>Difficulty: </span>
                  <strong>Easy</strong>
                </div>

                {/* Tags */}
                <div className="Blog-Detail-Tags-save">
                  <div className="Blog-Detail-Tags">
                    {blogs?.tags?.map((tag, index) => (
                      <span key={index} className="badge bg-secondary me-2">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Save to Favorites Button */}
                  <div className="Blog-Detail-Save">
                    <button className="btn btn-outline-danger">
                      <FontAwesomeIcon icon={faBookmark} /> Save
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <Row className="mb-4">
          <Col xs={12}>
            <h3 className="Blog-Detail-Description-Heading">Description</h3>
            <div className="Blog-Detail-Description-Section">
              <p className="Blog-Detail-Description-Text">
                {blogs?.description}
              </p>
            </div>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs={12}>
            <div className="Blog-Detail-Comments">
              <h3>Comments</h3>
              {blogs?.comments && blogs.comments.length > 0 ? (
                blogs.comments.map((comment) => (
                  <div key={comment.id} className="Blog-Detail-Comment">
                    <div className="Blog-Detail-Comment-Author">
                      <div className="Blog-Detail-Comment-Avatar">
                        {comment.name[0]}{" "}
                        {/* Display the first letter of the author's name */}
                      </div>
                      <div>
                        <strong>{comment.name}</strong>
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No comments added.</p>
              )}
              <Form onSubmit={handleCommentSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Write your comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={isAddingComment}>
                  {isAddingComment ? "Posting..." : "Post Comment"}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
        {/* Toast Notification */}
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
    </>
  );
};