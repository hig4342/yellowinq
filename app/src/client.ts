import { HoudiniClient } from '$houdini';
import { subscription, type SubscriptionHandler } from '$houdini/plugins'

const sseSockets: SubscriptionHandler = () => {
  return {
    subscribe(payload, handlers) {
      const url = new URL('/graphql', 'http://localhost:3000')
      //const url = new URL('/api/graphql', location.href)
      url.searchParams.append('query', payload.query)
      url.searchParams.append('variables', JSON.stringify(payload.variables))

      const eventSource = new EventSource(url, {
        withCredentials: true
      })
      
      eventSource.addEventListener('message', (ev) => handlers.next(JSON.parse(ev.data)))

      return () => eventSource.close()
    },
  }
}

export default new HoudiniClient({
    url: 'http://localhost:3000/graphql',
    plugins: [
      subscription(sseSockets)
    ]
})
