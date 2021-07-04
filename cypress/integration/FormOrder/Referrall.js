const test_base_uri = Cypress.env('baseUrl');
let Invoice;
const uuid = () => Cypress._.random(0, 1e6);
const id = uuid();
const testname = `referral${id}`;

describe('Beli layanan dengan referral id', function () {
    it('Melakukan pembelian layanan id fame denggan referral id sendiri', function () {
        cy.visit(test_base_uri+'/orders/products/421?refcode=E222CDA2', {failOnStatusCode: false});
        cy.get('.show-promo')
            .should('be.visible');
        cy.get('.show-promo > :nth-child(1) > .title')
            .should('be.visible');
        cy.get('.show-promo > :nth-child(2) > :nth-child(1)')
            .should('be.visible');
        cy.get('.show-promo > :nth-child(2) > :nth-child(2)')
            .contains('- Rp. 50.000');

        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .select_ul > :nth-child(4)')
            .click();
        cy.get('.show-promo > :nth-child(2) > :nth-child(2)')
            .contains('- Rp. 0');

        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type(testname);
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type(".com");
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#item-cart > .item > :nth-child(4)')
            .should('be.visible');

        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .select_ul > :nth-child(1)')
            .click();

        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type(testname+".com");
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.wait(3000);
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#payment-btn')
            .click();

        cy.wait(2000);
        cy.get(':nth-child(2) > .form-control')
            .type('testbeon2@gmail.com');
        cy.get('#login-form > :nth-child(3) > .form-control')
            .type('jagoan123');
        cy.get('.btn-login > .btn')
            .click();

        cy.get('.swal2-popup')
            .contains('Kode promo referral tidak bisa kamu gunakan pada akun yang sama!');

    });
    it('Melakukan pembelian layanan id fame denggan referral id', function () {
        cy.visit(test_base_uri+'/orders/products/421?refcode=E222CDA2', {failOnStatusCode: false});
        cy.get('.show-promo')
            .should('be.visible');
        cy.get('.show-promo > :nth-child(1) > .title')
            .should('be.visible');
        cy.get('.show-promo > :nth-child(2) > :nth-child(1)')
            .should('be.visible');
        cy.get('.show-promo > :nth-child(2) > :nth-child(2)')
            .contains('- Rp. 50.000');

        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .select_ul > :nth-child(4)')
            .click();
        cy.get('.show-promo > :nth-child(2) > :nth-child(2)')
            .contains('- Rp. 0');

        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('coba.com');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.get('.btn-gunakan-domain')
            .click();

        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .select_ul > :nth-child(1)')
            .click();

        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('coba.com');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.wait(3000);
        cy.get('.btn-gunakan-domain')
            .click();
        cy.get('#payment-btn')
            .click();

        cy.wait(2000);
        cy.get(':nth-child(2) > .form-control')
            .type('mala@jagoanhosting.com');
        cy.get('#login-form > :nth-child(3) > .form-control')
            .type('jagoan123');
        cy.get('.btn-login > .btn')
            .click();
        cy.wait(2000);
        cy.get('#payment-btn')
            .click();
        cy.get('#headingovo > .panel-title > .choose-payment-item-btn')
            .click();
        cy.get('#collapseovo > .panel-body > .row > .col-md-12 > .btn')
            .click();

        cy.get('.col-sm-8 > h3 > strong').invoke('text').then(invoice => {
            Invoice = invoice.split("#")[1];
            cy.visit(test_base_uri+'/beontop', {failOnStatusCode: false});
            cy.get(':nth-child(4) > .form-control')
                .type('api');
            cy.get(':nth-child(5) > .form-control')
                .type('28ER67fi');
            cy.get('.col-sm-5 > .btn')
                .click();
            cy.get('#intellisearchval')
                .type(Invoice);
            cy.get('#btnIntelliSearch > .fas')
                .click();
            cy.get('#searchresults > :nth-child(2) > a')
                .click();
            cy.get('#tabLink2')
                .click();
            cy.get('#btnAddPayment')
                .click();
        });

        cy.visit(test_base_uri+'/clientarea.php', {failOnStatusCode: false});
        cy.get('#Secondary_Navbar-Account > .dropdown-toggle')
            .click();
        cy.get('#Secondary_Navbar-Account-Referral > a')
            .click();
        cy.get('#Primary_Sidebar-secondary-menu-history')
            .click();

    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});