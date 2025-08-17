import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Sistem Pendataan Pendonor Darah">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-red-950/20 dark:via-pink-950/20 dark:to-rose-950/20 dark:text-gray-100">
                <header className="mb-8 w-full max-w-[600px] text-sm lg:max-w-6xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Selamat datang, <strong>{auth.user.name}</strong>
                                </span>
                                <Link
                                    href={route('blood-donors.index')}
                                    className="inline-block rounded-lg bg-red-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                                >
                                    🩸 Kelola Data Pendonor
                                </Link>
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-lg border border-gray-300 px-5 py-2 text-sm leading-normal text-gray-700 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-800"
                                >
                                    Dashboard
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg border border-transparent px-5 py-2 text-sm leading-normal text-gray-700 hover:border-gray-300 hover:bg-gray-100 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-800"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-red-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[600px] flex-col lg:max-w-6xl lg:flex-row lg:gap-12">
                        <div className="flex-1 rounded-2xl bg-white p-8 lg:p-12 shadow-xl border border-gray-200/50 dark:bg-gray-900/50 dark:border-gray-700/50">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6 dark:bg-red-900/30">
                                    <span className="text-4xl">🩸</span>
                                </div>
                                <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                                    Sistem Pendataan<br />
                                    <span className="text-red-600 dark:text-red-400">Pendonor Darah</span>
                                </h1>
                                <p className="text-lg text-gray-600 mb-8 dark:text-gray-400">
                                    Platform manajemen data pendonor darah yang lengkap dan mudah digunakan untuk administrator
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                    <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center dark:bg-red-900/30">
                                        <span className="text-xl">👥</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Kelola Data Pendonor</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            CRUD lengkap untuk data pendonor dengan validasi yang ketat
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center dark:bg-blue-900/30">
                                        <span className="text-xl">🔍</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Pencarian & Filter</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Cari berdasarkan nama, alamat, golongan darah
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center dark:bg-green-900/30">
                                        <span className="text-xl">📱</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Desain Responsif</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Akses mudah dari desktop, tablet, atau smartphone
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center dark:bg-purple-900/30">
                                        <span className="text-xl">📊</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Statistik Data</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Dashboard dengan ringkasan data golongan darah
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6 mb-8 dark:from-red-900/20 dark:to-pink-900/20">
                                <h3 className="font-semibold text-gray-900 mb-2 dark:text-gray-100">💾 Data yang Dikelola:</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <span>• Nama Pendonor</span>
                                    <span>• Alamat Lengkap</span>
                                    <span>• Usia</span>
                                    <span>• Nomor Telepon</span>
                                    <span>• Golongan Darah (A, B, AB, O)</span>
                                    <span>• Rhesus (Rh+, Rh-)</span>
                                    <span>• Tanggal Terakhir Donor</span>
                                    <span>• Riwayat Data</span>
                                </div>
                            </div>

                            {!auth.user && (
                                <div className="text-center">
                                    <p className="text-gray-600 mb-6 dark:text-gray-400">
                                        Masuk sebagai administrator untuk mengelola data pendonor
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                        >
                                            🔐 Masuk Admin
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                                        >
                                            📝 Daftar Baru
                                        </Link>
                                    </div>
                                </div>
                            )}

                            <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                                Dibangun dengan ❤️ untuk membantu pengelolaan data pendonor darah
                            </footer>
                        </div>
                        
                        {/* Preview mockup */}
                        <div className="hidden lg:block flex-1 max-w-md">
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden dark:bg-gray-900/50 dark:border-gray-700/50">
                                <div className="bg-red-600 p-4 text-white">
                                    <h3 className="font-semibold">Dashboard Pendonor</h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center dark:bg-red-900/30">
                                            <span className="text-sm font-bold text-red-600 dark:text-red-400">A+</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 dark:text-gray-100">Ahmad Rizki</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Last: 15 Nov 2023</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center dark:bg-blue-900/30">
                                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">O-</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 dark:text-gray-100">Sari Indah</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Last: 22 Oct 2023</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center dark:bg-green-900/30">
                                            <span className="text-sm font-bold text-green-600 dark:text-green-400">B+</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 dark:text-gray-100">Budi Santoso</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Last: 5 Dec 2023</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}