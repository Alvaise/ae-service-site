import * as rtl from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from './Hero';
describe('Hero component', () => {
  it('should show title,  subtitle and the CTA button', () => {

    rtl.render(<Hero />);

    const title = rtl.screen.getByRole('heading', {
      name: /esigenza di pulito/i
    });

    const subtitle = rtl.screen.getByText(
      /Affidabilità e dettagli che fanno la differenza per la tua casa e la tua azienda./i
    );

    const button = rtl.screen.getByRole('button', {
      name: /richiedi un preventivo/i
    });

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it(`snapshot `, () => {
    const { container } = rtl.render(<Hero />);
    expect(container).toMatchSnapshot();
  })
});
