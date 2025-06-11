'use server'

export async function createGyazoHeader() {
  return {
    'Authorization': `Bearer ${process.env.GYAZO_ACCESS_TOKEN}`,
  }
}