<template>
    <div>
        <p 
            :style="{color: color, fontSize: size + 'px'}"
        >{{time}}</p>
        <span>{{unit}}</span>
    </div>
</template>

<style>
p {
    font-family: 'Covered By Your Grace', cursive;
    line-height: 1;
}

span {
    color: #FFF;
    font-size: 25px;
    font-family: 'Covered By Your Grace', cursive;
}

div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
}
</style>

<script>
    export default {
        name: "TimeUnit",
        props: {
            time: Number,
            unit: String,
            size: Number,
            color: String
        },
    }
</script>