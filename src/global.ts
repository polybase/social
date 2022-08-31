

declare global {
  interface Window {
    gtag: (event: string, cat?: string, value?: string) => void
    ethereum: any
  }
}

export {}
