#!/usr/bin/env node

/**
 * IndexNow Test Script
 * 
 * Run this after deploying to verify IndexNow is working correctly.
 * 
 * Usage:
 *   node test-indexnow.js
 */

const BASE_URL = 'https://bluecrew.no';
const KEY = '2e1cef9560304b3279a0a8b7101c13b3539560c2bae7077700380f741fb39d0f';

async function testKeyFile() {
  console.log('🔍 Testing key file accessibility...');
  try {
    const response = await fetch(`${BASE_URL}/${KEY}.txt`);
    if (response.ok) {
      const content = await response.text();
      if (content.trim() === KEY) {
        console.log('✅ Key file is accessible and valid');
        return true;
      } else {
        console.log('❌ Key file content does not match');
        console.log('   Expected:', KEY);
        console.log('   Got:', content.trim());
        return false;
      }
    } else {
      console.log(`❌ Key file not accessible (HTTP ${response.status})`);
      return false;
    }
  } catch (error) {
    console.log('❌ Error accessing key file:', error.message);
    return false;
  }
}

async function testSingleUrlSubmission() {
  console.log('\n🔍 Testing single URL submission...');
  try {
    const testUrl = `${BASE_URL}/`;
    const response = await fetch(`${BASE_URL}/api/indexnow?url=${encodeURIComponent(testUrl)}`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Single URL submission successful');
      console.log('   Response:', JSON.stringify(data, null, 2));
      return true;
    } else {
      console.log('❌ Single URL submission failed');
      console.log('   Response:', JSON.stringify(data, null, 2));
      return false;
    }
  } catch (error) {
    console.log('❌ Error submitting single URL:', error.message);
    return false;
  }
}

async function testBatchSubmission() {
  console.log('\n🔍 Testing batch URL submission...');
  try {
    const testUrls = [
      `${BASE_URL}/`,
      `${BASE_URL}/stillinger`,
      `${BASE_URL}/rederi`,
    ];
    
    const response = await fetch(`${BASE_URL}/api/indexnow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ urls: testUrls }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Batch URL submission successful');
      console.log('   Response:', JSON.stringify(data, null, 2));
      return true;
    } else {
      console.log('❌ Batch URL submission failed');
      console.log('   Response:', JSON.stringify(data, null, 2));
      return false;
    }
  } catch (error) {
    console.log('❌ Error submitting batch URLs:', error.message);
    return false;
  }
}

async function testSubmitAll() {
  console.log('\n🔍 Testing submit-all endpoint...');
  try {
    const response = await fetch(`${BASE_URL}/api/indexnow/submit-all`, {
      method: 'POST',
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Submit-all successful');
      console.log('   Response:', JSON.stringify(data, null, 2));
      return true;
    } else {
      console.log('❌ Submit-all failed');
      console.log('   Response:', JSON.stringify(data, null, 2));
      return false;
    }
  } catch (error) {
    console.log('❌ Error with submit-all:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 IndexNow Test Suite\n');
  console.log('Testing IndexNow integration for:', BASE_URL);
  console.log('═'.repeat(60));
  
  const results = {
    keyFile: await testKeyFile(),
    singleUrl: await testSingleUrlSubmission(),
    batchUrls: await testBatchSubmission(),
    submitAll: await testSubmitAll(),
  };
  
  console.log('\n' + '═'.repeat(60));
  console.log('📊 Test Results Summary:');
  console.log('═'.repeat(60));
  console.log(`Key File:          ${results.keyFile ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Single URL:        ${results.singleUrl ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Batch URLs:        ${results.batchUrls ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Submit All:        ${results.submitAll ? '✅ PASS' : '❌ FAIL'}`);
  
  const allPassed = Object.values(results).every(r => r === true);
  
  if (allPassed) {
    console.log('\n🎉 All tests passed! IndexNow is working correctly.');
    console.log('\n📝 Next steps:');
    console.log('   1. Monitor Google Search Console for faster indexing');
    console.log('   2. Add automatic submission to content creation workflows');
    console.log('   3. Check Bing Webmaster Tools for IndexNow statistics');
  } else {
    console.log('\n⚠️  Some tests failed. Please review the errors above.');
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Ensure the site is deployed to production');
    console.log('   2. Check that the key file is in /public directory');
    console.log('   3. Verify API routes are deployed correctly');
    console.log('   4. Check server logs for errors');
  }
  
  process.exit(allPassed ? 0 : 1);
}

// Run tests
runTests().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
