<template>
    <div>
        <div class="title">
            <h2>環境構築なしでブラウザでプログラムを実行できる</h2>
            <h2 class="language">
                <span><a href="/python">Python</a>・</span>
                <!-- <span><a href="/php">PHP</a>・</span> -->
                <span><a href="/ruby">Ruby</a>・</span>
                <span><a href="/node">Node.js</a></span>
            </h2>
            <br>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                isOpen: false,
                items: [
                    {
                        url: "/",
                        name: "Python",
                        children: [
                            {
                                url: '/python',
                                name: 'Python'
                            },
                            {
                                url: '/php',
                                name: 'PHP'
                            },
                            {
                                url: '/node',
                                name: 'Node.js'
                            },
                            {
                                url: '/ruby',
                                name: 'Ruby'
                            },
                        ]
                    },
                ],
            }
        },
        mounted: function() {
        },
        methods: {
            open: function () {
                this.isOpen = !this.isOpen;
            },
        }
    }
</script>

<style>

.title {
    margin-top: 50px;
    text-align: center;
}

.language span a {
    color: honeydew;
}

</style>