/**
 * Script to run SQL schema in Supabase
 * Run with: node scripts/setup-database.js
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables manually for Node.js script
const envPath = join(__dirname, '..', '.env.local')
const envContent = readFileSync(envPath, 'utf-8')

const env = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/)
  if (match) {
    env[match[1].trim()] = match[2].trim()
  }
})

const supabaseUrl = env.VITE_SUPABASE_URL
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

console.log('🔌 Connecting to Supabase...')
console.log(`   URL: ${supabaseUrl}`)

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
})

// Read schema file
const schemaPath = join(__dirname, '..', 'supabase', 'schema.sql')
const schema = readFileSync(schemaPath, 'utf-8')

// Split into individual statements
const statements = schema
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'))

console.log(`📝 Found ${statements.length} SQL statements to execute`)

async function runSchema() {
  console.log('\n🚀 Running schema...\n')
  
  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i]
    const preview = stmt.substring(0, 60).replace(/\n/g, ' ')
    
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: stmt + ';' })
      
      if (error) {
        // Try direct query for DDL statements
        const { error: queryError } = await supabase.from('_').select().limit(0)
        console.log(`   [${i + 1}/${statements.length}] ${preview}...`)
        console.log(`   ⚠️  Note: DDL statements may need to run in Supabase SQL Editor`)
      } else {
        console.log(`   [${i + 1}/${statements.length}] ✅ ${preview}...`)
      }
    } catch (err) {
      console.log(`   [${i + 1}/${statements.length}] ⚠️  ${preview}...`)
    }
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('📋 IMPORTANT: For DDL statements (CREATE TABLE, etc.)')
  console.log('   Please run the schema.sql directly in Supabase SQL Editor:')
  console.log('   1. Go to https://supabase.com/dashboard')
  console.log('   2. Open your project')
  console.log('   3. Go to SQL Editor')
  console.log('   4. Paste contents of supabase/schema.sql')
  console.log('   5. Click "Run"')
  console.log('='.repeat(60))
}

// Test connection first
async function testConnection() {
  try {
    const { data, error } = await supabase.from('availability').select('count').limit(1)
    if (error && error.code === '42P01') {
      console.log('⚠️  Tables do not exist yet. Schema needs to be run.')
      return false
    }
    console.log('✅ Connection successful!')
    return true
  } catch (err) {
    console.log('⚠️  Connection test: Tables may not exist yet')
    return false
  }
}

async function main() {
  const connected = await testConnection()
  
  if (!connected) {
    console.log('\n📋 To set up the database:')
    console.log('   1. Go to https://supabase.com/dashboard/project/qznebuamzddjukbfahpl')
    console.log('   2. Click "SQL Editor" in the sidebar')
    console.log('   3. Click "New Query"')
    console.log('   4. Copy and paste the contents of: supabase/schema.sql')
    console.log('   5. Click "Run" (or Ctrl+Enter)')
    console.log('\n✨ After running the schema, the database will be ready!')
  } else {
    console.log('\n✅ Database appears to be configured!')
    
    // Check if tables exist
    const { data: availData } = await supabase.from('availability').select('*').limit(5)
    console.log(`   📅 Availability entries: ${availData?.length || 0}`)
    
    const { data: contactData } = await supabase.from('contact_submissions').select('*').limit(5)
    console.log(`   📧 Contact submissions: ${contactData?.length || 0}`)
  }
}

main().catch(console.error)
