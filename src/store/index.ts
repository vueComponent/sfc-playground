import { ReplStore, File, compileFile } from '@vue/repl'
import { reactive, watch } from 'vue'
import mainCode from '../raw/main.vue?raw'
import setupCode from '../raw/setup?raw'

const MAIN = 'main.vue'
const SETUP = 'setup.ts'

const hash = location.hash.slice(1)
export const store = new ReplStore({
  serializedState: hash,
  defaultVueRuntimeURL: 'https://unpkg.com/vue@latest/dist/vue.runtime.esm-browser.js',
  defaultVueServerRendererURL: 'https://unpkg.com/@vue/compiler-sfc@latest/dist/server-renderer.esm-browser.js'
})

const main = new File(MAIN, mainCode, true)
store.addFile(main)
compileFile(store, main)
store.state.mainFile = MAIN

export function useStore() {
  const meta = reactive({
    antdv: {
      label: 'Ant Design Vue',
      value: '3.3.0-beta.2',
      expanded: false,
      versions: []
    },
    vue: {
      label: 'Vue',
      value: 'latest',
      expanded: false,
      versions: []
    }
  })

  watch(
    () => meta.antdv.value,
    (version) => {
      const code = setupCode.replace('__VERSION__', version)
      store.setImportMap({
        imports: {
          'ant-design-vue': `https://cdn.jsdelivr.net/npm/ant-design-vue@${version}/dist/antd.esm.js`
        }
      })

      const file = new File(
        SETUP,
        code,
        true
      )
      if (!store.state[SETUP]) {
        store.addFile(file)
      } else {
        store.state[SETUP] = file
      }
      compileFile(store, file)
    },
    { immediate: true }
  )

  return {
    meta,
  }
}
