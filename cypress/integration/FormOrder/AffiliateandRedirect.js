const test_base_uri = Cypress.env('baseUrl');
const uuid = () => Cypress._.random(0, 1e6);
const id = uuid();
const testname = `affiliate${id}`;

describe('Beli layanan dengan affiliate id', function () {
    it('Melakukan pembelian layanan denggan affiliate id', function () {
        cy.visit(test_base_uri+'/aff.php?aff=409', {failOnStatusCode: false});
        cy.getCookie('WHMCSAffiliateID').should('exist')
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type(testname);
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('.com');
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
        cy.getCookie('WHMCSAffiliateID').should('exist')
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
        cy.getCookie('WHMCSAffiliateID').should('exist')

        cy.visit(test_base_uri+'/beontop', {failOnStatusCode: false});
        cy.get(':nth-child(4) > .form-control')
            .type('api');
        cy.get(':nth-child(5) > .form-control')
            .type('28ER67fi{enter}');
        cy.get('#menu > :nth-child(3)')
            .click();
        cy.get(':nth-child(2) > :nth-child(2) > a > b')
            .click();
        cy.get('#affiliatefield > a')
            .contains('test beon');
    });
    it('Melakukan pengecekan redirect cloud hosting dan vps', function () {
        cy.visit(test_base_uri+'/clientarea.php', {failOnStatusCode: false});
        cy.get('#inputEmail')
            .type('testbeon2@gmail.com');
        cy.get('#inputPassword')
            .type('jagoan123');
        cy.get('#login')
            .click();

        cy.get('.navbar-header > .nav > #Primary_Navbar-Orders > .dropdown-toggle')
            .click();
        cy.get('.navbar-header > .nav > #Primary_Navbar-Orders > .dropdown-menu > #Primary_Navbar-Orders-Cloud_Power_Hosting > a')
            .click();
        //ID FAME
        cy.get(':nth-child(2) > :nth-child(1) > .plan > .btn-ellipse')
            .click();
        cy.get('#panel0 > .panel-heading')
            .contains('Layanan yang kamu beli - Cloud Hosting');
        cy.get('#section-add-domain > .align-items-center')
            .should('be.visible');
        cy.get('#tambah-layanan-baru > .align-items-center')
            .should('be.visible');

        cy.get('.navbar-header > .nav > #Primary_Navbar-Orders > .dropdown-toggle')
            .click();
        cy.get('.navbar-header > .nav > #Primary_Navbar-Orders > .dropdown-menu > #Primary_Navbar-Orders-Cloud_Power_Hosting > a')
            .click();
        //ID Superstar
        cy.get(':nth-child(2) > :nth-child(2) > .plan > .btn-ellipse')
            .click();
        cy.get('#panel1 > .panel-heading')
            .contains('Layanan yang kamu beli - Cloud Hosting');
        cy.get('#section-add-domain > .align-items-center')
            .should('be.visible');
        cy.get('#tambah-layanan-baru > .align-items-center')
            .should('be.visible');

        cy.get('.navbar-header > .nav > #Primary_Navbar-Orders > .dropdown-toggle')
            .click();
        cy.get('.navbar-header > .nav > #Primary_Navbar-Orders > .dropdown-menu > #Primary_Navbar-Orders-Cloud_Power_Hosting > a')
            .click();

        cy.get('.navbar-header > .nav > #Primary_Navbar-Orders > .dropdown-toggle')
            .click();
        cy.get('.navbar-header > .nav > #Primary_Navbar-Orders > .dropdown-menu > #Primary_Navbar-Orders-VPS_X_-_X1 > a')
            .click();
        //VPSX
        cy.get('#panel2 > .panel-heading')
            .contains('Layanan yang kamu beli - VPS X');
        cy.get('#section-add-domain > .align-items-center')
            .should('be.visible');
        cy.get('#tambah-layanan-baru > .align-items-center')
            .should('be.visible');

        cy.get('.navbar-header > .nav > #Primary_Navbar-Orders > .dropdown-toggle')
            .click();
        cy.get('.navbar-header > .nav > #Primary_Navbar-Orders > .dropdown-menu > #Primary_Navbar-Orders-VPS_X_-_X1_SG > a')
            .click();
        //VPSX SG
        cy.get('#panel3 > .panel-heading')
            .contains('Layanan yang kamu beli - VPS X');
        cy.get('#section-add-domain > .align-items-center')
            .should('be.visible');
        cy.get('#tambah-layanan-baru > .align-items-center')
            .should('be.visible');

    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});