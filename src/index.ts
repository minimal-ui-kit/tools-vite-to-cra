#!/usr/bin/env node

import { migrateViteToCRA } from './vite-to-cra';

// ----------------------------------------------------------------------

async function runCodemod() {
  return migrateViteToCRA();
}

runCodemod();
