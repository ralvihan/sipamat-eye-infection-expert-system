<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>Hasil Diagnosa - {{ $diagnosis->patient_name }}</title>
    <style>
        @page {
            margin: 30px 40px;
        }

        * {
            box-sizing: border-box;
        }

        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 10.5px;
            color: #1a1a1a;
            line-height: 1.5;
        }

        /* ── Kop Dokumen ─────────────────────────────────────────── */
        .letterhead {
            border-bottom: 1.5px solid #1a1a1a;
            padding-bottom: 10px;
            margin-bottom: 4px;
            width: 100%;
        }

        .letterhead-inner {
            display: table;
            width: 100%;
        }

        .letterhead-logo {
            display: table-cell;
            width: 48px;
            vertical-align: middle;
            padding-right: 12px;
        }

        .letterhead-logo img {
            width: 40px;
            height: 40px;
        }

        .letterhead-text {
            display: table-cell;
            vertical-align: middle;
            text-align: center;
        }

        .letterhead .system-name {
            font-size: 17px;
            font-weight: bold;
            letter-spacing: 1px;
            color: #0f172a;
        }

        .letterhead .system-sub {
            font-size: 9px;
            color: #555;
            margin-top: 2px;
        }

        .letterhead-spacer {
            display: table-cell;
            width: 48px;
        }

        .doc-title {
            text-align: center;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin: 14px 0 4px;
        }

        .doc-number {
            text-align: center;
            font-size: 9px;
            color: #555;
            margin-bottom: 18px;
        }

        /* ── Tabel Identitas ─────────────────────────────────────── */
        .identity-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 18px;
        }

        .identity-table td {
            padding: 3px 0;
            font-size: 10.5px;
            vertical-align: top;
        }

        .identity-table .id-label {
            width: 110px;
            color: #555;
        }

        .identity-table .id-colon {
            width: 12px;
        }

        .identity-table .id-value {
            font-weight: bold;
            color: #1a1a1a;
        }

        /* ── Pembagi Section ─────────────────────────────────────── */
        .section-heading {
            font-size: 10.5px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            border-bottom: 1px solid #1a1a1a;
            padding-bottom: 3px;
            margin: 18px 0 10px;
        }

        /* ── Hasil Diagnosis Utama ───────────────────────────────── */
        .primary-result {
            margin-bottom: 6px;
        }

        .primary-result .disease-line {
            font-size: 13px;
            font-weight: bold;
            color: #0f172a;
        }

        .primary-result .disease-code {
            font-size: 9px;
            color: #777;
            font-weight: normal;
        }

        .confidence-row {
            margin: 6px 0 10px;
            font-size: 10px;
        }

        .confidence-row .cf-value {
            font-weight: bold;
        }

        .confidence-row .cf-label {
            color: #555;
        }

        .cf-bar-track {
            background: #e8e8e8;
            height: 5px;
            width: 100%;
            margin-top: 4px;
        }

        .cf-bar-fill {
            height: 5px;
            background: #1a1a1a;
        }

        .narrative {
            font-size: 10.5px;
            color: #2a2a2a;
            text-align: justify;
            margin-bottom: 10px;
        }

        .narrative-label {
            font-weight: bold;
            display: block;
            margin-bottom: 2px;
            font-size: 9.5px;
            color: #555;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }

        .referral-note {
            font-size: 10px;
            font-weight: bold;
            border: 1px solid #1a1a1a;
            padding: 6px 10px;
            margin: 10px 0;
        }

        /* ── Tabel Rincian Gejala ────────────────────────────────── */
        .trace-table {
            width: 100%;
            border-collapse: collapse;
            margin: 8px 0 14px;
            font-size: 9.5px;
        }

        .trace-table th {
            text-align: left;
            border-top: 1px solid #1a1a1a;
            border-bottom: 1px solid #1a1a1a;
            padding: 4px 6px;
            font-size: 8.5px;
            text-transform: uppercase;
            color: #333;
        }

        .trace-table td {
            padding: 4px 6px;
            border-bottom: 1px dotted #ccc;
            color: #2a2a2a;
        }

        .trace-table .col-code {
            width: 12%;
            color: #777;
        }

        .trace-table .col-answer {
            width: 14%;
        }

        .trace-table .col-calc {
            width: 28%;
            text-align: right;
            color: #555;
        }

        /* ── Kemungkinan Lain ────────────────────────────────────── */
        .other-results-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 14px;
            font-size: 10px;
        }

        .other-results-table th {
            text-align: left;
            border-bottom: 1px solid #1a1a1a;
            padding: 4px 6px;
            font-size: 8.5px;
            text-transform: uppercase;
            color: #333;
        }

        .other-results-table td {
            padding: 5px 6px;
            border-bottom: 1px dotted #ccc;
        }

        .other-results-table .col-pct {
            text-align: right;
            font-weight: bold;
            width: 60px;
        }

        /* ── Disclaimer ──────────────────────────────────────────── */
        .disclaimer {
            margin-top: 24px;
            padding-top: 10px;
            border-top: 1px solid #999;
            font-size: 8.5px;
            color: #555;
            text-align: justify;
            line-height: 1.6;
        }

        .signature-block {
            margin-top: 30px;
            width: 100%;
        }

        .signature-block .sig-col {
            display: inline-block;
            width: 45%;
            text-align: center;
            font-size: 9.5px;
            color: #333;
        }

        .signature-block .sig-line {
            margin-top: 45px;
            border-top: 1px solid #1a1a1a;
            padding-top: 3px;
        }

        .empty-state {
            text-align: center;
            padding: 40px 0;
            color: #555;
            font-size: 11px;
        }
    </style>
</head>
<body>

    @php
        $bulan = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember',
        ];
        $now = now();
        $tanggalCetak = $now->day . ' ' . $bulan[$now->month] . ' ' . $now->year . ', ' . $now->format('H:i');
        $tanggalDiagnosa = $diagnosis->created_at->day . ' ' . $bulan[$diagnosis->created_at->month] . ' ' . $diagnosis->created_at->year . ', ' . $diagnosis->created_at->format('H:i');
    @endphp

    {{-- Kop --}}
    <div class="letterhead">
        <div class="letterhead-inner">
            <div class="letterhead-logo">
                <img src="{{ public_path('images/logo_eye.png') }}" alt="Logo SIPAMAT">
            </div>
            <div class="letterhead-text">
                <div class="system-name">SIPAMAT</div>
                <div class="system-sub">Sistem Pakar Infeksi Mata &mdash; Diagnosa Berbasis Certainty Factor</div>
            </div>
            <div class="letterhead-spacer"></div>
        </div>
    </div>

    <div class="doc-title">Lembar Hasil Diagnosa</div>
    <div class="doc-number">
        No. {{ str_pad($diagnosis->id, 6, '0', STR_PAD_LEFT) }}
        &nbsp;&middot;&nbsp;
        {{ $tanggalDiagnosa }} WIB
    </div>

    <table class="identity-table">
        <tr>
            <td class="id-label">Nama Pasien</td>
            <td class="id-colon">:</td>
            <td class="id-value">{{ $diagnosis->patient_name }}</td>
            <td class="id-label" style="padding-left: 30px;">Usia</td>
            <td class="id-colon">:</td>
            <td class="id-value">{{ $diagnosis->patient_age ? $diagnosis->patient_age . ' tahun' : '-' }}</td>
        </tr>
        <tr>
            <td class="id-label">Jenis Kelamin</td>
            <td class="id-colon">:</td>
            <td class="id-value">
                @if($diagnosis->patient_gender === 'male') Laki-laki
                @elseif($diagnosis->patient_gender === 'female') Perempuan
                @else - @endif
            </td>
            <td class="id-label" style="padding-left: 30px;">Pengguna Kontak Lens</td>
            <td class="id-colon">:</td>
            <td class="id-value">{{ $diagnosis->uses_contact_lens ? 'Ya' : 'Tidak' }}</td>
        </tr>
    </table>

    @php
        $results = $diagnosis->results ?? [];
        $answerLabel = fn($a) => $a === 'yes' ? 'Ya' : ($a === 'maybe' ? 'Mungkin' : 'Tidak');
    @endphp

    @if(count($results) > 0)
        @php($top = $results[0])

        <div class="section-heading">Diagnosis Utama</div>

        <div class="primary-result">
            <div class="disease-line">
                {{ $top['disease_name'] }}
                <span class="disease-code">({{ $top['disease_code'] }})</span>
            </div>
        </div>

        <div class="confidence-row">
            Tingkat keyakinan: <span class="cf-value">{{ $top['percentage'] }}%</span>
            &nbsp;&mdash;&nbsp;
            <span class="cf-label">{{ $top['confidence_label'] }}</span>
            <div class="cf-bar-track">
                <div class="cf-bar-fill" style="width: {{ $top['percentage'] }}%;"></div>
            </div>
        </div>

        <div class="narrative">
            <span class="narrative-label">Keterangan</span>
            {{ $top['description'] }}
        </div>

        <div class="narrative">
            <span class="narrative-label">Saran Tindakan</span>
            {{ $top['solution'] }}
        </div>

        @if($top['need_referral'])
            <div class="referral-note">
                &#9888; PERLU RUJUKAN ke dokter spesialis mata untuk pemeriksaan dan penanganan lebih lanjut.
            </div>
        @endif

        @if(!empty($top['symptom_trace']))
            @php($matched = array_filter($top['symptom_trace'], fn($t) => $t['answer'] !== 'no'))
            <div class="section-heading">Rincian Gejala yang Sesuai</div>
            <table class="trace-table">
                <thead>
                    <tr>
                        <th class="col-code">Kode</th>
                        <th>Gejala</th>
                        <th class="col-answer">Jawaban</th>
                        <th class="col-calc">CF Pakar &times; CF Pengguna</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($matched as $t)
                        <tr>
                            <td class="col-code">{{ $t['symptom_code'] }}</td>
                            <td>{{ $t['symptom_name'] }}</td>
                            <td>{{ $t['answer_label'] }}</td>
                            <td class="col-calc">{{ number_format($t['cf_expert'], 2) }} &times; {{ number_format($t['cf_user'], 1) }} = {{ number_format($t['cf_he'], 2) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif

        @if(count($results) > 1)
            <div class="section-heading">Kemungkinan Diagnosis Lainnya</div>
            <table class="other-results-table">
                <thead>
                    <tr>
                        <th>Penyakit</th>
                        <th>Tingkat Keyakinan</th>
                        <th class="col-pct">Persentase</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach(array_slice($results, 1) as $r)
                        <tr>
                            <td>{{ $r['disease_name'] }} <span style="color:#777;">({{ $r['disease_code'] }})</span></td>
                            <td>{{ $r['confidence_label'] }}</td>
                            <td class="col-pct">{{ $r['percentage'] }}%</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    @else
        <div class="empty-state">
            Tidak ada diagnosis yang cocok berdasarkan gejala yang dimasukkan.<br>
            Disarankan untuk berkonsultasi langsung dengan dokter mata.
        </div>
    @endif

    <div class="disclaimer">
        Dokumen ini merupakan hasil diagnosa otomatis berdasarkan metode <em>Certainty Factor</em> dari basis
        pengetahuan pakar analis mata, dan bersifat indikatif. Hasil ini tidak menggantikan pemeriksaan dan
        diagnosis langsung oleh dokter atau tenaga medis profesional. Untuk kepastian medis, pasien disarankan
        berkonsultasi dengan dokter spesialis mata.
        <br><br>
        Dicetak otomatis oleh sistem SIPAMAT pada {{ $tanggalCetak }} WIB.
    </div>

</body>
</html>