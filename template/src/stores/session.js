import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSessionStore = defineStore('session', () => {
  const sessionId = ref('')

  const initSession = () => {
    let sid = localStorage.getItem('session_id')
    if (!sid) {
      sid = `session_${Date.now()}`
      localStorage.setItem('session_id', sid)
    }
    sessionId.value = sid
  }

  const getSessionId = () => {
    if (!sessionId.value) initSession()
    return sessionId.value
  }

  return { sessionId, initSession, getSessionId }
})
