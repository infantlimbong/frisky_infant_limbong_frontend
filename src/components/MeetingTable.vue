<template>
    <div class="bg-gray-200 p-8">
        <div class="flex items-center justify-between">
            <div class="mb-4 flex flex-col items-start space-x-2">
                <div class="flex gap-5 items-center">
                    <span class="bg-[#4A8394] w-10 aspect-square grid place-items-center text-white font-bold rounded-md">&lt</span>
                    <span class="font-bold text-2xl">Ruang Meeting</span>
                </div>
                <div class="text-slate-500 font-semibold ml-15">Ruang Meeting</div>
            </div>
            <div class="flex items-center justify-between mb-4">
                <router-link to="/new" class="bg-[#4A8394] text-white px-4 py-2 rounded-lg hover:bg-[#4A8394]/90"> + Pesan Ruangan </router-link>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow p-4">
            <table class="w-full">
                <thead>
                    <tr class="font-bold text-left text-gray-800">
                        <th class="p-3">UNIT</th>
                        <th class="p-3">RUANG MEETING</th>
                        <th class="p-3">KAPASITAS</th>
                        <th class="p-3">TANGGAL RAPAT</th>
                        <th class="p-3">WAKTU</th>
                        <th class="p-3">JUMLAH PESERTA</th>
                        <th class="p-3">JENIS KONSUMSI</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="meeting in paginatedMeetings" :key="meeting.id" class="hover:bg-slate-50">
                        <td class="p-3">{{ meeting.unit }}</td>
                        <td class="p-3">{{ meeting.ruangMeeting }}</td>
                        <td class="p-3">{{ meeting.kapasitas }} Orang</td>
                        <td class="p-3">{{ formatDate(meeting.tanggalRapat) }}</td>
                        <td class="p-3"> {{ meeting.waktuMulai }} - {{ meeting.waktuSelesai }} </td>
                        <td class="p-3">{{ meeting.jumlahPeserta }} Orang</td>
                        <td class="p-3">{{ meeting.jenisKonsumsi }}</td>
                    </tr>
                </tbody>
            </table>

            <div class="flex items-center justify-between mt-4">
                <div class="text-sm text-slate-500">
                    Showing
                    <span class="font-medium">{{ startIndex + 1 }}</span>
                    -
                    <span class="font-medium">{{ endIndex }}</span>
                    of
                    <span class="font-medium">{{ totalItems }}</span>
                </div>

                <div class="space-x-1">
                    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="px-2 py-1 rounded border-1 border-gray-300 font-bold text-gray-500"> Previous </button>

                    <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="['px-3 py-1 rounded', page === currentPage ? 'bg-blue-600/20 text-blue-600' : 'bg-white']">
                        {{ page }}
                    </button>

                    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="px-2 py-1 rounded border-1 border-gray-300 font-bold text-gray-500"> Next </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const meetings = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10)

const fetchMeetings = async () => {
    try {
        const res = await axios.get('http://localhost:3000/api/meetings')
        meetings.value = res.data
    } catch (err) {
        console.error(err)
    }
}

const totalItems = computed(() => meetings.value.length)
const totalPages = computed(() => {
    return Math.ceil(totalItems.value / itemsPerPage.value)
})

const paginatedMeetings = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return meetings.value.slice(start, end)
})

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => {
    const end = startIndex.value + itemsPerPage.value
    return end > totalItems.value ? totalItems.value : end
})

const goToPage = (page) => {
    if (page < 1) page = 1
    if (page > totalPages.value) page = totalPages.value
    currentPage.value = page
}

const formatDate = (dateString) => {
    if (!dateString) return ''
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('id-ID', options)
}

onMounted(fetchMeetings)
</script>
