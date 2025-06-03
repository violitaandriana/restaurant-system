<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'customers';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = ['id', 'name', 'address', 'rayon_id'];

    public function rayon()
    {
        return $this->belongsTo(Rayon::class, 'rayon_id');
    }

    public function salesOrders()
    {
        return $this->hasMany(SalesOrder::class, 'customer_id');
    }
}
