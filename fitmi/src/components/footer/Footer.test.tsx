import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this line to extend jest-dom matchers
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './Footer';

test('renders footer component', () => {
  const { getByAltText, getByText } = render(
    <Router>
      <Footer />
    </Router>
  );

  // Test specific elements using the queries provided by @testing-library/react
  const logo = getByAltText('logo');
  const aboutUsLink = getByText('About Us');
  const deliveryLink = getByText('Delivery');
  const helpLink = getByText('Help & Support');
  const tcLink = getByText('T&C');
  const contactInfo = getByText('Contact: +91 123456789');

  // Assertions
  expect(logo).toBeInTheDocument();
  expect(aboutUsLink).toBeInTheDocument();
  expect(deliveryLink).toBeInTheDocument();
  expect(helpLink).toBeInTheDocument();
  expect(tcLink).toBeInTheDocument();
  expect(contactInfo).toBeInTheDocument();
});
