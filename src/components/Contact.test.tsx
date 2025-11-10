import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import Contact from "./Contact";
import { beforeEach } from "node:test";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
) as jest.Mock;

describe(`Contact component`, () => {
  it(`should render the contact form with all fields`, () => {
    render(<Contact />);

    expect(screen.getByRole('heading', { name: /contattaci/i, level: 2 })).toBeInTheDocument();

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/messaggio/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /invia richiesta/i })).toBeInTheDocument();
  })

  it('should show a validation error if the email is invalid', async () => {

    const user = userEvent.setup();

    render(<Contact />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /invia richiesta/i });

    await user.type(emailInput, 'test.com');

    await user.click(submitButton);

    const errorMessage = await screen.findByText(/inserisci un indirizzo email valido/i);

    expect(errorMessage).toBeInTheDocument();
  })

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  })

  it('should send the contactData and show a success message', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText(/nome/i), 'Mario Rossi');
    await user.type(screen.getByLabelText(/email/i), 'mario@example.com');
    await user.type(screen.getByLabelText(/messaggio/i), 'Vorrei un preventivo.');

    const submitButton = screen.getByRole('button', { name: /invia richiesta/i });
    await user.click(submitButton);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/api/send', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({
        name: 'Mario Rossi',
        email: 'mario@example.com',
        message: 'Vorrei un preventivo.'
      })
    }))

    const successMessage = await screen.findByText(/messaggio inviato con successo/i);
    expect(successMessage).toBeInTheDocument();
  })
})
