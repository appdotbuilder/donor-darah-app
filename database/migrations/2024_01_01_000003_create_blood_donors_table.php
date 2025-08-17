<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blood_donors', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Nama pendonor');
            $table->text('address')->comment('Alamat pendonor');
            $table->integer('age')->comment('Usia pendonor');
            $table->enum('blood_type', ['A', 'B', 'AB', 'O'])->comment('Golongan darah');
            $table->enum('rhesus', ['positive', 'negative'])->comment('Rhesus factor (Rh+ atau Rh-)');
            $table->string('phone')->comment('Nomor telepon');
            $table->date('last_donation_date')->nullable()->comment('Tanggal terakhir donor');
            $table->timestamps();
            
            // Add indexes for performance
            $table->index('name');
            $table->index('blood_type');
            $table->index('rhesus');
            $table->index(['blood_type', 'rhesus']);
            $table->index('last_donation_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blood_donors');
    }
};