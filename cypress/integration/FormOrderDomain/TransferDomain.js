const test_base_uri = Cypress.env('baseUrl');
describe('Domain Transfer Testing', function () {
    it('Tranfer', function () {
        cy.visit(test_base_uri+'/orders/domains');
        cy.get('.col-md-10 > .form-group > .form-control')
            .type('coba.com');
        cy.get('.col-md-2 > .btn')
            .click();
        cy.get('.tooltip-inner')
            .should('exist')
            .then(() => {
                cy.get('.name > .domain-name').should('exist');
                cy.get('.btn-transfer-domain').should('exist').and('to.contain','Transfer domain');
            });
        cy.get('.btn-transfer-domain')
            .click()
            .should(() => {
                expect('.domain-name').to.exist;
                expect('.flex-row > .form-control').to.exist;
                expect('.harga-asli').to.exist;
                expect('.submit-eppcode').to.exist;
            });
        cy.get('.flex-row > .form-control')
            .type('12345');
        cy.get('.submit-eppcode')
            .click()
            .should(() => {
                expect('.hasilpencarian-domain > .row > .col-md-12 > .display-domain > .name > .domain-name').to.exist;
                expect('.hasilpencarian-domain > .row > .col-md-12 > .display-domain > .flex-col').to.exist;
                expect('.hasilpencarian-domain > .row > .col-md-12 > .display-domain > .flex-row > .form-control').to.exist;
                expect('.delete-eppcode').to.exist;
            });
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(1)')
            .should('to.contain', 'coba.com');
        cy.get('.price')
            .should('to.contain', 'Rp. 159.500');
        cy.get('.delete-eppcode')
            .should('exist')
            .and('to.contain', 'Hapus');

        //Melakukan hapus domain
        cy.get('.delete-eppcode')
            .click()
            .should(() => {
                expect('.swal2-popup').to.exist;
                expect('.swal2-confirm').to.exist;
            });
        cy.get('.swal2-confirm')
            .click()
            .should(() => {
                expect('.swal2-popup').to.exist;
                expect('.swal2-confirm').to.exist;
            });
        cy.get('.swal2-confirm').click();
        cy.get('.panel-body > :nth-child(1) > :nth-child(3) > :nth-child(1)')
            .should('not.exist');

        cy.get('.text-center > b')
            .contains('Keranjang belanjamu kosong, Sob.');
        cy.get('.domain-name')
            .should('not.exist');

        //Cek domain serupa
        cy.get('.section-domain-serupa')
            .should('exist');
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});