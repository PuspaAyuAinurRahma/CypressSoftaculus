const test_base_uri = Cypress.env('baseUrl');
describe('Halaman Order', function () {
    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    const testname = `cypress${id}`;
    it('Checkout os panel', function () {
        //Checkout os only
        cy.visit(test_base_uri+'/orders/products/573');
        cy.get('.header-left-panel > .title')
            .contains('Layanan yang kamu beli - VPS X');
        cy.get('#payment-btn')
            .click();
        cy.get('#config-error-0')
            .contains('Error, Please fill information about your credentials correctly!');

        cy.get('#content-hostname > .panel-body > form > :nth-child(1) > .col-md-8 > .form-control')
            .type('admin.com');
        cy.get('#content-hostname > .panel-body > form > :nth-child(1) > .col-md-8 > .help-block')
            .contains('Hostname kurang valid sob');
        cy.get('#content-hostname > .panel-body > form > :nth-child(1) > .col-md-8 > .form-control')
            .clear();
        cy.get('#content-hostname > .panel-body > form > :nth-child(1) > .col-md-8 > .form-control')
            .type('admin..com');
        cy.get('#content-hostname > .panel-body > form > :nth-child(1) > .col-md-8 > .help-block')
            .contains('Hostname kurang valid sob');
        cy.get('#content-hostname > .panel-body > form > :nth-child(1) > .col-md-8 > .form-control')
            .clear();
        cy.get('#content-hostname > .panel-body > form > :nth-child(1) > .col-md-8 > .form-control')
            .type('admin.');
        cy.get('#content-hostname > .panel-body > form > :nth-child(1) > .col-md-8 > .form-control')
            .type(testname);
        cy.get('#content-hostname > .panel-body > form > :nth-child(1) > .col-md-8 > .form-control')
            .type('.com');
        cy.get('#content-hostname > .panel-body > form > :nth-child(1) > .col-md-8 > .form-control')
            .type('`~!@#$%^&*()_+=[]\\{}|\'";:/?><,');
        cy.get('#content-hostname > .panel-body > form > :nth-child(1) > .col-md-8 > .form-control')
            .should('not.have.value','`~!@#$%^&*()_+=[]\\{}|\'";:/?><,');
        cy.get('#payment-btn')
            .click();
        cy.get('#config-error-0')
            .should('exist');
        cy.get(':nth-child(2) > .col-md-8 > .form-control')
            .type('Cypress');
        cy.get(':nth-child(2) > .col-md-8 > .help-block')
            .contains('Password kurang valid sob');
        cy.get(':nth-child(2) > .col-md-8 > .form-control')
            .clear();
        cy.get(':nth-child(2) > .col-md-8 > .form-control')
            .type('Cypress12345;:""');
        cy.get(':nth-child(2) > .col-md-8 > .form-control')
            .should('have.value','Cypress12345');

        cy.get('.text-right > .btn-default')
            .contains('Pilih X-Cube');
        cy.get('.text-right > .btn-default')
            .click();
        cy.get('.panel-body > :nth-child(1) > :nth-child(3) > a')
            .click();
        cy.get('#64bit-0[data-bit=x64]')
            .find('.template[data-template=Debian]')
            .click();

        cy.get('#payment-btn')
            .click();
        cy.get('#config-error-0')
            .should('not.visible');
        cy.get('#login-modals > .modal-dialog > .modal-content > .modal-header')
            .contains('Masuk Akun');
        cy.wait(3000);
        cy.get('#login-form > :nth-child(2) > .form-control')
            .type('testbeon2@gmail.com');
        cy.get(':nth-child(3) > .form-control')
            .type('jagoan123');
        cy.get('.btn-login > .btn')
            .click();

        //checkout
        cy.wait(5000);
        cy.get('#payment-btn')
            .click();
        cy.wait(2000);
        cy.get('#headingovo > .panel-title')
            .click();
        cy.get('#headingovo > .panel-title > .collapsed')
            .click();
        cy.get('#collapseovo > .panel-body > .row > .col-md-12 > .btn')
            .click();

        cy.wait(5000);
        cy.get('.col-md-6 > :nth-child(2) > a')
            .click();
        cy.get('tbody > :nth-child(1) > :nth-child(1)')
            .should('exist');
        cy.get('tbody > :nth-child(1) > :nth-child(1)')
            .contains('OS Only');
        cy.get('tbody > :nth-child(1) > :nth-child(1)')
            .contains('1 x 1');

        //Create VPS Apps
        cy.visit(test_base_uri+'/beontop');
        cy.get(':nth-child(4) > .form-control')
            .type('api');
        cy.get(':nth-child(5) > .form-control')
            .type('28ER67fi');
        cy.get('.col-sm-5 > .btn')
            .click();
        cy.get('#intellisearchval')
            .type(testname);
        cy.get('#btnIntelliSearch > .fas')
            .click();
        cy.get('#searchresults > :nth-child(2) > a')
            .click();
        cy.get('#btnCreate')
            .click();
        cy.get('#ModuleCreate-Yes')
            .click();
        cy.wait(50000);
        cy.get('.successbox')
            .should('exist');

        cy.get('#btnTerminate')
            .click();
        cy.get('#ModuleTerminate-Yes')
            .click();
        cy.wait(5000);
        cy.get('.successbox')
            .should('exist');
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});