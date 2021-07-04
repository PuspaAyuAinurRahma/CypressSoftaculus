const test_base_uri = Cypress.env('baseUrl');
describe('Setting Auto Install', function () {
    it('Cek Setting', function () {
        cy.visit(test_base_uri+'/beontop/login.php');
        cy.get(':nth-child(4) > .form-control')
            .type('ilhamfajar');
        cy.get(':nth-child(5) > .form-control')
            .type('jagoan123');
        cy.get('.col-sm-5 > .btn')
            .click();
        cy.get('#menu > :nth-child(9)')
            .click();
        cy.get(':nth-child(14) > .link')
            .click();
        cy.get('[data-id="hostingaccount|82|430"] > :nth-child(7)')
            .click();
        cy.get('#tabLink4')
            .click();
        cy.get(':nth-child(1) > .fieldarea > .input-400')
            .type('Script');
        cy.get('#tab4 > .form > tbody > :nth-child(2) > .fieldarea > .form-control')
            .select('Drop Down');
        cy.get('#tab4 > .form > tbody > :nth-child(3) > .fieldarea > .form-control')
            .type('Select Application That You Want To Install');
        cy.get('#tab4 > .form > tbody > :nth-child(5) > .fieldarea > .form-control')
            .type('None,Wordpress,Codeigniter,Laravel');
        cy.get(':nth-child(6) > .fieldarea > :nth-child(3) > input')
            .click();
        cy.get('.btn-container > .btn-primary')
            .click();
        cy.wait(1000);
        cy.get(':nth-child(6) > tbody > :nth-child(1) > .fieldarea > .input-400')
            .type('WP_include_divi');
        cy.get(':nth-child(6) > tbody > :nth-child(2) > .fieldarea > .form-control')
            .select('Tick Box');
        cy.get(':nth-child(6) > tbody > :nth-child(3) > .fieldarea > .form-control')
            .type('Include <b class="label label-success">FREE</b> PREMIUM Theme &  DIVI License');
        cy.get(':nth-child(6) > tbody > :nth-child(6) > .fieldarea > :nth-child(3) > input')
            .click();
        cy.get('.btn-container > .btn-primary')
            .click();
        cy.wait(1000);
        cy.get(':nth-child(8) > tbody > :nth-child(1) > .fieldarea > .input-400')
            .type('WP_include_divi');
        cy.get(':nth-child(8) > tbody > :nth-child(2) > .fieldarea > .form-control')
            .select('Tick Box');
        cy.get(':nth-child(8) > tbody > :nth-child(3) > .fieldarea > .form-control')
            .type('Include <b class="label label-success">FREE</b> Litespeed Cache');
        cy.get(':nth-child(8) > tbody > :nth-child(6) > .fieldarea > :nth-child(3) > input')
            .click();
        cy.get('.btn-container > .btn-primary')
            .click();
        cy.wait(1000);
        cy.get('#welcome > [href="logout.php"]')
            .click();

        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option')
            .click();
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .select_ul > :nth-child(3)')
            .click();
        cy.get('#template-hosting')
            .should('exist');
        cy.get('.title > .form-title')
            .contains('Select Application That You Want To Install');
        cy.get(':nth-child(1) > .template')
            .contains('None');
        cy.get(':nth-child(2) > .template')
            .contains('Wordpress');
        cy.get(':nth-child(3) > .template')
            .contains('Codeigniter');
        cy.get(':nth-child(4) > .template')
            .contains('Laravel');
        cy.get(':nth-child(2) > .penawaran-info')
            .contains('PREMIUM Theme & DIVI License');
        cy.get(':nth-child(2) > .penawaran-info > .form-check > .form-check-input')
            .should('exist');
        cy.get(':nth-child(3) > .penawaran-info')
            .contains('Litespeed Cache');
        cy.get(':nth-child(3) > .penawaran-info > .form-check > .form-check-input')
            .should('exist');
        cy.get('#item-cart > .item > :nth-child(4)')
            .contains('Apps: Wordpress');
        cy.get(':nth-child(5) > .sub-title')
            .contains('PREMIUM Theme & DIVI License');
        cy.get(':nth-child(6) > .sub-title')
            .contains('Litespeed Cache');

        cy.visit(test_base_uri+'/beontop/login.php');
        cy.get(':nth-child(4) > .form-control')
            .type('ilhamfajar');
        cy.get(':nth-child(5) > .form-control')
            .type('jagoan123');
        cy.get('.col-sm-5 > .btn')
            .click();
        cy.get('#menu > :nth-child(9)')
            .click();
        cy.get(':nth-child(14) > .link')
            .click();
        cy.get('[data-id="hostingaccount|82|430"] > :nth-child(7)')
            .click();
        cy.get('#tabLink4')
            .click();
        cy.get(':nth-child(1) > tbody > :nth-child(6) > .fieldarea > .pull-right > .btn')
            .click();
        cy.wait(1000);
        cy.get(':nth-child(1) > tbody > :nth-child(6) > .fieldarea > .pull-right > .btn')
            .click();
        cy.wait(1000);
        cy.get('.pull-right > .btn')
            .click();
        cy.wait(1000);
        cy.get('#welcome > [href="logout.php"]')
            .click();
    });
    it('Cek Hasil Delete', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option')
            .click();
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .select_ul > :nth-child(3)')
            .click();
        cy.get('#template-hosting')
            .should('not.exist');
        cy.get(':nth-child(2) > .penawaran-info')
            .should('not.exist');
        cy.get(':nth-child(3) > .penawaran-info')
            .should('not.exist');
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
});