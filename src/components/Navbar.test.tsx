import Navbar from './Navbar';
import { render, screen } from '@testing-library/react';

describe(`Navbar componenet`, () => {
  it(`should contain the company name`, () => {
    render(<Navbar />)

    const logoLink = screen.getByRole(`link`, { name: /ae service/i });

    expect(logoLink).toBeInTheDocument();
  })

  it(`should contain the navigation links`, () => {
    render(<Navbar />)

    const servicesLinks = screen.getByRole('link', { name: /servizi/i });
    const whoAreWeLink = screen.getByRole('link', { name: /chi siamo/i });
    const contactLink = screen.getByRole('link', { name: /contatti/i });

    expect(servicesLinks).toBeInTheDocument();
    expect(whoAreWeLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();

  })


  it(`snapshot `, () => {
    const { container } = render(<Navbar />);
    expect(container).toMatchSnapshot();
  })
})
