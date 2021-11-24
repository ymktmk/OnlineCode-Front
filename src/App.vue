<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
* {
    padding: 0;
    margin: 0;
}

body {
    background-color: rgb(38, 40, 34);
}

h1 {
    color: #ffffff;
    font-family: 'Corben', cursive;
    padding: 5px;
}

.btn-square-so-pop {
    cursor: pointer;
    position: relative;
    display: inline-block;
    padding: 0.5em 2em;
    text-decoration: none;
    color: #FFF;
    background: #fd9535;
    border-radius: 4px;
    box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.05);
    font-weight: bold;
    border: solid 2px #d27d00;
}

.btn-square-so-pop:hover {
    background-color: #dd8a0e;
}

html, body, form {
    height: 100%;
}

.message {
    color: #ffffff;
    font-size: 20px;
}

.error-message {
    color: rgb(227, 96, 73);
    font-size: 20px;
}
</style>
