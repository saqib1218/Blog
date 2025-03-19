import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faComment, faUserPlus, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Tab, Nav, Card, Row, Col, Image, Button, Toast } from '@themesberg/react-bootstrap';
import {
  useGetFriendsQuery,
  useGetFriendRequestsQuery,
  useGetSuggestionsQuery,
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
} from '../../features/api/apiSlice';

// Utility function to get the first letter of the name
const getInitials = (name) => {
  if (!name) return "";
  return name.charAt(0).toUpperCase();
};

export default () => {
  const [activeTab, setActiveTab] = useState("friends");

  // Fetch data from the API
  const { data: friends = [], isLoading: isFriendsLoading } = useGetFriendsQuery();
  const { data: requests = [], isLoading: isRequestsLoading } = useGetFriendRequestsQuery();
  const { data: suggestions = [], isLoading: isSuggestionsLoading } = useGetSuggestionsQuery();

  // Mutations for friend requests
  const [sendFriendRequest] = useSendFriendRequestMutation();
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [rejectFriendRequest] = useRejectFriendRequestMutation();

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  // Handle sending a friend request
  const handleSendRequest = async (userId) => {
    try {
      const response = await sendFriendRequest(userId).unwrap();
      setToastMessage(response.message || "Friend request sent successfully");
      setToastVariant("success");
      setShowToast(true);
    } catch (error) {
      setToastMessage(error.data?.message || "Failed to send friend request");
      setToastVariant("danger");
      setShowToast(true);
    }
  };

  // Handle accepting a friend request
  const handleAcceptRequest = async (userId) => {
    try {
      const response = await acceptFriendRequest(userId).unwrap();
      setToastMessage(response.message || "Friend request accepted");
      setToastVariant("success");
      setShowToast(true);
    } catch (error) {
      setToastMessage(error.data?.message || "Failed to accept friend request");
      setToastVariant("danger");
      setShowToast(true);
    }
  };

  // Handle rejecting a friend request
  const handleRejectRequest = async (userId) => {
    try {
      const response = await rejectFriendRequest(userId).unwrap();
      setToastMessage(response.message || "Friend request rejected");
      setToastVariant("success");
      setShowToast(true);
    } catch (error) {
      setToastMessage(error.data?.message || "Failed to reject friend request");
      setToastVariant("danger");
      setShowToast(true);
    }
  };

  // Loading state
  if (isFriendsLoading || isRequestsLoading || isSuggestionsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item active>Friends</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Friends Management</h4>
          <p className="mb-0">
            Manage your friends, requests, and suggestions here.
          </p>
        </div>
      </div>

      <Tab.Container id="friends-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Card className="mb-4">
          <Card.Body>
            <Nav fill variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="friends">Friends</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="requests">Requests</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="suggestions">Suggestions</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Body>
        </Card>

        <Tab.Content>
          {/* Friends Tab */}
          <Tab.Pane eventKey="friends">
            <Card>
              <Card.Body>
                {friends.length > 0 ? (
                  friends.map((friend) => (
                    <div key={friend._id}>
                      <Row className="align-items-center mb-3">
                        <Col xs={8}>
                        <div className="d-flex align-items-center">
                          {friend.avatar ? (
                            <Image src={friend.avatar} roundedCircle width={40} height={40} className="me-3" />
                          ) : (
                            <div
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "18px",
                                fontWeight: "bold",
                                marginRight: "10px",
                              }}
                            >
                              {getInitials(friend.name)}
                            </div>
                          )}
                          <span>{friend.name}</span></div>
                        </Col>
                        <Col xs={4} className="text-end">
                          <Button variant="outline-primary" size="sm">
                            <FontAwesomeIcon icon={faComment} /> Chat
                          </Button>
                        </Col>
                      </Row>
                      <hr />
                    </div>
                  ))
                ) : (
                  <div className="text-center">
                    <p>No friends added yet.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Tab.Pane>

          {/* Requests Tab */}
          <Tab.Pane eventKey="requests">
            <Card>
              <Card.Body>
                {requests.length > 0 ? (
                  requests.map((request) => (
                    <div key={request._id}>
                      <Row className="align-items-center mb-3">
                        <Col xs={8}>
                        <div className="d-flex align-items-center">
                          {request.avatar ? (
                            <Image src={request.avatar} roundedCircle width={40} height={40} className="me-3" />
                          ) : (
                            <div
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "18px",
                                fontWeight: "bold",
                                marginRight: "10px",
                              }}
                            >
                              {getInitials(request.name)}
                            </div>
                          )}
                          <span>{request.name}</span></div>
                        </Col>
                        <Col xs={4} className="text-end">
                          <Button
                            variant="success"
                            size="sm"
                            className="me-2"
                            onClick={() => handleAcceptRequest(request._id)}
                          >
                            <FontAwesomeIcon icon={faCheck} /> Accept
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleRejectRequest(request._id)}
                          >
                            <FontAwesomeIcon icon={faTimes} /> Reject
                          </Button>
                        </Col>
                      </Row>
                      <hr />
                    </div>
                  ))
                ) : (
                  <div className="text-center">
                    <p>No friend requests pending.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Tab.Pane>

          {/* Suggestions Tab */}
          <Tab.Pane eventKey="suggestions">
            <Card>
              <Card.Body>
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion) => (
                    <div key={suggestion._id}>
                      <Row className="align-items-center mb-3">
                        <Col xs={8}>
                        <div className="d-flex align-items-center">
                          {suggestion.avatar ? (
                            <Image src={suggestion.avatar} roundedCircle width={40} height={40} className="me-3" />
                          ) : (
                            <div
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "18px",
                                fontWeight: "bold",
                                marginRight: "10px",
                              }}
                            >
                              {getInitials(suggestion.name)}
                            </div>
                          )}
                          <span>{suggestion.name}</span>
                          </div>
                        </Col>
                        <Col xs={4} className="text-end">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleSendRequest(suggestion._id)}
                          >
                            <FontAwesomeIcon icon={faUserPlus} /> Add Friend
                          </Button>
                        </Col>
                      </Row>
                      <hr />
                    </div>
                  ))
                ) : (
                  <div className="text-center">
                    <p>No friend suggestions available.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      
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