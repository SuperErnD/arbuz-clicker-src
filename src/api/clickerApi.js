import axios from "axios";
import Api from "@/api/instance.js";

export default class ClickerApi extends Api {

    constructor() {
        let initData = null
        if (window.Telegram.WebApp.initData) {
            initData = window.Telegram.WebApp.initData
        } else {
            initData = process.env.VUE_APP_TEST_INIT
        }
        const ax = axios.create({
            baseURL: process.env.VUE_APP_BACKEND,
            headers: {
                post: {
                    "Content-Type": "application/json",
                    // 'Access-Control-Allow-Origin': '*',
                },
                'X-Telegram-Init-Data': initData
            }
        });

        super(ax);
    }

    // USER REGISTRATION
    getUserInfo() {
        return this.request('users/me')
    }

    createUser(referralUserId) {
        // console.log("Creating user with referral id: " + parseInt(referralUserId))
        return this.request('users/me', 'POST', {
            referralUserId: isNaN(referralUserId) ? null : referralUserId
        })
    }

    // SKINS

    getAllSkins() {
        return this.request('skin/all')
    }

    getMySkins() {
        return this.request('skin/available')
    }

    activateSkins(idsList) {
        return this.request('skin/activate', 'POST', {
            ids: idsList
        })
    }

    // USERS RATING

    getUsersRating() {
        return this.request('rating')
    }

    getCurrentPlace() {
        return this.request('rating/place')
    }

    upgradeRating(amount) {
        return this.request('rating/upgrade', 'POST', {
            amount: amount
        })
    }

    // CLICK

    addClick(count) {
        return this.request('click', 'POST', {
            count: count
        })
    }

    // BOOST

    getActiveBoosts() {
        return this.request('boosts/active')
    }

    getAllBoosts() {
        return this.request('boosts/metas')
    }

    purchaseBoost(metaId) {
        return this.request('boosts/purchase', 'POST', {
            metaId: metaId
        })
    }

    upgradeBoost(boostId) {
        return this.request('boosts/upgrade', 'POST', {
            boostId: boostId,
        })
    }

    // FRIENDS
    getFriends() {
        return this.request('friends/list')
    }

    inviteFriend() {
        return this.request('friends/invite')
    }

    acceptFriend(secret) {
        return this.request('friends/accept', 'POST', {
            secret: secret
        })
    }

    // REFERRALS
    getReferrals() {
        return this.request('users/referrals')
    }

    // TASKS
    getAllTasks() {
        return this.request('task/all')
    }

    // CHECKS
    createCheck(count, activations) {
        return this.request('receipts/create', 'POST', {
            count: count,
            activations: activations,
        })
    }

    activateCheck(checkId) {
        return this.request('receipts/activate' + `/${checkId}`)
    }

    getCurrentTransfers() {
        return this.request('receipts/current')
    }

    // SQUADS

    joinSquad(id) {
        return this.request('squad/join', 'POST', {
            id: id
        })
    }

    leaveSquad() {
        return this.request('squad/leave', 'POST')
    }

    getTopSquads() {
        return this.request('/squad/top')
    }

    getUserSquadInfo() {
        return this.request('squad/info')
    }

    getSquadInfoById(id) {
        return this.request('squad/info' + `?id=${id}`)
    }

    getSquadInfoByInviteLink(link) {
        return this.request('squad/resolve' + `?username=${link}`)
    }

    getTopPlayersInSquad(id) {
        return this.request('squad/top/players' + `?id=${id}`)
    }
}