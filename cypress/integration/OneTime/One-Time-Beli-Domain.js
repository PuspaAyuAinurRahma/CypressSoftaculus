const test_base_uri = Cypress.env('baseUrl');
describe('One Time Hosting Test', function () {
    it('Beli Domain', function () {
        cy.visit(test_base_uri+'/clientarea.php', {failOnStatusCode: false});
        cy.get('#inputEmail')
            .type('puspaayurahma62@gmail.com')
            .should('have.value', 'puspaayurahma62@gmail.com');
        cy.get('#inputPassword')
            .type('Puspaayu01')
            .should('have.value','Puspaayu01');
        cy.get('form').submit();

        cy.visit(test_base_uri+'/cart.php?gid=100', {failOnStatusCode: false});
        cy.get('a.btn-ellipse.btn.btn-primary.btn-sm')
            .eq(0)
            .click();
        cy.get('input#registersld.form-control.validity-domain')
            .type('review-onetime-rabuuuu'); //ini perlu diganti setiap ngerun
        cy.get('button#registerDomainButton.btn.btn-orange.btn-block')
            .click();
        cy.wait(10000);
        cy.get('button#continue-addcart-btn.btn.btn-lg.btn-pink.btn-block')
            .click();
        cy.get('div.icheckbox_square-blue')
            .click();
        cy.get('a#choose-payment-btn.btn.btn-pink.btn-block.btn-lg')
            .click();
        cy.get('a.choose-payment-item-btn.collapsed')
            .eq(0)
            .click();
        cy.get('button.btn.btn-pink.btn-block.btn-select-payment')
            .eq(0)
            .click({force: true});
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
    });
});