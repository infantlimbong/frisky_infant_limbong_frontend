import { createRouter, createWebHistory } from 'vue-router'
import MeetingForm from '../components/MeetingForm.vue'
import MeetingTable from '../components/MeetingTable.vue'

const routes = [
    { path: '/', redirect: '/table' },
    { path: '/new', name: 'New', component: MeetingForm },
    { path: '/table', name: 'Table', component: MeetingTable },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
