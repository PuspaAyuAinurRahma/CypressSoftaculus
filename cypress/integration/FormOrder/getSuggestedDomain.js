const test_base_uri = Cypress.env('baseUrl');
describe('Get Suggested Domain Testing', function () {
    it('Get Suggested Domain', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cypress-form-order.com');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.wait(5000)
            .should(() => {
                expect('.section-domain-serupa > :nth-child(1) > .col-md-12 > .flex').to.exist;
                expect(':nth-child(2) > .col-md-12 > .display-domain').to.exist;
                expect(':nth-child(3) > .col-md-12 > .display-domain').to.exist;
                expect(':nth-child(4) > .col-md-12 > .display-domain').to.exist;
                expect(':nth-child(5) > .col-md-12 > .btn').to.exist;
            });
        cy.get('.title-spotlight')
            .should('exist')
            .and('to.contain', 'Domain Serupa');
        cy.get('.col-md-12 > .flex > .btn')
            .should('exist')
            .and('to.contain', 'Tutup');

        cy.get(':nth-child(2) > .col-md-12 > .display-domain')
            .should(() => {
                expect(':nth-child(2) > .col-md-12 > .display-domain > .name > .domain-name').to.exist;
                expect(':nth-child(2) > .col-md-12 > .display-domain > .flex-col > .harga-asli').to.exist;
                expect(':nth-child(2) > .col-md-12 > .display-domain > .flex-row > .form-control').to.exist;
                expect(':nth-child(2) > .col-md-12 > .display-domain > .flex-row > .btn-orange').to.exist;
            });
        //Domain serupa
        cy.get('.show-domain-serupa > :nth-child(1) > .col-md-12 > .display-domain')
            .should('to.contain', 'cypress-form-order.online');
        cy.get('.show-domain-serupa > :nth-child(1) > .col-md-12 > .display-domain > .flex-col > .harga-coret')
            .should('not.to', 'visible');
        cy.get('.show-domain-serupa > :nth-child(1) > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .should('to.contain', 'Rp. 18,000');
        cy.get('.show-domain-serupa > :nth-child(1) > .col-md-12 > .display-domain > .flex-row > .form-control')
            .select('2 Tahun')
            .get('.show-domain-serupa > :nth-child(1) > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .should('to.contain', 'Rp. 368,000');
        cy.get('.show-domain-serupa > :nth-child(1) > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .should('to.contain', 'Tambah')
            .click();
        cy.get('.cart-summary-wrapper > .panel > .panel-body > :nth-child(1)')
            .should(() => {
                expect('.item > :nth-child(4) > :nth-child(1)').to.exist;
                expect(':nth-child(5) > .sub-title').to.exist;
                expect(':nth-child(4) > :nth-child(2)').to.exist;
            });
        cy.get('.item > :nth-child(4) > :nth-child(1)')
            .should('to.contain', 'cypress-form-order.online');
        cy.get(':nth-child(4) > :nth-child(2)')
            .should('to.contain', 'Rp. 368.000');
        cy.get(':nth-child(5) > .sub-title')
            .should('to.contain', 'Reg. 2 tahun');
        cy.get('.show-domain-serupa > :nth-child(1) > .col-md-12 > .display-domain')
            .should('not.to','exist');

        //Cek button tutup dan buka
        cy.get('.tutup-spotlight')
            .click();
        cy.get(':nth-child(2) > .col-md-12 > .display-domain')
            .should('not.to','exist');
        cy.get('.buka-spotlight')
            .click();
        cy.get(':nth-child(2) > .col-md-12 > .display-domain')
            .should('exist');

        //Cek domain serupa untuk layanan
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain')
            .should('to.contain', 'cypress-form-order.online');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .select('1 Tahun');
        cy.get(':nth-child(4) > :nth-child(2)')
            .should('to.contain', 'Rp. 18.000');

        //Hapus domain serupa untuk layanan
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-default')
            .click();
        cy.get('.swal2-confirm')
            .click();
        cy.get('.swal2-confirm')
            .click();
        cy.get('.item > :nth-child(4) > :nth-child(1)')
            .should('not.to', 'exist');
        cy.get(':nth-child(4) > :nth-child(2)')
            .should('not.to', 'exist');

        //Domain serupa section baru
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain')
            .should('to.contain', 'cypress-form-order.online');
        cy.get(':nth-child(4) > :nth-child(2)')
            .should('to.contain', 'Rp. 18.000');


        cy.get(':nth-child(2) > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get(':nth-child(2) > .col-md-12 > .display-domain')
            .should('not.to', 'exist');
        cy.get('#panel1 > .panel-heading')
            .should('to.contain','Layanan yang kamu beli - Domain Baru');
        cy.get('#panel1 > .panel-body')
            .should('to.contain', 'cypress-form-order.tech');
        cy.get('#item-cart > :nth-child(2) > :nth-child(1)')
            .should('to.contain', 'Registrasi Domain');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(1)')
            .should('to.contain', 'cypress-form-order.tech');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(2)')
            .should('to.contain', 'Rp. 18.000');
        cy.get(':nth-child(2) > :nth-child(3) > .sub-title')
            .should('to.contain', 'Reg. 1 tahun');

        //Lihat lebih banyak
        cy.get(':nth-child(3) > .col-md-12 > .btn')
            .click();
        //list domain serupa pertama dan kedua tidak ada
        cy.get('.show-domain-serupa > :nth-child(1) > .col-md-12 > .display-domain')
            .should('not.to','exist');
        cy.get(':nth-child(2) > .col-md-12 > .display-domain')
            .should('not.to', 'exist');
        cy.get(':nth-child(3) > .col-md-12 > .btn')
            .should('not.to', 'exist');

        //Ganti billing cycle dan hapus section domain serupa baru
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .select('2 Tahun');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(2)')
            .should('to.contain', 'Rp. 493.000');
        cy.get(':nth-child(2) > :nth-child(3) > .sub-title')
            .should('to.contain', 'Reg. 2 tahun');

        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-default')
            .click();
        cy.get('.swal2-confirm')
            .click();
        cy.get('.swal2-confirm')
            .click();
        //Section registrasi domain cart
        cy.get('#item-cart > :nth-child(2) > :nth-child(1)')
            .should('not.to', 'exist');
        //section domain serupa baru
        cy.get('#panel1 > .panel-heading')
            .should('not.to', 'exist');

    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});