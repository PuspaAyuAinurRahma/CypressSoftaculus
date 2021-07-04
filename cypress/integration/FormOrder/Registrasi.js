const test_base_uri = Cypress.env('baseUrl');
describe('Registrasi', function () {
    it('Form Registrasi', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        //Cek validasi cart
        cy.get('#payment-btn')
            .click();
        cy.get('.alert')
            .should('to.contain','Domain tidak boleh kosong');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('qw.com');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.wait(3000);
        cy.get('.alert')
            .should('not.to','exist');
        cy.get('.btn-transfer-domain')
            .click();
        cy.get('#payment-btn')
            .click();
        cy.get('.alert')
            .should('to.contain','Domain tidak boleh kosong');
        cy.get('.hasilpencarian-domain > .row > .col-md-12 > .display-domain > .flex-row > .form-control')
            .type('12345');
        cy.get('.submit-eppcode')
            .click();
        cy.get('.alert')
            .should('not.to','exist');

        //Cek modal registrasi
        cy.get('#payment-btn')
            .click();
        cy.get('#register-btn')
            .click();
        cy.get('#registration-modals-step1 > .modal-dialog > .modal-content > .modal-header > #exampleModalLabel > strong')
            .should('to.contain','Daftar Akun Baru');
        cy.get('#registration-modals > .modal-dialog > .modal-content > .modal-body')
            .should(() => {
                expect('#registration-form > :nth-child(2) > label').to.exist;
                expect('#registration-form > :nth-child(3) > label').to.exist;
                expect('#registration-form > :nth-child(4) > label').to.exist;
                expect('.small').to.exist;
                expect(':nth-child(6) > .btn').to.exist;
            });
        cy.get('#registration-form > :nth-child(2) > label')
            .should('to.contain','Nama Lengkap');
        cy.get('#registration-form > :nth-child(2) > .form-control')
            .should('exist');
        cy.get('#registration-form > :nth-child(3) > label')
            .should('to.contain','Email');
        cy.get('#registration-form > :nth-child(3) > .form-control')
            .should('exist');
        cy.get('#registration-form > :nth-child(4) > label')
            .should('to.contain','Password');
        cy.get('#registration-form > :nth-child(4) > .form-control')
            .should('exist');
        cy.get(':nth-child(6) > .btn')
            .should('to.contain','Daftar')
            .should('be.disabled');
        cy.get('#registration-form > .flex')
            .should('to.contain','1/3');
        cy.get('.progress')
            .get('.progress-bar');
        cy.get('#registration-modals > .modal-dialog > .modal-content > .modal-footer')
            .should(() => {
                expect('#registration-modals > .modal-dialog > .modal-content > .modal-footer > .row > .col-md-12 > .text-center > strong').to.exist;
                expect('#login-link').to.exist;
            });
        cy.get('#registration-modals-step1 > .modal-dialog > .modal-content > .modal-footer > .row > .col-md-12 > .text-center > strong')
            .should('to.contain','Sudah punya akun?');
        cy.get('#login-link')
            .should('to.contain','Masuk')
            .click();
        cy.get('#login-modals > .modal-dialog > .modal-content > .modal-header')
            .should('to.contain', 'Masuk Akun');
    });
    it('Registrasi Step 1', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('#payment-btn')
            .click();
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
        cy.get('#register-btn')
            .click();
        cy.wait(2000);
        cy.get('#registration-form > :nth-child(2) > .form-control')
            .type('TestingCypress');
        cy.get('#registration-form > :nth-child(3) > .form-control')
            .type('testing@gmail.com');
        cy.get('#registration-form > :nth-child(4) > .form-control')
            .type('Testing123');
        cy.get('#registration-form > :nth-child(6) > .btn')
            .click();
        cy.wait(3000);
        cy.get('#registration-form > #alert_error')
            .should('to.contain', 'Email sudah terdaftar, gunakan email yang lain');
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
});