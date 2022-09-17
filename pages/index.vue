<template>
    <div class="main">
        <h1>Seneste døde vagt</h1>
        <div class="section">
            <img :src="'https://cravatar.eu/head/' + data?.name"/>
            <h1 class="name">{{data?.name || "Loading..."}}</h1>
            <div class="time">
                <TimeUnit v-if="days > 0" unit="dage" :time="days" :size="200" color="#db4844"/>
                <TimeUnit v-if="hours > 0" unit="timer" :time="hours" :size="160" color="#f07c22"/>
                <TimeUnit v-if="minutes > 0" unit="minutter" :time="minutes" :size="120" color="#f6da74"/>
                <TimeUnit v-if="seconds > 0" unit="sekunder" :time="seconds" :size="70" color="#abcd58"/>
            </div>
        </div>
    </div>
</template>

<style>
    .main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 100vh;
        background-color: #090c15;
    }

    
    h1 {
        color: #FFF;
        font-size: 50px;
        margin-bottom: 2rem;
    }

    .section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        max-width: 800px;
        width: 100%;
        border-radius: 5px;
        background-color: rgba(0,0,0,0.1);
        border: 1px solid rgb(30,41,59);
    }

    .section .name {
        color: #FFF;
        font-weight: 700;
        font-size: 25px;
    }
    .section .time {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 5rem;
    }
</style>

<script lang="ts">

import TimeUnit from '~~/components/TimeUnit.vue';

export default {
    name: "IndexPage",
    components: {
        TimeUnit
    },
    data() {
        return {
            seconds: 0,
            minutes: 0,
            hours: 0,
            days: 0,
        }
    },
    setup() {
        const { data } = useFetch(() => '/api/lastdeath');
        return { data };
    },
    methods: {
        update() {
            var days = 0, hours = 0, minutes = 0, seconds = 0;
            if(!this.data.timestamp) return;

            var diff = Math.floor((new Date().getTime() / 1000) - this.data.timestamp);

            days = Math.floor(diff / 86400);
            hours = Math.floor(diff / 3600) - ( days * 24 );
            minutes = Math.floor( ( diff / 60 ) - ( ( hours + ( days * 24 ) ) * 60 ) );
            seconds = Math.floor(diff - ( ( days * 86400 ) + ( hours * 3600 ) + ( minutes * 60 ) ) );
            
            this.seconds = seconds;
            this.minutes = minutes;
            this.hours = hours;
            this.days = days;
        }
    },
    created() {
        setInterval(() => {
            this.update();
        }, 1000);
    },
    head() {
        return {
            title: this.data?.name || "Loading...",
        }
    }
}
</script>