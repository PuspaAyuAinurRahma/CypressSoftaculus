const test_base_uri = Cypress.env('baseUrl');
describe('Cek Form Domain', function () {
    it('Melakukan Cek form Domain', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('.form-control')
            .should('be.visible');
        cy.get('.col-md-2 > .btn')
            .should('be.visible');

        //Layanan Regular top up
        cy.get('#tambahLayanan')
            .click();
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(4) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="12"]')
            .click();
        cy.get('[data-index="1"] > .panel-body > .maximize-panel > :nth-child(7) > .section-tambah-domain > .form-title')
            .should('not.be.visible');
        cy.get('[data-index="1"] > .panel-body > .maximize-panel > :nth-child(7) > .section-tambah-domain > .row > .col-md-10 > .form-group > .form-control')
            .should('not.be.visible');
        cy.get('[data-index="1"] > .panel-body > .maximize-panel > :nth-child(7) > .section-tambah-domain > .row > .col-md-2 > .btn')
            .should('not.be.visible');

        //Layanan Cpanel License
        cy.get('#tambahLayanan')
            .click();
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(4) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="16"]')
            .click();
        cy.get('[data-index="2"] > .panel-body > .maximize-panel > :nth-child(7) > .section-tambah-domain > .form-title')
            .should('not.be.visible');
        cy.get('[data-index="2"] > .panel-body > .maximize-panel > :nth-child(7) > .section-tambah-domain > .row > .col-md-10 > .form-group > .form-control')
            .should('not.be.visible');
        cy.get('[data-index="2"] > .panel-body > .maximize-panel > :nth-child(7) > .section-tambah-domain > .row > .col-md-2 > .btn')
            .should('not.be.visible');

        //Layanan VPS CLOUD
        cy.get('#tambahLayanan')
            .click();
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(1) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="1"]')
            .click();
        cy.get('[data-index="3"] > .panel-body > .maximize-panel > :nth-child(7) > .section-tambah-domain > .form-title')
            .should('not.be.visible');
        cy.get('[data-index="3"] > .panel-body > .maximize-panel > :nth-child(7) > .section-tambah-domain > .row > .col-md-10 > .form-group > .form-control')
            .should('not.be.visible');
        cy.get('[data-index="3"] > .panel-body > .maximize-panel > :nth-child(7) > .section-tambah-domain > .row > .col-md-2 > .btn')
            .should('not.be.visible');

        //Layanan Cloud Hosting
        cy.get('#tambahLayanan')
            .click();
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(2) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="2"]')
            .click();
        cy.get('#panel4 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .form-title')
            .should('be.visible');
        cy.get('#panel4 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-10 > .form-group > .form-control')
            .should('be.visible');
        cy.get('#panel4 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-2 > .btn')
            .should('be.visible');

        //Layanan Corporate Hosting
        cy.get('#tambahLayanan')
            .click();
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(2) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="9"]')
            .click();
        cy.get('#panel5 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .form-title')
            .should('be.visible');
        cy.get('#panel5 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-10 > .form-group > .form-control')
            .should('be.visible');
        cy.get('#panel5 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-2 > .btn')
            .should('be.visible');

        //Layanan jagoan hosting accelerator
        cy.get('#tambahLayanan')
            .click();
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(2) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="11"]')
            .click();
        cy.get('#panel6 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .form-title')
            .should('be.visible');
        cy.get('#panel6 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-10 > .form-group > .form-control')
            .should('be.visible');
        cy.get('#panel6 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-2 > .btn')
            .should('be.visible');

        //Layanan Mail Hosting
        cy.get('#tambahLayanan')
            .click();
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(3) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="3"]')
            .click();
        cy.get('#panel7 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .form-title')
            .should('be.visible');
        cy.get('#panel7 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-10 > .form-group > .form-control')
            .should('be.visible');
        cy.get('#panel7 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-2 > .btn')
            .should('be.visible');

        //Layanan Cloud Mail
        cy.get('#tambahLayanan')
            .click();
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(3) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="10"]')
            .click();
        cy.get('#panel8 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .form-title')
            .should('be.visible');
        cy.get('#panel8 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-10 > .form-group > .form-control')
            .should('be.visible');
        cy.get('#panel8 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-2 > .btn')
            .should('be.visible');

        //Layanan Jagoan SSL
        cy.get('#tambahLayanan')
            .click();
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(4) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="4"]')
            .click();
        cy.get('#panel9 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .form-title')
            .should('be.visible');
        cy.get('#panel9 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-10 > .form-group > .form-control')
            .should('be.visible');
        cy.get('#panel9 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-2 > .btn')
            .should('be.visible');

        //Layanan kica ssl
        cy.get('#tambahLayanan')
            .click();
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(4) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="5"]')
            .click();
        cy.get('#panel10 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .form-title')
            .should('be.visible')
        cy.get('#panel10 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-10 > .form-group > .form-control')
            .should('be.visible');
        cy.get('#panel10 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-2 > .btn')
            .should('be.visible');

    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});
