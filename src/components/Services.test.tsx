import { render, screen } from "@testing-library/react"
import Services from "./Services"

describe(`Services Component`, () => {
  it(`should render the section title and services cards`, () => {
    render(<Services />)

    expect(screen.getByRole('heading', { name: /i nostri servizi/i, level: 2 })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /pulizie condominiali/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /pulizie commerciali/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /pulizie di fondo/i, level: 3 })).toBeInTheDocument();

    expect(screen.getByText(/servizio puntuale/i)).toBeInTheDocument();
  })
})
