<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMasterTables extends Migration
{
    public function up(): void
    {
        Schema::create('brands', function (Blueprint $table) {
            $table->string('id', 4)->primary();
            $table->string('name');
        });

        Schema::create('rayons', function (Blueprint $table) {
            $table->string('id', 4)->primary(); // R01, R02, ...
            $table->string('name');
            $table->string('sales_area');
            $table->string('regional');
        });

        Schema::create('cust_times', function (Blueprint $table) {
            $table->string('month', 2);
            $table->tinyInteger('quarter');
            $table->smallInteger('year');
        });
        
        Schema::create('customers', function (Blueprint $table) {
            $table->string('id', 4)->primary();
            $table->string('name');
            $table->string('address');
            $table->string('rayon_id');

            $table->foreign('rayon_id')->references('id')->on('rayons')->onDelete('restrict');
        });

        Schema::create('salesmen', function (Blueprint $table) {
            $table->string('id', 4)->primary();
            $table->string('name');
            $table->string('type');
            $table->string('rayon_id');

            $table->foreign('rayon_id')->references('id')->on('rayons')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cust_times');
        Schema::dropIfExists('rayons');
        Schema::dropIfExists('salesmen');
        Schema::dropIfExists('customers');
        Schema::dropIfExists('brands');
    }
}
