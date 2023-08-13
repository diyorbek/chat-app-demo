describe('Login page', () => {
  it('should successfully login', () => {
    cy.intercept('**/api/auth/sign-in/', {
      token: '1234',
    }).as('loginRequest');
    cy.intercept('**/api/auth/who-am-i/', {}).as('whoami');

    cy.visit('/login');

    cy.findByLabelText('Email').type('diyorbek@google.com');
    cy.findByLabelText('Password').type('12345');
    cy.findByRole('button', { name: 'Sign In' }).click();

    cy.wait('@loginRequest');

    cy.location('pathname').should('eq', '/active');
  });

  it('should show validation errors', () => {
    const requestHandler: RequestHandler = (req) => {
      req.reply({ token: '1234' });
    };
    const requestHandlerSpy = cy
      .spy(requestHandler as () => void)
      .as('loginRequestSpy');

    cy.intercept('**/api/auth/sign-in/', requestHandlerSpy);

    cy.visit('/login');

    cy.findByLabelText('login form').within(() => {
      cy.findByRole('button').click();

      cy.get('@loginRequestSpy').should('not.have.been.called');

      cy.findByText('Email is required').should('exist');
      cy.findByText('Password is required').should('exist');
    });
  });
});

type RequestHandler = Parameters<typeof cy.intercept>[2];
