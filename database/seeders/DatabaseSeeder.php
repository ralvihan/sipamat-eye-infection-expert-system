<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ─── USERS ───────────────────────────────────────────────────────────────

        DB::table('users')->insert([
            [
                'name'       => 'Admin',
                'email'      => 'admin@sipamat.com',
                'password'   => Hash::make('password'),
                'role'       => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Raihan Alvian Nuryansyah',
                'email'      => 'raihan@sipamat.com',
                'password'   => Hash::make('password'),
                'role'       => 'patient',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Sultan Putra Fabiansyah',
                'email'      => 'sultan@sipamat.com',
                'password'   => Hash::make('password'),
                'role'       => 'patient',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Sutan Raja Naufal Farras Nabih Harahap',
                'email'      => 'sutan@sipamat.com',
                'password'   => Hash::make('password'),
                'role'       => 'patient',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Dinda Putri Maharani',
                'email'      => 'dinda@sipamat.com',
                'password'   => Hash::make('password'),
                'role'       => 'patient',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Farhan Dwi Saputra',
                'email'      => 'farhan@sipamat.com',
                'password'   => Hash::make('password'),
                'role'       => 'patient',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // ─── DISEASES ────────────────────────────────────────────────────────────

        $diseases = [
            [
                'code'          => 'P001',
                'name'          => 'Ulkus Kornea Bakteri',
                'description'   => 'Luka pada kornea mata yang disebabkan oleh infeksi bakteri. Sering terjadi akibat penyalahgunaan kontak lens yang tidak sesuai anjuran dokter.',
                'solution'      => 'Segera rujuk ke dokter spesialis mata. Dokter akan memberikan terapi antibiotik tetes mata sesuai hasil kultur bakteri.',
                'need_referral' => true,
            ],
            [
                'code'          => 'P002',
                'name'          => 'Ulkus Kornea Jamur',
                'description'   => 'Luka pada kornea mata yang disebabkan oleh infeksi jamur. Dapat terjadi akibat trauma, kelilipan, atau penyalahgunaan kontak lens.',
                'solution'      => 'Segera rujuk ke dokter spesialis mata. Dokter akan memberikan terapi anti jamur sesuai hasil kultur jamur dan identifikasi spesies jamur.',
                'need_referral' => true,
            ],
            [
                'code'          => 'P003',
                'name'          => 'Konjungtivitis Bakteri',
                'description'   => 'Peradangan pada selaput bening yang melapisi bagian putih mata (konjungtiva) akibat infeksi bakteri. Umumnya lebih ringan dibanding ulkus kornea dan tidak melibatkan luka pada kornea.',
                'solution'      => 'Konsultasikan ke dokter mata. Umumnya diberikan antibiotik tetes mata. Jika gejala memberat dalam 2 hari atau muncul gangguan penglihatan, segera rujuk ke spesialis mata.',
                'need_referral' => false,
            ],
            [
                'code'          => 'P004',
                'name'          => 'Infeksi Mata Akibat Kontak Lens',
                'description'   => 'Infeksi mata yang dipicu oleh pemakaian kontak lens tidak sesuai anjuran: bukan resep dokter, dipakai terlalu lama, atau kualitas rendah. Umumnya menyerang usia 15-30 tahun.',
                'solution'      => 'Segera hentikan pemakaian kontak lens. Rujuk ke dokter spesialis mata untuk pemeriksaan kultur dan pemberian terapi yang tepat.',
                'need_referral' => true,
            ],
        ];

        DB::table('diseases')->insert(array_map(fn($d) => array_merge($d, [
            'created_at' => now(),
            'updated_at' => now(),
        ]), $diseases));

        // ─── SYMPTOMS ────────────────────────────────────────────────────────────

        $symptoms = [
            ['code' => 'G001', 'name' => 'Mata merah',                                  'description' => 'Bagian putih mata tampak kemerahan'],
            ['code' => 'G002', 'name' => 'Mata berair berlebihan',                       'description' => 'Air mata keluar terus menerus tanpa sebab jelas'],
            ['code' => 'G003', 'name' => 'Mata terasa sakit/nyeri',                      'description' => 'Rasa nyeri di area mata'],
            ['code' => 'G004', 'name' => 'Mata bengkak',                                 'description' => 'Pembengkakan pada kelopak atau sekitar mata'],
            ['code' => 'G005', 'name' => 'Mata terasa tidak nyaman',                     'description' => 'Rasa mengganjal atau tidak nyaman di mata'],
            ['code' => 'G006', 'name' => 'Terdapat bercak putih di kornea',              'description' => 'Ada bercak/noda putih pada bagian kornea (jendela bening mata)'],
            ['code' => 'G007', 'name' => 'Luka terlihat aktif dan cepat membesar',       'description' => 'Luka pada kornea yang berkembang cepat dalam waktu singkat'],
            ['code' => 'G008', 'name' => 'Riwayat trauma/kelilipan',                     'description' => 'Sebelumnya pernah terkena benda asing atau kelilipan di mata'],
            ['code' => 'G009', 'name' => 'Pemakai kontak lens',                          'description' => 'Sedang atau baru saja menggunakan kontak lens (terutama bukan resep dokter)'],
            ['code' => 'G010', 'name' => 'Penglihatan buram/menurun',                   'description' => 'Ketajaman penglihatan menurun atau buram'],
            ['code' => 'G011', 'name' => 'Keluar kotoran/sekret mata',                  'description' => 'Ada cairan kental atau kotoran yang keluar dari mata'],
            ['code' => 'G012', 'name' => 'Sensitif terhadap cahaya',                    'description' => 'Mata terasa silau atau tidak tahan cahaya (fotofobia)'],
            ['code' => 'G013', 'name' => 'Kelopak mata lengket saat bangun tidur',       'description' => 'Kelopak mata menempel akibat sekret yang mengering, khas pada konjungtivitis'],
            ['code' => 'G014', 'name' => 'Kontak dengan penderita mata merah/iritasi',  'description' => 'Riwayat kontak dekat dengan orang yang sedang mengalami mata merah/infeksi serupa'],
            ['code' => 'G015', 'name' => 'Tidak terdapat luka/bercak di kornea',        'description' => 'Pada pemeriksaan tidak ditemukan luka aktif maupun bercak putih di kornea — gejala hanya pada permukaan konjungtiva'],
        ];

        DB::table('symptoms')->insert(array_map(fn($s) => array_merge($s, [
            'created_at' => now(),
            'updated_at' => now(),
        ]), $symptoms));

        // ─── KNOWLEDGE BASE (FIXED) ───────────────────────────────────────────────
        //
        // Perubahan dari versi sebelumnya:
        //   1. G015 ("tidak ada luka di kornea") DIHAPUS dari P001 & P002
        //      → G015 bernilai positif untuk P001/P002 adalah kontradiktif secara klinis
        //   2. G009 ("pemakai kontak lens") DITAMBAHKAN ke P002 dengan CF 0.4
        //      → Kontak lens juga bisa memicu ulkus jamur, walau lebih lemah dari bakteri

        $knowledgeBase = [
            // P001 - Ulkus Kornea Bakteri (disease_id = 1)
            [1, 1,  0.6],   // mata merah
            [1, 2,  0.5],   // mata berair
            [1, 3,  0.75],  // nyeri (tinggi — bakteri lebih agresif)
            [1, 4,  0.5],   // bengkak
            [1, 5,  0.55],  // tidak nyaman
            [1, 6,  0.9],   // bercak putih kornea (REQUIRED)
            [1, 7,  0.9],   // luka aktif membesar (REQUIRED)
            [1, 8,  0.45],  // trauma/kelilipan (lebih lemah, lebih khas jamur)
            [1, 9,  0.9],   // pemakai kontak lens (sangat khas bakteri)
            [1, 10, 0.65],  // penglihatan buram
            [1, 11, 0.7],   // sekret/kotoran mata (lebih khas bakteri)
            [1, 12, 0.55],  // sensitif cahaya

            // P002 - Ulkus Kornea Jamur (disease_id = 2)
            [2, 1,  0.55],  // mata merah
            [2, 2,  0.4],   // mata berair
            [2, 3,  0.65],  // nyeri
            [2, 4,  0.45],  // bengkak
            [2, 5,  0.5],   // tidak nyaman
            [2, 6,  0.9],   // bercak putih kornea (REQUIRED)
            [2, 7,  0.8],   // luka aktif membesar (REQUIRED)
            [2, 8,  0.8],   // trauma/kelilipan (lebih khas jamur dari tanah/debu)
            [2, 9,  0.4],   // pemakai kontak lens (bisa, tapi lebih lemah dari bakteri)
            [2, 10, 0.6],   // penglihatan buram
            [2, 12, 0.5],   // sensitif cahaya

            // P003 - Konjungtivitis Bakteri (disease_id = 3)
            [3, 1,  0.85],  // mata merah (DOMINAN pada konjungtivitis)
            [3, 2,  0.6],   // mata berair
            [3, 3,  0.3],   // nyeri ringan (beda dari ulkus yang sangat nyeri)
            [3, 4,  0.45],  // bengkak
            [3, 5,  0.55],  // tidak nyaman
            [3, 11, 0.85],  // sekret/kotoran mata (DOMINAN)
            [3, 13, 0.8],   // kelopak lengket pagi hari (KHAS konjungtivitis)
            [3, 14, 0.6],   // riwayat kontak penderita (menular)
            [3, 15, 0.7],   // tidak ada luka di kornea (membedakan dari ulkus)

            // P004 - Infeksi Mata Akibat Kontak Lens (disease_id = 4)
            [4, 1,  0.7],   // mata merah
            [4, 2,  0.5],   // mata berair
            [4, 3,  0.65],  // nyeri
            [4, 5,  0.75],  // tidak nyaman
            [4, 6,  0.7],   // bercak kornea
            [4, 7,  0.7],   // luka aktif
            [4, 9,  1.0],   // pemakai kontak lens (DETERMINAN utama)
            [4, 10, 0.6],   // penglihatan buram
            [4, 12, 0.5],   // sensitif cahaya
        ];

        $rows = [];
        foreach ($knowledgeBase as [$diseaseId, $symptomId, $cfExpert]) {
            $rows[] = [
                'disease_id' => $diseaseId,
                'symptom_id' => $symptomId,
                'cf_expert'  => $cfExpert,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('disease_symptom')->insert($rows);

        // ─── SAMPLE DIAGNOSES ────────────────────────────────────────────────────
        //
        // 5 data diagnosa realistis dengan hasil CF yang sudah dihitung.
        // user_id: 2=Raihan, 3=Sultan, 4=Sutan, 5=Dinda, 6=Farhan
        //
        // Skenario:
        //   Raihan  → P001 Ulkus Kornea Bakteri  (pakai kontak lens non-resep, bercak & luka aktif)
        //   Sultan  → P004 Infeksi Kontak Lens   (kontak lens murah, luka & ketidaknyamanan)
        //   Sutan   → P002 Ulkus Kornea Jamur    (riwayat trauma/kelilipan, luka aktif)
        //   Dinda   → P003 Konjungtivitis Bakteri (mata lengket pagi, kontak dengan penderita)
        //   Farhan  → P001 Ulkus Kornea Bakteri  (gejala sedang, kontak lens mungkin)

        $diagnoses = [
            // ── Raihan Alvian Nuryansyah ─────────────────────────────────────────
            // Keluhan: mata nyeri parah, bercak putih di kornea, luka aktif membesar,
            // pengguna kontak lens tanpa resep dokter sejak 3 minggu.
            // Hasil teratas: Ulkus Kornea Bakteri 100% | Infeksi Kontak Lens 100%
            [
                'user_id'           => 2,
                'patient_name'      => 'Raihan Alvian Nuryansyah',
                'patient_age'       => 21,
                'patient_gender'    => 'male',
                'uses_contact_lens' => true,
                'results'           => json_encode([
                    [
                        'disease_id'       => 1,
                        'disease_code'     => 'P001',
                        'disease_name'     => 'Ulkus Kornea Bakteri',
                        'description'      => 'Luka pada kornea mata yang disebabkan oleh infeksi bakteri. Sering terjadi akibat penyalahgunaan kontak lens yang tidak sesuai anjuran dokter.',
                        'solution'         => 'Segera rujuk ke dokter spesialis mata. Dokter akan memberikan terapi antibiotik tetes mata sesuai hasil kultur bakteri.',
                        'need_referral'    => true,
                        'cf_combined'      => 1.0,
                        'percentage'       => 100.0,
                        'confidence_label' => 'Sangat Tinggi',
                        'symptom_trace'    => [
                            ['symptom_id'=>1,'symptom_code'=>'G001','symptom_name'=>'Mata merah','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.6,'cf_user'=>1.0,'cf_he'=>0.6],
                            ['symptom_id'=>2,'symptom_code'=>'G002','symptom_name'=>'Mata berair berlebihan','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.5,'cf_user'=>1.0,'cf_he'=>0.5],
                            ['symptom_id'=>3,'symptom_code'=>'G003','symptom_name'=>'Mata terasa sakit/nyeri','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.75,'cf_user'=>1.0,'cf_he'=>0.75],
                            ['symptom_id'=>4,'symptom_code'=>'G004','symptom_name'=>'Mata bengkak','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.5,'cf_user'=>0.6,'cf_he'=>0.3],
                            ['symptom_id'=>5,'symptom_code'=>'G005','symptom_name'=>'Mata terasa tidak nyaman','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.55,'cf_user'=>1.0,'cf_he'=>0.55],
                            ['symptom_id'=>6,'symptom_code'=>'G006','symptom_name'=>'Terdapat bercak putih di kornea','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.9,'cf_user'=>1.0,'cf_he'=>0.9],
                            ['symptom_id'=>7,'symptom_code'=>'G007','symptom_name'=>'Luka terlihat aktif dan cepat membesar','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.9,'cf_user'=>1.0,'cf_he'=>0.9],
                            ['symptom_id'=>8,'symptom_code'=>'G008','symptom_name'=>'Riwayat trauma/kelilipan','answer'=>'no','answer_label'=>'Tidak','cf_expert'=>0.45,'cf_user'=>0.0,'cf_he'=>0.0],
                            ['symptom_id'=>9,'symptom_code'=>'G009','symptom_name'=>'Pemakai kontak lens','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.9,'cf_user'=>1.0,'cf_he'=>0.9],
                            ['symptom_id'=>10,'symptom_code'=>'G010','symptom_name'=>'Penglihatan buram/menurun','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.65,'cf_user'=>0.6,'cf_he'=>0.39],
                            ['symptom_id'=>11,'symptom_code'=>'G011','symptom_name'=>'Keluar kotoran/sekret mata','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.7,'cf_user'=>0.6,'cf_he'=>0.42],
                            ['symptom_id'=>12,'symptom_code'=>'G012','symptom_name'=>'Sensitif terhadap cahaya','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.55,'cf_user'=>0.6,'cf_he'=>0.33],
                        ],
                    ],
                    [
                        'disease_id'       => 4,
                        'disease_code'     => 'P004',
                        'disease_name'     => 'Infeksi Mata Akibat Kontak Lens',
                        'description'      => 'Infeksi mata yang dipicu oleh pemakaian kontak lens tidak sesuai anjuran: bukan resep dokter, dipakai terlalu lama, atau kualitas rendah.',
                        'solution'         => 'Segera hentikan pemakaian kontak lens. Rujuk ke dokter spesialis mata untuk pemeriksaan kultur dan pemberian terapi yang tepat.',
                        'need_referral'    => true,
                        'cf_combined'      => 1.0,
                        'percentage'       => 100.0,
                        'confidence_label' => 'Sangat Tinggi',
                        'symptom_trace'    => [
                            ['symptom_id'=>1,'symptom_code'=>'G001','symptom_name'=>'Mata merah','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.7,'cf_user'=>1.0,'cf_he'=>0.7],
                            ['symptom_id'=>2,'symptom_code'=>'G002','symptom_name'=>'Mata berair berlebihan','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.5,'cf_user'=>1.0,'cf_he'=>0.5],
                            ['symptom_id'=>3,'symptom_code'=>'G003','symptom_name'=>'Mata terasa sakit/nyeri','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.65,'cf_user'=>1.0,'cf_he'=>0.65],
                            ['symptom_id'=>5,'symptom_code'=>'G005','symptom_name'=>'Mata terasa tidak nyaman','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.75,'cf_user'=>1.0,'cf_he'=>0.75],
                            ['symptom_id'=>6,'symptom_code'=>'G006','symptom_name'=>'Terdapat bercak putih di kornea','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.7,'cf_user'=>1.0,'cf_he'=>0.7],
                            ['symptom_id'=>7,'symptom_code'=>'G007','symptom_name'=>'Luka terlihat aktif dan cepat membesar','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.7,'cf_user'=>1.0,'cf_he'=>0.7],
                            ['symptom_id'=>9,'symptom_code'=>'G009','symptom_name'=>'Pemakai kontak lens','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>1.0,'cf_user'=>1.0,'cf_he'=>1.0],
                            ['symptom_id'=>10,'symptom_code'=>'G010','symptom_name'=>'Penglihatan buram/menurun','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.6,'cf_user'=>0.6,'cf_he'=>0.36],
                            ['symptom_id'=>12,'symptom_code'=>'G012','symptom_name'=>'Sensitif terhadap cahaya','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.5,'cf_user'=>0.6,'cf_he'=>0.3],
                        ],
                    ],
                ]),
                'created_at' => now()->subDays(5),
                'updated_at' => now()->subDays(5),
            ],

            // ── Sultan Putra Fabiansyah ───────────────────────────────────────────
            // Keluhan: mata merah & nyeri, memakai kontak lens warna non-resep,
            // bercak kornea mulai muncul, penglihatan sedikit buram.
            // Hasil teratas: Infeksi Kontak Lens 100% | Ulkus Kornea Bakteri 99.97%
            [
                'user_id'           => 3,
                'patient_name'      => 'Sultan Putra Fabiansyah',
                'patient_age'       => 22,
                'patient_gender'    => 'male',
                'uses_contact_lens' => true,
                'results'           => json_encode([
                    [
                        'disease_id'       => 4,
                        'disease_code'     => 'P004',
                        'disease_name'     => 'Infeksi Mata Akibat Kontak Lens',
                        'description'      => 'Infeksi mata yang dipicu oleh pemakaian kontak lens tidak sesuai anjuran: bukan resep dokter, dipakai terlalu lama, atau kualitas rendah.',
                        'solution'         => 'Segera hentikan pemakaian kontak lens. Rujuk ke dokter spesialis mata untuk pemeriksaan kultur dan pemberian terapi yang tepat.',
                        'need_referral'    => true,
                        'cf_combined'      => 1.0,
                        'percentage'       => 100.0,
                        'confidence_label' => 'Sangat Tinggi',
                        'symptom_trace'    => [
                            ['symptom_id'=>1,'symptom_code'=>'G001','symptom_name'=>'Mata merah','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.7,'cf_user'=>1.0,'cf_he'=>0.7],
                            ['symptom_id'=>2,'symptom_code'=>'G002','symptom_name'=>'Mata berair berlebihan','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.5,'cf_user'=>0.6,'cf_he'=>0.3],
                            ['symptom_id'=>3,'symptom_code'=>'G003','symptom_name'=>'Mata terasa sakit/nyeri','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.65,'cf_user'=>1.0,'cf_he'=>0.65],
                            ['symptom_id'=>5,'symptom_code'=>'G005','symptom_name'=>'Mata terasa tidak nyaman','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.75,'cf_user'=>1.0,'cf_he'=>0.75],
                            ['symptom_id'=>6,'symptom_code'=>'G006','symptom_name'=>'Terdapat bercak putih di kornea','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.7,'cf_user'=>0.6,'cf_he'=>0.42],
                            ['symptom_id'=>7,'symptom_code'=>'G007','symptom_name'=>'Luka terlihat aktif dan cepat membesar','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.7,'cf_user'=>0.6,'cf_he'=>0.42],
                            ['symptom_id'=>9,'symptom_code'=>'G009','symptom_name'=>'Pemakai kontak lens','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>1.0,'cf_user'=>1.0,'cf_he'=>1.0],
                            ['symptom_id'=>10,'symptom_code'=>'G010','symptom_name'=>'Penglihatan buram/menurun','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.6,'cf_user'=>0.6,'cf_he'=>0.36],
                            ['symptom_id'=>12,'symptom_code'=>'G012','symptom_name'=>'Sensitif terhadap cahaya','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.5,'cf_user'=>0.6,'cf_he'=>0.3],
                        ],
                    ],
                    [
                        'disease_id'       => 1,
                        'disease_code'     => 'P001',
                        'disease_name'     => 'Ulkus Kornea Bakteri',
                        'description'      => 'Luka pada kornea mata yang disebabkan oleh infeksi bakteri.',
                        'solution'         => 'Segera rujuk ke dokter spesialis mata. Dokter akan memberikan terapi antibiotik tetes mata sesuai hasil kultur bakteri.',
                        'need_referral'    => true,
                        'cf_combined'      => 0.9997,
                        'percentage'       => 99.97,
                        'confidence_label' => 'Sangat Tinggi',
                        'symptom_trace'    => [
                            ['symptom_id'=>1,'symptom_code'=>'G001','symptom_name'=>'Mata merah','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.6,'cf_user'=>1.0,'cf_he'=>0.6],
                            ['symptom_id'=>2,'symptom_code'=>'G002','symptom_name'=>'Mata berair berlebihan','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.5,'cf_user'=>0.6,'cf_he'=>0.3],
                            ['symptom_id'=>3,'symptom_code'=>'G003','symptom_name'=>'Mata terasa sakit/nyeri','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.75,'cf_user'=>1.0,'cf_he'=>0.75],
                            ['symptom_id'=>4,'symptom_code'=>'G004','symptom_name'=>'Mata bengkak','answer'=>'no','answer_label'=>'Tidak','cf_expert'=>0.5,'cf_user'=>0.0,'cf_he'=>0.0],
                            ['symptom_id'=>5,'symptom_code'=>'G005','symptom_name'=>'Mata terasa tidak nyaman','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.55,'cf_user'=>1.0,'cf_he'=>0.55],
                            ['symptom_id'=>6,'symptom_code'=>'G006','symptom_name'=>'Terdapat bercak putih di kornea','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.9,'cf_user'=>0.6,'cf_he'=>0.54],
                            ['symptom_id'=>7,'symptom_code'=>'G007','symptom_name'=>'Luka terlihat aktif dan cepat membesar','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.9,'cf_user'=>0.6,'cf_he'=>0.54],
                            ['symptom_id'=>8,'symptom_code'=>'G008','symptom_name'=>'Riwayat trauma/kelilipan','answer'=>'no','answer_label'=>'Tidak','cf_expert'=>0.45,'cf_user'=>0.0,'cf_he'=>0.0],
                            ['symptom_id'=>9,'symptom_code'=>'G009','symptom_name'=>'Pemakai kontak lens','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.9,'cf_user'=>1.0,'cf_he'=>0.9],
                            ['symptom_id'=>10,'symptom_code'=>'G010','symptom_name'=>'Penglihatan buram/menurun','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.65,'cf_user'=>0.6,'cf_he'=>0.39],
                            ['symptom_id'=>11,'symptom_code'=>'G011','symptom_name'=>'Keluar kotoran/sekret mata','answer'=>'no','answer_label'=>'Tidak','cf_expert'=>0.7,'cf_user'=>0.0,'cf_he'=>0.0],
                            ['symptom_id'=>12,'symptom_code'=>'G012','symptom_name'=>'Sensitif terhadap cahaya','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.55,'cf_user'=>0.6,'cf_he'=>0.33],
                        ],
                    ],
                ]),
                'created_at' => now()->subDays(3),
                'updated_at' => now()->subDays(3),
            ],

            // ── Sutan Raja Naufal Farras Nabih Harahap ───────────────────────────
            // Keluhan: mata kemasukan debu saat berkendara (trauma), keesokan harinya
            // muncul bercak putih di kornea, nyeri hebat & sensitif cahaya.
            // Hasil teratas: Ulkus Kornea Jamur 100% | Ulkus Kornea Bakteri 100%
            [
                'user_id'           => 4,
                'patient_name'      => 'Sutan Raja Naufal Farras Nabih Harahap',
                'patient_age'       => 23,
                'patient_gender'    => 'male',
                'uses_contact_lens' => false,
                'results'           => json_encode([
                    [
                        'disease_id'       => 2,
                        'disease_code'     => 'P002',
                        'disease_name'     => 'Ulkus Kornea Jamur',
                        'description'      => 'Luka pada kornea mata yang disebabkan oleh infeksi jamur. Dapat terjadi akibat trauma, kelilipan, atau penyalahgunaan kontak lens.',
                        'solution'         => 'Segera rujuk ke dokter spesialis mata. Dokter akan memberikan terapi anti jamur sesuai hasil kultur jamur dan identifikasi spesies jamur.',
                        'need_referral'    => true,
                        'cf_combined'      => 1.0,
                        'percentage'       => 100.0,
                        'confidence_label' => 'Sangat Tinggi',
                        'symptom_trace'    => [
                            ['symptom_id'=>1,'symptom_code'=>'G001','symptom_name'=>'Mata merah','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.55,'cf_user'=>1.0,'cf_he'=>0.55],
                            ['symptom_id'=>2,'symptom_code'=>'G002','symptom_name'=>'Mata berair berlebihan','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.4,'cf_user'=>0.6,'cf_he'=>0.24],
                            ['symptom_id'=>3,'symptom_code'=>'G003','symptom_name'=>'Mata terasa sakit/nyeri','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.65,'cf_user'=>1.0,'cf_he'=>0.65],
                            ['symptom_id'=>4,'symptom_code'=>'G004','symptom_name'=>'Mata bengkak','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.45,'cf_user'=>1.0,'cf_he'=>0.45],
                            ['symptom_id'=>5,'symptom_code'=>'G005','symptom_name'=>'Mata terasa tidak nyaman','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.5,'cf_user'=>1.0,'cf_he'=>0.5],
                            ['symptom_id'=>6,'symptom_code'=>'G006','symptom_name'=>'Terdapat bercak putih di kornea','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.9,'cf_user'=>1.0,'cf_he'=>0.9],
                            ['symptom_id'=>7,'symptom_code'=>'G007','symptom_name'=>'Luka terlihat aktif dan cepat membesar','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.8,'cf_user'=>1.0,'cf_he'=>0.8],
                            ['symptom_id'=>8,'symptom_code'=>'G008','symptom_name'=>'Riwayat trauma/kelilipan','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.8,'cf_user'=>1.0,'cf_he'=>0.8],
                            ['symptom_id'=>9,'symptom_code'=>'G009','symptom_name'=>'Pemakai kontak lens','answer'=>'no','answer_label'=>'Tidak','cf_expert'=>0.4,'cf_user'=>0.0,'cf_he'=>0.0],
                            ['symptom_id'=>10,'symptom_code'=>'G010','symptom_name'=>'Penglihatan buram/menurun','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.6,'cf_user'=>1.0,'cf_he'=>0.6],
                            ['symptom_id'=>12,'symptom_code'=>'G012','symptom_name'=>'Sensitif terhadap cahaya','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.5,'cf_user'=>1.0,'cf_he'=>0.5],
                        ],
                    ],
                    [
                        'disease_id'       => 1,
                        'disease_code'     => 'P001',
                        'disease_name'     => 'Ulkus Kornea Bakteri',
                        'description'      => 'Luka pada kornea mata yang disebabkan oleh infeksi bakteri.',
                        'solution'         => 'Segera rujuk ke dokter spesialis mata. Dokter akan memberikan terapi antibiotik tetes mata sesuai hasil kultur bakteri.',
                        'need_referral'    => true,
                        'cf_combined'      => 1.0,
                        'percentage'       => 100.0,
                        'confidence_label' => 'Sangat Tinggi',
                        'symptom_trace'    => [
                            ['symptom_id'=>1,'symptom_code'=>'G001','symptom_name'=>'Mata merah','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.6,'cf_user'=>1.0,'cf_he'=>0.6],
                            ['symptom_id'=>2,'symptom_code'=>'G002','symptom_name'=>'Mata berair berlebihan','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.5,'cf_user'=>0.6,'cf_he'=>0.3],
                            ['symptom_id'=>3,'symptom_code'=>'G003','symptom_name'=>'Mata terasa sakit/nyeri','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.75,'cf_user'=>1.0,'cf_he'=>0.75],
                            ['symptom_id'=>4,'symptom_code'=>'G004','symptom_name'=>'Mata bengkak','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.5,'cf_user'=>1.0,'cf_he'=>0.5],
                            ['symptom_id'=>5,'symptom_code'=>'G005','symptom_name'=>'Mata terasa tidak nyaman','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.55,'cf_user'=>1.0,'cf_he'=>0.55],
                            ['symptom_id'=>6,'symptom_code'=>'G006','symptom_name'=>'Terdapat bercak putih di kornea','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.9,'cf_user'=>1.0,'cf_he'=>0.9],
                            ['symptom_id'=>7,'symptom_code'=>'G007','symptom_name'=>'Luka terlihat aktif dan cepat membesar','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.9,'cf_user'=>1.0,'cf_he'=>0.9],
                            ['symptom_id'=>8,'symptom_code'=>'G008','symptom_name'=>'Riwayat trauma/kelilipan','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.45,'cf_user'=>1.0,'cf_he'=>0.45],
                            ['symptom_id'=>9,'symptom_code'=>'G009','symptom_name'=>'Pemakai kontak lens','answer'=>'no','answer_label'=>'Tidak','cf_expert'=>0.9,'cf_user'=>0.0,'cf_he'=>0.0],
                            ['symptom_id'=>10,'symptom_code'=>'G010','symptom_name'=>'Penglihatan buram/menurun','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.65,'cf_user'=>1.0,'cf_he'=>0.65],
                            ['symptom_id'=>11,'symptom_code'=>'G011','symptom_name'=>'Keluar kotoran/sekret mata','answer'=>'no','answer_label'=>'Tidak','cf_expert'=>0.7,'cf_user'=>0.0,'cf_he'=>0.0],
                            ['symptom_id'=>12,'symptom_code'=>'G012','symptom_name'=>'Sensitif terhadap cahaya','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.55,'cf_user'=>1.0,'cf_he'=>0.55],
                        ],
                    ],
                ]),
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],

            // ── Dinda Putri Maharani ──────────────────────────────────────────────
            // Keluhan: mata merah & berair, kelopak lengket tiap pagi, teman sekelas
            // baru saja mengalami mata merah. Tidak ada luka di kornea.
            // Hasil teratas: Konjungtivitis Bakteri 99.99%
            [
                'user_id'           => 5,
                'patient_name'      => 'Dinda Putri Maharani',
                'patient_age'       => 20,
                'patient_gender'    => 'female',
                'uses_contact_lens' => false,
                'results'           => json_encode([
                    [
                        'disease_id'       => 3,
                        'disease_code'     => 'P003',
                        'disease_name'     => 'Konjungtivitis Bakteri',
                        'description'      => 'Peradangan pada selaput bening yang melapisi bagian putih mata (konjungtiva) akibat infeksi bakteri.',
                        'solution'         => 'Konsultasikan ke dokter mata. Umumnya diberikan antibiotik tetes mata. Jika gejala memberat dalam 2 hari atau muncul gangguan penglihatan, segera rujuk ke spesialis mata.',
                        'need_referral'    => false,
                        'cf_combined'      => 0.9999,
                        'percentage'       => 99.99,
                        'confidence_label' => 'Sangat Tinggi',
                        'symptom_trace'    => [
                            ['symptom_id'=>1,'symptom_code'=>'G001','symptom_name'=>'Mata merah','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.85,'cf_user'=>1.0,'cf_he'=>0.85],
                            ['symptom_id'=>2,'symptom_code'=>'G002','symptom_name'=>'Mata berair berlebihan','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.6,'cf_user'=>1.0,'cf_he'=>0.6],
                            ['symptom_id'=>3,'symptom_code'=>'G003','symptom_name'=>'Mata terasa sakit/nyeri','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.3,'cf_user'=>0.6,'cf_he'=>0.18],
                            ['symptom_id'=>4,'symptom_code'=>'G004','symptom_name'=>'Mata bengkak','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.45,'cf_user'=>0.6,'cf_he'=>0.27],
                            ['symptom_id'=>5,'symptom_code'=>'G005','symptom_name'=>'Mata terasa tidak nyaman','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.55,'cf_user'=>1.0,'cf_he'=>0.55],
                            ['symptom_id'=>11,'symptom_code'=>'G011','symptom_name'=>'Keluar kotoran/sekret mata','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.85,'cf_user'=>1.0,'cf_he'=>0.85],
                            ['symptom_id'=>13,'symptom_code'=>'G013','symptom_name'=>'Kelopak mata lengket saat bangun tidur','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.8,'cf_user'=>1.0,'cf_he'=>0.8],
                            ['symptom_id'=>14,'symptom_code'=>'G014','symptom_name'=>'Kontak dengan penderita mata merah/iritasi','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.6,'cf_user'=>1.0,'cf_he'=>0.6],
                            ['symptom_id'=>15,'symptom_code'=>'G015','symptom_name'=>'Tidak terdapat luka/bercak di kornea','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.7,'cf_user'=>1.0,'cf_he'=>0.7],
                        ],
                    ],
                ]),
                'created_at' => now()->subDay(),
                'updated_at' => now()->subDay(),
            ],

            // ── Farhan Dwi Saputra ────────────────────────────────────────────────
            // Keluhan: mata merah & nyeri, mungkin pernah pakai kontak lens sekali-dua,
            // ada bercak putih kecil di kornea, penglihatan sedikit buram.
            // Hasil teratas: Ulkus Kornea Bakteri 99.94%
            [
                'user_id'           => 6,
                'patient_name'      => 'Farhan Dwi Saputra',
                'patient_age'       => 19,
                'patient_gender'    => 'male',
                'uses_contact_lens' => false,
                'results'           => json_encode([
                    [
                        'disease_id'       => 1,
                        'disease_code'     => 'P001',
                        'disease_name'     => 'Ulkus Kornea Bakteri',
                        'description'      => 'Luka pada kornea mata yang disebabkan oleh infeksi bakteri.',
                        'solution'         => 'Segera rujuk ke dokter spesialis mata. Dokter akan memberikan terapi antibiotik tetes mata sesuai hasil kultur bakteri.',
                        'need_referral'    => true,
                        'cf_combined'      => 0.9994,
                        'percentage'       => 99.94,
                        'confidence_label' => 'Sangat Tinggi',
                        'symptom_trace'    => [
                            ['symptom_id'=>1,'symptom_code'=>'G001','symptom_name'=>'Mata merah','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.6,'cf_user'=>1.0,'cf_he'=>0.6],
                            ['symptom_id'=>2,'symptom_code'=>'G002','symptom_name'=>'Mata berair berlebihan','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.5,'cf_user'=>0.6,'cf_he'=>0.3],
                            ['symptom_id'=>3,'symptom_code'=>'G003','symptom_name'=>'Mata terasa sakit/nyeri','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.75,'cf_user'=>1.0,'cf_he'=>0.75],
                            ['symptom_id'=>4,'symptom_code'=>'G004','symptom_name'=>'Mata bengkak','answer'=>'no','answer_label'=>'Tidak','cf_expert'=>0.5,'cf_user'=>0.0,'cf_he'=>0.0],
                            ['symptom_id'=>5,'symptom_code'=>'G005','symptom_name'=>'Mata terasa tidak nyaman','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.55,'cf_user'=>0.6,'cf_he'=>0.33],
                            ['symptom_id'=>6,'symptom_code'=>'G006','symptom_name'=>'Terdapat bercak putih di kornea','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.9,'cf_user'=>1.0,'cf_he'=>0.9],
                            ['symptom_id'=>7,'symptom_code'=>'G007','symptom_name'=>'Luka terlihat aktif dan cepat membesar','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.9,'cf_user'=>0.6,'cf_he'=>0.54],
                            ['symptom_id'=>8,'symptom_code'=>'G008','symptom_name'=>'Riwayat trauma/kelilipan','answer'=>'no','answer_label'=>'Tidak','cf_expert'=>0.45,'cf_user'=>0.0,'cf_he'=>0.0],
                            ['symptom_id'=>9,'symptom_code'=>'G009','symptom_name'=>'Pemakai kontak lens','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.9,'cf_user'=>0.6,'cf_he'=>0.54],
                            ['symptom_id'=>10,'symptom_code'=>'G010','symptom_name'=>'Penglihatan buram/menurun','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.65,'cf_user'=>0.6,'cf_he'=>0.39],
                            ['symptom_id'=>11,'symptom_code'=>'G011','symptom_name'=>'Keluar kotoran/sekret mata','answer'=>'no','answer_label'=>'Tidak','cf_expert'=>0.7,'cf_user'=>0.0,'cf_he'=>0.0],
                            ['symptom_id'=>12,'symptom_code'=>'G012','symptom_name'=>'Sensitif terhadap cahaya','answer'=>'no','answer_label'=>'Tidak','cf_expert'=>0.55,'cf_user'=>0.0,'cf_he'=>0.0],
                        ],
                    ],
                    [
                        'disease_id'       => 4,
                        'disease_code'     => 'P004',
                        'disease_name'     => 'Infeksi Mata Akibat Kontak Lens',
                        'description'      => 'Infeksi mata yang dipicu oleh pemakaian kontak lens tidak sesuai anjuran.',
                        'solution'         => 'Segera hentikan pemakaian kontak lens. Rujuk ke dokter spesialis mata untuk pemeriksaan kultur dan pemberian terapi yang tepat.',
                        'need_referral'    => true,
                        'cf_combined'      => 0.9982,
                        'percentage'       => 99.82,
                        'confidence_label' => 'Sangat Tinggi',
                        'symptom_trace'    => [
                            ['symptom_id'=>1,'symptom_code'=>'G001','symptom_name'=>'Mata merah','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.7,'cf_user'=>1.0,'cf_he'=>0.7],
                            ['symptom_id'=>2,'symptom_code'=>'G002','symptom_name'=>'Mata berair berlebihan','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.5,'cf_user'=>0.6,'cf_he'=>0.3],
                            ['symptom_id'=>3,'symptom_code'=>'G003','symptom_name'=>'Mata terasa sakit/nyeri','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.65,'cf_user'=>1.0,'cf_he'=>0.65],
                            ['symptom_id'=>5,'symptom_code'=>'G005','symptom_name'=>'Mata terasa tidak nyaman','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.75,'cf_user'=>0.6,'cf_he'=>0.45],
                            ['symptom_id'=>6,'symptom_code'=>'G006','symptom_name'=>'Terdapat bercak putih di kornea','answer'=>'yes','answer_label'=>'Ya','cf_expert'=>0.7,'cf_user'=>1.0,'cf_he'=>0.7],
                            ['symptom_id'=>7,'symptom_code'=>'G007','symptom_name'=>'Luka terlihat aktif dan cepat membesar','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.7,'cf_user'=>0.6,'cf_he'=>0.42],
                            ['symptom_id'=>9,'symptom_code'=>'G009','symptom_name'=>'Pemakai kontak lens','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>1.0,'cf_user'=>0.6,'cf_he'=>0.6],
                            ['symptom_id'=>10,'symptom_code'=>'G010','symptom_name'=>'Penglihatan buram/menurun','answer'=>'maybe','answer_label'=>'Mungkin','cf_expert'=>0.6,'cf_user'=>0.6,'cf_he'=>0.36],
                            ['symptom_id'=>12,'symptom_code'=>'G012','symptom_name'=>'Sensitif terhadap cahaya','answer'=>'no','answer_label'=>'Tidak','cf_expert'=>0.5,'cf_user'=>0.0,'cf_he'=>0.0],
                        ],
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('diagnoses')->insert($diagnoses);
    }
}