<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Salesman extends Model
{
    protected $table = 'salesmen';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = ['id', 'name', 'type', 'rayon_id'];

    public function rayon()
    {
        return $this->belongsTo(Rayon::class, 'rayon_id');
    }

    public function salesOrders()
    {
        return $this->hasMany(SalesOrder::class, 'salesman_id');
    }
}
