<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBloodDonorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'age' => 'required|integer|min:17|max:65',
            'blood_type' => 'required|in:A,B,AB,O',
            'rhesus' => 'required|in:positive,negative',
            'phone' => 'required|string|max:20',
            'last_donation_date' => 'nullable|date|before_or_equal:today',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama pendonor wajib diisi.',
            'address.required' => 'Alamat wajib diisi.',
            'age.required' => 'Usia wajib diisi.',
            'age.min' => 'Usia minimal 17 tahun.',
            'age.max' => 'Usia maksimal 65 tahun.',
            'blood_type.required' => 'Golongan darah wajib dipilih.',
            'blood_type.in' => 'Golongan darah tidak valid.',
            'rhesus.required' => 'Rhesus wajib dipilih.',
            'rhesus.in' => 'Rhesus tidak valid.',
            'phone.required' => 'Nomor telepon wajib diisi.',
            'last_donation_date.date' => 'Tanggal donor tidak valid.',
            'last_donation_date.before_or_equal' => 'Tanggal donor tidak boleh melebihi hari ini.',
        ];
    }
}