const test_base_uri = Cypress.env('baseUrl');
describe('Beli Domain Test', function () {
    it('Beli Domain', function () {
        cy.visit(test_base_uri+'/orders/domains');
        cy.get('.col-md-10 > .form-group > .form-control')
            .type('cobadomaintesting.com{enter}');
        cy.wait(3000);
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .name > .domain-name')
            .should('exist');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .should('exist')
            .and('to.contain','Rp. 142,000');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .should('exist');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .should('exist');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .select('2 Tahun');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .contains('Rp. 284,000');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .select('3 Tahun');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .contains('Rp. 426,000');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-default')
            .should('exist')
            .and('to.contain','Hapus');
        cy.get('.item > :nth-child(1) > .title')
            .contains('Registrasi Domain');
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(1)')
            .contains('cobadomaintesting.com');
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(2)')
            .contains('Rp. 426.000');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .select('1 Tahun');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .contains('Rp. 142,000');
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(2)')
            .contains('Rp. 142.000');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-default')
            .click();
        cy.get('.swal2-confirm')
            .click();
        cy.get('.swal2-confirm')
            .click();
        cy.get('.text-center > b')
            .contains('Keranjang belanjamu kosong, Sob.');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-default')
            .should('not.exist');
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});