import { render, screen } from "@testing-library/react"
import ContactForm from "./ContactForm"
import userEvent from "@testing-library/user-event";

describe('ContactForm (Conversational)', () => {
  it('should render the first question (customer type)', async () => {
    render(<ContactForm />);

    expect(screen.getByText(/Sei un../i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /privato/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /azienda/i })).toBeInTheDocument();
  })

  it('should show the input name after clicking privato', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const privateButton = await screen.findByRole('button', { name: /privato/i });

    await user.click(privateButton);



    expect(screen.queryByText(/Sei un.../i)).not.toBeInTheDocument();

    expect(await screen.findByLabelText(/qual è il tuo nome/i)).toBeInTheDocument();
  });

  it('should ask for the message after entering the email', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(await screen.findByRole('button', { name: /privato/i }));
    await user.type(screen.getByLabelText(/qual è il tuo nome?/i), 'Mario');
    await user.click(await screen.findByRole('button', { name: /avanti/i }));
    await user.click(await screen.findByRole('button', { name: /email/i }));



    await user.type(screen.getByLabelText(/qual è la tua email?/i), 'mario@test.com');
    const nextBtns = screen.getAllByRole('button', { name: /avanti/i });
    await user.click(nextBtns[nextBtns.length - 1]);

    expect(await screen.findByText(/a quale servizio sei interessato?/i)).toBeInTheDocument();

    expect(await screen.findByRole('button', { name: /pulizie condominiali/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /pulizie uffici/i })).toBeInTheDocument();
  })

  it('should ask for Company Name if "Azienda" is selected', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // 1. Clicca su Azienda
    await user.click(screen.getByRole('button', { name: /azienda/i }));

    // 2. Verifica: Deve chiedere il nome dell'azienda
    expect(await screen.findByLabelText(/come si chiama la tua azienda?/i)).toBeInTheDocument();

    // 3. Compila nome azienda e vai avanti
    await user.type(screen.getByLabelText(/come si chiama la tua azienda?/i), 'Tech Solutions');
    await user.click(screen.getByRole('button', { name: /avanti/i }));

    // 4. Verifica: Ora deve chiedere il nome del referente
    expect(await screen.findByLabelText(/qual è il tuo nome?/i)).toBeInTheDocument();
  });

  it('should ask for Phone Number if "Telefono" is selected', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // Navigazione rapida fino alla scelta metodo (come Privato)
    await user.click(screen.getByRole('button', { name: /privato/i }));
    await user.type(screen.getByLabelText(/qual è il tuo nome?/i), 'Mario');
    await user.click(screen.getByRole('button', { name: /avanti/i }));

    // 1. Clicca su Telefono
    await user.click(screen.getByRole('button', { name: /telefono/i }));

    // 2. Verifica: Input telefono
    expect(await screen.findByLabelText(/qual è il tuo numero di telefono?/i)).toBeInTheDocument();
  });
})
