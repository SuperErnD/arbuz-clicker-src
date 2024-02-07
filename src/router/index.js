import {createRouter, createWebHistory} from 'vue-router'
import ClickerGame from "@/views/ClickerGame.vue";
import Friends from "@/views/Friends.vue";
import Quests from "@/views/Quests.vue";
import Boosts from "@/views/Boosts.vue";
import Rating from "@/views/Rating.vue";
import EmptyInitData from "@/views/EmptyInitData.vue";
import Referrals from "@/views/Referrals.vue";
import Transfer from "@/views/Transfer.vue";
import Squads from "@/views/Squads.vue";
import SquadPage from "@/views/SquadPage.vue";
import TransferHistory from "@/views/TransferHistory.vue";

const routes = [
    {
        path: '/',
        name: 'Game',
        component: ClickerGame,
    },
    {
        path: '/squads',
        name: 'Squads',
        component: Squads,
    },
    {
        path: '/squad/:id',
        name: 'SquadPage',
        component: SquadPage,
    },
    {
        path: '/empty-data',
        name: 'EmptyInitData',
        component: EmptyInitData,
    },
    {
        path: '/referrals',
        name: 'Referrals',
        component: Referrals,
    },
    {
        path: '/friends',
        name: 'Friends',
        component: Friends,
    },
    {
        path: '/transfer',
        name: 'Transfer',
        component: Transfer,
    },
    {
        path: '/transfer-history',
        name: 'TransferHistory',
        component: TransferHistory,
    },
    {
        path: '/quests',
        name: 'Quests',
        component: Quests,
    },
    {
        path: '/rating',
        name: 'Rating',
        component: Rating,
    },
    {
        path: '/boosts',
        name: 'Boosts',
        component: Boosts,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
