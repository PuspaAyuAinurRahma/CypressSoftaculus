const test_base_uri = Cypress.env('baseUrl');
describe('Add Domain Test', function () {
    it('Cek + Tambah Domain Serupa', function () {
        cy.visit(test_base_uri+'/orders/domains');
        cy.get('.col-md-10 > .form-group > .form-control')
            .type('cobadomaintesting.com{enter}');
        cy.wait(3000);
        cy.get('.show-domain-serupa > :nth-child(1) > .col-md-12 > .display-domain')
            .should('exist');
        cy.get('.title-spotlight')
            .contains('Domain Serupa');
        cy.get('.tutup-spotlight')
            .should('exist')
            .and('to.contain','Tutup');
        cy.get('.tutup-spotlight')
            .click();
        cy.get('.buka-spotlight')
            .should('exist')
            .and('to.contain','Buka');
        cy.get('.buka-spotlight')
            .click();
        cy.get('.show-domain-serupa > :nth-child(1) > .col-md-12 > .display-domain')
            .should('exist');
        cy.get('.tutup-spotlight')
            .should('exist')
            .and('to.contain','Tutup');
        cy.get(':nth-child(3) > .col-md-12 > .btn')
            .should('exist')
            .and('to.contain','Lihat lebih banyak');
        cy.get(':nth-child(3) > .col-md-12 > .btn')
            .click();
        cy.get(':nth-child(4) > .col-md-12 > .display-domain')
            .should('exist');

        // Tambah Domain Serupa
        cy.get('.show-domain-serupa > :nth-child(1) > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('.header-left-panel > .title')
            .contains('Layanan yang kamu beli - Domain Baru');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .name > .domain-name')
            .should('exist');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .should('exist');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .should('exist');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-default')
            .should('exist');
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(1)')
            .should('exist')
            .and('to.contain','cobadomaintesting.store');
        cy.get('.price')
            .contains('Rp. 19.800');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .select('2 Tahun');
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(2)')
            .contains('Rp. 568.000');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col')
            .contains('Rp. 568,000');
        cy.get('.price')
            .contains('Rp. 624.800');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .select('3 Tahun');
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(2)')
            .contains('Rp. 1.118.000');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col')
            .contains('Rp. 1,118,000');
        cy.get('.price')
            .contains('Rp. 1.229.800');

        // Cek Domain Serupa lagi
        cy.get('.col-md-10 > .form-group > .form-control')
            .clear();
        cy.get('.col-md-10 > .form-group > .form-control')
            .type('cobadomaintestingpartdua.com{enter}');
        cy.wait(3000);
        cy.get('.show-domain-serupa > :nth-child(1) > .col-md-12 > .display-domain')
            .should('exist');
        cy.get('.title-spotlight')
            .contains('Domain Serupa');
        cy.get('.tutup-spotlight')
            .should('exist')
            .and('to.contain','Tutup');
        cy.get('.tutup-spotlight')
            .click();
        cy.get('.buka-spotlight')
            .should('exist')
            .and('to.contain','Buka');
        cy.get('.buka-spotlight')
            .click();
        cy.get('.show-domain-serupa > :nth-child(1) > .col-md-12 > .display-domain')
            .should('exist');
        cy.get('.tutup-spotlight')
            .should('exist')
            .and('to.contain','Tutup');
        cy.get(':nth-child(3) > .col-md-12 > .btn')
            .should('exist')
            .and('to.contain','Lihat lebih banyak');
        cy.get(':nth-child(3) > .col-md-12 > .btn')
            .click();
        cy.get(':nth-child(4) > .col-md-12 > .display-domain')
            .should('exist');
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});