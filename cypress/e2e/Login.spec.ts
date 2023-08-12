describe('Login page', () => {
  it('should successfully login', () => {
    cy.intercept('http://localhost:5173/api/auth/sign-in/', {
      token: '1234',
    }).as('loginRequest');
    cy.intercept('http://localhost:5173/api/auth/who-am-i/', {}).as('whoami');

    cy.visit('http://localhost:5173/login');

    cy.get('input[name="email"]').type('diyorbek@google.com');
    cy.get('input[name="password"]').type('12345');
    cy.get('button').click();

    cy.wait('@loginRequest');

    cy.location('pathname').should('eq', '/active');
  });

  it('should show validation errors', () => {
    const requestHandler: Parameters<typeof cy.intercept>[2] = (req) => {
      req.reply({ token: '1234' });
    };
    const requestHandlerSpy = cy
      .spy(requestHandler as () => void)
      .as('loginRequestSpy');

    cy.intercept('http://localhost:5173/api/auth/sign-in/', requestHandlerSpy);

    cy.visit('http://localhost:5173/login');

    cy.findByText('let').should('exist');

    cy.get('button').click();
    cy.get('@loginRequestSpy').should('not.have.been.called');
    cy.get(`#\\:r1\\:-helper-text`).should('have.text', 'Email is required');
    cy.get(`#\\:r3\\:-helper-text`).should('have.text', 'Password is required');
  });
});
