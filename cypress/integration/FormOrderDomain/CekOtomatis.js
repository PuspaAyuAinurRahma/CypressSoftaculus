const test_base_uri = Cypress.env('baseUrl');
describe('Cek Otomatis', function () {
    it('Pencarian Otomatis', function () {
        cy.visit(test_base_uri+'/orders/domains/cekpencarianotomatis.com');
        cy.wait(1000);
        cy.get('.display-domain')
            .should('exist');
        cy.get('#section-add-domain > .panel-penawaran > .form-title')
            .contains('Tambah Domain');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .name > .domain-name')
            .contains('cekpencarianotomatis.com');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-col > .harga-asli')
            .contains('Rp. 142,000');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-row > .form-control')
            .should('exist');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-row > .btn-orange')
            .contains('Tambah');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('.item > :nth-child(1) > .title')
            .contains('Registrasi Domain');
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(1)')
            .contains('cekpencarianotomatis.com');
        
        // Sudah Terdapat di Cart
        cy.visit(test_base_uri+'/orders/domains/cekpencarianotomatis.com');
        cy.get('.display-domain')
            .should('not.exist');
        cy.get('.flex > .domain-name')
            .contains('cekpencarianotomatis.com');
        cy.get('#panel0 > .panel-body')
            .should('exist');
        cy.get('.name > .domain-name')
            .contains('cekpencarianotomatis.com');
        cy.get('.harga-asli')
            .contains('Rp. 142,000');
        cy.get('.flex-row > .form-control')
            .should('exist');
        cy.get('.flex-row > .btn-default')
            .contains('Hapus');
        cy.get('.flex-row > .btn-default')
            .click();
        cy.get('.swal2-confirm')
            .click();
        cy.get('.swal2-confirm')
            .click();
        
        // Nama Domain Tidak Sesuai
        cy.visit(test_base_uri+'/orders/domains/lalalalla/domains/cekpencarianotomatis.com');
        cy.get('#section-add-domain > .align-items-center > .form-title')
            .contains('Tambah Domain');
        cy.get('.display-domain')
            .should('not.exist');

        //Cek Nama Domain tidak ada ekstensi
        cy.visit(test_base_uri+'/orders/domains/cobaotomatis');
        cy.get('#section-add-domain > .align-items-center > .form-title')
            .contains('Tambah Domain');
        cy.get('.display-domain')
            .should('not.exist');

        //Cek Nama Domain tidak sesuai aturan domain
        cy.visit(test_base_uri+'/orders/domains/cobaotomatis.com.com.com');
        cy.get('#section-add-domain > .align-items-center > .form-title')
            .contains('Tambah Domain');
        cy.get('.display-domain')
            .should('not.exist');
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});