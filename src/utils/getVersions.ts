import { compare } from 'compare-versions'

export async function getVersions(name: string): Promise<string[]> {
  const data = await fetch(`https://data.jsdelivr.com/v1/package/npm/${name}`).then(res => res.json())
  return data.versions
}

export async function getVueVersions() {
  const versions = await getVersions('vue')
  return versions.filter((version: string) => compare(version, '3.0.0', '>='))
}

export async function getAntdVueVersions() {
  return ['3.3.0-beta.2']
  // const versions = await getVersions('ant-design-vue')
  // return versions.filter((version: string) => compare(version, '3.2.9', '>='))
}
