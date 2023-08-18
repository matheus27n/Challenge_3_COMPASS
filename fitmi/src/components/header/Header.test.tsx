import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

describe('Header Component', () => {
  test('renders logo', () => {
    render(<Header setFiltro={jest.fn()} />);

    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  test('toggles menu on click', () => {
    render(<Header setFiltro={jest.fn()} />);

    const menuHamburguer = screen.getByAltText('menu');
    fireEvent.click(menuHamburguer);

    const overlay = screen.getByTestId('overlay');
    expect(overlay).toBeInTheDocument();

    fireEvent.click(menuHamburguer);
    expect(overlay).not.toBeInTheDocument();
  });

  test('updates filtro value on input change', () => {
    const setFiltroMock = jest.fn();
    render(<Header setFiltro={setFiltroMock} />);

    const input = screen.getByPlaceholderText('Enter item or restaurant you are looking for');
    fireEvent.change(input, { target: { value: 'Pizza' } });

    expect(setFiltroMock).toHaveBeenCalledWith('Pizza');
  });
});
