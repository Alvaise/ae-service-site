import { render, screen } from "@testing-library/react"
import About from "./About";

describe(`About component`, () => {
  it(`should render the title, description, and team image`, () => {
    render(<About />);

    const title = screen.getByRole('heading', {
      name: /chi siamo/i,
      level: 2,
    });

    const text = screen.getByText(/Fondata sulla passione per l'ordine e la cura dei dettagli/i);
    const image = screen.getByAltText(/Il team di AE Service/i)
    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /il nostro team/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByAltText(/ritratto di elena rossi/i)).toBeInTheDocument();
    expect(screen.getByAltText(/ritratto di marco bianchi/i)).toBeInTheDocument();
    expect(screen.getByAltText(/ritratto di sara gallo/i)).toBeInTheDocument();
    expect(screen.getByAltText(/ritratto di luca ferrero/i)).toBeInTheDocument();
    expect(screen.getByAltText(/ritratto di giulia conti/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /elena rossi/i })).toBeInTheDocument();
  })
})
