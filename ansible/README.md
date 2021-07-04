# Ansible Playbook untuk deploy Lancer Panel. 

## Requirements

- Ansible
- Ansible Lint
- Yamllint
- Molecule
- Docker 
- Docker Python Library
- File Vault

### Install Requirements

#### Install Ansible, Ansible Lint, Molecule, Yamllint, Docker Python Library

Untuk installasi sangat disarankan menggunakan PIP karena dapat dieksekusi di semua distro Linux.

Step 1: Pastikan PIP sudah terinstal

**Install PIP Ubuntu**

```Shell
sudo apt install python3-pip
```

**Install PIP Fedora**
```Shell
sudo dnf install python3-pip
```

Step 2: Install ansible, ansible-lint, yamllint, molecule dan docker python library

```shell
pip3 install --user ansible ansible-lint molecule docker yamllint
```

#### Install Docker

**Install Docker Ubuntu**

```Shell
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

**Install Docker Fedora**

```Shell
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
sudo dnf install docker-ce docker-ce-cli containerd.io
```

Setelah Docker terinstall, tambahkan group Docker ke user laptop masing-masing.

Contoh:

```Shell
sudo usermod -a -G docker santo
```

## Melakukan test playbook

Pastikan didalam folder `lancerpanel/ansible` sudah ada file **secure.vault** yang berisi password. Untuk detail password bisa ditanyakan ke @faizal.

Masuk ke dalam directory `/ansible` dan jalankan perintah berikut untuk melakukan test ansible playbook

```Shell
ANSIBLE_VAULT_PASSWORD_FILE=$(pwd)/secure.vault molecule converge --scenario-name lancerpanel
```
Untuk mengecek hasil deploy, bisa langsung mengakses halaman:

- localhost:55672 (Dashboard Rabbit)
- localhost:55680 (HTTP)
- localhost:55443 (HTTPS)

Untuk masuk ke dalam docker, gunakan perintah:

```Shell
docker exec -it LANCERPANEL bash
```

Dan gunakan perintah berikut untuk menghapus docker setelah proses test selesai.

```Shell
ANSIBLE_VAULT_PASSWORD_FILE=$(pwd)/secure.vault molecule destroy --scenario-name lancerpanel
```
