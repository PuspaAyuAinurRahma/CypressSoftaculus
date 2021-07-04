const test_base_uri = Cypress.env('baseUrl');
describe('Remove the Cart Testing', function () {
    it('Remove the Cart', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('.remove-panel > .fas')
            .click();
        cy.get('.swal2-confirm')
            .click();
        cy.get('.swal2-confirm')
            .click();
        cy.get('#order-forms-wrapper > .panel')
            .should('not.exist');
        cy.get('.section-domain-serupa')
            .should('not.visible');
        cy.get('.cart-empty')
            .should('exist')
            .and('to.contain','Keranjang belanjamu kosong, Sob');
        //Melakukan tambah 4 layanan
        cy.get('#tambahLayanan')
            .click();
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(1) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="1"]')
            .click();

        cy.get('#tambahLayanan')
            .click();
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(1) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="2"]')
            .click();

        cy.get('#tambahLayanan')
            .click();
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(1) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="1"]')
            .click();

        cy.get('#tambahLayanan')
            .click();
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(1) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="2"]')
            .click();

        //Melakukan hapus layanan
        cy.get('[data-index="2"] > .panel-heading > .flex-row > .header-right-panel > .flex > .remove-panel > .fas')
            .click();
        cy.get('.swal2-confirm')
            .click();
        cy.get('.item')
            .find('span > .fa');
        cy.get('.swal2-confirm')
            .click();
        cy.get(':nth-child(3) > .title')
            .should('not.to.contain', 'cloud Hosting');

        cy.get(':nth-child(2) > :nth-child(1) > .remove-section-cart > .fas')
            .click();
        cy.get('.swal2-confirm')
            .click();
        cy.get('.item')
            .find('span > .fa');
        cy.get('.swal2-confirm')
            .click();
        cy.get(':nth-child(2) > .title')
            .should('not.to.contain', 'Professional Shared Hosting');

        cy.get('[data-index="1"] > .panel-heading > .flex-row > .header-right-panel > .flex > .remove-panel > .fas')
            .click();
        cy.get('.swal2-confirm')
            .click();
        cy.get('.item')
            .find('span > .fa');
        cy.get('.swal2-confirm')
            .click();
        cy.get(':nth-child(2) > .title')
            .should('not.to.contain', 'Cloud Hosting');

        cy.get('.remove-section-cart')
            .click();
        cy.get('.swal2-confirm')
            .click();
        cy.get('.item')
            .find('span > .fa');
        cy.get('.swal2-confirm')
            .click();
        cy.get('#order-forms-wrapper > .panel')
            .should('not.exist');
        cy.get('.section-domain-serupa')
            .should('not.exist');
        cy.get('.cart-empty')
            .should('exist')
            .and('to.contain','Keranjang belanjamu kosong, Sob');

    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});