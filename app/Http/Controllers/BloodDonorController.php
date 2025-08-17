<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBloodDonorRequest;
use App\Http\Requests\UpdateBloodDonorRequest;
use App\Models\BloodDonor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BloodDonorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = BloodDonor::query();

        // Search functionality
        if ($request->filled('search')) {
            $query->search($request->search);
        }

        // Filter by blood type
        if ($request->filled('blood_type')) {
            $query->byBloodType($request->blood_type);
        }

        // Filter by rhesus
        if ($request->filled('rhesus')) {
            $query->byRhesus($request->rhesus);
        }

        $donors = $query->latest()->paginate(12)->withQueryString();

        // Get statistics
        $bloodTypeStats = BloodDonor::selectRaw('blood_type, rhesus, COUNT(*) as donor_count')
            ->groupBy('blood_type', 'rhesus')
            ->get()
            ->map(function ($item) {
                return [
                    'type' => $item->blood_type . ($item->rhesus === 'positive' ? '+' : '-'),
                    'count' => (int) $item->getAttribute('donor_count')
                ];
            });

        $statistics = [
            'total' => BloodDonor::count(),
            'by_blood_type' => $bloodTypeStats,
        ];

        return Inertia::render('blood-donors/index', [
            'donors' => $donors,
            'statistics' => $statistics,
            'filters' => $request->only(['search', 'blood_type', 'rhesus'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBloodDonorRequest $request)
    {
        BloodDonor::create($request->validated());

        return back()->with('success', 'Data pendonor berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BloodDonor $bloodDonor)
    {
        return Inertia::render('blood-donors/show', [
            'donor' => $bloodDonor
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBloodDonorRequest $request, BloodDonor $bloodDonor)
    {
        $bloodDonor->update($request->validated());

        return back()->with('success', 'Data pendonor berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BloodDonor $bloodDonor)
    {
        $bloodDonor->delete();

        return back()->with('success', 'Data pendonor berhasil dihapus.');
    }
}