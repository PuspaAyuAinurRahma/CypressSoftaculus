const test_base_uri = Cypress.env('baseUrl');
describe('Cek Domain Gratis', function () {
    it('Informasi Free Domain', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option')
            .click()
            .then(() => {
                cy.get('.section-pilihpaket > .dropdown_select_wrapper > .select_ul > :nth-child(3)')
                    .click();
            });
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option')
            .click()
            .then(() => {
                cy.get('.select_ul > :nth-child(5)')
                    .click();
            });
        cy.get('.align-items-center > .panel-penawaran')
            .should('exist')
            .should('to','visible');
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option')
            .click()
            .then(() => {
                cy.get('.section-billingcycle > .dropdown_select_wrapper > .select_ul > :nth-child(4)')
                    .click();
            });
        cy.get('.align-items-center > .panel-penawaran')
            .should('exist')
            .should('to','visible');
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option')
            .click();
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .select_ul > :nth-child(1)')
            .click();
        cy.get('.align-items-center > .panel-penawaran')
            .should('not.be.visible');
    });
    it('Harga Domain Com CH SuperStar', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option')
            .click()
            .then(() => {
                cy.get('.section-pilihpaket > .dropdown_select_wrapper > .select_ul > :nth-child(3)')
                    .click();
            });
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option')
            .click()
            .then(() => {
                cy.get('.select_ul > :nth-child(5)')
                    .click();
            });
        cy.get('.col-md-10 > .form-group > .form-control')
            .type('cobacobacoba.com');
        cy.get('.col-md-2 > .btn')
            .click();
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .should('to.contain','FREE');
        cy.get(':nth-child(4) > :nth-child(2) > .label')
            .should('to.contain','FREE');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .should('be.disabled');
        cy.get('.price')
            .should('to.contain','Rp. 1.320.000');

        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option')
            .click();
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .select_ul > :nth-child(3)')
            .click();
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .should('not.to.contain','FREE');
        cy.get('.item > :nth-child(4) > :nth-child(2)')
            .should('not.to.contain','FREE');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .should('not.be.disabled');
        cy.get('.price')
            .should('to.contain','Rp. 519.200');

        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option')
            .click();
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .select_ul > :nth-child(2)')
            .click();
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .should('not.to.contain','FREE');
        cy.get('.item > :nth-child(4) > :nth-child(2)')
            .should('not.to.contain','FREE');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .should('not.be.disabled');
        cy.get('.price')
            .should('to.contain','Rp. 337.700');

        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option')
            .click();
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .select_ul > :nth-child(1)')
            .click();
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .should('not.to.contain','FREE');
        cy.get('.item > :nth-child(4) > :nth-child(2)')
            .should('not.to.contain','FREE');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .should('not.be.disabled');
        cy.get('.price')
            .should('to.contain','Rp. 216.700');

        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option')
            .click();
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .select_ul > :nth-child(4)')
            .click();
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .should('to.contain','FREE');
        cy.get('.item > :nth-child(4) > :nth-child(2)')
            .should('to.contain','FREE');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .should('be.disabled');
        cy.get('.price')
            .should('to.contain','Rp. 660.000');
    });
    it('Harga Domain Com CH SuperStar - Transfer Domain', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option')
            .click()
            .then(() => {
                cy.get('.section-pilihpaket > .dropdown_select_wrapper > .select_ul > :nth-child(3)')
                    .click();
            });
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option')
            .click()
            .then(() => {
                cy.get('.select_ul > :nth-child(5)')
                    .click();
            });
        cy.get('.col-md-10 > .form-group > .form-control')
            .type('niagahoster.com');
        cy.get('.col-md-2 > .btn')
            .click();
        cy.get('.btn-transfer-domain')
            .click();
        cy.get('.hasilpencarian-domain > .row > .col-md-12 > .display-domain > .flex-row > .form-control')
            .type('12345');
        cy.get('.submit-eppcode')
            .click();
        cy.get('#item-cart > :nth-child(1) > :nth-child(4) > :nth-child(2)')
            .should('to.contain','FREE');
        cy.get('.hasilpencarian-domain > .row > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .should('to.contain','FREE');
        cy.get('.hasilpencarian-domain > .row > .col-md-12 > .display-domain > .flex-row > .form-control')
            .should('be.disabled');
        cy.get('.price')
            .should('to.contain','Rp. 1.320.000');
    });
    it('Harga Domain Com CH Fame', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option')
            .click()
            .then(() => {
                cy.get('.select_ul > :nth-child(5)')
                    .click();
            });
        cy.get('.col-md-10 > .form-group > .form-control')
            .type('cobacobacoba.com');
        cy.get('.col-md-2 > .btn')
            .click();
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#item-cart > :nth-child(1) > :nth-child(4) > :nth-child(2)')
            .should('not.to.contain','FREE');
        cy.get('.hasilpencarian-domain > .row > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .should('not.to.contain','FREE');
        cy.get('.price')
            .should('to.contain','Rp. 473.000');
    });
    it('Harga Domain Selain Com CH SuperStar', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option')
            .click()
            .then(() => {
                cy.get('.section-pilihpaket > .dropdown_select_wrapper > .select_ul > :nth-child(3)')
                    .click();
            });
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option')
            .click()
            .then(() => {
                cy.get('.select_ul > :nth-child(5)')
                    .click();
            });
        cy.get('.col-md-10 > .form-group > .form-control')
            .type('cobacobacoba.co.id');
        cy.get('.col-md-2 > .btn')
            .click();
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('.item > :nth-child(4) > :nth-child(2)')
            .should('not.to.contain','FREE');
        cy.get('.col-md-10 > .form-group > .form-control')
            .clear()
            .type('cobacobacoba.co');
        cy.get('.col-md-2 > .btn')
            .click({ force: true });
        cy.wait(500);
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click({ force: true });
        cy.wait(500);
        cy.get('.item > :nth-child(4) > :nth-child(2)')
            .should('not.to.contain','FREE');
        cy.get('.price')
            .should('to.contain','Rp. 1.480.600');
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});