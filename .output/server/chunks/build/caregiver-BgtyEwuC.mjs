import { b3 as defineNuxtRouteMiddleware, O as useNuxtApp, P as navigateTo, n as createError } from './server.mjs';
import 'vue';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@intlify/utils';
import 'vue-router';
import 'node:url';
import 'consola';
import 'vue/server-renderer';
import '@supabase/supabase-js';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const caregiver = defineNuxtRouteMiddleware((to) => {
  const { $auth } = useNuxtApp();
  if (!$auth.isAuthenticated) {
    return navigateTo("/auth/login");
  }
  if (!$auth.isCaregiver) {
    throw createError({
      statusCode: 403,
      statusMessage: "此頁面僅限看護人員使用"
    });
  }
});

export { caregiver as default };
//# sourceMappingURL=caregiver-BgtyEwuC.mjs.map
