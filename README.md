# WHMCS Module - Order

# Repository Url
- http://new.terapkan.com/whmcs-modules/beon_order
- http://gitlab.beon.co.id/whmcs-template/sobat_jagoan
- http://gitlab.beon.co.id/whmcs-template/form-order-jhcloud

# What is WHMCS Module - Order Page
Repository ini adalah repository dari modul WHMCS **BEON Apps - Custom Page** 
dimana modul ini digunakan untuk menangani halaman tambahan/custom pada member area.
Modul ini juga digunakan untuk mengatur ulang tata letak/urutan dari menu-menu yang 
ada pada *Navigation Bar*. Untuk halaman yang dibuat menggunakan modul ini dapat
diakses di **/index.php?m=beon_order&action=(routing_dari_halaman)**. 
Untuk parameter **action** pada url di isi dengan routing. Lihat di bagian [Routing](#routing)

# How To Manual Install
1. Pastikan sudah melakukan yang ada di bagian [Required](#required)  
2. Clone repository **stable** [http://new.terapkan.com/whmcs-modules/beon_order](http://new.terapkan.com/whmcs-modules/beon_order)
3. Copy file **modules/addons/beon_order/** ke directory public dari whmcs pada folder **modules/addons/**
4. Pastikan konfigurasi url di [modules/addons/beon_order/config.yml](modules/addons/beon_order/config.yml) sudah sesuai, *(untuk lebih detail buka di file tersebut)*
5. Config module tersebut yang akan dijelaskan dibawah ini.
6. Aktifkan modul **BEON Apps - Custom Page**, referensi lihat di [https://docs.whmcs.com/Addon_Modules_Management](https://docs.whmcs.com/Addon_Modules_Management)
 

### Cara Deploy 
Pastikan sudah di konfigurasi sesuai dengan panduan secara manual.

Terdapat 2 group konfigurasi host, yaitu untuk **development** dan untuk **production**

Terdapat 2 type untuk deploy:
#### Development Deploy 
```
ansible-playbook -i hosts dev-playbook.yml --ask-vault-pass
```

#### Production Deploy  
```
ansible-playbook -i hosts prod-playbook.yml  --ask-vault-pass
```

#### Config Modules
| Field | Keterangan |
| -------- | -------- |
| Payment confirmation duration   | Format (Menit:Detik) , Countdown ketika mengklik tombol pengecekan payment    |
| Api Interval   | detik, Interval pengecekan api invoice PAID per detik   |
| Hide gunakan domain   | Menyembunyikan pilihan hide gunakan domain sendiri (diharuskan beli domain atau transfer)|


# Required
1. WHMCS 7.x
2. PHP >= 5.6
1. [Logger API](http://new.terapkan.com/whmcs/logger-api)

# How To Downgrade
1. Pastikan sudah melakukan yang ada di bagian [Required](#required)  
2. Clone repository **tag terakhir sebelum versi yang saat ini terinstall** [http://new.terapkan.com/whmcs-modules/beon_order](http://new.terapkan.com/whmcs-modules/beon_order)
3. Step selanjutnya sama dengan bagian [How To Install](#how-to-install)

# Routing  
Routing dari sistem ini dapat dilihat di [modules/addons/beon_order/app/Helpers/Route.php](modules/addons/beon_order/app/Helpers/Route.php).  
Dalam routing tersebut juga ada yang mengarah ke routing **api**, yang bisa di akses di [modules/addons/beon_order/app/Controllers/Apis/Api.php](modules/addons/beon_order/app/Controllers/Apis/Api.php).

# Releases
- [v1.0 (klik untuk melihat dokumentasi)](docs/v1.0.md) (29-03-2019)
