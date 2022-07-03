if (typeof document !== 'undefined') {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://cdn.jsdelivr.net/npm/ant-design-vue@__VERSION__/dist/antd.css'
  document.body.append(link)
}
