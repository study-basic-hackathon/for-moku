'use server'

import { GYAZO_ACCESS_TOKEN } from "@/app/env";

export async function createGyazoHeader() {
  return {
    'Authorization': `Bearer ${GYAZO_ACCESS_TOKEN}`,
  }
}