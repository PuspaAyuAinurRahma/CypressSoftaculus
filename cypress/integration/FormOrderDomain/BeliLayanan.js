const test_base_uri = Cypress.env('baseUrl');
describe('Beli layanan pada halaman form order', function () {
    it('Melakukan pembelian layanan pada halaman form order domain', function () {
        cy.visit(test_base_uri+'/orders/domains');
        cy.get('#tambahLayanan')
            .click();
        cy.get('.default_option > li')
            .click();
        cy.get(':nth-child(1) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="1"]')
            .click();
        cy.get('#panel0 > .panel-heading')
            .contains('Layanan yang kamu beli - Cloud Hosting');
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option > li')
            .contains('ID FAME');
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option > li')
            .contains('1 Tahun');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .should('exist');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .contains('Cari');
        cy.get('.item > :nth-child(1) > .title')
            .contains('Cloud Hosting');
        cy.get('.price')
            .should('exist');
        //Change produk and billing cycle
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .select_ul > :nth-child(2)')
            .click();
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(1)')
            .contains('ID HITS');
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .select_ul > :nth-child(1)')
            .click();
        cy.get(':nth-child(3) > .sub-title')
            .contains('Satu Bulanan');
        cy.get('.price')
            .should('exist');
        //Buy domain
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('belidomainscypress.com');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.wait(10000);
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .name > .domain-name')
            .contains('belidomainscypress.com');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .should('exist');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .contains('1 Tahun');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .contains('Tambah');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#item-cart > .item > :nth-child(4) > :nth-child(1)')
            .contains('belidomainscypress.com');
        cy.get(':nth-child(5) > .sub-title')
            .contains('Reg. 1 tahun');
        cy.get('.item > :nth-child(4) > :nth-child(2)')
            .should('exist');
        cy.get('.price')
            .should('exist');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .select('2 Tahun');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .should('exist');
        cy.get(':nth-child(5) > .sub-title')
            .contains('Reg. 2 tahun');
        cy.get('.item > :nth-child(4) > :nth-child(2)')
            .should('exist');
        //Add domain serupa
        cy.get('.show-domain-serupa > :nth-child(1) > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#panel1 > .panel-heading > .flex-row > .header-left-panel > .title')
            .contains('Layanan yang kamu beli - Domain Baru');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .name > .domain-name')
            .should('exist');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .should('exist');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .contains('1 Tahun');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-default')
            .contains('Hapus');
        cy.get('#item-cart > :nth-child(2) > :nth-child(1) > .title')
            .contains('Registrasi Domain');
        cy.get(':nth-child(2) > :nth-child(3) > .sub-title')
            .contains('Reg. 1 tahun');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(2)')
            .should('exist');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .select('2 Tahun');
        cy.get(':nth-child(2) > :nth-child(3) > .sub-title')
            .contains('Reg. 2 tahun');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(2)')
            .should('exist');
        cy.get('#panel0 > .panel-heading > .flex-row > .header-right-panel > .flex > .maximize-icon > .fas')
            .click();
        cy.get('.tutup-spotlight')
            .click();
        cy.get('.buka-spotlight')
            .click();
        cy.get(':nth-child(3) > .col-md-12 > .btn')
            .click();
        //Gunakan domain
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .clear();
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('belidomain.com');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.wait(10000);
        cy.get('.section-tambah-domain > .hasilpencarian-domain > .row > .col-md-12 > .display-domain > .name > .domain-name')
            .contains('belidomain.com');
        cy.get('.btn-gunakan-domain')
            .contains('Gunakan');
        cy.get('.btn-transfer-domain')
            .contains('Transfer domain');
        cy.get('.btn-gunakan-domain')
            .click();
        cy.get('i > img')
            .should('exist');
        cy.get('#item-cart > :nth-child(1) > :nth-child(2) > :nth-child(1)')
            .contains('ID HITS ( belidomain.com )');
        //Transfer domain
        cy.get('.btn-transfer-domain')
            .click();
        cy.get('.section-tambah-domain > .hasilpencarian-domain > .row > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .should('exist');
        cy.get('.section-tambah-domain > .hasilpencarian-domain > .row > .col-md-12 > .display-domain > .flex-row > .form-control')
            .should('exist');
        cy.get('.submit-eppcode')
            .contains('Submit');
        cy.get('.section-tambah-domain > .hasilpencarian-domain > .row > .col-md-12 > .display-domain > .flex-row > .form-control')
            .type('12345');
        cy.get('.submit-eppcode')
            .click();
        cy.get('.section-tambah-domain > .hasilpencarian-domain > .row > .col-md-12 > .display-domain > .flex-row > .form-control')
            .should('be.disabled');
        cy.get('.delete-eppcode')
            .contains('Hapus');
        cy.get('#item-cart > :nth-child(1) > :nth-child(4) > :nth-child(1)')
            .contains('belidomain.com');
        cy.get('#item-cart > :nth-child(1) > :nth-child(4) > :nth-child(2)')
            .should('exist');
        cy.get(':nth-child(5) > .sub-title')
            .contains('Trans. 1 tahun');
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});