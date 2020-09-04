# AMT Console

* 하모니카 PC를 intel AMT 기능이 지원되는 하드웨어에서 사용할 때 원격에서 PC 관리를 사용할 수 있는 AMT 관리자 콘솔 (UEFI 모드만 지원)
* AMT Console 은 meshcommander(https://www.npmjs.com/package/meshcommander) 를 하모니카 에서 사용할 수 있게 수정한 프로그램.

## 주요기능

 * Windosw 10 원격 설치 지원
 * HamoniKR 원격 설치 지원
 * Serial over Lan 지원
 * IDE-R 지원
 * Remote Desktop 지원 

![AMT Console Screenshot](docs/amt-console.png)

## 사용법

release/ 디렉토리안의 아래 파일을 다운로드 받아서 실행
- (윈도우용) hamonize-amtctl-win.exe
- (리눅스용) hamonize-amtctl-linux

실행 후 웹 브라우저에서 http://127.0.0.1:3000 으로 접속

## 사용자 가이드

* [AMT Console 사용자 가이드](docs/user-guide.md)

### IDE-R 사용

원격에서 IDE-R 기능을 사용하기 위해서 3가지 부팅이미지가 지원 가능

* release/hamonize-boot_1.0.img : 하모니카와 윈도우 10 설치가 가능한 부팅이미지 (58M)
* release/bootgrub.img : grub2 원격 부팅 (1.4M)
* release/super_grub2.img : super_grub2 프로젝트 이미지 (15M)                                                         

<hr>

## 빌드 및 소스코드 실행

### Install
``` git clone http://hckim@pms.invesume.com:7990/scm/~hckim/amt-webcmd.git```

### Run

```npm start```

### Single file deploy

```npm build```

### Connect

http://127.0.0.1:3000/


