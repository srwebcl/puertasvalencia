import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BaazK4_7.mjs';
import 'es-module-lexer';
import { d as decodeKey } from './chunks/astro/server_DY7LoGDR.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/sebastianrodriguezmilla/proyectos-web/puertas-valencia/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"api/send","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/send","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/send\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"send","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/send.ts","pathname":"/api/send","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://puertasvalencia.cl","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/sebastianrodriguezmilla/proyectos-web/puertas-valencia/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/api/send@_@ts":"pages/api/send.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/sebastianrodriguezmilla/proyectos-web/puertas-valencia/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_D-R8cfbR.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.qpNYEKCi.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.CHN1WfwB.css","/favicon.png","/robots.txt","/_astro/hoisted.qpNYEKCi.js","/imagenes/WhatsApp Image 2026-04-23 at 22.48.30.jpeg","/imagenes/WhatsApp Image 2026-04-23 at 22.48.31 (1).jpeg","/imagenes/WhatsApp Image 2026-04-23 at 22.48.31.jpeg","/imagenes/WhatsApp Image 2026-04-23 at 22.48.32 (1).jpeg","/imagenes/WhatsApp Image 2026-04-23 at 22.48.32 (2).jpeg","/imagenes/WhatsApp Image 2026-04-23 at 22.48.32 (3).jpeg","/imagenes/WhatsApp Image 2026-04-23 at 22.48.32.jpeg","/imagenes/WhatsApp Image 2026-04-23 at 22.48.33 (1).jpeg","/imagenes/WhatsApp Image 2026-04-23 at 22.48.33 (2).jpeg","/imagenes/WhatsApp Image 2026-04-23 at 22.48.33 (3).jpeg","/imagenes/WhatsApp Image 2026-04-23 at 22.48.33 (4).jpeg","/imagenes/WhatsApp Image 2026-04-23 at 22.48.33.jpeg","/imagenes/WhatsApp Image 2026-04-23 at 22.48.34 (1).jpeg","/imagenes/WhatsApp Image 2026-04-23 at 22.48.34.jpeg","/imagenes/WhatsApp Image 2026-04-23 at 22.48.35 (1).jpeg","/imagenes/WhatsApp Image 2026-04-23 at 22.48.35 (2).jpeg","/imagenes/WhatsApp Image 2026-04-23 at 22.48.35 (3).jpeg","/imagenes/WhatsApp Image 2026-04-23 at 22.48.35.jpeg","/imagenes/WhatsApp Image 2026-04-23 at 22.48.36.jpeg","/imagenes/WhatsApp Video 2026-04-23 at 22.36.57 (1).mp4","/imagenes/WhatsApp Video 2026-04-23 at 22.37.41 (1).mp4","/imagenes/WhatsApp Video 2026-04-23 at 22.38.04 (1).mp4","/imagenes/WhatsApp Video 2026-04-23 at 22.39.00 (1).mp4","/imagenes/WhatsApp Video 2026-04-23 at 22.41.29 (1).mp4","/web_images/La_misma_imagen_pero_que_202605142038.jpeg","/web_images/Logo-Puertas-Valencia-B.webp","/web_images/Logo-Puertas-Valencia.webp","/web_images/Mantén_la_misma_imagen_pero_202605142034.jpeg","/web_images/la_misma_imagen_que_se_202605142041.jpeg","/web_images/puerta-blindada.jpeg","/web_images/puerta-blindada.jpeg_202606151119.jpeg","/web_images/puerta-enchapada.jpeg","/web_images/puerta-enchapada.jpeg_202606151109.jpeg","/web_images/puerta-restaurada.jpeg","/web_images/puerta-restaurada.jpeg_202606151108.jpeg","/api/send","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"BO0Gvp7zyCfq5YyxydGEQzEKNLdwXVqUFlWa1RS6AVI=","experimentalEnvGetSecretEnabled":false});

export { manifest };
