<template>
    <div class="hello">
        <h1>オンラインPython実行環境</h1>
        <form v-on:submit.prevent="execCode">
        <!-- コード入力エリア -->
        <div ref="editor" style="height: 440px;"></div>
        <!-- 出力表示エリア -->
        <div id="output">
            <button type="submit" class="btn-square-so-pop">実行</button>
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
                // php: "<?php\n\n\n?>",
                editor: Object,
                result: "",
                code: "",
                isError: false,
                // notError: t
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
            execCode: function() {
                this.code = this.editor.getSession().getValue();
                axios.post('/api/v1/python',{
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    code: this.code
                }).then((res) => {
                    this.result = res.data.Result;
                    if (res.data.Result.match(/Error/)) {
                        this.isError = true;
                    } else {
                        this.isError = false;
                    }
                }).catch(err => {
                    if(err.response) {
                        console.log("error");
                    }
                });
            },

            // font
            fontColor: function(loop) {
            if (loop === 1) {
                return this.classRed;
            } else {
                return this.classGrey;
            }
        }
        }
    }
</script>