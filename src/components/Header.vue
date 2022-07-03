<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAntdVueVersions, getVueVersions } from '../utils'
import { useStore } from '../store'
import Sun from './icons/Sun.vue'
import Moon from './icons/Moon.vue'
import Share from './icons/Share.vue'
import GitHub from './icons/GitHub.vue'
const props = defineProps(['store', 'dev', 'ssr'])
const { store } = props
const activeVueVersion = ref(``)
const { meta } = useStore()

async function toggle(type: 'vue' | 'antdv') {
  meta[type].expanded = !meta[type].expanded;
}
async function setVersion(type: 'vue' | 'antdv',v: string) {
  meta[type].value = `loading...`
  if (type === 'vue') {
    await store.setVueVersion(v)
  }
  console.log(store.getImportMap())
  meta[type].value = `v${v}`
  meta[type].expanded = false
}
function resetVueVersion() {
  store.resetVueVersion()
  activeVueVersion.value = ``
}
async function copyLink() {
  await navigator.clipboard.writeText(location.href)
  alert('Sharable URL has been copied to clipboard.')
}
function toggleDark() {
  const cls = document.documentElement.classList
  cls.toggle('dark')
  localStorage.setItem(
    'vue-sfc-playground-prefer-dark',
    String(cls.contains('dark'))
  )
}
onMounted(async () => {
  window.addEventListener('click', () => {
    meta.vue.expanded = false
    meta.antdv.expanded = false
  })
  window.addEventListener('blur', () => {
    if (document.activeElement?.tagName === 'IFRAME') {
      meta.vue.expanded = false
      meta.antdv.expanded = false
    }
  });
  const res = await Promise.all([getVueVersions(), getAntdVueVersions()])
  meta.vue.versions = res[0]
  meta.antdv.versions = res[1]
})
</script>

<template>
  <nav>
    <h1>
      <img alt="logo" src="/logo.svg" />
      <span>Ant Design Vue Playground</span>
    </h1>
    <div class="links">
      <div class="version" @click.stop>
        <span class="active-version" @click="() => toggle('vue')">
          Vue Version
          <input class="number" v-model="meta.vue.value" />
        </span>
        <ul class="versions" :class="{ expanded: meta.vue.expanded }">
          <li v-for="version of meta.vue.versions">
            <a @click="setVersion('vue', version)">v{{ version }}</a>
          </li>
        </ul>
      </div>
      <div class="version" @click.stop>
        <span class="active-version" @click="() => toggle('antdv')">
          Ant Design Vue Version
          <input class="number" v-model="meta.antdv.value" />
        </span>
        <ul class="versions" :class="{ expanded: meta.antdv.expanded }">
          <li v-for="version of meta.antdv.versions">
            <a @click="setVersion('antdv', version)">v{{ version }}</a>
          </li>
        </ul>
      </div>
      <button title="Toggle dark mode" class="toggle-dark" @click="toggleDark">
        <Sun class="light" />
        <Moon class="dark" />
      </button>
      <button title="Copy sharable URL" class="share" @click="copyLink">
        <Share />
      </button>
      <button title="View on GitHub" class="github">
        <a
          href="https://github.com/vuejs/core/tree/main/packages/sfc-playground"
          target="_blank"
        >
          <GitHub />
        </a>
      </button>
    </div>
  </nav>
</template>

<style>
nav {
  --bg: #fff;
  --bg-light: #fff;
  --border: #ddd;
  --btn: #666;
  --highlight: #333;
  --green: #3ca877;
  --purple: #904cbc;
  --btn-bg: #eee;
  color: var(--base);
  height: var(--nav-height);
  box-sizing: border-box;
  padding: 0 1em;
  background-color: var(--bg);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.33);
  position: relative;
  z-index: 999;
  display: flex;
  justify-content: space-between;
}
.dark nav {
  --base: #ddd;
  --bg: #1a1a1a;
  --bg-light: #242424;
  --border: #383838;
  --highlight: #fff;
  --btn-bg: #333;
  box-shadow: none;
  border-bottom: 1px solid var(--border);
}
h1 {
  font-weight: 500;
  display: inline-flex;
  place-items: center;
}
h1 img {
  height: 24px;
  margin-right: 10px;
}
@media (max-width: 560px) {
  h1 span {
    font-size: 0.9em;
  }
}
@media (max-width: 520px) {
  h1 span {
    display: none;
  }
}
.links {
  display: flex;
}
.version {
  margin-right: 12px;
  position: relative;
}
.active-version {
  cursor: pointer;
  position: relative;
  display: inline-flex;
  place-items: center;
}
.active-version .number {
  color: var(--green);
  margin-left: 4px;
}
.active-version::after {
  content: '';
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid #aaa;
  margin-left: 8px;
}
.toggle-dev span,
.toggle-ssr span {
  font-size: 12px;
  border-radius: 4px;
  padding: 4px 6px;
}
.toggle-dev span {
  background: var(--purple);
  color: #fff;
}
.toggle-dev.dev span {
  background: var(--green);
}
.toggle-ssr span {
  background-color: var(--btn-bg);
}
.toggle-ssr.enabled span {
  color: #fff;
  background-color: var(--green);
}
.toggle-dark svg {
  width: 18px;
  height: 18px;
}
.toggle-dark .dark,
.dark .toggle-dark .light {
  display: none;
}
.dark .toggle-dark .dark {
  display: inline-block;
}
.links button,
.links button a {
  color: var(--btn);
}
.links button:hover,
.links button:hover a {
  color: var(--highlight);
}
.version:hover .active-version::after {
  border-top-color: var(--btn);
}
.dark .version:hover .active-version::after {
  border-top-color: var(--highlight);
}
.versions {
  display: none;
  position: absolute;
  right: 0;
  top: 40px;
  background-color: var(--bg-light);
  border: 1px solid var(--border);
  border-radius: 4px;
  list-style-type: none;
  padding: 8px;
  margin: 0;
  width: 200px;
  max-height: calc(100vh - 70px);
  overflow: scroll;
}
.versions a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
  cursor: pointer;
  color: var(--base);
}
.versions a:hover {
  color: var(--green);
}
.versions.expanded {
  display: block;
}
.links > * {
  display: flex;
  align-items: center;
}
.links > * + * {
  margin-left: 4px;
}
</style>