<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesOrder extends Model
{
    protected $table = 'sales_orders';

    protected $primaryKey = 'id';
    public $incrementing = false; // karena ID-nya bukan auto-increment
    protected $keyType = 'string';

    public $timestamps = false; // karena tidak ada kolom created_at / updated_at

    protected $fillable = [
        'id',
        'date',
        'type',
        'brand_id',
        'customer_id',
        'rayon_id',
        'salesman_id',
        'quantity',
        'qty_unit',
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function rayon()
    {
        return $this->belongsTo(Rayon::class, 'rayon_id');
    }

    public function salesman()
    {
        return $this->belongsTo(Salesman::class, 'salesman_id');
    }
}
