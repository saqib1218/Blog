import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup, Toast } from '@themesberg/react-bootstrap';
import { Link, useHistory } from 'react-router-dom'; // Use useHistory instead of useNavigate
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice'; // Import setCredentials action
import { useAuth } from '../../hooks/useAuth'; // Import useAuth hook
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";

export default () => {
  const dispatch = useDispatch();
  const history = useHistory(); // Use useHistory for navigation
  const { loginUser } = useAuth(); // Use the loginUser mutation
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // State for toast visibility and message
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success'); // 'success' or 'danger'

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the login API
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      // Store the token and user data in the Redux state and localStorage
      dispatch(setCredentials({ token: response.token, user: response.user }));
console.log(response)
      // Show success toast
      setToastMessage('Login successful!');
      setToastVariant('success');
      setShowToast(true);

      // Redirect to the dashboard
      history.push(Routes.DashboardOverview.path); // Use history.push for navigation
    } catch (error) {
      // Show error toast
      setToastMessage(error.data?.message || 'Login failed');
      setToastVariant('danger');
      setShowToast(true);
      console.error('Login failed:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="email"
                        placeholder="example@company.com"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">Lost password?</Card.Link>
                    </div>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div>
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
        </Container>
      </section>
    </main>
  );
};