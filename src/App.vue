<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@font-face {
	font-family: 'Nunito';
	font-display: swap;
	src: url('./fonts/Nunito-ExtraLight.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
}

#app, html, body{
  box-sizing: border-box;
  font-family: 'Nunito', sans-serif;
}
</style>
