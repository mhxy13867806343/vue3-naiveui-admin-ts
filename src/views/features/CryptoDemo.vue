<script setup lang="ts">
/**
 * crypto-js 加解密示例
 */
import { ref, computed } from 'vue'
import CryptoJS from 'crypto-js'
import { NInput, NCard, NTabs, NTabPane, NTag } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const text = ref('Hello, World! 你好世界')
const aesKey = ref('my-secret-key-2024')

const md5 = computed(() => CryptoJS.MD5(text.value).toString())
const sha1 = computed(() => CryptoJS.SHA1(text.value).toString())
const sha256 = computed(() => CryptoJS.SHA256(text.value).toString())
const base64 = computed(() => CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text.value)))
const base64Decode = computed(() => {
  try {
    return CryptoJS.enc.Base64.parse(base64.value).toString(CryptoJS.enc.Utf8)
  } catch { return '解码失败' }
})

const aesEncrypted = computed(() => CryptoJS.AES.encrypt(text.value, aesKey.value).toString())
const aesDecrypted = computed(() => {
  try {
    return CryptoJS.AES.decrypt(aesEncrypted.value, aesKey.value).toString(CryptoJS.enc.Utf8)
  } catch { return '解密失败' }
})

const code = `import CryptoJS from 'crypto-js'

// 哈希
CryptoJS.MD5('hello').toString()
CryptoJS.SHA256('hello').toString()

// Base64
CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse('hello'))

// AES 对称加密
const cipher = CryptoJS.AES.encrypt('msg', 'key').toString()
const plain = CryptoJS.AES.decrypt(cipher, 'key').toString(CryptoJS.enc.Utf8)`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">CryptoJS 加解密</h2>
    <CodePreview title="crypto-js" description="MD5 / SHA / Base64 / AES 在前端常用的加密哈希工具集" :code="code">
      <NCard size="small" class="mb-4">
        <label class="text-sm text-gray-600 block mb-2">原始文本：</label>
        <NInput v-model:value="text" type="textarea" :rows="2" />
        <div class="text-sm text-gray-600 block mt-3 mb-2">AES Key：</div>
        <NInput v-model:value="aesKey" />
      </NCard>

      <NTabs type="line">
        <NTabPane name="hash" tab="哈希算法">
          <div class="space-y-3">
            <div>
              <NTag type="info" size="small">MD5 (32位)</NTag>
              <div class="font-mono text-xs bg-gray-50 p-2 rounded mt-1 break-all">{{ md5 }}</div>
            </div>
            <div>
              <NTag type="info" size="small">SHA-1 (40位)</NTag>
              <div class="font-mono text-xs bg-gray-50 p-2 rounded mt-1 break-all">{{ sha1 }}</div>
            </div>
            <div>
              <NTag type="info" size="small">SHA-256 (64位)</NTag>
              <div class="font-mono text-xs bg-gray-50 p-2 rounded mt-1 break-all">{{ sha256 }}</div>
            </div>
          </div>
        </NTabPane>
        <NTabPane name="base64" tab="Base64">
          <div class="space-y-3">
            <div>
              <NTag type="success" size="small">编码</NTag>
              <div class="font-mono text-xs bg-gray-50 p-2 rounded mt-1 break-all">{{ base64 }}</div>
            </div>
            <div>
              <NTag type="warning" size="small">解码</NTag>
              <div class="font-mono text-xs bg-gray-50 p-2 rounded mt-1 break-all">{{ base64Decode }}</div>
            </div>
          </div>
        </NTabPane>
        <NTabPane name="aes" tab="AES 对称加密">
          <div class="space-y-3">
            <div>
              <NTag type="success" size="small">密文</NTag>
              <div class="font-mono text-xs bg-gray-50 p-2 rounded mt-1 break-all">{{ aesEncrypted }}</div>
            </div>
            <div>
              <NTag type="warning" size="small">明文 (用相同 key 解密)</NTag>
              <div class="font-mono text-xs bg-gray-50 p-2 rounded mt-1 break-all">{{ aesDecrypted }}</div>
            </div>
          </div>
        </NTabPane>
      </NTabs>
    </CodePreview>
  </div>
</template>
