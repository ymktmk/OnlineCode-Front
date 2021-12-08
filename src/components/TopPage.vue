<template>
    <div>

        <dropdown-menu v-model="show" :right="right" :hover="hover" :interactive="interactive"> 
            <button class="btn btn-primary dropdown-toggle">Click to open dropdown</button>
            <div slot="dropdown">
                <a class="dropdown-item" href="/python">Python</a>
                <a class="dropdown-item" href="/php">PHP</a>
                <a class="dropdown-item" href="/javascript">Javascript</a>
            </div>
        </dropdown-menu>

        <h1>オンライン実行環境</h1>
        <h1>Python・Ruby・PHP・Go・Dart・Javascript</h1>
        <h1>ブラウザ上で実行できるサービス</h1>
    
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                show: false,
                right: false,
                hover: false,
                interactive: false
            }
        },
        mounted: function() {
        },
        methods: {

        }
    }
</script>
