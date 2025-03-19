import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Col, Button, Card, Form, Row, Toast } from '@themesberg/react-bootstrap';
import { useCreateBlogMutation, useUpdateBlogMutation, useGetBlogByIdQuery } from '../../features/api/apiSlice';
import { useParams } from "react-router-dom";

export default () => {
  const { id } = useParams(); // Get the blog ID from the URL (if editing)
  const [selectedImage, setSelectedImage] = useState({ file: null, url: null });
  const [tags, setTags] = useState([]); // State to store tags
  const [inputValue, setInputValue] = useState(""); // State to store the current input value
  const [title, setTitle] = useState(""); // State for the blog title
  const [description, setDescription] = useState("");
  const [showToast, setShowToast] = useState(false); // State to control toast visibility
  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const [toastVariant, setToastVariant] = useState("success"); // State for toast variant (success/error)

  // Fetch blog data if editing
  const { data: blog, isLoading: isBlogLoading } = useGetBlogByIdQuery(id, { skip: !id });
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setDescription(blog.description || "");
      setTags(blog.tags || []);
      setSelectedImage({
        file: null, // No File object when editing
        url: blog.image ? `${process.env.REACT_APP_API_BASE_URL}/${blog.image.replace(/\\/g, "/")}` : null, // Use the existing image URL
      });
    }
  }, [blog]);

 

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file); // Generate a temporary URL
      setSelectedImage({ file, url }); // Store both the File object and the URL
    } else {
      alert("Please select a valid image file.");
    }
  };
  // Handle tag creation
  const handleTagCreation = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault(); // Prevent form submission
      setTags([...tags, inputValue.trim()]); // Add the new tag
      setInputValue(""); // Clear the input field
    }
  };

  // Remove a tag
  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index); // Filter out the tag to remove
    setTags(newTags);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the blog data
    const blogData = new FormData();
    blogData.append("title", title);
    blogData.append("description", description);
    blogData.append("tags", tags.join(",")); // Convert tags array to a comma-separated string
 
  // Append the image if it exists
  if (selectedImage.file) {
    blogData.append("image", selectedImage.file); // Append the File object
  }


    try {
      if (id) {
        // Update the blog if editing
        await updateBlog({ id, blogData }).unwrap();
        setToastMessage("Blog updated successfully!");
        setToastVariant("success");
      } else {
        // Create a new blog if creating
        await createBlog(blogData).unwrap();
        setToastMessage("Blog created successfully!");
        setToastVariant("success");
      }
      setShowToast(true); // Show success toast
    } catch (error) {
      console.error("Failed to save blog:", error);
      setToastMessage("Failed to save blog. Please try again.");
      setToastVariant("danger");
      setShowToast(true); // Show error toast
    }
  };

  if (isBlogLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item active>{id ? "Edit Blog" : "Create Blog"}</Breadcrumb.Item>
          </Breadcrumb>
          <h4>{id ? "Edit Blog" : "Create Blog"}</h4>
          <p className="mb-0">
            {id ? "Edit your blog." : "Create a new blog."}
          </p>
        </div>
      </div>

      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* Image Uploader */}
            <Col sm={12} className="mb-4 text-center">
              <div
                style={{
                  border: '2px dashed #ccc',
                  borderRadius: '10px',
                  padding: '20px',
                  cursor: 'pointer',
                  backgroundColor: selectedImage ? 'transparent' : '#f9f9f9',
                  position: 'relative',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => document.getElementById('image-upload').click()}
              >
               {
  selectedImage.url ? (
    <img
      src={selectedImage.url} // Use the temporary URL for preview
      alt="Selected"
      style={{
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: '10px',
      }}
    />
  ) : (
                  <div>
                    <FontAwesomeIcon icon={faImage} size="3x" />
                    <p>Upload the image</p>
                  </div>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </div>
            </Col>

            <Row>
              <Col sm={12} xs={6} md={6} lg={6} xl={6} className="mb-3">
                <Form.Group id="Title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control required type="text" placeholder="Enter your Blog Title" value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
              </Col>
              <Col sm={12} xs={6} md={6} lg={6} xl={6}>
                <Form.Group id="Tags">
                  <Form.Label>Tags</Form.Label>
                  <div
                    style={{
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      padding: '5px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '5px',
                      minHeight: '38px',
                    }}
                  >
                    {/* Render tags */}
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        style={{
                          backgroundColor: '#e9ecef',
                          borderRadius: '4px',
                          padding: '2px 6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <span>{tag}</span>
                        <FontAwesomeIcon
                          icon={faTimes}
                          style={{ cursor: 'pointer', fontSize: '12px' }}
                          onClick={() => removeTag(index)}
                        />
                      </div>
                    ))}
                    {/* Input field for new tags */}
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleTagCreation}
                      placeholder="Enter tags and press Enter"
                      style={{
                        border: 'none',
                        outline: 'none',
                        flexGrow: 1,
                        minWidth: '100px',
                        height: "33px"
                      }}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Col className="mb-3">
              <Form.Group id="Description">
                <Form.Label>Description</Form.Label>
                <Form.Control required as="textarea" rows={5} placeholder="Enter the Blog Description."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} />
              </Form.Group>
            </Col>

            <Button variant="primary" type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating ? "Saving..." : "Save"}
            </Button>
          </Form>
        </Card.Body>
      </Card>

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
  );
};