const test_base_uri = Cypress.env('baseUrl');
describe('Checkout', function () {
    it('Layanan cloud hosting', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cobacheckout.com');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.wait(3000);
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#gunakan-kupon')
            .click();
        cy.wait(3000);
        cy.get(':nth-child(2) > .form-control')
            .type('mala@jagoanhosting.com');
        cy.get('#login-form > :nth-child(3) > .form-control')
            .type('jagoan123');
        cy.get('.btn-login > .btn')
            .click();
        cy.get('.col-md-8 > .form-group > .form-control')
            .type('000DISCIDFAME');
        cy.get('[name="cek-kupon"]')
            .click();
        cy.get('.swal2-confirm')
            .click();
        cy.get('.show-promo > :nth-child(2) > :nth-child(2)')
            .should('to.contain','- Rp. 50.000');
        //Melakukan checkout
        cy.get('#payment-btn')
            .click();
        cy.wait(3000);
        cy.get('#beoncustomorderchoosepayment > .modal-dialog > .modal-content > .modal-header')
            .should('to.contain','Pilih Metode Pembayaran');
        cy.wait(3000);
        cy.get('#headingovo > .panel-title > .collapsed')
            .click();
        cy.get('#collapseovo > .panel-body > .row > .col-md-12 > .btn')
            .click();
        cy.wait(10000);
        cy.get('.col-sm-8 > h3')
            .should('to.contain','Invoice');
        //Cek detail invoice
        cy.get('.col-md-6 > :nth-child(2) > a')
            .click();
        cy.get('tbody > :nth-child(1) > .text-center')
            .should('to.contain','Rp. -50,000');
        cy.get('tbody > :nth-child(2) > .text-center')
            .should('to.contain','Rp. 144,000');
        //Cek cache
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('#item-cart > .item')
            .should('not.to.contain','cobacheckout.com');
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});