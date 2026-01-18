#!/usr/bin/env node
/**
 * 規格檔案驗證腳本
 * 檢查 API 規格檔案的完整性和一致性
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 顏色輸出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 必需的章節
const REQUIRED_SECTIONS = [
  '## 端點資訊',
  '## 請求規格',
  '## 回應規格',
  '## 測試案例',
];

// 驗證單個規格檔案
function validateSpec(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  const errors = [];
  const warnings = [];
  const stats = {
    testCases: 0,
    errorResponses: 0,
    successResponses: 0,
  };

  // 檢查必需章節
  REQUIRED_SECTIONS.forEach((section) => {
    if (!content.includes(section)) {
      errors.push(`缺少必需章節: ${section}`);
    }
  });

  // 檢查標題格式
  if (!content.startsWith('# API 規格：')) {
    warnings.push('標題格式不符合規範');
  }

  // 統計測試案例數量
  const testCaseMatches = content.match(/###\s+\d+\./g);
  if (testCaseMatches) {
    stats.testCases = testCaseMatches.length;
  } else {
    warnings.push('未找到編號的測試案例');
  }

  // 檢查成功回應
  if (content.includes('### 成功回應')) {
    stats.successResponses++;
  } else {
    warnings.push('缺少成功回應定義');
  }

  // 檢查錯誤回應
  const errorResponseMatches = content.match(/####.*\(4\d{2}|5\d{2}/g);
  if (errorResponseMatches) {
    stats.errorResponses = errorResponseMatches.length;
  } else {
    warnings.push('缺少錯誤回應定義');
  }

  // 檢查 Given-When-Then 格式
  const gwtMatches = content.match(/Given|When|Then|And/g);
  if (!gwtMatches || gwtMatches.length < 10) {
    warnings.push('測試案例可能未使用 Given-When-Then 格式');
  }

  return { fileName, errors, warnings, stats };
}

// 掃描所有規格檔案
function scanSpecs(directory) {
  const results = [];

  function scanDir(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scanDir(filePath);
      } else if (file.endsWith('.spec.md')) {
        results.push(validateSpec(filePath));
      }
    });
  }

  scanDir(directory);
  return results;
}

// 產生報告
function generateReport(results) {
  log('\n┌─────────────────────────────────────────────────────┐', 'cyan');
  log('│         DogFriend API 規格驗證報告                  │', 'cyan');
  log('└─────────────────────────────────────────────────────┘\n', 'cyan');

  let totalErrors = 0;
  let totalWarnings = 0;
  let totalTestCases = 0;
  let totalErrorResponses = 0;
  let totalSuccessResponses = 0;

  // 個別檔案報告
  results.forEach((result) => {
    const hasErrors = result.errors.length > 0;
    const hasWarnings = result.warnings.length > 0;

    if (hasErrors || hasWarnings) {
      log(`\n📄 ${result.fileName}`, 'blue');

      if (hasErrors) {
        log('  ❌ 錯誤:', 'red');
        result.errors.forEach((error) => {
          log(`     - ${error}`, 'red');
          totalErrors++;
        });
      }

      if (hasWarnings) {
        log('  ⚠️  警告:', 'yellow');
        result.warnings.forEach((warning) => {
          log(`     - ${warning}`, 'yellow');
          totalWarnings++;
        });
      }
    } else {
      log(`✅ ${result.fileName}`, 'green');
    }

    // 統計資訊
    log(`   📊 統計: ${result.stats.testCases} 測試案例, ${result.stats.errorResponses} 錯誤回應`, 'cyan');

    totalTestCases += result.stats.testCases;
    totalErrorResponses += result.stats.errorResponses;
    totalSuccessResponses += result.stats.successResponses;
  });

  // 總結報告
  log('\n┌─────────────────────────────────────────────────────┐', 'cyan');
  log('│                  驗證總結                           │', 'cyan');
  log('└─────────────────────────────────────────────────────┘\n', 'cyan');

  log(`📁 檔案總數: ${results.length}`, 'blue');
  log(`✅ 通過檔案: ${results.filter((r) => r.errors.length === 0).length}`, 'green');
  log(`❌ 錯誤數量: ${totalErrors}`, totalErrors > 0 ? 'red' : 'green');
  log(`⚠️  警告數量: ${totalWarnings}`, totalWarnings > 0 ? 'yellow' : 'green');
  log(`\n📊 統計資訊:`, 'cyan');
  log(`   - 測試案例總數: ${totalTestCases}`, 'blue');
  log(`   - 平均每檔案: ${(totalTestCases / results.length).toFixed(1)} 個測試案例`, 'blue');
  log(`   - 錯誤回應定義: ${totalErrorResponses}`, 'blue');
  log(`   - 成功回應定義: ${totalSuccessResponses}`, 'blue');

  // 品質評分
  const qualityScore = calculateQualityScore(results, totalErrors, totalWarnings);
  log(`\n🎯 品質評分: ${qualityScore}/100`, qualityScore >= 90 ? 'green' : qualityScore >= 70 ? 'yellow' : 'red');

  return totalErrors === 0;
}

// 計算品質評分
function calculateQualityScore(results, totalErrors, totalWarnings) {
  let score = 100;

  // 錯誤扣分（每個錯誤扣 10 分）
  score -= totalErrors * 10;

  // 警告扣分（每個警告扣 2 分）
  score -= totalWarnings * 2;

  // 測試案例覆蓋率加分
  const avgTestCases = results.reduce((sum, r) => sum + r.stats.testCases, 0) / results.length;
  if (avgTestCases < 5) score -= 10;

  return Math.max(0, Math.min(100, score));
}

// 主程式
async function main() {
  const specDir = path.join(__dirname, '..', 'spec', 'api');

  log('🔍 開始掃描規格檔案...', 'cyan');

  if (!fs.existsSync(specDir)) {
    log('❌ 找不到 spec/api 目錄', 'red');
    process.exit(1);
  }

  const results = scanSpecs(specDir);
  const success = generateReport(results);

  log('\n✨ 驗證完成！\n', 'cyan');

  process.exit(success ? 0 : 1);
}

main().catch((error) => {
  log(`\n❌ 發生錯誤: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
