import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faBlog, faEnvelope, faGlobe, faCode, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Col, Row } from '@themesberg/react-bootstrap';
import Profile1 from "../../assets/img/team/profile-picture-1.jpg";
import ProfileCover from "../../assets/img/profile-cover.jpg";

export default () => {
  return (
    <>
      {/* Profile Card */}
      <Col xs={12} md={12} sm={12} lg={12} xl={12} className="mb-4">
        <Card border="light" className="text-center p-0">
          <div
            style={{ backgroundImage: `url(${ProfileCover})`, height: "200px", backgroundSize: "cover" }}
            className="profile-cover rounded-top"
          />
          <Card.Body className="pb-5">
            <Card.Img
              src={Profile1}
              alt="Neil Portrait"
              className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
            />
            <Card.Title>Neil Sims</Card.Title>
            <Card.Subtitle className="fw-normal">Senior Software Engineer</Card.Subtitle>
            <Card.Text className="text-gray mb-4">New York, USA</Card.Text>

            <Button variant="primary" size="sm" className="me-2">
              <FontAwesomeIcon icon={faUserPlus} className="me-1" /> Connect
            </Button>
            <Button variant="secondary" size="sm">
              Send Message
            </Button>
          </Card.Body>
        </Card>
      </Col>

      {/* Additional Profile Information Card */}
      <Col xs={12} md={12} sm={12} lg={12} xl={12} className="mb-4">
        <Card border="light">
          <Card.Body>
            <Card.Title>About Me</Card.Title>
            <Card.Text className="text-gray mb-4">
              Hi, I'm Neil Sims, a Senior Software Engineer with over 10 years of experience in building scalable web applications.
              I specialize in React, Node.js, and cloud technologies. I love sharing my knowledge through blogs and tutorials.
              When I'm not coding, I enjoy hiking, photography, and exploring new cuisines.
            </Card.Text>

            <Row className="mb-4">
              <Col xs={6} className="text-center">
                <FontAwesomeIcon icon={faBlog} className="text-primary mb-2" size="2x" />
                <h5>Uploaded Blogs</h5>
                <p className="text-gray">42</p>
              </Col>
              <Col xs={6} className="text-center">
                <FontAwesomeIcon icon={faHeart} className="text-danger mb-2" size="2x" />
                <h5>Interests</h5>
                <p className="text-gray">Coding, Travel, Photography</p>
              </Col>
            </Row>

            <Card.Title>Skills</Card.Title>
            <div className="d-flex flex-wrap gap-2 mb-4">
              <Button variant="outline-primary" size="sm">React</Button>
              <Button variant="outline-primary" size="sm">Node.js</Button>
              <Button variant="outline-primary" size="sm">JavaScript</Button>
              <Button variant="outline-primary" size="sm">AWS</Button>
              <Button variant="outline-primary" size="sm">Docker</Button>
            </div>

            <Card.Title>Connect With Me</Card.Title>
            <div className="d-flex gap-3">
              <Button variant="outline-secondary" size="sm">
                <FontAwesomeIcon icon={faEnvelope} className="me-1" /> Email
              </Button>
              <Button variant="outline-secondary" size="sm">
                <FontAwesomeIcon icon={faGlobe} className="me-1" /> Website
              </Button>
              <Button variant="outline-secondary" size="sm">
                <FontAwesomeIcon icon={faCode} className="me-1" /> Portfolio
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};