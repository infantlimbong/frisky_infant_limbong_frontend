<template>
    <header class="fixed w-full left-0 top-0 bg-gradient-to-r from-black to-slate-700 text-white px-6 py-3 flex items-center justify-between h-16">
        <div class="flex items-center space-x-4">
            <img src="/ftl_logo.png" alt="logo" class="w-20" />

            <h1 class="text-xl font-bold">iMeeting</h1>
        </div>

        <div class="flex items-center gap-6">
            <i class="bx bx-bell text-xl"></i>
            <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-slate-600 rounded-full">
                    <img src="/man.png" alt="man" class="w-full" />
                </div>
                <span>John Doe</span>
                <i class="bx bxs-chevron-down"></i>
            </div>
        </div>
    </header>

    <aside class="fixed left-0 top-16 bg-white h-full flex flex-col gap-3 w-16 items-center py-12">
        <router-link to="/table" class="bg-[#4A8394] w-12 aspect-square grid place-items-center rounded-lg text-white"><i class="bx bx-home-alt text-xl"></i></router-link>
        <router-link to="" class="bg-white w-12 aspect-square grid place-items-center rounded-lg text-[#4A8394]"><i class="bx bx-user text-xl"></i></router-link>
    </aside>

    <!-- Main Content -->
    <main class="ms-16 min-h-screen bg-gray-200 mt-16">
        <router-view />
    </main>
</template>
