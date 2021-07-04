const test_base_uri = Cypress.env('baseUrl');
describe('Domain Availibility Check Testing', function () {
    it('Domain is available and has requirements checks', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('.section-tambah-domain > .form-title')
            .should('exist')
            .and('to.contain','Tambah domain untuk layanan ini');
        cy.get('.section-tambah-domain')
            .should('exist');
        cy.get('.col-md-2 > .btn')
            .should('exist')
            .and('to.contain','Cari');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cypress-form-order.sch.id');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.get('.hasilpencarian-domain')
            .should('exist');
        cy.get('.name > .domain-name')
            .should('exist');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .should('exist');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .should('exist')
            .and('to.contain', '1 Tahun');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .select('3 Tahun');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('.item')
            .find('span > .fa');
        cy.get('.cart-summary-wrapper > .panel')
            .should('exist')
            .and('to.contain', 'Rangkuman Pembelian');
        cy.get('.display-domain > .flex-row > .btn-default')
            .should('exist')
            .and('to.contain', 'Hapus');
        cy.get('#order-forms-wrapper > .panel > .panel-body')
            .should('not.to.contain', 'Persyaratan Beli Domain');
        cy.wait(1000)
            .should(() => {
                expect('.section-domain-serupa > :nth-child(1) > .col-md-12 > .flex').to.exist;
                expect(':nth-child(2) > .col-md-12 > .display-domain').to.exist;
                expect(':nth-child(3) > .col-md-12 > .display-domain').to.exist;
                expect(':nth-child(4) > .col-md-12 > .display-domain').to.exist;
                expect(':nth-child(5) > .col-md-12 > .btn').to.exist;
            });
        cy.get('#panel0 > .panel-body')
            .find(':nth-child(2) > .col-md-12 > .display-domain');
        cy.get('.title-spotlight')
            .should('exist')
            .and('to.contain', 'Domain Serupa');
        cy.get('.col-md-12 > .flex > .btn')
            .should('exist')
            .and('to.contain', 'Tutup');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-row > .btn-default')
            .click();
        cy.get('.swal2-confirm')
            .click();
        cy.get('.swal2-confirm')
            .click();

        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .clear();
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cek-domainserupaaaaa.com');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.get('.section-domain-serupa')
            .should('not.be.visible');
        cy.wait(3000);
        cy.get('.section-domain-serupa')
            .should('be.visible');

        //Melakukan ganti billing cycle
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get('.maximize-panel > :nth-child(7)')
            .click();
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .select_ul > :nth-child(2)')
            .should('not.be.visible');
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .select_ul > :nth-child(5)')
            .click();
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(2)')
            .should('to.contain', 'Rp. 288.000');
        cy.get(':nth-child(3) > .sub-title')
            .should('to.contain', 'Reg. Dua Tahunan');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .select('2 Tahun');
        cy.get(':nth-child(4) > :nth-child(2)')
            .should('to.contain','Rp. 284.000');
        cy.get('.item > :nth-child(5)')
            .should('to.contain', 'Reg. 2 tahun');
        cy.get('.price')
            .should('to.contain','Rp. 629.200');
        //Melakukan ganti paket
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get('.section-domain-serupa > :nth-child(1) > .col-md-12 > .flex')
            .click();
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .select_ul > :nth-child(3)')
            .should('not.be.visible');
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .select_ul > :nth-child(2)')
            .click();
        cy.get('#item-cart > .item > :nth-child(2)')
            .should('to.contain', 'ID HITS');

        //Transfer dan gunakan domain
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('qw.com');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn').click();
        cy.get('.btn-gunakan-domain')
            .click();
        cy.get('.item')
            .find('span > .fa');
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(1)')
            .should('to.contain','qw.com');
        cy.get('.item > :nth-child(5)')
            .should('not.be','visible');
        cy.get('.btn-transfer-domain')
            .click();
        cy.get('.hasilpencarian-domain > .row > .col-md-12 > .display-domain > .flex-row > .form-control')
            .type('12345');
        cy.get('.submit-eppcode')
            .click();
        cy.get('.item > :nth-child(5)')
            .should('to.contain','Trans. 1 tahun');
        cy.get('.price')
            .should('to.contain','Rp. 449.900');
        //Tambah Domain serupa
        cy.get(':nth-child(2) > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('.item')
            .find('span > .fa');
        cy.get('#item-cart > :nth-child(2) > :nth-child(1) > .title')
            .should('to.contain','Registrasi Domain');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(1)')
            .should('to.contain','qw.fun');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(2)')
            .should('to.be','visible');
        cy.get(':nth-child(2) > :nth-child(3) > .sub-title')
            .should('to.contain', 'Reg. 1 tahun');
        //Cek floating
        cy.wait(3000);
        cy.scrollTo(0, 500);
        cy.get('.col-md-4')
            .find('#cart-summary-wrapper')
            .should('have.class', 'onfloating');
    });
    it('Add services with the same domain test', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cypress-form-order.com');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click()
            .should(() => {
                expect('#tambah-layanan-baru > .align-items-center').to.exist;
            });
        cy.get('.flex-row > .btn-orange')
            .click();
        cy.get('#tambahLayanan')
            .click()
            .should(() => {
                expect('#myModal > .modal-dialog > .modal-content > .modal-body').to.exist;
            });
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(1) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="1"]')
            .click();
        cy.get('[data-index="1"]')
            .should(() => {
                expect('[data-index="1"] > .panel-body > :nth-child(1) > :nth-child(1) > .section-pilihpaket').to.exist;
                expect('[data-index="1"] > .panel-body > :nth-child(1) > :nth-child(2) > .section-billingcycle').to.exist;
            });
        cy.get('[data-index="0"] > .panel-body > .minimize-panel > :nth-child(1) > span')
            .should('exist');
        cy.get('[data-index="0"] > .panel-body > .minimize-panel > :nth-child(2) > span')
            .should('exist');
        cy.get('[data-index="1"] > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-10 > .form-group > .form-control')
            .type('cypress-form-order.com');
        cy.get('[data-index="1"] > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-2 > .btn')
            .click();
        cy.wait(4000);
        cy.get('[data-index="1"] > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('[data-index="1"] > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .hasilpencarian-domain > :nth-child(2) > .col-md-12 > .alert-danger')
            .should('exist')
            .and('to.contain','Domain cypress-form-order.com sudah ada di trolli');
    });
    it('Domain validation check', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('..');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.get('.tooltip-inner')
            .should('exist')
            .and('to.contain', 'Domain tidak benar, silahkan masukkan domain kembali');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .clear();
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cypress.form.control.com');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.get('.tooltip-inner')
            .should('exist')
            .and('to.contain', 'Domain tidak benar, silahkan masukkan domain kembali');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .clear();
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('google');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.get('.tooltip-inner')
            .should('exist')
            .and('to.contain', 'Domain harus memiliki ekstensi');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .clear();
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('`~!@#$%^&*()_+=[]\\{}|\'";:/?><,');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .should('not.have.value','`~!@#$%^&*()_+=[]\\{}|\'";:/?><,');
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});