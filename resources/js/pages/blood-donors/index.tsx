import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Phone, MapPin, Calendar, Users } from 'lucide-react';

interface BloodDonor {
    id: number;
    name: string;
    address: string;
    age: number;
    blood_type: string;
    rhesus: string;
    phone: string;
    last_donation_date: string | null;
    created_at: string;
    updated_at: string;
    full_blood_type: string;
}

interface BloodTypeStats {
    type: string;
    count: number;
}

interface Statistics {
    total: number;
    by_blood_type: BloodTypeStats[];
}

interface Props {
    donors: {
        data: BloodDonor[];
        links: Array<{
            url?: string;
            label: string;
            active: boolean;
        }>;
        meta: {
            current_page: number;
            total: number;
            per_page: number;
        };
    };
    statistics: Statistics;
    filters: {
        search?: string;
        blood_type?: string;
        rhesus?: string;
    };
    [key: string]: unknown;
}

interface DonorFormData {
    name: string;
    address: string;
    age: string;
    blood_type: string;
    rhesus: string;
    phone: string;
    last_donation_date: string;
    [key: string]: string;
}

export default function BloodDonorsIndex({ donors, statistics, filters }: Props) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedDonor, setSelectedDonor] = useState<BloodDonor | null>(null);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const { data, setData, post, put, processing, errors, reset } = useForm<DonorFormData>({
        name: '',
        address: '',
        age: '',
        blood_type: '',
        rhesus: '',
        phone: '',
        last_donation_date: '',
    });

    const handleSearch = () => {
        router.get(route('blood-donors.index'), 
            { search: searchTerm },
            { 
                preserveState: true,
                replace: true 
            }
        );
    };

    const handleFilter = (key: string, value: string) => {
        router.get(route('blood-donors.index'), 
            { ...filters, [key]: value },
            { 
                preserveState: true,
                replace: true 
            }
        );
    };

    const clearFilters = () => {
        setSearchTerm('');
        router.get(route('blood-donors.index'));
    };

    const openCreateModal = () => {
        reset();
        setIsCreateModalOpen(true);
    };

    const openEditModal = (donor: BloodDonor) => {
        setSelectedDonor(donor);
        setData({
            name: donor.name,
            address: donor.address,
            age: donor.age.toString(),
            blood_type: donor.blood_type,
            rhesus: donor.rhesus,
            phone: donor.phone,
            last_donation_date: donor.last_donation_date || '',
        });
        setIsEditModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('blood-donors.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                reset();
            }
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedDonor) {
            put(route('blood-donors.update', selectedDonor.id), {
                onSuccess: () => {
                    setIsEditModalOpen(false);
                    reset();
                    setSelectedDonor(null);
                }
            });
        }
    };

    const handleDelete = (donor: BloodDonor) => {
        if (confirm('Apakah Anda yakin ingin menghapus data pendonor ini?')) {
            router.delete(route('blood-donors.destroy', donor.id));
        }
    };

    const getBloodTypeColor = (type: string) => {
        const colors = {
            'A+': 'bg-red-100 text-red-800 border-red-200',
            'A-': 'bg-red-100 text-red-800 border-red-200',
            'B+': 'bg-blue-100 text-blue-800 border-blue-200',
            'B-': 'bg-blue-100 text-blue-800 border-blue-200',
            'AB+': 'bg-purple-100 text-purple-800 border-purple-200',
            'AB-': 'bg-purple-100 text-purple-800 border-purple-200',
            'O+': 'bg-green-100 text-green-800 border-green-200',
            'O-': 'bg-green-100 text-green-800 border-green-200',
        };
        return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Belum pernah';
        return new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).format(new Date(dateString));
    };

    return (
        <AppShell>
            <Head title="Data Pendonor Darah" />
            
            <div className="p-6 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            🩸 Data Pendonor Darah
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Kelola dan pantau data pendonor darah
                        </p>
                    </div>
                    
                    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreateModal} className="bg-red-600 hover:bg-red-700">
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah Pendonor
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Tambah Pendonor Baru</DialogTitle>
                                <DialogDescription>
                                    Masukkan data pendonor darah baru
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Nama Lengkap</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                                </div>
                                
                                <div>
                                    <Label htmlFor="address">Alamat</Label>
                                    <Textarea
                                        id="address"
                                        value={data.address}
                                        onChange={e => setData('address', e.target.value)}
                                        className={errors.address ? 'border-red-500' : ''}
                                        rows={3}
                                    />
                                    {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="age">Usia</Label>
                                        <Input
                                            id="age"
                                            type="number"
                                            value={data.age}
                                            onChange={e => setData('age', e.target.value)}
                                            className={errors.age ? 'border-red-500' : ''}
                                        />
                                        {errors.age && <p className="text-sm text-red-500 mt-1">{errors.age}</p>}
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="phone">Telepon</Label>
                                        <Input
                                            id="phone"
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                            className={errors.phone ? 'border-red-500' : ''}
                                        />
                                        {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="blood_type">Golongan Darah</Label>
                                        <Select value={data.blood_type} onValueChange={value => setData('blood_type', value)}>
                                            <SelectTrigger className={errors.blood_type ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Pilih golongan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="A">A</SelectItem>
                                                <SelectItem value="B">B</SelectItem>
                                                <SelectItem value="AB">AB</SelectItem>
                                                <SelectItem value="O">O</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.blood_type && <p className="text-sm text-red-500 mt-1">{errors.blood_type}</p>}
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="rhesus">Rhesus</Label>
                                        <Select value={data.rhesus} onValueChange={value => setData('rhesus', value)}>
                                            <SelectTrigger className={errors.rhesus ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Pilih rhesus" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="positive">Positif (Rh+)</SelectItem>
                                                <SelectItem value="negative">Negatif (Rh-)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.rhesus && <p className="text-sm text-red-500 mt-1">{errors.rhesus}</p>}
                                    </div>
                                </div>
                                
                                <div>
                                    <Label htmlFor="last_donation_date">Tanggal Terakhir Donor</Label>
                                    <Input
                                        id="last_donation_date"
                                        type="date"
                                        value={data.last_donation_date}
                                        onChange={e => setData('last_donation_date', e.target.value)}
                                        className={errors.last_donation_date ? 'border-red-500' : ''}
                                    />
                                    {errors.last_donation_date && <p className="text-sm text-red-500 mt-1">{errors.last_donation_date}</p>}
                                </div>
                                
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                                        Batal
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Menyimpan...' : 'Simpan'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Total Pendonor
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{statistics.total}</div>
                        </CardContent>
                    </Card>
                    
                    {statistics.by_blood_type.slice(0, 3).map((stat) => (
                        <Card key={stat.type}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Golongan {stat.type}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.count}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Search and Filters */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-end">
                            <div className="flex-1">
                                <Label htmlFor="search">Cari Pendonor</Label>
                                <div className="flex gap-2 mt-1">
                                    <Input
                                        id="search"
                                        placeholder="Nama, alamat, atau telepon..."
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleSearch()}
                                        className="flex-1"
                                    />
                                    <Button onClick={handleSearch} variant="outline" size="icon">
                                        <Search className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                                <Select value={filters.blood_type || ''} onValueChange={value => handleFilter('blood_type', value)}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue placeholder="Golongan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua</SelectItem>
                                        <SelectItem value="A">A</SelectItem>
                                        <SelectItem value="B">B</SelectItem>
                                        <SelectItem value="AB">AB</SelectItem>
                                        <SelectItem value="O">O</SelectItem>
                                    </SelectContent>
                                </Select>
                                
                                <Select value={filters.rhesus || ''} onValueChange={value => handleFilter('rhesus', value)}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue placeholder="Rhesus" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua</SelectItem>
                                        <SelectItem value="positive">Rh+</SelectItem>
                                        <SelectItem value="negative">Rh-</SelectItem>
                                    </SelectContent>
                                </Select>
                                
                                <Button variant="outline" onClick={clearFilters}>
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Donors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {donors.data.map((donor) => (
                        <Card key={donor.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                                            {donor.name}
                                        </CardTitle>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            {donor.age} tahun
                                        </p>
                                    </div>
                                    <Badge className={`${getBloodTypeColor(donor.full_blood_type)} border font-bold`}>
                                        {donor.full_blood_type}
                                    </Badge>
                                </div>
                            </CardHeader>
                            
                            <CardContent className="pb-3">
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-600 dark:text-gray-400 line-clamp-2">{donor.address}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                        <span className="text-gray-600 dark:text-gray-400">{donor.phone}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                        <span className="text-gray-600 dark:text-gray-400">
                                            Terakhir: {formatDate(donor.last_donation_date)}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                            
                            <CardFooter className="pt-0">
                                <div className="flex gap-2 w-full">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => openEditModal(donor)}
                                        className="flex-1"
                                    >
                                        <Edit className="w-4 h-4 mr-1" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(donor)}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {donors.data.length === 0 && (
                    <Card className="py-16">
                        <CardContent className="text-center">
                            <div className="text-6xl mb-4">🩸</div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                Belum ada data pendonor
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Mulai tambahkan data pendonor darah untuk mengelola database
                            </p>
                            <Button onClick={openCreateModal}>
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah Pendonor Pertama
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Edit Modal */}
                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Edit Data Pendonor</DialogTitle>
                            <DialogDescription>
                                Perbarui informasi pendonor darah
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <Label htmlFor="edit-name">Nama Lengkap</Label>
                                <Input
                                    id="edit-name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className={errors.name ? 'border-red-500' : ''}
                                />
                                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                            </div>
                            
                            <div>
                                <Label htmlFor="edit-address">Alamat</Label>
                                <Textarea
                                    id="edit-address"
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                    className={errors.address ? 'border-red-500' : ''}
                                    rows={3}
                                />
                                {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="edit-age">Usia</Label>
                                    <Input
                                        id="edit-age"
                                        type="number"
                                        value={data.age}
                                        onChange={e => setData('age', e.target.value)}
                                        className={errors.age ? 'border-red-500' : ''}
                                    />
                                    {errors.age && <p className="text-sm text-red-500 mt-1">{errors.age}</p>}
                                </div>
                                
                                <div>
                                    <Label htmlFor="edit-phone">Telepon</Label>
                                    <Input
                                        id="edit-phone"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        className={errors.phone ? 'border-red-500' : ''}
                                    />
                                    {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="edit-blood_type">Golongan Darah</Label>
                                    <Select value={data.blood_type} onValueChange={value => setData('blood_type', value)}>
                                        <SelectTrigger className={errors.blood_type ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih golongan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="A">A</SelectItem>
                                            <SelectItem value="B">B</SelectItem>
                                            <SelectItem value="AB">AB</SelectItem>
                                            <SelectItem value="O">O</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.blood_type && <p className="text-sm text-red-500 mt-1">{errors.blood_type}</p>}
                                </div>
                                
                                <div>
                                    <Label htmlFor="edit-rhesus">Rhesus</Label>
                                    <Select value={data.rhesus} onValueChange={value => setData('rhesus', value)}>
                                        <SelectTrigger className={errors.rhesus ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih rhesus" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="positive">Positif (Rh+)</SelectItem>
                                            <SelectItem value="negative">Negatif (Rh-)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.rhesus && <p className="text-sm text-red-500 mt-1">{errors.rhesus}</p>}
                                </div>
                            </div>
                            
                            <div>
                                <Label htmlFor="edit-last_donation_date">Tanggal Terakhir Donor</Label>
                                <Input
                                    id="edit-last_donation_date"
                                    type="date"
                                    value={data.last_donation_date}
                                    onChange={e => setData('last_donation_date', e.target.value)}
                                    className={errors.last_donation_date ? 'border-red-500' : ''}
                                />
                                {errors.last_donation_date && <p className="text-sm text-red-500 mt-1">{errors.last_donation_date}</p>}
                            </div>
                            
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                                    Batal
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Memperbarui...' : 'Perbarui'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppShell>
    );
}