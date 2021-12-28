<template>
    <div>
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
            <li>
                <h4>mob programmingモード</h4>
            </li>
        </ul>

        <form v-on:submit.prevent="execCode">
            <!-- コード入力エリア -->
            <div ref="editor" class="editor" @mousemove="mouseleave"></div>
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

import firebase from 'firebase/app'
import 'firebase/firestore'
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
                                url: '/node',
                                name: 'Node.js'
                            },
                            {
                                url: '/ruby',
                                name: 'Ruby'
                            },
                            {
                                url: '/dart',
                                name: 'Dart'
                            },
                        ]
                    },
            ],
            db: null,
            id: 1,
            loading: false,
            editor: Object,
            result: "",
            code: "",
            isError: false,
            text: ""
        }
    },
    mounted(){
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
    created: function() {
        this.id = this.$route.params["id"];
        this.db = firebase.firestore();
        // 結果を取得する
        this.db.collection("live").doc(this.id).onSnapshot((doc) => {
            this.editor.setValue(doc.data()["code"]);
            this.loading = doc.data()["loading"];
            this.result = doc.data()["result"];
            // Errorは赤にする
            if (doc.data()["result"].match(/Error/)) {
                this.isError = true;
            } else {
                this.isError = false;
            }
        });
    },
    methods: {
        mouseleave: function() {
            // カーソルの位置
            // this.editor.getCursorPosition()
            this.db.collection("live").doc(this.id).update({
                "code": this.editor.getSession().getValue()
            });
            // this.editor.moveCursorTo(0,0);
        },
        execCode: function() {
            // loading開始
            this.db.collection("live").doc(this.id).update({
                "loading": true
            });
            this.code = this.editor.getSession().getValue();
            axios.post('https://3ldxo49n3a.execute-api.ap-northeast-1.amazonaws.com/api/python',{
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                code: this.code
            }).then((res) => {
                // レスポンスが帰ってきたらfirestoreに挿入する
                this.db.collection("live").doc(this.id).update({
                    "loading": false,                    
                    "result": res.data.result
                });                
            }).catch(err => {
                if(err.response) {
                    console.log(err);
                }
            });
        },
        confirmSave (event) {
            event.returnValue = "編集中のものは保存されませんが、よろしいですか？";
        },
        open: function () {
            this.isOpen = !this.isOpen;
        },
    }
}
</script>

<style>

.MyCursorClass {
    position: absolute;
    border-left: 2px solid gold;
}
</style>