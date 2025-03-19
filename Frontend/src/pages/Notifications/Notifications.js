import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBell, faComment, faThumbsUp, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Breadcrumb, Badge } from '@themesberg/react-bootstrap';

export default () => {
  // Sample notifications data
  const notifications = [
    {
      id: 1,
      avatar: "https://i.pravatar.cc/150?img=1",
      name: "John Doe",
      message: "liked your post",
      icon: faThumbsUp,
      time: "3 sec ago",
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/150?img=2",
      name: "Jane Smith",
      message: "commented on your post",
      icon: faComment,
      time: "2 hours ago",
    },
    {
      id: 3,
      avatar: "https://i.pravatar.cc/150?img=3",
      name: "Alice Johnson",
      message: "started following you",
      icon: faUserPlus,
      time: "1 day ago",
    },
    {
      id: 4,
      avatar: "https://i.pravatar.cc/150?img=4",
      name: "Bob Brown",
      message: "liked your post",
      icon: faThumbsUp,
      time: "3 days ago",
    },
    {
      id: 5,
      avatar: "https://i.pravatar.cc/150?img=5",
      name: "Charlie Davis",
      message: "commented on your post",
      icon: faComment,
      time: "1 week ago",
    },
    {
      id: 6,
      avatar: "https://i.pravatar.cc/150?img=6",
      name: "Eve White",
      message: "started following you",
      icon: faUserPlus,
      time: "2 weeks ago",
    },
    {
      id: 7,
      avatar: "https://i.pravatar.cc/150?img=7",
      name: "Frank Wilson",
      message: "liked your post",
      icon: faThumbsUp,
      time: "1 month ago",
    },
    {
      id: 8,
      avatar: "https://i.pravatar.cc/150?img=8",
      name: "Grace Lee",
      message: "commented on your post",
      icon: faComment,
      time: "2 months ago",
    },
    {
      id: 9,
      avatar: "https://i.pravatar.cc/150?img=9",
      name: "Henry Moore",
      message: "started following you",
      icon: faUserPlus,
      time: "3 months ago",
    },
    {
      id: 10,
      avatar: "https://i.pravatar.cc/150?img=10",
      name: "Ivy Taylor",
      message: "liked your post",
      icon: faThumbsUp,
      time: "6 months ago",
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
          
            <Breadcrumb.Item active>Notifications</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Notifications</h4>
          <p className="mb-0">Your recent notifications are listed below.</p>
        </div>
      </div>

      {/* Notifications Card */}
      <Card border="light" className="shadow-sm">
        <Card.Body>
        
          {/* Notifications List */}
          {notifications.map((notification) => (
            <div key={notification.id}>
              <Row className="align-items-center mb-3">
                <Col xs={1} className="text-center">
                  <img
                    src={notification.avatar}
                    alt={notification.name}
                    className="rounded-circle"
                    width={40}
                    height={40}
                  />
                </Col>
                <Col xs={9}>
                  <p className="mb-0">
                    <strong>{notification.name}</strong> {notification.message}
                  </p>
                  <small className="text-muted">{notification.time}</small>
                </Col>
                <Col xs={2} className="text-end">
                  <FontAwesomeIcon icon={notification.icon} className="text-primary" />
                </Col>
              </Row>
              <hr className="my-2" />
            </div>
          ))}
        </Card.Body>
      </Card>
    </>
  );
};