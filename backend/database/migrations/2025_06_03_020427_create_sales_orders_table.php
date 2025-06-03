<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesOrdersTable extends Migration
{
    public function up(): void
    {
        Schema::create('sales_orders', function (Blueprint $table) {
            $table->string('id', 3)->primary(); // 001, 002, ...
            $table->date('date');
            $table->string('type'); // cash / kredit

            $table->string('brand_id', 4);
            $table->string('customer_id', 4);
            $table->string('rayon_id', 4);
            $table->string('salesman_id', 4);

            $table->integer('quantity');
            $table->string('qty_unit', 10);

            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('restrict');
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('restrict');
            $table->foreign('rayon_id')->references('id')->on('rayons')->onDelete('restrict');
            $table->foreign('salesman_id')->references('id')->on('salesmen')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sales_orders');
    }
}
