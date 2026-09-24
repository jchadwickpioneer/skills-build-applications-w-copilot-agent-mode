import React from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const hasApiConfiguration = Boolean(codespaceName)
const apiRoot = hasApiConfiguration
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : '/api'

export function apiUrl(component) {
  return `${apiRoot}/${component}/`
}

function collectionFromPayload(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && typeof payload === 'object') {
    for (const key of ['data', 'items', 'results']) {
      const collection = collectionFromPayload(payload[key])
      if (collection.length > 0 || Array.isArray(payload[key])) return collection
    }
  }
  return []
}

export async function fetchCollection(component, signal) {
  const response = await fetch(apiUrl(component), { signal })
  if (!response.ok) throw new Error(`Unable to load ${component} (${response.status})`)
  return collectionFromPayload(await response.json())
}

export function useCollection(component) {
  const [state, setState] = React.useState({ data: [], loading: true, error: '' })

  React.useEffect(() => {
    const controller = new AbortController()
    fetchCollection(component, controller.signal)
      .then((data) => setState({ data, loading: false, error: '' }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ data: [], loading: false, error: error.message })
      })
    return () => controller.abort()
  }, [component])

  return state
}
