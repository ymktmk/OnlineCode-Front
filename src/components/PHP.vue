<template>
    <div class="hello">
        <h1>オンラインPHP実行環境</h1>
    <form v-on:submit.prevent="execCode">
        <!-- コード入力エリア -->
        <div ref="editor" style="height: 440px;">{{ php }}</div>
        <!-- 出力表示エリア -->
        <div id="output">
            <button type="submit" class="btn-square-so-pop">実行</button>
        </div>

        <div id="result">
            <br>
            <pre id="message" class="message">{{ result }}</pre>
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
    import 'ace-builds/src-noconflict/mode-php'
    
    export default {
        data: function () {
            return {
                php: "<?php\n\n\n?>",
                editor: Object,
                result: "",
                code: "",
            }
        },
        mounted: function() {

            var message = document.getElementsByTagName('pre')[0].innerHTML;
            console.log(message);

            if (message.match(/Error/)) {
                let element = document.getElementById('message');
                element.className = 'error-message';
            }


            this.editor = ace.edit(this.$refs.editor);
            this.editor.setTheme('ace/theme/monokai');
            this.editor.getSession().setMode('ace/mode/php');
            this.editor.setFontSize(20);
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
                axios.post('/api/v1/php',{
                headers: {
                    'Content-Type': 'application/json'
                },
                code: this.code
            }).then((res) => {
                this.result = res.data.Result
                console.log(res.data)
            }).catch(err => {
                if(err.response) {
                console.log("error")
                }
            });
            }
        }
    }
</script>
