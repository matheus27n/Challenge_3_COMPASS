import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios'; // Import axios mock here if needed
import { useNavigate } from 'react-router-dom'; // Import a mock for useNavigate if needed
import Login from './Login';

jest.mock('axios'); // Mock axios module

describe('Login Component', () => {
  test('renders login form', () => {
    render(<Login />);
    
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');
    
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('handles login form submission successfully', async () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    axios.post.mockResolvedValue({ data: {
        logIn: {
            viewer: {
                user: {
                    id: 'testuserid',
                    createdAt: '2021-08-19T01:07:27.302Z'
                },
                
     } });

    render(<Login />);

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testpassword' } });
    fireEvent.click(screen.getByText('Login'));

    expect(axios.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object),
      expect.any(Object)
    );
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
