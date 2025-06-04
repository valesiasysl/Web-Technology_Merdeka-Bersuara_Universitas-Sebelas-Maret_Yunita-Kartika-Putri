<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\PengaduanImport;

class TestImportExcel extends Command
{
    protected $signature = 'test:import {file}';
    protected $description = 'Command to test Excel import functionality';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $file = $this->argument('file');

        if (!file_exists($file)) {
            $this->error('File not found!');
            return 1;
        }

        try {
            Excel::import(new PengaduanImport, $file);
            $this->info('Data imported successfully!');
        } catch (\Exception $e) {
            $this->error('Error: ' . $e->getMessage());
        }

        return 0;
    }
}
