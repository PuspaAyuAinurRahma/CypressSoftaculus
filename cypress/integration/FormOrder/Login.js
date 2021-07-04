const test_base_uri = Cypress.env('baseUrl');
describe('Login', function () {
    it('Login', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('qw.com');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.get('.alert')
            .should('not.to','exist');
        cy.wait(3000);
        cy.get('.btn-transfer-domain')
            .click();
        cy.get('.hasilpencarian-domain > .row > .col-md-12 > .display-domain > .flex-row > .form-control')
            .type('12345');
        cy.get('.submit-eppcode')
            .click();
        cy.get('#payment-btn')
            .click();
        cy.get('#login-modals > .modal-dialog > .modal-content > .modal-header')
            .should('to.contain', 'Masuk Akun');
        cy.get('.btn-login > .btn')
            .should('be.disabled');
        cy.wait(2000);
        cy.get(':nth-child(2) > label')
            .should('to.contain', 'Email');
        cy.get(':nth-child(2) > .form-control')
            .type('mala@jagoanhosting.com');
        cy.get(':nth-child(3) > label')
            .should('to.contain', 'Password');
        cy.get('#login-form > :nth-child(3) > .form-control')
            .type('jagoan123');
        cy.get('#Lupa_Password')
            .should('to.contain', 'Lupa Password?');
        cy.get('.modal-footer > .row > .col-md-12')
            .should('to.contain', 'Belum punya akun?');
        cy.get('#register-btn')
            .should('to.contain', 'Daftar Akun Baru');
        cy.get('.btn-login > .btn')
            .click();
        cy.get('#Secondary_Navbar-Account > .dropdown-toggle')
            .should('to.contain', 'Mala');
        //Cek modal pembayaran
        cy.get('#payment-btn')
            .click();
        cy.get('#beoncustomorderchoosepayment > .modal-dialog > .modal-content > .modal-header')
            .should('to.contain','Pilih Metode Pembayaran');
        cy.get('#headingovo > .panel-title > .collapsed')
            .click();
        cy.get('#collapseovo > .panel-body > .row > .col-md-12 > .btn')
            .should('to.contain','CHECKOUT SEKARANG');
        cy.get('#headingovo > .panel-title')
            .click();
        cy.get('#headingovo > .panel-title > .choose-payment-item-btn > .more-less')
            .click();
        
        //Cek cache kalau sudah logout
        cy.get('#beoncustomorderchoosepayment > .modal-dialog > .modal-content > .modal-header > .close')
            .click();
        cy.get('#Secondary_Navbar-Account > .dropdown-toggle')
            .click();
        cy.get('#Secondary_Navbar-Account-Logout > a')
            .click();
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('#item-cart > .item')
            .should('not.to.contain','qw.com');
    });
    it('Cek daftar akun baru dan lupa pass', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('qw.com');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.get('.alert')
            .should('not.to','exist');
        cy.get('.btn-transfer-domain')
            .click();
        cy.get('.hasilpencarian-domain > .row > .col-md-12 > .display-domain > .flex-row > .form-control')
            .type('12345');
        cy.get('.submit-eppcode')
            .click();
        cy.get('#payment-btn')
            .click();
        cy.get('#login-modals > .modal-dialog > .modal-content > .modal-header')
            .should('to.contain', 'Masuk Akun');
        //Cek register
        cy.get('#register-btn')
            .click();
        cy.get('#registration-modals-step1 > .modal-dialog > .modal-content > .modal-header')
            .should('to.contain', 'Daftar Akun Baru');
        cy.get('#registration-modals > .modal-dialog > .modal-content > .modal-body')
            .should(() => {
                expect('#registration-form > :nth-child(1) > label').to.exist;
                expect('#registration-form > :nth-child(2) > label').to.exist;
                expect(':nth-child(3) > label').to.exist;
                expect('#registration-form > :nth-child(4) > .btn').to.exist;
                expect('#registration-form > .flex').to.exist;
            });
        cy.get('#login-link')
            .click();
        //Cek lupa password
        cy.get('#Lupa_Password')
            .click();
        cy.get('h1')
            .should('to.contain','Lupa password');
        cy.get('form')
            .should(() => {
                expect('#inputEmail').to.exist;
                expect('.text-center > .btn').to.exist;
            });
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
});