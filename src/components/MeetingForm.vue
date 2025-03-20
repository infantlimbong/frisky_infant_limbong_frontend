<template>
    <div class="bg-gray-200 p-8">
        <div class="mb-4 flex flex-col items-start space-x-2">
            <div class="flex gap-5 items-center">
                <router-link to="/table" class="bg-[#4A8394] w-10 aspect-square grid place-items-center text-white font-bold rounded-md">&lt</router-link>
                <span class="font-bold text-2xl">Ruang Meeting</span>
            </div>
            <div class="mb-4 flex items-center space-x-2 ml-15">
                <span class="text-slate-500 font-semibold">Ruang Meeting</span>
                <span class="text-[#4A8394]">></span>
                <span class="text-slate-500 font-semibold">Pesan Ruangan</span>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow p-6 w-full">
            <h2 class="text-xl font-bold text-slate-700 mb-4">Informasi Ruang Meeting</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                    <label class="block mb-1 text-sm font-medium text-slate-600">Unit</label>
                    <select v-model="form.unit" class="w-full border-1 border-gray-300 rounded px-2 py-2 text-sm" required>
                        <option value="" disabled>-- Pilih Unit --</option>
                        <option v-for="u in units" :key="u" :value="u">{{ u }}</option>
                    </select>
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium text-slate-600">Ruang Meeting</label>
                    <select v-model="form.ruangMeeting" class="w-full border-1 border-gray-300 rounded px-2 py-2 text-sm" required>
                        <option value="" disabled>-- Pilih Ruangan --</option>
                        <option v-for="r in rooms" :key="r" :value="r">{{ r }}</option>
                    </select>
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium text-slate-600">Kapasitas</label>
                    <input v-model.number="form.kapasitas" type="number" class="w-full border-1 border-gray-300 rounded px-2 py-2 text-sm" placeholder="Kapasitas Ruangan" required />
                </div>
            </div>

            <hr class="my-12 border[1px] border-gray-300" />

            <h2 class="text-xl font-bold text-slate-700 mb-4">Informasi Rapat</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div>
                    <label class="block mb-1 text-sm font-medium text-slate-600">Tanggal Rapat</label>
                    <input v-model="form.tanggalRapat" type="date" class="w-full border-1 border-gray-300 rounded px-2 py-2 text-sm" required />
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium text-slate-600">Waktu Mulai</label>
                    <input v-model="form.waktuMulai" type="time" class="w-full border-1 border-gray-300 rounded px-2 py-2 text-sm" required />
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium text-slate-600">Waktu Selesai</label>
                    <input v-model="form.waktuSelesai" type="time" class="w-full border-1 border-gray-300 rounded px-2 py-2 text-sm" required />
                </div>
            </div>

            <hr class="my-12 border[1px] border-gray-300" />

            <div>
                <div class="md:w-1/3">
                    <label class="block mb-1 text-sm font-medium text-slate-600">Jumlah Peserta</label>
                    <input v-model.number="form.jumlahPeserta" type="number" class="w-full border-1 border-gray-300 rounded px-2 py-2 text-sm" placeholder="Masukkan Jumlah Peserta" required />
                </div>

                <div class="mt-5">
                    <label class="block mb-1 text-sm font-medium text-slate-600">Jenis Konsumsi</label>
                    <div class="flex flex-col space-y-2">
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" value="Makan Siang" v-model="form.jenisKonsumsi" class="rounded border-gray-300" />
                            <span>Makan Siang</span>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" value="Snack Pagi" v-model="form.jenisKonsumsi" class="rounded border-gray-300" />
                            <span>Snack Pagi</span>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" value="Snack Sore" v-model="form.jenisKonsumsi" class="rounded border-gray-300" />
                            <span>Snack Sore</span>
                        </label>
                    </div>
                </div>

                <div class="mt-5">
                    <label class="block mb-1 text-sm font-medium text-slate-600">Nominal Konsumsi (Rp.)</label>
                    <div class="flex items-center border-1 border-gray-300 rounded text-sm bg-white">
                        <span class="px-2 bg-slate-300 py-2 rounded-l">Rp.</span>
                        <input v-model.number="form.nominalKonsumsi" type="number" class="py-2 px-2 w-full border-1 border-gray-300 focus:ring-0 focus:outline-none text-sm" placeholder="0" min="0" />
                    </div>
                </div>
            </div>

            <hr class="my-12 border[1px] border-gray-300" />

            <div class="flex justify-end space-x-2 items-center">
                <button type="button" class="bg-white cursor-pointer text-red-500 px-6 py-2 rounded-lg hover:bg-slate-50" @click="cancelForm"> Batal </button>
                <button type="button" class="bg-[#4A8394] cursor-pointer text-white px-6 py-2 rounded hover:bg-[#4A8394]/90" @click="createMeeting"> Simpan </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const units = ['UNIT KEUANGAN', 'UNIT SDM', 'UNIT MARKETING', 'UNIT IT']

const rooms = ['Ruang Prambanan', 'Ruang Borobudur', 'Ruang Merapi', 'Ruang Kalimantan']

const form = reactive({
    unit: '',
    ruangMeeting: '',
    kapasitas: null,
    tanggalRapat: '',
    waktuMulai: '',
    waktuSelesai: '',
    jumlahPeserta: null,
    jenisKonsumsi: [],
    nominalKonsumsi: null,
})

const createMeeting = async () => {
    try {
        const formData = {
            ...form,
            jenisKonsumsi: form.jenisKonsumsi.join(', '),
        }

        await axios.post('http://localhost:3000/api/meetings', formData)
        alert('Meeting created successfully!')
        router.push('/table')
    } catch (err) {
        console.error(err)
        alert('Error creating meeting.')
    }
}

const cancelForm = () => {
    router.push('/table')
}
</script>
