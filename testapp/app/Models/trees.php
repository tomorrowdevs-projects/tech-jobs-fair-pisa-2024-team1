<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class trees extends Model
{
    use HasFactory;

    protected $fillable = [
        'tipo',
        'nome',
        'latitudine',
        'longitudine',
        'stato',
        'ultima_segnalazione',
    ];
}
