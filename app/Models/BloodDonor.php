<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\BloodDonor
 *
 * @property int $id
 * @property string $name
 * @property string $address
 * @property int $age
 * @property string $blood_type
 * @property string $rhesus
 * @property string $phone
 * @property \Illuminate\Support\Carbon|null $last_donation_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|BloodDonor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BloodDonor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BloodDonor query()
 * @method static \Illuminate\Database\Eloquent\Builder|BloodDonor whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BloodDonor whereAge($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BloodDonor whereBloodType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BloodDonor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BloodDonor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BloodDonor whereLastDonationDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BloodDonor whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BloodDonor wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BloodDonor whereRhesus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BloodDonor whereUpdatedAt($value)
 * @method static \Database\Factories\BloodDonorFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class BloodDonor extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'address',
        'age',
        'blood_type',
        'rhesus',
        'phone',
        'last_donation_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'age' => 'integer',
        'last_donation_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the full blood type including rhesus factor.
     *
     * @return string
     */
    public function getFullBloodTypeAttribute(): string
    {
        $rhesus = $this->rhesus === 'positive' ? '+' : '-';
        return $this->blood_type . $rhesus;
    }

    /**
     * Scope to search donors by name or phone.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $search
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'LIKE', "%{$search}%")
              ->orWhere('phone', 'LIKE', "%{$search}%")
              ->orWhere('address', 'LIKE', "%{$search}%");
        });
    }

    /**
     * Scope to filter donors by blood type.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $bloodType
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByBloodType($query, $bloodType)
    {
        return $query->where('blood_type', $bloodType);
    }

    /**
     * Scope to filter donors by rhesus factor.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $rhesus
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByRhesus($query, $rhesus)
    {
        return $query->where('rhesus', $rhesus);
    }
}