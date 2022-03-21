import React from "react";

export default function part1() {
  let no = 1;
  let noBody = 1;
  return (
    <div className=" mt-6">
      <div className="">
        <h2 className=" text-xl font-semibold">
          <span>{no++}.</span> Gambaran Umum
        </h2>

        <div class="flex my-2">
          <div className=" w-10 ">
            <p className=" text-center">i.</p>
          </div>
          <div className=" w-full ">
            <p className=" tracking-wide text-justify">
              Kebijakan Privasi Jovasoftware ini (“Kebijakan Privasi”)
              menjelaskan bagaimana Kami mengumpulkan, menyimpan, menggunakan,
              memproses, memindahkan, mengungkapkan, dan melindungi Informasi
              Pribadi Anda yang Anda berikan maupun yang teridentifikasi melalui
              penggunaan Platform dan Layanan.
            </p>
          </div>
        </div>

        <div class="flex my-2">
          <div className=" w-10 ">
            <p className=" text-center">ii.</p>
          </div>
          <div className=" w-full ">
            <p className=" tracking-wide text-justify">
              Kami mengharapkan Anda membaca Kebijakan Privasi ini dengan
              seksama untuk memastikan pemahaman Anda atas Kebijakan Privasi ini
              serta membantu Anda dalam mengambil keputusan untuk a. menggunakan
              Layanan dan b. memberikan Informasi Pribadi Anda kepada Kami.
            </p>
          </div>
        </div>

        <div class="flex my-2">
          <div className=" w-10 ">
            <p className=" text-center">iii.</p>
          </div>
          <div className=" w-full ">
            <p className=" tracking-wide text-justify">
              Kebijakan Privasi ini berlaku untuk semua orang dan entitas yang
              mengakses Platform dan/atau menggunakan Layanan. Dengan mengakses
              Situs Web dan/atau menggunakan Layanan yang tersedia pada
              Platform, Anda dengan ini menyatakan secara tegas bahwa Anda telah
              membaca dan setuju dengan ketentuan-ketentuan dalam Kebijakan
              Privasi ini. Secara khusus, Anda setuju dan memberikan persetujuan
              kepada Kami untuk mengumpulkan, menggunakan, membagikan,
              mengungkapkan, menyimpan, mentransfer, atau mengolah Informasi
              Pribadi anda sesuai dengan Kebijakan Privasi ini.
            </p>
          </div>
        </div>
      </div>

      <div className=" mt-4">
        <h2 className=" text-xl font-semibold">
          <span>{no++}.</span> Pengumpulan Informasi
        </h2>

        <h3 className=" text-xl font-semibold underline">Umum</h3>

        <div class="flex my-2">
          <div className=" w-10 ">
            <p className=" text-center">{noBody++}.</p>
          </div>
          <div className=" w-full ">
            <p className=" tracking-wide text-justify">
              Ketika Anda mengunjungi Platform atau menggunakan Layanan, Kami
              dapat memproses data teknis seperti alamat protokol internet
              (internet protocol address) Anda, halaman web yang pernah Anda
              kunjungi, browser internet yang Anda gunakan, halaman web yang
              sebelumnya dan selanjutnya Anda kunjungi dan durasi setiap
              kunjungan atau sesi yang memungkinkan Kami untuk mengirimkan
              fungsi-fungsi Platform.
            </p>
          </div>
        </div>
        <div class="flex my-2">
          <div className=" w-10 ">
            <p className=" text-center">{noBody++}.</p>
          </div>
          <div className=" w-full ">
            <p className=" tracking-wide text-justify">
              Sebagai tambahan, dalam beberapa hal, browser dan/atau perangkat
              dapat menyarankan Anda untuk mengaktifkan fungsi geo-location Anda
              untuk memungkinkan Kami memberikan Anda suatu pengalaman yang
              lebih baik dalam menggunakan Layanan. Dengan data teknis ini, Kami
              dapat mengelola Platform dan Layanan, misalnya dengan
              menyelesaikan kesulitan-kesulitan teknis atau memperbaiki
              kemampuan akses bagian-bagian tertentu dari Platform dan Layanan.
            </p>
          </div>
        </div>

        <div class="flex my-2">
          <div className=" w-10 ">
            <p className=" text-center">{noBody++}.</p>
          </div>
          <div className=" w-full ">
            <p className=" tracking-wide text-justify">
              Apabila Anda menggunakan Layanan melalui Platform yang disediakan
              pihak ketiga, penggunaan Platform dan Layanan oleh Anda akan
              tunduk juga pada kebijakan privasi yang berlaku pada Platform
              tersebut.
            </p>
          </div>
        </div>

        <div class="flex my-2">
          <div className=" w-10 ">
            <p className=" text-center">{noBody++}.</p>
          </div>
          <div className=" w-full ">
            <p className=" tracking-wide text-justify">
              Dari waktu ke waktu, Kami dapat mengumpulkan Informasi Pribadi
              Anda, termasuk Informasi Pribadi yang:
            </p>
            <p>
              (a) diberikan oleh Anda ataupun Pihak yang Disetujui kepada Kami (
              <span className=" font-semibold">
                “Informasi Pribadi yang Anda Berikan”
              </span>
              );
            </p>
            <p>
              (b) teridentifikasi dan Kami kumpulkan atas penggunaan Layanan
              dan/atau Platform oleh Anda (
              <span className=" font-semibold">
                “Informasi Penggunaan Layanan”
              </span>
              );
            </p>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <h3 className=" text-xl font-semibold underline">
          Informasi Pribadi yang Anda Berikan.
        </h3>
        <div class="flex my-2">
          <div class=" w-10 ">
            <p class=" text-center">i.</p>
          </div>
          <div class=" w-full ">
            <p class=" tracking-wide text-justify">
              Pada saat Anda mendaftar pada Layanan, Anda akan memberikan
              Informasi Pribadi tertentu kepada Kami sesuai dengan ketentuan
              penggunaan yang dipersyaratkan untuk masing-masing Layanan.
            </p>
          </div>
        </div>
        <div class="flex my-2">
          <div class=" w-10 ">
            <p class=" text-center">ii.</p>
          </div>
          <div class=" w-full ">
            <p class=" tracking-wide text-justify">
              Ketika Anda menggunakan atau memesan suatu Layanan, Anda
              memberikan Informasi Pribadi kepada Kami, sebagaimana relevan,
              seperti jenis Layanan, total biaya transaksi, nomor rekening bank
              dan/atau uang elektronik, alamat, jumlah pinjaman, nama bank, nama
              pemegang rekening dan/atau data lainnya sebagai pendukung
              ekosistem Layanan.
            </p>
          </div>
        </div>
        <div class="flex my-2">
          <div class=" w-10 ">
            <p class=" text-center">iii.</p>
          </div>
          <div class=" w-full ">
            <p class=" tracking-wide text-justify">
              Sehubungan dengan pemberian Layanan kepada Anda, Kami dapat
              mengumpulkan informasi dan data berikut:
              <div class="flex my-2">
                <div class=" w-10 ">
                  <p class=" text-center">a.</p>
                </div>
                <div class=" w-full ">
                  <p class=" tracking-wide text-justify">
                    setiap Informasi Pribadi Anda dan/atau Individu Yang Relevan
                    tersebut yang dapat mengidentifikasi Anda atau Individu Yang
                    Relevan, termasuk tetapi tidak terbatas pada
                    informasi-informasi yang diperlukan sehubungan dengan
                    pelaksanaan prinsip <i>Know Your Customer</i> (KYC) sesuai
                    dengan peraturan perundang-undangan yang berlaku dan
                    kebijakan internal Kami;
                  </p>
                </div>
              </div>
              <div class="flex my-2">
                <div class=" w-10 ">
                  <p class=" text-center">b.</p>
                </div>
                <div class=" w-full ">
                  <p class=" tracking-wide text-justify">
                    setiap Informasi Pribadi Anda dan/atau Individu yang Relevan
                    yang diberikan kepada Kami selama Anda mengakses Platform
                    dan Layanan, seperti catatan partisipasi dalam setiap
                    korespondensi interaktif pada Platform dan jawaban Anda atas
                    pertanyaan-pertanyaan yang ditujukan untuk verifikasi
                    keamanan; dan
                  </p>
                </div>
              </div>
              <div class="flex my-2">
                <div class=" w-10 ">
                  <p class=" text-center">c.</p>
                </div>
                <div class=" w-full ">
                  <p class=" tracking-wide text-justify">
                    setiap Informasi Pribadi Anda dan Individu Yang Relevan yang
                    diberikan kepada Kami dalam perjalanan mempertahankan
                    hubungan antara Kami dan pihak yang terkait dengan Layanan
                    termasuk catatan korespondensi melalui telepon atau melalui
                    email.
                  </p>
                </div>
              </div>
            </p>
          </div>
        </div>
      </div>

      <div class=" mt-4">
        <h3 className=" text-xl font-semibold underline">
          Informasi Penggunaan Layanan.
        </h3>

        <div class="flex my-2">
          <div class=" w-10 ">
            <p class=" text-center">i.</p>
          </div>
          <div class=" w-full ">
            <p class=" tracking-wide text-justify">
              Informasi Pribadi Anda yang dikumpulkan dalam kaitannya dengan
              setiap kunjungan Anda ke Platform dan penggunaan Layanan termasuk:
            </p>
            <div class="flex my-2">
              <div class=" w-10 ">
                <p class=" text-center">a.</p>
              </div>
              <div class=" w-full ">
                <p class=" tracking-wide text-justify">
                  informasi teknis, termasuk alamat <i>Internet Protocol</i>{" "}
                  (IP) yang digunakan untuk menghubungkan perangkat Anda dengan
                  Internet, informasi login Anda, tipe dan versi browser,
                  pengaturan zona waktu, tipe dan versi browser plug-in, sistem
                  operasi dan platform;
                </p>
              </div>
            </div>
            <div class="flex my-2">
              <div class=" w-10 ">
                <p class=" text-center">b.</p>
              </div>
              <div class=" w-full ">
                <p class=" tracking-wide text-justify">
                  informasi kunjungan situs, termasuk semua{" "}
                  <i>Uniform Resources Locators</i> (URL)
                  <i>clickstream</i>
                  ke, melalui dan dari Platform (termasuk tanggal dan waktu),
                  layanan-layanan yang Anda lihat atau cari, waktu respons
                  halaman, kesalahan unduh, lama kunjungan ke laman-laman
                  tertentu, informasi interaksi laman (seperti scrolling, klik,
                  dan mouse-over) dan metode- metode yang digunakan untuk pindah
                  dari laman tersebut dan nomor telepon apapun yang digunakan
                  untuk menghubungi nomor layanan pelanggan Kami;
                </p>
              </div>
            </div>
            <div class="flex my-2">
              <div class=" w-10 ">
                <p class=" text-center">c.</p>
              </div>
              <div class=" w-full ">
                <p class=" tracking-wide text-justify">
                  informasi dan data dari cookies atau teknologi lainnya yang
                  digunakan pada Platform; dan
                </p>
              </div>
            </div>
            <div class="flex my-2">
              <div class=" w-10 ">
                <p class=" text-center">d.</p>
              </div>
              <div class=" w-full ">
                <p class=" tracking-wide text-justify">
                  Informasi kegiatan dan/atau transaksi yang berkaitan dengan
                  Layanan yang Anda gunakan, termasuk hasil pencarian dan
                  sejarah untuk Layanan dalam Platform, catatan transaksi
                  Layanan, catatan pembayaran pinjaman, jumlah pinjaman, tujuan
                  penggunaan pinjaman dan catatan penyaluran pinjaman Anda.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex my-2">
          <div class=" w-10 ">
            <p class=" text-center">ii.</p>
          </div>
          <div class=" w-full ">
            <p class=" tracking-wide text-justify">
              Kami juga akan mengumpulkan setiap Informasi Pribadi Anda yang
              dikumpulkan oleh Kami ketika Anda berpartisipasi dalam acara yang
              Kami selenggarakan, seperti pesta, seminar, program kontes atau
              penghargaan, dalam bentuk apapun termasuk foto, rekaman video dan
              suara Anda. Data tersebut juga dapat kami gunakan dan/atau
              cantumkan dalam materi komunikasi, publikasi, iklan dan/atau
              promosi yang Kami lakukan.
            </p>
          </div>
        </div>
      </div>

      <div class=" mt-4">
        <h3 className=" text-xl font-semibold underline">Penggunaan Cookie.</h3>

        <div class="flex my-2">
          <div class="ml-2 w-10 ">
            <p class=" text-center">i.</p>
          </div>
          <div class=" w-full ">
            <p class=" tracking-wide text-justify">
              <i>Cookie</i> adalah berkas data kecil yang ditempatkan browser
              Anda pada perangkat internet Anda. Dengan <i>cookie</i>, fitur
              aplikasi dan/atau situs web yang Anda akses dapat menyimpan
              informasi atau mengingat tindakan dan preferensi Anda dari waktu
              ke waktu.
            </p>
          </div>
        </div>
        <div class="flex my-2">
          <div class="ml-2 w-10 ">
            <p class=" text-center">ii.</p>
          </div>
          <div class=" w-full ">
            <p class=" tracking-wide text-justify">
              Sebagian besar browser dan perangkat internet mendukung{" "}
              <i>cookie</i>; namun Anda dapat mengatur browser atau perangkat
              yang Anda gunakan untuk menolak beberapa jenis <i>cookie</i>{" "}
              tertentu atau
              <i>cookie</i> spesifik. Di samping itu, Anda dapat menghapus{" "}
              <i>cookie</i> kapan saja.
            </p>
          </div>
        </div>
        <div class="flex my-2">
          <div class="ml-2 w-10 ">
            <p class=" text-center">iii.</p>
          </div>
          <div class=" w-full ">
            <p class=" tracking-wide text-justify">
              Kami menggunakan <i>cookie</i> untuk berbagai tujuan. Kami
              menggunakannya, misalnya, untuk mengingat preferensi penelusuran
              aman Anda, membantu Anda untuk menggunakan Layanan atau mengelola
              Layanan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
