const test_base_uri = Cypress.env('baseUrl');
describe('Persyaratan Domain', function () {
    it('Syarat Order Product', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        // .co.id
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cobapersyaratan.co.id{enter}');
        cy.wait(3000);
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#panel1 > .panel-heading > .flex-row > .header-right-panel > .flex > .domain-name')
            .contains('cobapersyaratan.co.id');
        cy.get(':nth-child(2) > .persyaratan-domainid')
            .should('exist')
            .and('have.css','background-color','rgb(217, 237, 247)');
        cy.get(':nth-child(2) > .persyaratan-domainid > .text-bold > .fas')
            .should('exist');
        cy.get(':nth-child(2) > .persyaratan-domainid > .text-bold')
            .contains('Persyaratan Domain .co.id');
        cy.get('.persyaratan-domainid > ul > :nth-child(1)')
            .contains('KTP Rebulik Indonesia');
        cy.get('.persyaratan-domainid > ul > :nth-child(2)')
            .contains('SIUP/TDP/AKTA/Surat Izin yang setara.');
        cy.get('.persyaratan-domainid > ul > :nth-child(3)')
            .contains('Sertifikat Merek (bila ada)');
        cy.get(':nth-child(2) > .persyaratan-domainid > span')
            .contains('Kunjungi Link berikut untuk detailnya.');
        cy.get(':nth-child(2) > .persyaratan-domainid > span > a')
            .should('have.attr','href','https://www.jagoanhosting.com/tutorial/tutorial-domain/aktivasi-domain-id')
            .and('have.attr','target','_blank');
        
        // .sch.id
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .clear();
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cobapersyaratan.sch.id{enter}');
        cy.wait(3000);
        cy.get('.panel-penawaran > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#panel2 > .panel-heading > .flex-row > .header-right-panel > .flex > .domain-name')
            .contains('cobapersyaratan.sch.id');
        cy.get('#panel2 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid')
            .should('exist')
            .and('have.css','background-color','rgb(217, 237, 247)');
        cy.get('#panel2 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > .text-bold > .fas')
            .should('exist');
        cy.get('#panel2 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > .text-bold')
            .contains('Persyaratan Domain .sch.id');
        cy.get('#panel2 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > ul > :nth-child(1)')
            .contains('Untuk sekolah resmi:');
        cy.get('.persyaratan-domainid > ul > :nth-child(1) > :nth-child(1)')
            .contains('1. Surat Keterangan Kepala Sekolah atau Kepala Lembaga.');
        cy.get('#panel2 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > span')
            .contains('Kunjungi Link berikut untuk detailnya.');
        cy.get('#panel2 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > span > a')
            .should('have.attr','href','https://www.jagoanhosting.com/tutorial/tutorial-domain/aktivasi-domain-id')
            .and('have.attr','target','_blank');

        // .my.id
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .clear();
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cobapersyaratan.my.id{enter}');
        cy.wait(3000);
        cy.get('.panel-penawaran > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#panel3 > .panel-heading > .flex-row > .header-right-panel > .flex > .domain-name')
            .contains('cobapersyaratan.my.id');
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid')
            .should('exist')
            .and('have.css','background-color','rgb(217, 237, 247)');
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > .text-bold > .fas')
            .should('exist');
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > .text-bold')
            .contains('Persyaratan Domain .my.id');
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > ul > :nth-child(1)')
            .contains('KTP Rebulik Indonesia');
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > ul > :nth-child(2)')
            .contains('Registran wajib melakukan registrasi melalui link yang dikirimkan via email');
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > span')
            .contains('Kunjungi Link berikut untuk detailnya.');
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > span > a')
            .should('have.attr','href','https://www.jagoanhosting.com/tutorial/tutorial-domain/aktivasi-domain-id')
            .and('have.attr','target','_blank');

        // .ac.id
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .clear();
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cobapersyaratan.ac.id{enter}');
        cy.wait(3000);
        cy.get('.panel-penawaran > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#panel4 > .panel-heading > .flex-row > .header-right-panel > .flex > .domain-name')
            .contains('cobapersyaratan.ac.id');
        cy.get('#panel4 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid')
            .should('exist')
            .and('have.css','background-color','rgb(217, 237, 247)');
        cy.get('#panel4 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > .text-bold > .fas')
            .should('exist');
        cy.get('#panel4 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > .text-bold')
            .contains('Persyaratan Domain .ac.id');
        cy.get('#panel4 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > ul > :nth-child(1)')
            .contains('KTP Rebulik Indonesia');
        cy.get('#panel4 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > ul > :nth-child(2)')
            .contains('SK Pendirian Lembaga dari Kementerian/Lembaga yang berwenang sesuai Peraturan Perundang-Undangan.');
        cy.get('#panel4 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > ul > :nth-child(3)')
            .contains('Surat Keterangan Rektor atau Pimpinan Lembaga.');
        cy.get('#panel4 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > span')
            .contains('Kunjungi Link berikut untuk detailnya.');
        cy.get('#panel4 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > span > a')
            .should('have.attr','href','https://www.jagoanhosting.com/tutorial/tutorial-domain/aktivasi-domain-id')
            .and('have.attr','target','_blank');

        // .or.id
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .clear();
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cobapersyaratan.or.id{enter}');
        cy.wait(3000);
        cy.get('.panel-penawaran > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#panel5 > .panel-heading > .flex-row > .header-right-panel > .flex > .domain-name')
            .contains('cobapersyaratan.or.id');
        cy.get('#panel5 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid')
            .should('exist')
            .and('have.css','background-color','rgb(217, 237, 247)');
        cy.get('#panel5 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > .text-bold > .fas')
            .should('exist');
        cy.get('#panel5 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > .text-bold')
            .contains('Persyaratan Domain .or.id');
        cy.get('#panel5 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > ul > :nth-child(1)')
            .contains('KTP Rebulik Indonesia');
        cy.get('#panel5 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > ul > :nth-child(2)')
            .contains('Akta Notaris atau Surat Keterangan dari organisasi yang bersangkutan.');
        cy.get('#panel5 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > span')
            .contains('Kunjungi Link berikut untuk detailnya.');
        cy.get('#panel5 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > span > a')
            .should('have.attr','href','https://www.jagoanhosting.com/tutorial/tutorial-domain/aktivasi-domain-id')
            .and('have.attr','target','_blank');

        // .web.id
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .clear();
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cobapersyaratan.web.id{enter}');
        cy.wait(3000);
        cy.get('.panel-penawaran > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#panel6 > .panel-heading > .flex-row > .header-right-panel > .flex > .domain-name')
            .contains('cobapersyaratan.web.id');
        cy.get('#panel6 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid')
            .should('exist')
            .and('have.css','background-color','rgb(217, 237, 247)');
        cy.get('#panel6 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > .text-bold > .fas')
            .should('exist');
        cy.get('#panel6 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > .text-bold')
            .contains('Persyaratan Domain .web.id');
        cy.get('#panel6 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > ul > :nth-child(1)')
            .contains('KTP Rebulik Indonesia');
        cy.get('#panel6 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > span')
            .contains('Kunjungi Link berikut untuk detailnya.');
        cy.get('#panel6 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > span > a')
            .should('have.attr','href','https://www.jagoanhosting.com/tutorial/tutorial-domain/aktivasi-domain-id')
            .and('have.attr','target','_blank');
    });

    it('Syarat Order Domain', function () {
        cy.visit(test_base_uri+'/orders/domains');
        // .co.id
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cobapersyaratan.co.id{enter}');
        cy.wait(3000);
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('.flex > .domain-name')
            .contains('cobapersyaratan.co.id');
        cy.get(':nth-child(2) > .persyaratan-domainid')
            .should('exist')
            .and('have.css','background-color','rgb(217, 237, 247)');
        cy.get(':nth-child(2) > .persyaratan-domainid > .text-bold > .fas')
            .should('exist');
        cy.get(':nth-child(2) > .persyaratan-domainid > .text-bold')
            .contains('Persyaratan Domain .co.id');
        cy.get('.persyaratan-domainid > ul > :nth-child(1)')
            .contains('KTP Rebulik Indonesia');
        cy.get('.persyaratan-domainid > ul > :nth-child(2)')
            .contains('SIUP/TDP/AKTA/Surat Izin yang setara.');
        cy.get('.persyaratan-domainid > ul > :nth-child(3)')
            .contains('Sertifikat Merek (bila ada)');
        cy.get(':nth-child(2) > .persyaratan-domainid > span')
            .contains('Kunjungi Link berikut untuk detailnya.');
        cy.get(':nth-child(2) > .persyaratan-domainid > span > a')
            .should('have.attr','href','https://www.jagoanhosting.com/tutorial/tutorial-domain/aktivasi-domain-id')
            .and('have.attr','target','_blank');
        
        // .sch.id
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .clear();
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cobapersyaratan.sch.id{enter}');
        cy.wait(3000);
        cy.get('.panel-penawaran > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#panel1 > .panel-heading > .flex-row > .header-right-panel > .flex > .domain-name')
            .contains('cobapersyaratan.sch.id');
        cy.get('#panel1 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid')
            .should('exist')
            .and('have.css','background-color','rgb(217, 237, 247)');
        cy.get('#panel1 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > .text-bold > .fas')
            .should('exist');
        cy.get('#panel1 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > .text-bold')
            .contains('Persyaratan Domain .sch.id');
        cy.get('#panel1 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > ul > :nth-child(1)')
            .contains('Untuk sekolah resmi:');
        cy.get('.persyaratan-domainid > ul > :nth-child(1) > :nth-child(1)')
            .contains('1. Surat Keterangan Kepala Sekolah atau Kepala Lembaga.');
        cy.get('#panel1 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > span')
            .contains('Kunjungi Link berikut untuk detailnya.');
        cy.get('#panel1 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > span > a')
            .should('have.attr','href','https://www.jagoanhosting.com/tutorial/tutorial-domain/aktivasi-domain-id')
            .and('have.attr','target','_blank');

        // .my.id
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .clear();
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cobapersyaratan.my.id{enter}');
        cy.wait(3000);
        cy.get('.panel-penawaran > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#panel2 > .panel-heading > .flex-row > .header-right-panel > .flex > .domain-name')
            .contains('cobapersyaratan.my.id');
        cy.get('#panel2 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid')
            .should('exist')
            .and('have.css','background-color','rgb(217, 237, 247)');
        cy.get('#panel2 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > .text-bold > .fas')
            .should('exist');
        cy.get('#panel2 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > .text-bold')
            .contains('Persyaratan Domain .my.id');
        cy.get('#panel2 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > ul > :nth-child(1)')
            .contains('KTP Rebulik Indonesia');
        cy.get('#panel2 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > ul > :nth-child(2)')
            .contains('Registran wajib melakukan registrasi melalui link yang dikirimkan via email');
        cy.get('#panel2 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > span')
            .contains('Kunjungi Link berikut untuk detailnya.');
        cy.get('#panel2 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > span > a')
            .should('have.attr','href','https://www.jagoanhosting.com/tutorial/tutorial-domain/aktivasi-domain-id')
            .and('have.attr','target','_blank');

        // .ac.id
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .clear();
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cobapersyaratan.ac.id{enter}');
        cy.wait(3000);
        cy.get('.panel-penawaran > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#panel3 > .panel-heading > .flex-row > .header-right-panel > .flex > .domain-name')
            .contains('cobapersyaratan.ac.id');
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid')
            .should('exist')
            .and('have.css','background-color','rgb(217, 237, 247)');
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > .text-bold > .fas')
            .should('exist');
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > .text-bold')
            .contains('Persyaratan Domain .ac.id');
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > ul > :nth-child(1)')
            .contains('KTP Rebulik Indonesia');
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > ul > :nth-child(2)')
            .contains('SK Pendirian Lembaga dari Kementerian/Lembaga yang berwenang sesuai Peraturan Perundang-Undangan.');
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > ul > :nth-child(3)')
            .contains('Surat Keterangan Rektor atau Pimpinan Lembaga.');
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > span')
            .contains('Kunjungi Link berikut untuk detailnya.');
        cy.get('#panel3 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > span > a')
            .should('have.attr','href','https://www.jagoanhosting.com/tutorial/tutorial-domain/aktivasi-domain-id')
            .and('have.attr','target','_blank');

        // .or.id
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .clear();
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cobapersyaratan.or.id{enter}');
        cy.wait(3000);
        cy.get('.panel-penawaran > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#panel4 > .panel-heading > .flex-row > .header-right-panel > .flex > .domain-name')
            .contains('cobapersyaratan.or.id');
        cy.get('#panel4 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid')
            .should('exist')
            .and('have.css','background-color','rgb(217, 237, 247)');
        cy.get('#panel4 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > .text-bold > .fas')
            .should('exist');
        cy.get('#panel4 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > .text-bold')
            .contains('Persyaratan Domain .or.id');
        cy.get('#panel4 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > ul > :nth-child(1)')
            .contains('KTP Rebulik Indonesia');
        cy.get('#panel4 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > ul > :nth-child(2)')
            .contains('Akta Notaris atau Surat Keterangan dari organisasi yang bersangkutan.');
        cy.get('#panel4 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > span')
            .contains('Kunjungi Link berikut untuk detailnya.');
        cy.get('#panel4 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > span > a')
            .should('have.attr','href','https://www.jagoanhosting.com/tutorial/tutorial-domain/aktivasi-domain-id')
            .and('have.attr','target','_blank');

        // .web.id
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .clear();
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cobapersyaratan.web.id{enter}');
        cy.wait(3000);
        cy.get('.panel-penawaran > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(1) > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#panel5 > .panel-heading > .flex-row > .header-right-panel > .flex > .domain-name')
            .contains('cobapersyaratan.web.id');
        cy.get('#panel5 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid')
            .should('exist')
            .and('have.css','background-color','rgb(217, 237, 247)');
        cy.get('#panel5 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > .text-bold > .fas')
            .should('exist');
        cy.get('#panel5 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > .text-bold')
            .contains('Persyaratan Domain .web.id');
        cy.get('#panel5 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > ul > :nth-child(1)')
            .contains('KTP Rebulik Indonesia');
        cy.get('#panel5 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > span')
            .contains('Kunjungi Link berikut untuk detailnya.');
        cy.get('#panel5 > .panel-body > .maximize-panel > :nth-child(1) > .hasilpencarian-domain > .wrapper-domain-available > :nth-child(2) > .persyaratan-domainid > span > a')
            .should('have.attr','href','https://www.jagoanhosting.com/tutorial/tutorial-domain/aktivasi-domain-id')
            .and('have.attr','target','_blank');
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
});