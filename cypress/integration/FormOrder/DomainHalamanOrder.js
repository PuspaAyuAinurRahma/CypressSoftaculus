const test_base_uri = Cypress.env('baseUrl');
describe('Domain Pada Halaman Order Products', function () {
    it('Tambah Domain', function () {
        // Cek section
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('#section-add-domain > .align-items-center')
            .should('exist');
        cy.get('#section-add-domain > .align-items-center > .form-title')
            .contains('Tambah Domain');
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .should('exist')
            .and('have.attr','placeholder','Enter domain');
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-2 > .btn')
            .contains('Cari')
            .and('have.css','background','rgb(20, 25, 70) none repeat scroll 0% 0% / auto padding-box border-box');

        // Cari Domain
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('abcdef');
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-2 > .btn')
            .click({force: true});
        cy.get('.tooltip-inner')
            .contains('Domain harus memiliki ekstensi.')
            .and('have.css','background-color','rgb(222, 79, 80)');
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .clear();
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cobapencariandomain.com');
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-2 > .btn')
            .click({force: true});
        cy.get('.tooltip-inner')
            .contains('Mantap Sob! Domain ini tersedia, dan siap kamu beli.')
            .and('have.css','background-color','rgb(83, 185, 106)');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .name > .domain-name')
            .contains('cobapencariandomain.com');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .contains('Rp. 142,000');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .should('exist');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .contains('Tambah');

        // Tambah Domain
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click({force: true});
        cy.get('#panel1 > .panel-heading > .flex-row > .header-left-panel > .title')
            .contains('Domain Baru');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .name > .domain-name')
            .contains('cobapencariandomain.com');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col')
            .contains('Rp. 142,000');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .should('exist');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-default')
            .contains('Hapus');
        cy.get('#item-cart > :nth-child(2) > :nth-child(1) > .title')
            .contains('Registrasi Domain');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(1)')
            .contains('cobapencariandomain.com');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(2)')
            .contains('Rp. 142.000');
        cy.get('.price')
            .contains('Rp. 314.600');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .select('3 Tahun');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col')
            .contains('Rp. 426,000');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(2)')
            .contains('Rp. 426.000');
        cy.get(':nth-child(2) > :nth-child(3) > .sub-title')
            .contains('Reg. 3 tahun');
        cy.get('.price')
            .contains('Rp. 627.000');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .select('10 Tahun');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col')
            .contains('Rp. 1,420,000');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(2)')
            .contains('Rp. 1.420.000');
        cy.get(':nth-child(2) > :nth-child(3) > .sub-title')
            .contains('Reg. 10 tahun');
        cy.get('.price')
            .contains('Rp. 1.720.400');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-default')
            .click({force: true});
        cy.get('.swal2-confirm')
            .click({force: true});
        cy.get('.swal2-confirm')
            .click({force: true});
        cy.get('#panel1 > .panel-heading > .flex-row > .header-left-panel > .title')
            .should('not.exist');
        cy.get('#item-cart > :nth-child(2) > :nth-child(1) > .title')
            .should('not.exist');
        cy.get('.price')
            .contains('Rp. 158.400');

        // Cek Domain Serupa
        cy.get('.panel-penawaran > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .clear();
        cy.get('.panel-penawaran > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cobadomainserupa.com{enter}');
        cy.wait(1000);
        cy.get('.title-spotlight')
            .contains('Domain Serupa');
        cy.get('.show-domain-serupa > :nth-child(1) > .col-md-12 > .display-domain')
            .should('exist');
        cy.get(':nth-child(3) > .col-md-12 > .btn')
            .contains('Lihat lebih banyak')
            .and('have.css','display','inline');
        cy.get(':nth-child(3) > .col-md-12 > .btn')
            .click({force: true});
        cy.get(':nth-child(4) > .col-md-12 > .display-domain')
            .should('exist')
            .and('have.css','display','flex');
        cy.get('.tutup-spotlight')
            .contains('Tutup');
        cy.get('.tutup-spotlight')
            .click({force: true});
        cy.get('.buka-spotlight')
            .contains('Buka');
        cy.get('.buka-spotlight')
            .click({force: true});

        // Tambah Domain Serupa
        cy.get('.show-domain-serupa > :nth-child(1) > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click({force: true});
        cy.get('#panel1 > .panel-heading > .flex-row > .header-left-panel > .title')
            .contains('Domain Baru');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .name > .domain-name')
            .should('exist');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .should('exist');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .should('exist');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-default')
            .contains('Hapus');
        cy.get('#item-cart > :nth-child(2) > :nth-child(1) > .title')
            .contains('Registrasi Domain');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(1)')
            .should('exist');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(2)')
            .should('exist');

        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .select('3 Tahun');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col > .harga-asli')
            .contains('Rp. 426,000');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(2)')
            .contains('Rp. 426.000');
        cy.get(':nth-child(2) > :nth-child(3) > .sub-title')
            .contains('Reg. 3 tahun');
        cy.get('.price')
            .contains('Rp. 627.000');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-default')
            .click({force: true});
        cy.get('.swal2-confirm')
            .click({force: true});
        cy.get('.swal2-confirm')
            .click({force: true});
        cy.get('#panel1 > .panel-heading > .flex-row > .header-left-panel > .title')
            .should('not.exist');
        cy.get('#item-cart > :nth-child(2) > :nth-child(1) > .title')
            .should('not.exist');
        cy.get('.price')
            .contains('Rp. 158.400');
        cy.get(':nth-child(2) > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click({force: true});
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-row > .form-control')
            .select('2 Tahun');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .name > .domain-name')
            .should('exist');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col')
            .should('exist');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(1)')
            .should('exist');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(2)')
            .should('exist');
        cy.get(':nth-child(2) > :nth-child(3) > .sub-title')
            .contains('Reg. 2 tahun');
        cy.get('.maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-default')
            .click({force: true});
        cy.get('.swal2-confirm')
            .click({force: true});
        cy.get('.swal2-confirm')
            .click({force: true});

        //Transfer domain
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('.panel-penawaran > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('coba.com{enter}');
        cy.get('.hasilpencarian-domain > .row > .col-md-12 > .display-domain > .name > .domain-name')
            .contains('coba.com');
        cy.get('.name > :nth-child(2) > .fas')
            .should('exist');
        cy.get('.hasilpencarian-domain > .row > .col-md-12 > .display-domain > .flex > .btn')
            .contains('Transfer domain');
        cy.get('.hasilpencarian-domain > .row > .col-md-12 > .display-domain > .flex > .btn')
            .click({force: true});
        cy.get('.hasilpencarian-domain > .row > :nth-child(1) > .display-domain > .flex-col > .harga-asli')
            .contains('Rp. 145.000');
        cy.get('.hasilpencarian-domain > .row > :nth-child(1) > .display-domain > .flex-row > .form-control')
            .type('12345');
        cy.get('.submit-eppcode')
            .click({force: true});

        cy.get('#panel1 > .panel-heading > .flex-row > .header-left-panel > .title')
            .contains('Layanan yang kamu beli - Domain Baru');
        cy.get('.hasilpencarian-domain > .row > :nth-child(1) > .display-domain > .name > .domain-name')
            .contains('coba.com');
        cy.get('.hasilpencarian-domain > .row > :nth-child(1) > .display-domain > .flex-col > .harga-asli')
            .contains('Rp. 145.000');
        cy.get('.hasilpencarian-domain > .row > :nth-child(1) > .display-domain > .flex-row > .form-control')
            .should('exist');
        cy.get('.delete-eppcode')
            .contains('Hapus');
        //Cek cart transfer
        cy.get('#item-cart > :nth-child(2) > :nth-child(1) > .title')
            .contains('Transfer Domain');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(1)')
            .contains('coba.com');
        cy.get(':nth-child(2) > :nth-child(3) > .sub-title')
            .contains('Trans. 1 tahun');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(2)')
            .contains('Rp. 145.000');

        cy.get('.delete-eppcode')
            .click({force: true});
        cy.get('.swal2-confirm')
            .click({force: true});
        cy.get('.swal2-confirm')
            .click({force: true});
        cy.get('#item-cart > :nth-child(2) > :nth-child(1) > .title')
            .should('not.exist');
    });
    it('Tambah Domain Menggunakan domain pada troli', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('teshalocoba.com{enter}');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click()
            .wait(3000)
            .then(() => {
                cy.get('.show-domain-serupa > :nth-child(1) > .col-md-12 > .display-domain > .flex-row > .btn-orange')
                    .click()
                    .then(() => {
                        cy.get(':nth-child(2) > .col-md-12 > .display-domain > .flex-row > .btn-orange')
                            .click({force: true});
                    });
            });
        cy.get('#tambahLayanan')
            .click({force: true});
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click({force: true});
        cy.get(':nth-child(1) > .accordion > .accordion__item > .accordion__item__header')
            .click({force: true});
        cy.get('[data-groupid="1"]')
            .click({force: true});

        // Tambah lewat pencarian
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cobaincaridomain.com{enter}')
            .wait(8000)
            .then(() => {
                cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
                    .click({force: true});
            });
        // Checkbox tidak muncul saat sudah ada domain
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .gunakan_domain_dari_cart > .form-title')
            .should('not.be.visible');
        cy.get('#item-cart > :nth-child(4) > :nth-child(4) > :nth-child(1)')
            .should('to.contain','cobaincaridomain.com');

        // Tambah lewat troli
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-default')
            .click({force: true});
        cy.get('.swal2-confirm')
            .click({force: true});
        cy.get('.swal2-confirm')
            .click({force: true});
        // Checkbox muncul saat domain dihapus
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .gunakan_domain_dari_cart > .form-title > input')
            .click({force: true});
        cy.get('.dropdown_select_wrapper > .col-md-10 > .form-group > .form-control')
            .select('teshalocoba.store');
        cy.get('.dropdown_select_wrapper > .col-md-2 > .btn')
            .click({force: true});
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .gunakan_domain_dari_cart > .form-title')
            .should('not.be.visible');
        // Domain masuk ke cloud hosting
        cy.get(':nth-child(3) > :nth-child(4) > :nth-child(1)')
            .should('to.contain','teshalocoba.store');
        cy.get('#item-cart > :nth-child(2)')
            .should('not.to.contain','teshalocoba.store');

        // Cloud Hosting (walau ada domain menganggur)
        cy.get('#tambahLayanan')
            .click({force: true});
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click({force: true});
        cy.get(':nth-child(1) > .accordion > .accordion__item > .accordion__item__header')
            .click({force: true});
        cy.get('[data-groupid="1"]')
            .click({force: true});
        // Checkbox tidak muncul
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .gunakan_domain_dari_cart > .form-title')
            .should('not.be.visible');

        // Cloud Hosting apabila tidak ada domain menganggur
        cy.get(':nth-child(2) > :nth-child(1) > .remove-section-cart > .fas')
            .click({force: true});
        cy.get('.swal2-confirm')
            .click({force: true});
        cy.get('.swal2-confirm')
            .click({force: true});
        cy.get('#tambahLayanan')
            .click({force: true});
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click({force: true});
        cy.get(':nth-child(1) > .accordion > .accordion__item > .accordion__item__header')
            .click({force: true});
        cy.get('[data-groupid="1"]')
            .click({force: true});
        // Checkbox tidak muncul
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .gunakan_domain_dari_cart > .form-title')
            .should('not.be.visible');
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});