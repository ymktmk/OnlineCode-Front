<template>
    <div>

        <h2>ブラウザでプログラミング！</h2>

        <ul>
            <li v-for="item in items" :key="item.name">
                <a :href="item.url" v-if="!item.children">
                    {{ item.name }}
                </a>
                <span v-on:click="open">
                    
                    <button class="btn-square-so-pop">Python ▼</button><br>

                    <ul class="dropdown" v-bind:class="{ isOpen }">
                        <li v-for="child in item.children" :key="child.url">
                            <a :href="child.url">
                                {{ child.name }}
                            </a>
                        </li>
                    </ul>
                </span>
            </li>
        </ul>

        <form v-on:submit.prevent="execCode">
            <!-- コード入力エリア -->
            <div ref="editor" style="height: 440px;" class="editor"></div>
            <!-- ローディング -->
            <div v-show="loading" class="loader"></div>
            <!-- 出力表示エリア -->
            <div id="output">
                <button type="submit" class="btn-square-so-pop" v-bind:disabled="loading">実行</button>
            </div>
            <div id="result">
                <br>
                <pre id="message" v-bind:class="[ isError ? 'error-message' : 'message' ]">{{ result }}</pre>
            </div>
        </form>
    </div>
</template>

<script>
    import ace from 'ace-builds'
    import axios from 'axios'

    import 'ace-builds/src-noconflict/ext-emmet'
    import 'ace-builds/src-noconflict/ext-language_tools'
    import 'ace-builds/webpack-resolver'
    import 'ace-builds/src-noconflict/mode-python'
    
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
                loading: false,
                editor: Object,
                result: "",
                code: "",
                isError: false,
            }
        },
        mounted: function() {
            this.editor = ace.edit(this.$refs.editor);
            this.editor.setTheme('ace/theme/monokai');
            this.editor.getSession().setMode('ace/mode/python');
            this.editor.setFontSize(18);
            this.editor.getSession().setTabSize(2);

            this.editor.$blockScrolling = Infinity;
            
            this.editor.setOptions({
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true,
                enableEmmet: true,
            });
        },
        methods: {
            open: function () {
                this.isOpen = !this.isOpen;
            },
            execCode: function() {
                // ローディング終了
                this.loading = true;
                this.code = this.editor.getSession().getValue();

                // http://52.198.52.213:10000/api/v1/python
                axios.post('http://localhost:10000/api/v1/python',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    code: this.code
                }).then((res) => {
                    // ローディング終了
                    this.loading = false;

                    this.result = res.data.Result;
                    if (res.data.Result.match(/Error/)) {
                        this.isError = true;
                    } else {
                        this.isError = false;
                    }
                }).catch(err => {
                    if(err.response) {
                        console.log(err);
                    }
                });
            },
        }
    }
</script>