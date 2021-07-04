const test_base_uri = Cypress.env('baseUrl');
describe('Minimize and maximize', function () {
    it('Minimize and maximize Page', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cypress-form-order.com');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        //Tambah Layanan dan gunakan domain
        cy.get('#tambahLayanan')
            .click();
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(1) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="1"]')
            .click();
        cy.get('[data-index="1"] > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-10 > .form-group > .form-control')
            .type('domainesia.com');
        cy.get('[data-index="1"] > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-2 > .btn')
            .click();
        cy.wait(8000);
        cy.get('.btn-gunakan-domain')
            .click();
        cy.get('.btn-gunakan-domain').should('be.disabled');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(1)')
            .should('to.contain', 'ID FAME');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(1)')
            .should('to.contain', 'domainesia.com');

        //Tambah layanan dan transfer domain
        cy.get('#tambahLayanan')
            .click();
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(1) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="1"]')
            .click();
        cy.get('[data-index="2"] > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-10 > .form-group > .form-control')
            .type('qw.com');
        cy.wait(3000);
        cy.get('[data-index="2"] > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-2 > .btn')
            .click();
        cy.get('[data-index="2"] > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .hasilpencarian-domain > .wrapper-domain-nonavailable > .col-md-12 > .display-domain > .flex > .btn-transfer-domain')
            .click();
        cy.get('[data-index="2"] > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .hasilpencarian-domain > .row > .col-md-12 > .display-domain > .flex-row > .form-control')
            .type('12345');
        cy.get('.submit-eppcode')
            .click();
        cy.get('#item-cart > :nth-child(3) > :nth-child(2) > :nth-child(1)')
            .should('to.contain', 'ID FAME');
        cy.get('#item-cart > :nth-child(3) > :nth-child(2) > :nth-child(2)')
            .should('to.contain', 'Rp. 144.000');
        cy.get(':nth-child(3) > :nth-child(4)')
            .should('to.contain', 'qw.com');
        cy.get(':nth-child(3) > :nth-child(4) > :nth-child(2)')
            .should('to.contain', 'Rp. 145.000');

        cy.get('.price')
            .should('to.contain', 'Rp. 790.900');

        //Maximize layanan pertama
        cy.get('[data-index="0"] > .panel-body > .minimize-panel > :nth-child(1) > span')
            .should('exist');
        cy.get('[data-index="0"] > .panel-body > .minimize-panel > :nth-child(2) > span')
            .should('exist');
        cy.get('#panel0 > .panel-heading > .flex-row > .header-right-panel > .flex > .maximize-icon > .fas')
            .click();
        cy.get('[data-index="0"] > .panel-body > .minimize-panel > :nth-child(1) > span')
            .should('not.be.visible');
        cy.get('[data-index="0"] > .panel-body > .minimize-panel > :nth-child(2) > span')
            .should('not.be.visible');

        cy.reload()
            .should(() => {
                expect('[data-index="0"] > .panel-body > .minimize-panel > :nth-child(1) > span').to.exist;
                expect('[data-index="0"] > .panel-body > .minimize-panel > :nth-child(2) > span').to.exist;
                expect('[data-index="0"] > .panel-heading > .flex-row > .header-right-panel > .flex > .maximize-icon > .fas').to.exist;
            });

        //Minimize layanan pertama
        cy.get('#panel0 > .panel-heading > .flex-row > .header-right-panel > .flex > .minimize-icon > .fas')
            .click();
        cy.get('[data-index="0"] > .panel-body > .minimize-panel > :nth-child(1) > span')
            .should('exist');
        cy.get('[data-index="0"] > .panel-body > .minimize-panel > :nth-child(2) > span')
            .should('exist');

        cy.reload()
            .should(() => {
                expect('#panel0 > .panel-body > .maximize-panel > :nth-child(1) > .section-pilihpaket > .dropdown_select_wrapper > .default_option > li').not.to.visible;
                expect('#panel0 > .panel-body > .maximize-panel > :nth-child(2) > .section-billingcycle > .dropdown_select_wrapper > .default_option > li').not.to.visible;
                expect('[data-index="2"] > .panel-heading > .flex-row > .header-right-panel > .flex > .minimize-icon > .fas').to.exist;
            });

        //Cek onclick cart
        cy.get('#item-cart > :nth-child(2) > :nth-child(1) > .title')
            .click()
            .should('have.attr', 'data-attr-scroll');
        cy.get('#panel0 > .panel-heading > .flex-row > .header-right-panel > .flex > .maximize-icon > .fas')
            .should('exist');
        cy.get('#panel0 > .panel-heading > .flex-row > .header-right-panel > .flex > .minimize-icon > .fas')
            .should('not.to', 'exist');
        cy.get('#panel2 > .panel-heading > .flex-row > .header-right-panel > .flex > .maximize-icon > .fas')
            .should('exist');
        cy.get('#panel2 > .panel-heading > .flex-row > .header-right-panel > .flex > .minimize-icon > .fas')
            .should('not.to', 'exist');
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});