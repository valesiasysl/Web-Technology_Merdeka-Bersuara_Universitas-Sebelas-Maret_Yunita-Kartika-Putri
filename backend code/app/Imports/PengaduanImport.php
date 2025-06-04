<?php

namespace App\Imports;

use App\Models\Pengaduan;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\Log;

class PengaduanImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        Log::info('Row Data:', $row); // Log the row to see what’s being processed

        try {
            // Skip rows with missing critical fields
            if (
                empty(trim($row['pelapor'] ?? '')) ||
                empty(trim($row['keterangan_masalah'] ?? '')) ||
                empty(trim($row['jam_pengaduan'] ?? '')) ||
                empty(trim($row['tanggal_pengaduan'] ?? ''))
            ) {
                Log::warning('Skipping Row with Missing Data:', $row);
                return null; // Skip invalid rows
            }

            return new Pengaduan([
                'pelapor'             => $row['pelapor'],
                'keterangan_masalah'  => $row['keterangan_masalah'],
                'jam_pengaduan'       => $this->parseTime($row['jam_pengaduan']),
                'tanggal_pengaduan'   => $this->parseDate($row['tanggal_pengaduan']),
                'jam_penyelesaian'    => $this->parseTime($row['jam_penyelesaian']),
                'foto'                => $row['foto'],
                'status'              => $row['status'] ?? 'Pending',
            ]);
        } catch (\Exception $e) {
            Log::error('Error processing row: ' . $e->getMessage() . ' | Row Data: ' . json_encode($row));
            return null;
        }
    }




    private function parseTime($time)
    {
        try {
            if (empty($time) || trim($time) === '') {
                return null; // Skip blank or null values
            }

            if (is_numeric($time)) {
                // Convert Excel numeric time to H:i:s
                return \Carbon\Carbon::createFromFormat('H:i:s', gmdate('H:i:s', $time * 86400))->format('H:i:s');
            }

            return \Carbon\Carbon::createFromFormat('H:i', $time)->format('H:i:s');
        } catch (\Exception $e) {
            Log::error("Invalid Time Format: {$time}");
            return null;
        }
    }

    private function parseDate($date)
    {
        try {
            if (empty($date) || trim($date) === '') {
                return null; // Skip blank or null values
            }

            if (is_numeric($date)) {
                // Convert Excel numeric date to Y-m-d
                return \Carbon\Carbon::instance(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($date))->format('Y-m-d');
            }

            return \Carbon\Carbon::createFromFormat('Y-m-d', $date)->format('Y-m-d');
        } catch (\Exception $e) {
            Log::error("Invalid Date Format: {$date}");
            return null;
        }
    }
}
