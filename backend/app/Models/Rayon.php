<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rayon extends Model
{
    protected $table = 'rayons';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = ['id', 'name', 'sales_area', 'regional'];

    public function customers()
    {
        return $this->hasMany(Customer::class, 'rayon_id');
    }

    public function salesmen()
    {
        return $this->hasMany(Salesman::class, 'rayon_id');
    }

    public function salesOrders()
    {
        return $this->hasMany(SalesOrder::class, 'rayon_id');
    }
}
