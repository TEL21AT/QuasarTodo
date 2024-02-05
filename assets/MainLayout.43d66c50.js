import {
  c as W,
  a as v,
  h as D,
  b as pe,
  r as _,
  w as T,
  o as J,
  T as Bt,
  Q as Ft,
  i as ht,
  d as ie,
  n as Ie,
  e as be,
  g as G,
  l as Pe,
  f as Qe,
  j as V,
  k as It,
  m as Se,
  p as Qt,
  q as Rt,
  s as Nt,
  P as jt,
  t as Vt,
  u as ae,
  v as Wt,
  x as de,
  y as Te,
  z as We,
  A as qe,
  B as Ee,
  C as $e,
  D as Zt,
  E as mt,
  F as gt,
  G as Xt,
  H as Ut,
  I as Kt,
  J as yt,
  K as oe,
  L as xe,
  M as Ze,
  N as Jt,
  O as Gt,
  R as en,
  S as tn,
  U as nn,
  V as Xe,
  W as an,
  X as bt,
  Y as rn,
  Z as Oe,
  _ as fe,
  $ as on,
  a0 as pt,
  a1 as St,
  a2 as ln,
  a3 as un,
  a4 as sn,
  a5 as ve,
  a6 as he,
  a7 as P,
  a8 as k,
  a9 as cn,
  aa as K,
  ab as dn,
  ac as Ue,
  ad as Ke,
  ae as fn,
  af as vn,
  ag as Je,
} from "assets/index.70c2f1ca.js";
import { Q as hn, a as Ge, b as me } from "assets/QList.19fed4bd.js";
var mn = W({
  name: "QToolbar",
  props: { inset: Boolean },
  setup(e, { slots: n }) {
    const o = v(
      () =>
        "q-toolbar row no-wrap items-center" +
        (e.inset === !0 ? " q-toolbar--inset" : "")
    );
    return () => D("div", { class: o.value, role: "toolbar" }, pe(n.default));
  },
});
const gn = { ratio: [String, Number] };
function yn(e, n) {
  return v(() => {
    const o = Number(e.ratio || (n !== void 0 ? n.value : void 0));
    return isNaN(o) !== !0 && o > 0 ? { paddingBottom: `${100 / o}%` } : null;
  });
}
const bn = 16 / 9;
var et = W({
  name: "QImg",
  props: {
    ...gn,
    src: String,
    srcset: String,
    sizes: String,
    alt: String,
    crossorigin: String,
    decoding: String,
    referrerpolicy: String,
    draggable: Boolean,
    loading: { type: String, default: "lazy" },
    fetchpriority: { type: String, default: "auto" },
    width: String,
    height: String,
    initialRatio: { type: [Number, String], default: bn },
    placeholderSrc: String,
    fit: { type: String, default: "cover" },
    position: { type: String, default: "50% 50%" },
    imgClass: String,
    imgStyle: Object,
    noSpinner: Boolean,
    noNativeMenu: Boolean,
    noTransition: Boolean,
    spinnerColor: String,
    spinnerSize: String,
  },
  emits: ["load", "error"],
  setup(e, { slots: n, emit: o }) {
    const r = _(e.initialRatio),
      t = yn(e, r);
    let a = null,
      u = !1;
    const i = [_(null), _($())],
      s = _(0),
      d = _(!1),
      l = _(!1),
      h = v(() => `q-img q-img--${e.noNativeMenu === !0 ? "no-" : ""}menu`),
      b = v(() => ({ width: e.width, height: e.height })),
      m = v(
        () =>
          `q-img__image ${
            e.imgClass !== void 0 ? e.imgClass + " " : ""
          }q-img__image--with${e.noTransition === !0 ? "out" : ""}-transition`
      ),
      g = v(() => ({
        ...e.imgStyle,
        objectFit: e.fit,
        objectPosition: e.position,
      }));
    T(() => H(), M);
    function H() {
      return e.src || e.srcset || e.sizes
        ? { src: e.src, srcset: e.srcset, sizes: e.sizes }
        : null;
    }
    function $() {
      return e.placeholderSrc !== void 0 ? { src: e.placeholderSrc } : null;
    }
    function M(w) {
      a !== null && (clearTimeout(a), (a = null)),
        (l.value = !1),
        w === null
          ? ((d.value = !1), (i[s.value ^ 1].value = $()))
          : (d.value = !0),
        (i[s.value].value = w);
    }
    function y({ target: w }) {
      u !== !0 &&
        (a !== null && (clearTimeout(a), (a = null)),
        (r.value =
          w.naturalHeight === 0 ? 0.5 : w.naturalWidth / w.naturalHeight),
        x(w, 1));
    }
    function x(w, E) {
      u === !0 ||
        E === 1e3 ||
        (w.complete === !0
          ? S(w)
          : (a = setTimeout(() => {
              (a = null), x(w, E + 1);
            }, 50)));
    }
    function S(w) {
      u !== !0 &&
        ((s.value = s.value ^ 1),
        (i[s.value].value = null),
        (d.value = !1),
        (l.value = !1),
        o("load", w.currentSrc || w.src));
    }
    function q(w) {
      a !== null && (clearTimeout(a), (a = null)),
        (d.value = !1),
        (l.value = !0),
        (i[s.value].value = null),
        (i[s.value ^ 1].value = $()),
        o("error", w);
    }
    function Y(w) {
      const E = i[w].value,
        L = {
          key: "img_" + w,
          class: m.value,
          style: g.value,
          crossorigin: e.crossorigin,
          decoding: e.decoding,
          referrerpolicy: e.referrerpolicy,
          height: e.height,
          width: e.width,
          loading: e.loading,
          fetchpriority: e.fetchpriority,
          "aria-hidden": "true",
          draggable: e.draggable,
          ...E,
        };
      return (
        s.value === w
          ? ((L.class += " q-img__image--waiting"),
            Object.assign(L, { onLoad: y, onError: q }))
          : (L.class += " q-img__image--loaded"),
        D(
          "div",
          { class: "q-img__container absolute-full", key: "img" + w },
          D("img", L)
        )
      );
    }
    function F() {
      return d.value !== !0
        ? D(
            "div",
            {
              key: "content",
              class: "q-img__content absolute-full q-anchor--skip",
            },
            pe(n[l.value === !0 ? "error" : "default"])
          )
        : D(
            "div",
            {
              key: "loading",
              class: "q-img__loading absolute-full flex flex-center",
            },
            n.loading !== void 0
              ? n.loading()
              : e.noSpinner === !0
              ? void 0
              : [D(Ft, { color: e.spinnerColor, size: e.spinnerSize })]
          );
    }
    return (
      M(H()),
      J(() => {
        (u = !0), a !== null && (clearTimeout(a), (a = null));
      }),
      () => {
        const w = [];
        return (
          t.value !== null &&
            w.push(D("div", { key: "filler", style: t.value })),
          l.value !== !0 &&
            (i[0].value !== null && w.push(Y(0)),
            i[1].value !== null && w.push(Y(1))),
          w.push(D(Bt, { name: "q-transition--fade" }, F)),
          D(
            "div",
            {
              class: h.value,
              style: b.value,
              role: "img",
              "aria-label": e.alt,
            },
            w
          )
        );
      }
    );
  },
});
function pn() {
  const e = _(!ht.value);
  return (
    e.value === !1 &&
      ie(() => {
        e.value = !0;
      }),
    e
  );
}
const wt = typeof ResizeObserver != "undefined",
  tt =
    wt === !0
      ? {}
      : {
          style:
            "display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",
          url: "about:blank",
        };
var le = W({
    name: "QResizeObserver",
    props: { debounce: { type: [String, Number], default: 100 } },
    emits: ["resize"],
    setup(e, { emit: n }) {
      let o = null,
        r,
        t = { width: -1, height: -1 };
      function a(s) {
        s === !0 || e.debounce === 0 || e.debounce === "0"
          ? u()
          : o === null && (o = setTimeout(u, e.debounce));
      }
      function u() {
        if ((o !== null && (clearTimeout(o), (o = null)), r)) {
          const { offsetWidth: s, offsetHeight: d } = r;
          (s !== t.width || d !== t.height) &&
            ((t = { width: s, height: d }), n("resize", t));
        }
      }
      const { proxy: i } = G();
      if (((i.trigger = a), wt === !0)) {
        let s;
        const d = (l) => {
          (r = i.$el.parentNode),
            r
              ? ((s = new ResizeObserver(a)), s.observe(r), u())
              : l !== !0 &&
                be(() => {
                  d(!0);
                });
        };
        return (
          ie(() => {
            d();
          }),
          J(() => {
            o !== null && clearTimeout(o),
              s !== void 0 &&
                (s.disconnect !== void 0
                  ? s.disconnect()
                  : r && s.unobserve(r));
          }),
          Ie
        );
      } else {
        let l = function () {
            o !== null && (clearTimeout(o), (o = null)),
              d !== void 0 &&
                (d.removeEventListener !== void 0 &&
                  d.removeEventListener("resize", a, Pe.passive),
                (d = void 0));
          },
          h = function () {
            l(),
              r &&
                r.contentDocument &&
                ((d = r.contentDocument.defaultView),
                d.addEventListener("resize", a, Pe.passive),
                u());
          };
        const s = pn();
        let d;
        return (
          ie(() => {
            be(() => {
              (r = i.$el), r && h();
            });
          }),
          J(l),
          () => {
            if (s.value === !0)
              return D("object", {
                style: tt.style,
                tabindex: -1,
                type: "text/html",
                data: tt.url,
                "aria-hidden": "true",
                onLoad: h,
              });
          }
        );
      }
    },
  }),
  Sn = W({
    name: "QHeader",
    props: {
      modelValue: { type: Boolean, default: !0 },
      reveal: Boolean,
      revealOffset: { type: Number, default: 250 },
      bordered: Boolean,
      elevated: Boolean,
      heightHint: { type: [String, Number], default: 50 },
    },
    emits: ["reveal", "focusin"],
    setup(e, { slots: n, emit: o }) {
      const {
          proxy: { $q: r },
        } = G(),
        t = Qe(Se, V);
      if (t === V)
        return console.error("QHeader needs to be child of QLayout"), V;
      const a = _(parseInt(e.heightHint, 10)),
        u = _(!0),
        i = v(
          () =>
            e.reveal === !0 ||
            t.view.value.indexOf("H") > -1 ||
            (r.platform.is.ios && t.isContainer.value === !0)
        ),
        s = v(() => {
          if (e.modelValue !== !0) return 0;
          if (i.value === !0) return u.value === !0 ? a.value : 0;
          const y = a.value - t.scroll.value.position;
          return y > 0 ? y : 0;
        }),
        d = v(() => e.modelValue !== !0 || (i.value === !0 && u.value !== !0)),
        l = v(() => e.modelValue === !0 && d.value === !0 && e.reveal === !0),
        h = v(
          () =>
            "q-header q-layout__section--marginal " +
            (i.value === !0 ? "fixed" : "absolute") +
            "-top" +
            (e.bordered === !0 ? " q-header--bordered" : "") +
            (d.value === !0 ? " q-header--hidden" : "") +
            (e.modelValue !== !0 ? " q-layout--prevent-focus" : "")
        ),
        b = v(() => {
          const y = t.rows.value.top,
            x = {};
          return (
            y[0] === "l" &&
              t.left.space === !0 &&
              (x[r.lang.rtl === !0 ? "right" : "left"] = `${t.left.size}px`),
            y[2] === "r" &&
              t.right.space === !0 &&
              (x[r.lang.rtl === !0 ? "left" : "right"] = `${t.right.size}px`),
            x
          );
        });
      function m(y, x) {
        t.update("header", y, x);
      }
      function g(y, x) {
        y.value !== x && (y.value = x);
      }
      function H({ height: y }) {
        g(a, y), m("size", y);
      }
      function $(y) {
        l.value === !0 && g(u, !0), o("focusin", y);
      }
      T(
        () => e.modelValue,
        (y) => {
          m("space", y), g(u, !0), t.animate();
        }
      ),
        T(s, (y) => {
          m("offset", y);
        }),
        T(
          () => e.reveal,
          (y) => {
            y === !1 && g(u, e.modelValue);
          }
        ),
        T(u, (y) => {
          t.animate(), o("reveal", y);
        }),
        T(t.scroll, (y) => {
          e.reveal === !0 &&
            g(
              u,
              y.direction === "up" ||
                y.position <= e.revealOffset ||
                y.position - y.inflectionPoint < 100
            );
        });
      const M = {};
      return (
        (t.instances.header = M),
        e.modelValue === !0 && m("size", a.value),
        m("space", e.modelValue),
        m("offset", s.value),
        J(() => {
          t.instances.header === M &&
            ((t.instances.header = void 0),
            m("size", 0),
            m("offset", 0),
            m("space", !1));
        }),
        () => {
          const y = It(n.default, []);
          return (
            e.elevated === !0 &&
              y.push(
                D("div", {
                  class:
                    "q-layout__shadow absolute-full overflow-hidden no-pointer-events",
                })
              ),
            y.push(D(le, { debounce: 0, onResize: H })),
            D("header", { class: h.value, style: b.value, onFocusin: $ }, y)
          );
        }
      );
    },
  });
const { passive: nt } = Pe,
  wn = ["both", "horizontal", "vertical"];
var Dt = W({
  name: "QScrollObserver",
  props: {
    axis: {
      type: String,
      validator: (e) => wn.includes(e),
      default: "vertical",
    },
    debounce: [String, Number],
    scrollTarget: { default: void 0 },
  },
  emits: ["scroll"],
  setup(e, { emit: n }) {
    const o = {
      position: { top: 0, left: 0 },
      direction: "down",
      directionChanged: !1,
      delta: { top: 0, left: 0 },
      inflectionPoint: { top: 0, left: 0 },
    };
    let r = null,
      t,
      a;
    T(
      () => e.scrollTarget,
      () => {
        s(), i();
      }
    );
    function u() {
      r !== null && r();
      const h = Math.max(0, Rt(t)),
        b = Nt(t),
        m = { top: h - o.position.top, left: b - o.position.left };
      if (
        (e.axis === "vertical" && m.top === 0) ||
        (e.axis === "horizontal" && m.left === 0)
      )
        return;
      const g =
        Math.abs(m.top) >= Math.abs(m.left)
          ? m.top < 0
            ? "up"
            : "down"
          : m.left < 0
          ? "left"
          : "right";
      (o.position = { top: h, left: b }),
        (o.directionChanged = o.direction !== g),
        (o.delta = m),
        o.directionChanged === !0 &&
          ((o.direction = g), (o.inflectionPoint = o.position)),
        n("scroll", { ...o });
    }
    function i() {
      (t = Qt(a, e.scrollTarget)), t.addEventListener("scroll", d, nt), d(!0);
    }
    function s() {
      t !== void 0 && (t.removeEventListener("scroll", d, nt), (t = void 0));
    }
    function d(h) {
      if (h === !0 || e.debounce === 0 || e.debounce === "0") u();
      else if (r === null) {
        const [b, m] = e.debounce
          ? [setTimeout(u, e.debounce), clearTimeout]
          : [requestAnimationFrame(u), cancelAnimationFrame];
        r = () => {
          m(b), (r = null);
        };
      }
    }
    const { proxy: l } = G();
    return (
      T(() => l.$q.lang.rtl, u),
      ie(() => {
        (a = l.$el.parentNode), i();
      }),
      J(() => {
        r !== null && r(), s();
      }),
      Object.assign(l, { trigger: d, getPosition: () => o }),
      Ie
    );
  },
});
const Re = {
    left: !0,
    right: !0,
    up: !0,
    down: !0,
    horizontal: !0,
    vertical: !0,
  },
  Dn = Object.keys(Re);
Re.all = !0;
function at(e) {
  const n = {};
  for (const o of Dn) e[o] === !0 && (n[o] = !0);
  return Object.keys(n).length === 0
    ? Re
    : (n.horizontal === !0
        ? (n.left = n.right = !0)
        : n.left === !0 && n.right === !0 && (n.horizontal = !0),
      n.vertical === !0
        ? (n.up = n.down = !0)
        : n.up === !0 && n.down === !0 && (n.vertical = !0),
      n.horizontal === !0 && n.vertical === !0 && (n.all = !0),
      n);
}
const Mn = ["INPUT", "TEXTAREA"];
function rt(e, n) {
  return (
    n.event === void 0 &&
    e.target !== void 0 &&
    e.target.draggable !== !0 &&
    typeof n.handler == "function" &&
    Mn.includes(e.target.nodeName.toUpperCase()) === !1 &&
    (e.qClonedBy === void 0 || e.qClonedBy.indexOf(n.uid) === -1)
  );
}
function zn() {
  if (window.getSelection !== void 0) {
    const e = window.getSelection();
    e.empty !== void 0
      ? e.empty()
      : e.removeAllRanges !== void 0 &&
        (e.removeAllRanges(),
        jt.is.mobile !== !0 && e.addRange(document.createRange()));
  } else document.selection !== void 0 && document.selection.empty();
}
function Ye(e, n, o) {
  const r = Ee(e);
  let t,
    a = r.left - n.event.x,
    u = r.top - n.event.y,
    i = Math.abs(a),
    s = Math.abs(u);
  const d = n.direction;
  d.horizontal === !0 && d.vertical !== !0
    ? (t = a < 0 ? "left" : "right")
    : d.horizontal !== !0 && d.vertical === !0
    ? (t = u < 0 ? "up" : "down")
    : d.up === !0 && u < 0
    ? ((t = "up"),
      i > s &&
        (d.left === !0 && a < 0
          ? (t = "left")
          : d.right === !0 && a > 0 && (t = "right")))
    : d.down === !0 && u > 0
    ? ((t = "down"),
      i > s &&
        (d.left === !0 && a < 0
          ? (t = "left")
          : d.right === !0 && a > 0 && (t = "right")))
    : d.left === !0 && a < 0
    ? ((t = "left"),
      i < s &&
        (d.up === !0 && u < 0
          ? (t = "up")
          : d.down === !0 && u > 0 && (t = "down")))
    : d.right === !0 &&
      a > 0 &&
      ((t = "right"),
      i < s &&
        (d.up === !0 && u < 0
          ? (t = "up")
          : d.down === !0 && u > 0 && (t = "down")));
  let l = !1;
  if (t === void 0 && o === !1) {
    if (n.event.isFirst === !0 || n.event.lastDir === void 0) return {};
    (t = n.event.lastDir),
      (l = !0),
      t === "left" || t === "right"
        ? ((r.left -= a), (i = 0), (a = 0))
        : ((r.top -= u), (s = 0), (u = 0));
  }
  return {
    synthetic: l,
    payload: {
      evt: e,
      touch: n.event.mouse !== !0,
      mouse: n.event.mouse === !0,
      position: r,
      direction: t,
      isFirst: n.event.isFirst,
      isFinal: o === !0,
      duration: Date.now() - n.event.time,
      distance: { x: i, y: s },
      offset: { x: a, y: u },
      delta: { x: r.left - n.event.lastX, y: r.top - n.event.lastY },
    },
  };
}
let _n = 0;
var re = Vt({
  name: "touch-pan",
  beforeMount(e, { value: n, modifiers: o }) {
    if (o.mouse !== !0 && ae.has.touch !== !0) return;
    function r(a, u) {
      o.mouse === !0 && u === !0
        ? Zt(a)
        : (o.stop === !0 && qe(a), o.prevent === !0 && We(a));
    }
    const t = {
      uid: "qvtp_" + _n++,
      handler: n,
      modifiers: o,
      direction: at(o),
      noop: Ie,
      mouseStart(a) {
        rt(a, t) &&
          Wt(a) &&
          (de(t, "temp", [
            [document, "mousemove", "move", "notPassiveCapture"],
            [document, "mouseup", "end", "passiveCapture"],
          ]),
          t.start(a, !0));
      },
      touchStart(a) {
        if (rt(a, t)) {
          const u = a.target;
          de(t, "temp", [
            [u, "touchmove", "move", "notPassiveCapture"],
            [u, "touchcancel", "end", "passiveCapture"],
            [u, "touchend", "end", "passiveCapture"],
          ]),
            t.start(a);
        }
      },
      start(a, u) {
        if (
          (ae.is.firefox === !0 && Te(e, !0),
          (t.lastEvt = a),
          u === !0 || o.stop === !0)
        ) {
          if (
            t.direction.all !== !0 &&
            (u !== !0 ||
              (t.modifiers.mouseAllDir !== !0 &&
                t.modifiers.mousealldir !== !0))
          ) {
            const d =
              a.type.indexOf("mouse") > -1
                ? new MouseEvent(a.type, a)
                : new TouchEvent(a.type, a);
            a.defaultPrevented === !0 && We(d),
              a.cancelBubble === !0 && qe(d),
              Object.assign(d, {
                qKeyEvent: a.qKeyEvent,
                qClickOutside: a.qClickOutside,
                qAnchorHandled: a.qAnchorHandled,
                qClonedBy:
                  a.qClonedBy === void 0 ? [t.uid] : a.qClonedBy.concat(t.uid),
              }),
              (t.initialEvent = { target: a.target, event: d });
          }
          qe(a);
        }
        const { left: i, top: s } = Ee(a);
        t.event = {
          x: i,
          y: s,
          time: Date.now(),
          mouse: u === !0,
          detected: !1,
          isFirst: !0,
          isFinal: !1,
          lastX: i,
          lastY: s,
        };
      },
      move(a) {
        if (t.event === void 0) return;
        const u = Ee(a),
          i = u.left - t.event.x,
          s = u.top - t.event.y;
        if (i === 0 && s === 0) return;
        t.lastEvt = a;
        const d = t.event.mouse === !0,
          l = () => {
            r(a, d);
            let m;
            o.preserveCursor !== !0 &&
              o.preservecursor !== !0 &&
              ((m = document.documentElement.style.cursor || ""),
              (document.documentElement.style.cursor = "grabbing")),
              d === !0 &&
                document.body.classList.add("no-pointer-events--children"),
              document.body.classList.add("non-selectable"),
              zn(),
              (t.styleCleanup = (g) => {
                if (
                  ((t.styleCleanup = void 0),
                  m !== void 0 && (document.documentElement.style.cursor = m),
                  document.body.classList.remove("non-selectable"),
                  d === !0)
                ) {
                  const H = () => {
                    document.body.classList.remove(
                      "no-pointer-events--children"
                    );
                  };
                  g !== void 0
                    ? setTimeout(() => {
                        H(), g();
                      }, 50)
                    : H();
                } else g !== void 0 && g();
              });
          };
        if (t.event.detected === !0) {
          t.event.isFirst !== !0 && r(a, t.event.mouse);
          const { payload: m, synthetic: g } = Ye(a, t, !1);
          m !== void 0 &&
            (t.handler(m) === !1
              ? t.end(a)
              : (t.styleCleanup === void 0 && t.event.isFirst === !0 && l(),
                (t.event.lastX = m.position.left),
                (t.event.lastY = m.position.top),
                (t.event.lastDir = g === !0 ? void 0 : m.direction),
                (t.event.isFirst = !1)));
          return;
        }
        if (
          t.direction.all === !0 ||
          (d === !0 &&
            (t.modifiers.mouseAllDir === !0 || t.modifiers.mousealldir === !0))
        ) {
          l(), (t.event.detected = !0), t.move(a);
          return;
        }
        const h = Math.abs(i),
          b = Math.abs(s);
        h !== b &&
          ((t.direction.horizontal === !0 && h > b) ||
          (t.direction.vertical === !0 && h < b) ||
          (t.direction.up === !0 && h < b && s < 0) ||
          (t.direction.down === !0 && h < b && s > 0) ||
          (t.direction.left === !0 && h > b && i < 0) ||
          (t.direction.right === !0 && h > b && i > 0)
            ? ((t.event.detected = !0), t.move(a))
            : t.end(a, !0));
      },
      end(a, u) {
        if (t.event !== void 0) {
          if (($e(t, "temp"), ae.is.firefox === !0 && Te(e, !1), u === !0))
            t.styleCleanup !== void 0 && t.styleCleanup(),
              t.event.detected !== !0 &&
                t.initialEvent !== void 0 &&
                t.initialEvent.target.dispatchEvent(t.initialEvent.event);
          else if (t.event.detected === !0) {
            t.event.isFirst === !0 &&
              t.handler(Ye(a === void 0 ? t.lastEvt : a, t).payload);
            const { payload: i } = Ye(a === void 0 ? t.lastEvt : a, t, !0),
              s = () => {
                t.handler(i);
              };
            t.styleCleanup !== void 0 ? t.styleCleanup(s) : s();
          }
          (t.event = void 0), (t.initialEvent = void 0), (t.lastEvt = void 0);
        }
      },
    };
    if (((e.__qtouchpan = t), o.mouse === !0)) {
      const a = o.mouseCapture === !0 || o.mousecapture === !0 ? "Capture" : "";
      de(t, "main", [[e, "mousedown", "mouseStart", `passive${a}`]]);
    }
    ae.has.touch === !0 &&
      de(t, "main", [
        [
          e,
          "touchstart",
          "touchStart",
          `passive${o.capture === !0 ? "Capture" : ""}`,
        ],
        [e, "touchmove", "noop", "notPassiveCapture"],
      ]);
  },
  updated(e, n) {
    const o = e.__qtouchpan;
    o !== void 0 &&
      (n.oldValue !== n.value &&
        (typeof value != "function" && o.end(), (o.handler = n.value)),
      (o.direction = at(n.modifiers)));
  },
  beforeUnmount(e) {
    const n = e.__qtouchpan;
    n !== void 0 &&
      (n.event !== void 0 && n.end(),
      $e(n, "main"),
      $e(n, "temp"),
      ae.is.firefox === !0 && Te(e, !1),
      n.styleCleanup !== void 0 && n.styleCleanup(),
      delete e.__qtouchpan);
  },
});
function Cn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function U(e, n, o) {
  return o <= n ? n : Math.min(o, Math.max(n, e));
}
function O(e, n = 2, o = "0") {
  if (e == null) return e;
  const r = "" + e;
  return r.length >= n ? r : new Array(n - r.length + 1).join(o) + r;
}
const it = ["vertical", "horizontal"],
  He = {
    vertical: {
      offset: "offsetY",
      scroll: "scrollTop",
      dir: "down",
      dist: "y",
    },
    horizontal: {
      offset: "offsetX",
      scroll: "scrollLeft",
      dir: "right",
      dist: "x",
    },
  },
  ot = { prevent: !0, mouse: !0, mouseAllDir: !0 },
  lt = (e) => (e >= 250 ? 50 : Math.ceil(e / 5));
var Tn = W({
  name: "QScrollArea",
  props: {
    ...mt,
    thumbStyle: Object,
    verticalThumbStyle: Object,
    horizontalThumbStyle: Object,
    barStyle: [Array, String, Object],
    verticalBarStyle: [Array, String, Object],
    horizontalBarStyle: [Array, String, Object],
    contentStyle: [Array, String, Object],
    contentActiveStyle: [Array, String, Object],
    delay: { type: [String, Number], default: 1e3 },
    visible: { type: Boolean, default: null },
    tabindex: [String, Number],
    onScroll: Function,
  },
  setup(e, { slots: n, emit: o }) {
    const r = _(!1),
      t = _(!1),
      a = _(!1),
      u = { vertical: _(0), horizontal: _(0) },
      i = {
        vertical: { ref: _(null), position: _(0), size: _(0) },
        horizontal: { ref: _(null), position: _(0), size: _(0) },
      },
      { proxy: s } = G(),
      d = gt(e, s.$q);
    let l = null,
      h;
    const b = _(null),
      m = v(
        () => "q-scrollarea" + (d.value === !0 ? " q-scrollarea--dark" : "")
      );
    (i.vertical.percentage = v(() => {
      const f = i.vertical.size.value - u.vertical.value;
      if (f <= 0) return 0;
      const p = U(i.vertical.position.value / f, 0, 1);
      return Math.round(p * 1e4) / 1e4;
    })),
      (i.vertical.thumbHidden = v(
        () =>
          ((e.visible === null ? a.value : e.visible) !== !0 &&
            r.value === !1 &&
            t.value === !1) ||
          i.vertical.size.value <= u.vertical.value + 1
      )),
      (i.vertical.thumbStart = v(
        () =>
          i.vertical.percentage.value *
          (u.vertical.value - i.vertical.thumbSize.value)
      )),
      (i.vertical.thumbSize = v(() =>
        Math.round(
          U(
            (u.vertical.value * u.vertical.value) / i.vertical.size.value,
            lt(u.vertical.value),
            u.vertical.value
          )
        )
      )),
      (i.vertical.style = v(() => ({
        ...e.thumbStyle,
        ...e.verticalThumbStyle,
        top: `${i.vertical.thumbStart.value}px`,
        height: `${i.vertical.thumbSize.value}px`,
      }))),
      (i.vertical.thumbClass = v(
        () =>
          "q-scrollarea__thumb q-scrollarea__thumb--v absolute-right" +
          (i.vertical.thumbHidden.value === !0
            ? " q-scrollarea__thumb--invisible"
            : "")
      )),
      (i.vertical.barClass = v(
        () =>
          "q-scrollarea__bar q-scrollarea__bar--v absolute-right" +
          (i.vertical.thumbHidden.value === !0
            ? " q-scrollarea__bar--invisible"
            : "")
      )),
      (i.horizontal.percentage = v(() => {
        const f = i.horizontal.size.value - u.horizontal.value;
        if (f <= 0) return 0;
        const p = U(Math.abs(i.horizontal.position.value) / f, 0, 1);
        return Math.round(p * 1e4) / 1e4;
      })),
      (i.horizontal.thumbHidden = v(
        () =>
          ((e.visible === null ? a.value : e.visible) !== !0 &&
            r.value === !1 &&
            t.value === !1) ||
          i.horizontal.size.value <= u.horizontal.value + 1
      )),
      (i.horizontal.thumbStart = v(
        () =>
          i.horizontal.percentage.value *
          (u.horizontal.value - i.horizontal.thumbSize.value)
      )),
      (i.horizontal.thumbSize = v(() =>
        Math.round(
          U(
            (u.horizontal.value * u.horizontal.value) / i.horizontal.size.value,
            lt(u.horizontal.value),
            u.horizontal.value
          )
        )
      )),
      (i.horizontal.style = v(() => ({
        ...e.thumbStyle,
        ...e.horizontalThumbStyle,
        [s.$q.lang.rtl === !0
          ? "right"
          : "left"]: `${i.horizontal.thumbStart.value}px`,
        width: `${i.horizontal.thumbSize.value}px`,
      }))),
      (i.horizontal.thumbClass = v(
        () =>
          "q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom" +
          (i.horizontal.thumbHidden.value === !0
            ? " q-scrollarea__thumb--invisible"
            : "")
      )),
      (i.horizontal.barClass = v(
        () =>
          "q-scrollarea__bar q-scrollarea__bar--h absolute-bottom" +
          (i.horizontal.thumbHidden.value === !0
            ? " q-scrollarea__bar--invisible"
            : "")
      ));
    const g = v(() =>
        i.vertical.thumbHidden.value === !0 &&
        i.horizontal.thumbHidden.value === !0
          ? e.contentStyle
          : e.contentActiveStyle
      ),
      H = [
        [
          re,
          (f) => {
            F(f, "vertical");
          },
          void 0,
          { vertical: !0, ...ot },
        ],
      ],
      $ = [
        [
          re,
          (f) => {
            F(f, "horizontal");
          },
          void 0,
          { horizontal: !0, ...ot },
        ],
      ];
    function M() {
      const f = {};
      return (
        it.forEach((p) => {
          const C = i[p];
          (f[p + "Position"] = C.position.value),
            (f[p + "Percentage"] = C.percentage.value),
            (f[p + "Size"] = C.size.value),
            (f[p + "ContainerSize"] = u[p].value);
        }),
        f
      );
    }
    const y = Xt(() => {
      const f = M();
      (f.ref = s), o("scroll", f);
    }, 0);
    function x(f, p, C) {
      if (it.includes(f) === !1) {
        console.error(
          "[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)"
        );
        return;
      }
      (f === "vertical" ? Ze : xe)(b.value, p, C);
    }
    function S({ height: f, width: p }) {
      let C = !1;
      u.vertical.value !== f && ((u.vertical.value = f), (C = !0)),
        u.horizontal.value !== p && ((u.horizontal.value = p), (C = !0)),
        C === !0 && Q();
    }
    function q({ position: f }) {
      let p = !1;
      i.vertical.position.value !== f.top &&
        ((i.vertical.position.value = f.top), (p = !0)),
        i.horizontal.position.value !== f.left &&
          ((i.horizontal.position.value = f.left), (p = !0)),
        p === !0 && Q();
    }
    function Y({ height: f, width: p }) {
      i.horizontal.size.value !== p && ((i.horizontal.size.value = p), Q()),
        i.vertical.size.value !== f && ((i.vertical.size.value = f), Q());
    }
    function F(f, p) {
      const C = i[p];
      if (f.isFirst === !0) {
        if (C.thumbHidden.value === !0) return;
        (h = C.position.value), (t.value = !0);
      } else if (t.value !== !0) return;
      f.isFinal === !0 && (t.value = !1);
      const j = He[p],
        ee = u[p].value,
        we = (C.size.value - ee) / (ee - C.thumbSize.value),
        se = f.distance[j.dist],
        De = h + (f.direction === j.dir ? 1 : -1) * se * we;
      te(De, p);
    }
    function w(f, p) {
      const C = i[p];
      if (C.thumbHidden.value !== !0) {
        const j = f[He[p].offset];
        if (
          j < C.thumbStart.value ||
          j > C.thumbStart.value + C.thumbSize.value
        ) {
          const ee = j - C.thumbSize.value / 2;
          te((ee / u[p].value) * C.size.value, p);
        }
        C.ref.value !== null &&
          C.ref.value.dispatchEvent(new MouseEvent(f.type, f));
      }
    }
    function E(f) {
      w(f, "vertical");
    }
    function L(f) {
      w(f, "horizontal");
    }
    function Q() {
      (r.value = !0),
        l !== null && clearTimeout(l),
        (l = setTimeout(() => {
          (l = null), (r.value = !1);
        }, e.delay)),
        e.onScroll !== void 0 && y();
    }
    function te(f, p) {
      b.value[He[p].scroll] = f;
    }
    let A = null;
    function ne() {
      A !== null && clearTimeout(A),
        (A = setTimeout(
          () => {
            (A = null), (a.value = !0);
          },
          s.$q.platform.is.ios ? 50 : 0
        ));
    }
    function ue() {
      A !== null && (clearTimeout(A), (A = null)), (a.value = !1);
    }
    let N = null;
    return (
      T(
        () => s.$q.lang.rtl,
        (f) => {
          b.value !== null &&
            xe(
              b.value,
              Math.abs(i.horizontal.position.value) * (f === !0 ? -1 : 1)
            );
        }
      ),
      Ut(() => {
        N = {
          top: i.vertical.position.value,
          left: i.horizontal.position.value,
        };
      }),
      Kt(() => {
        if (N === null) return;
        const f = b.value;
        f !== null && (xe(f, N.left), Ze(f, N.top));
      }),
      J(y.cancel),
      Object.assign(s, {
        getScrollTarget: () => b.value,
        getScroll: M,
        getScrollPosition: () => ({
          top: i.vertical.position.value,
          left: i.horizontal.position.value,
        }),
        getScrollPercentage: () => ({
          top: i.vertical.percentage.value,
          left: i.horizontal.percentage.value,
        }),
        setScrollPosition: x,
        setScrollPercentage(f, p, C) {
          x(
            f,
            p *
              (i[f].size.value - u[f].value) *
              (f === "horizontal" && s.$q.lang.rtl === !0 ? -1 : 1),
            C
          );
        },
      }),
      () =>
        D("div", { class: m.value, onMouseenter: ne, onMouseleave: ue }, [
          D(
            "div",
            {
              ref: b,
              class:
                "q-scrollarea__container scroll relative-position fit hide-scrollbar",
              tabindex: e.tabindex !== void 0 ? e.tabindex : void 0,
            },
            [
              D(
                "div",
                { class: "q-scrollarea__content absolute", style: g.value },
                yt(n.default, [D(le, { debounce: 0, onResize: Y })])
              ),
              D(Dt, { axis: "both", onScroll: q }),
            ]
          ),
          D(le, { debounce: 0, onResize: S }),
          D("div", {
            class: i.vertical.barClass.value,
            style: [e.barStyle, e.verticalBarStyle],
            "aria-hidden": "true",
            onMousedown: E,
          }),
          D("div", {
            class: i.horizontal.barClass.value,
            style: [e.barStyle, e.horizontalBarStyle],
            "aria-hidden": "true",
            onMousedown: L,
          }),
          oe(
            D("div", {
              ref: i.vertical.ref,
              class: i.vertical.thumbClass.value,
              style: i.vertical.style.value,
              "aria-hidden": "true",
            }),
            H
          ),
          oe(
            D("div", {
              ref: i.horizontal.ref,
              class: i.horizontal.thumbClass.value,
              style: i.horizontal.style.value,
              "aria-hidden": "true",
            }),
            $
          ),
        ])
    );
  },
});
const ut = 150;
var qn = W({
    name: "QDrawer",
    inheritAttrs: !1,
    props: {
      ...Jt,
      ...mt,
      side: {
        type: String,
        default: "left",
        validator: (e) => ["left", "right"].includes(e),
      },
      width: { type: Number, default: 300 },
      mini: Boolean,
      miniToOverlay: Boolean,
      miniWidth: { type: Number, default: 57 },
      noMiniAnimation: Boolean,
      breakpoint: { type: Number, default: 1023 },
      showIfAbove: Boolean,
      behavior: {
        type: String,
        validator: (e) => ["default", "desktop", "mobile"].includes(e),
        default: "default",
      },
      bordered: Boolean,
      elevated: Boolean,
      overlay: Boolean,
      persistent: Boolean,
      noSwipeOpen: Boolean,
      noSwipeClose: Boolean,
      noSwipeBackdrop: Boolean,
    },
    emits: [...Gt, "onLayout", "miniState"],
    setup(e, { slots: n, emit: o, attrs: r }) {
      const t = G(),
        {
          proxy: { $q: a },
        } = t,
        u = gt(e, a),
        { preventBodyScroll: i } = an(),
        { registerTimeout: s, removeTimeout: d } = en(),
        l = Qe(Se, V);
      if (l === V)
        return console.error("QDrawer needs to be child of QLayout"), V;
      let h,
        b = null,
        m;
      const g = _(
          e.behavior === "mobile" ||
            (e.behavior !== "desktop" && l.totalWidth.value <= e.breakpoint)
        ),
        H = v(() => e.mini === !0 && g.value !== !0),
        $ = v(() => (H.value === !0 ? e.miniWidth : e.width)),
        M = _(
          e.showIfAbove === !0 && g.value === !1 ? !0 : e.modelValue === !0
        ),
        y = v(() => e.persistent !== !0 && (g.value === !0 || j.value === !0));
      function x(c, z) {
        if ((F(), c !== !1 && l.animate(), I(0), g.value === !0)) {
          const B = l.instances[N.value];
          B !== void 0 && B.belowBreakpoint === !0 && B.hide(!1),
            Z(1),
            l.isContainer.value !== !0 && i(!0);
        } else Z(0), c !== !1 && ze(!1);
        s(() => {
          c !== !1 && ze(!0), z !== !0 && o("show", c);
        }, ut);
      }
      function S(c, z) {
        w(),
          c !== !1 && l.animate(),
          Z(0),
          I(Q.value * $.value),
          _e(),
          z !== !0
            ? s(() => {
                o("hide", c);
              }, ut)
            : d();
      }
      const { show: q, hide: Y } = tn({
          showing: M,
          hideOnRouteChange: y,
          handleShow: x,
          handleHide: S,
        }),
        { addToHistory: F, removeFromHistory: w } = nn(M, Y, y),
        E = { belowBreakpoint: g, hide: Y },
        L = v(() => e.side === "right"),
        Q = v(() => (a.lang.rtl === !0 ? -1 : 1) * (L.value === !0 ? 1 : -1)),
        te = _(0),
        A = _(!1),
        ne = _(!1),
        ue = _($.value * Q.value),
        N = v(() => (L.value === !0 ? "left" : "right")),
        f = v(() =>
          M.value === !0 && g.value === !1 && e.overlay === !1
            ? e.miniToOverlay === !0
              ? e.miniWidth
              : $.value
            : 0
        ),
        p = v(
          () =>
            e.overlay === !0 ||
            e.miniToOverlay === !0 ||
            l.view.value.indexOf(L.value ? "R" : "L") > -1 ||
            (a.platform.is.ios === !0 && l.isContainer.value === !0)
        ),
        C = v(() => e.overlay === !1 && M.value === !0 && g.value === !1),
        j = v(() => e.overlay === !0 && M.value === !0 && g.value === !1),
        ee = v(
          () =>
            "fullscreen q-drawer__backdrop" +
            (M.value === !1 && A.value === !1 ? " hidden" : "")
        ),
        we = v(() => ({ backgroundColor: `rgba(0,0,0,${te.value * 0.4})` })),
        se = v(() =>
          L.value === !0
            ? l.rows.value.top[2] === "r"
            : l.rows.value.top[0] === "l"
        ),
        De = v(() =>
          L.value === !0
            ? l.rows.value.bottom[2] === "r"
            : l.rows.value.bottom[0] === "l"
        ),
        $t = v(() => {
          const c = {};
          return (
            l.header.space === !0 &&
              se.value === !1 &&
              (p.value === !0
                ? (c.top = `${l.header.offset}px`)
                : l.header.space === !0 && (c.top = `${l.header.size}px`)),
            l.footer.space === !0 &&
              De.value === !1 &&
              (p.value === !0
                ? (c.bottom = `${l.footer.offset}px`)
                : l.footer.space === !0 && (c.bottom = `${l.footer.size}px`)),
            c
          );
        }),
        xt = v(() => {
          const c = {
            width: `${$.value}px`,
            transform: `translateX(${ue.value}px)`,
          };
          return g.value === !0 ? c : Object.assign(c, $t.value);
        }),
        Ot = v(
          () =>
            "q-drawer__content fit " +
            (l.isContainer.value !== !0 ? "scroll" : "overflow-auto")
        ),
        Yt = v(
          () =>
            `q-drawer q-drawer--${e.side}` +
            (ne.value === !0 ? " q-drawer--mini-animate" : "") +
            (e.bordered === !0 ? " q-drawer--bordered" : "") +
            (u.value === !0 ? " q-drawer--dark q-dark" : "") +
            (A.value === !0
              ? " no-transition"
              : M.value === !0
              ? ""
              : " q-layout--prevent-focus") +
            (g.value === !0
              ? " fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding"
              : ` q-drawer--${H.value === !0 ? "mini" : "standard"}` +
                (p.value === !0 || C.value !== !0 ? " fixed" : "") +
                (e.overlay === !0 || e.miniToOverlay === !0
                  ? " q-drawer--on-top"
                  : "") +
                (se.value === !0 ? " q-drawer--top-padding" : ""))
        ),
        Ht = v(() => {
          const c = a.lang.rtl === !0 ? e.side : N.value;
          return [[re, Et, void 0, { [c]: !0, mouse: !0 }]];
        }),
        kt = v(() => {
          const c = a.lang.rtl === !0 ? N.value : e.side;
          return [[re, Ve, void 0, { [c]: !0, mouse: !0 }]];
        }),
        Lt = v(() => {
          const c = a.lang.rtl === !0 ? N.value : e.side;
          return [[re, Ve, void 0, { [c]: !0, mouse: !0, mouseAllDir: !0 }]];
        });
      function Me() {
        At(
          g,
          e.behavior === "mobile" ||
            (e.behavior !== "desktop" && l.totalWidth.value <= e.breakpoint)
        );
      }
      T(g, (c) => {
        c === !0
          ? ((h = M.value), M.value === !0 && Y(!1))
          : e.overlay === !1 &&
            e.behavior !== "mobile" &&
            h !== !1 &&
            (M.value === !0 ? (I(0), Z(0), _e()) : q(!1));
      }),
        T(
          () => e.side,
          (c, z) => {
            l.instances[z] === E &&
              ((l.instances[z] = void 0), (l[z].space = !1), (l[z].offset = 0)),
              (l.instances[c] = E),
              (l[c].size = $.value),
              (l[c].space = C.value),
              (l[c].offset = f.value);
          }
        ),
        T(l.totalWidth, () => {
          (l.isContainer.value === !0 || document.qScrollPrevented !== !0) &&
            Me();
        }),
        T(() => e.behavior + e.breakpoint, Me),
        T(l.isContainer, (c) => {
          M.value === !0 && i(c !== !0), c === !0 && Me();
        }),
        T(l.scrollbarWidth, () => {
          I(M.value === !0 ? 0 : void 0);
        }),
        T(f, (c) => {
          X("offset", c);
        }),
        T(C, (c) => {
          o("onLayout", c), X("space", c);
        }),
        T(L, () => {
          I();
        }),
        T($, (c) => {
          I(), Ce(e.miniToOverlay, c);
        }),
        T(
          () => e.miniToOverlay,
          (c) => {
            Ce(c, $.value);
          }
        ),
        T(
          () => a.lang.rtl,
          () => {
            I();
          }
        ),
        T(
          () => e.mini,
          () => {
            e.noMiniAnimation || (e.modelValue === !0 && (Pt(), l.animate()));
          }
        ),
        T(H, (c) => {
          o("miniState", c);
        });
      function I(c) {
        c === void 0
          ? be(() => {
              (c = M.value === !0 ? 0 : $.value), I(Q.value * c);
            })
          : (l.isContainer.value === !0 &&
              L.value === !0 &&
              (g.value === !0 || Math.abs(c) === $.value) &&
              (c += Q.value * l.scrollbarWidth.value),
            (ue.value = c));
      }
      function Z(c) {
        te.value = c;
      }
      function ze(c) {
        const z = c === !0 ? "remove" : l.isContainer.value !== !0 ? "add" : "";
        z !== "" && document.body.classList[z]("q-body--drawer-toggle");
      }
      function Pt() {
        b !== null && clearTimeout(b),
          t.proxy &&
            t.proxy.$el &&
            t.proxy.$el.classList.add("q-drawer--mini-animate"),
          (ne.value = !0),
          (b = setTimeout(() => {
            (b = null),
              (ne.value = !1),
              t &&
                t.proxy &&
                t.proxy.$el &&
                t.proxy.$el.classList.remove("q-drawer--mini-animate");
          }, 150));
      }
      function Et(c) {
        if (M.value !== !1) return;
        const z = $.value,
          B = U(c.distance.x, 0, z);
        if (c.isFinal === !0) {
          B >= Math.min(75, z) === !0
            ? q()
            : (l.animate(), Z(0), I(Q.value * z)),
            (A.value = !1);
          return;
        }
        I(
          (a.lang.rtl === !0 ? L.value !== !0 : L.value)
            ? Math.max(z - B, 0)
            : Math.min(0, B - z)
        ),
          Z(U(B / z, 0, 1)),
          c.isFirst === !0 && (A.value = !0);
      }
      function Ve(c) {
        if (M.value !== !0) return;
        const z = $.value,
          B = c.direction === e.side,
          ce = (a.lang.rtl === !0 ? B !== !0 : B) ? U(c.distance.x, 0, z) : 0;
        if (c.isFinal === !0) {
          Math.abs(ce) < Math.min(75, z) === !0
            ? (l.animate(), Z(1), I(0))
            : Y(),
            (A.value = !1);
          return;
        }
        I(Q.value * ce),
          Z(U(1 - ce / z, 0, 1)),
          c.isFirst === !0 && (A.value = !0);
      }
      function _e() {
        i(!1), ze(!0);
      }
      function X(c, z) {
        l.update(e.side, c, z);
      }
      function At(c, z) {
        c.value !== z && (c.value = z);
      }
      function Ce(c, z) {
        X("size", c === !0 ? e.miniWidth : z);
      }
      return (
        (l.instances[e.side] = E),
        Ce(e.miniToOverlay, $.value),
        X("space", C.value),
        X("offset", f.value),
        e.showIfAbove === !0 &&
          e.modelValue !== !0 &&
          M.value === !0 &&
          e["onUpdate:modelValue"] !== void 0 &&
          o("update:modelValue", !0),
        ie(() => {
          o("onLayout", C.value),
            o("miniState", H.value),
            (h = e.showIfAbove === !0);
          const c = () => {
            (M.value === !0 ? x : S)(!1, !0);
          };
          if (l.totalWidth.value !== 0) {
            be(c);
            return;
          }
          m = T(l.totalWidth, () => {
            m(),
              (m = void 0),
              M.value === !1 && e.showIfAbove === !0 && g.value === !1
                ? q(!1)
                : c();
          });
        }),
        J(() => {
          m !== void 0 && m(),
            b !== null && (clearTimeout(b), (b = null)),
            M.value === !0 && _e(),
            l.instances[e.side] === E &&
              ((l.instances[e.side] = void 0),
              X("size", 0),
              X("offset", 0),
              X("space", !1));
        }),
        () => {
          const c = [];
          g.value === !0 &&
            (e.noSwipeOpen === !1 &&
              c.push(
                oe(
                  D("div", {
                    key: "open",
                    class: `q-drawer__opener fixed-${e.side}`,
                    "aria-hidden": "true",
                  }),
                  Ht.value
                )
              ),
            c.push(
              Xe(
                "div",
                {
                  ref: "backdrop",
                  class: ee.value,
                  style: we.value,
                  "aria-hidden": "true",
                  onClick: Y,
                },
                void 0,
                "backdrop",
                e.noSwipeBackdrop !== !0 && M.value === !0,
                () => Lt.value
              )
            ));
          const z = H.value === !0 && n.mini !== void 0,
            B = [
              D(
                "div",
                { ...r, key: "" + z, class: [Ot.value, r.class] },
                z === !0 ? n.mini() : pe(n.default)
              ),
            ];
          return (
            e.elevated === !0 &&
              M.value === !0 &&
              B.push(
                D("div", {
                  class:
                    "q-layout__shadow absolute-full overflow-hidden no-pointer-events",
                })
              ),
            c.push(
              Xe(
                "aside",
                { ref: "content", class: Yt.value, style: xt.value },
                B,
                "contentclose",
                e.noSwipeClose !== !0 && g.value === !0,
                () => kt.value
              )
            ),
            D("div", { class: "q-drawer-container" }, c)
          );
        }
      );
    },
  }),
  $n = W({
    name: "QPageContainer",
    setup(e, { slots: n }) {
      const {
          proxy: { $q: o },
        } = G(),
        r = Qe(Se, V);
      if (r === V)
        return console.error("QPageContainer needs to be child of QLayout"), V;
      bt(rn, !0);
      const t = v(() => {
        const a = {};
        return (
          r.header.space === !0 && (a.paddingTop = `${r.header.size}px`),
          r.right.space === !0 &&
            (a[
              `padding${o.lang.rtl === !0 ? "Left" : "Right"}`
            ] = `${r.right.size}px`),
          r.footer.space === !0 && (a.paddingBottom = `${r.footer.size}px`),
          r.left.space === !0 &&
            (a[
              `padding${o.lang.rtl === !0 ? "Right" : "Left"}`
            ] = `${r.left.size}px`),
          a
        );
      });
      return () =>
        D("div", { class: "q-page-container", style: t.value }, pe(n.default));
    },
  }),
  xn = W({
    name: "QLayout",
    props: {
      container: Boolean,
      view: {
        type: String,
        default: "hhh lpr fff",
        validator: (e) => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase()),
      },
      onScroll: Function,
      onScrollHeight: Function,
      onResize: Function,
    },
    setup(e, { slots: n, emit: o }) {
      const {
          proxy: { $q: r },
        } = G(),
        t = _(null),
        a = _(r.screen.height),
        u = _(e.container === !0 ? 0 : r.screen.width),
        i = _({ position: 0, direction: "down", inflectionPoint: 0 }),
        s = _(0),
        d = _(ht.value === !0 ? 0 : Oe()),
        l = v(
          () =>
            "q-layout q-layout--" +
            (e.container === !0 ? "containerized" : "standard")
        ),
        h = v(() =>
          e.container === !1 ? { minHeight: r.screen.height + "px" } : null
        ),
        b = v(() =>
          d.value !== 0
            ? { [r.lang.rtl === !0 ? "left" : "right"]: `${d.value}px` }
            : null
        ),
        m = v(() =>
          d.value !== 0
            ? {
                [r.lang.rtl === !0 ? "right" : "left"]: 0,
                [r.lang.rtl === !0 ? "left" : "right"]: `-${d.value}px`,
                width: `calc(100% + ${d.value}px)`,
              }
            : null
        );
      function g(S) {
        if (e.container === !0 || document.qScrollPrevented !== !0) {
          const q = {
            position: S.position.top,
            direction: S.direction,
            directionChanged: S.directionChanged,
            inflectionPoint: S.inflectionPoint.top,
            delta: S.delta.top,
          };
          (i.value = q), e.onScroll !== void 0 && o("scroll", q);
        }
      }
      function H(S) {
        const { height: q, width: Y } = S;
        let F = !1;
        a.value !== q &&
          ((F = !0),
          (a.value = q),
          e.onScrollHeight !== void 0 && o("scrollHeight", q),
          M()),
          u.value !== Y && ((F = !0), (u.value = Y)),
          F === !0 && e.onResize !== void 0 && o("resize", S);
      }
      function $({ height: S }) {
        s.value !== S && ((s.value = S), M());
      }
      function M() {
        if (e.container === !0) {
          const S = a.value > s.value ? Oe() : 0;
          d.value !== S && (d.value = S);
        }
      }
      let y = null;
      const x = {
        instances: {},
        view: v(() => e.view),
        isContainer: v(() => e.container),
        rootRef: t,
        height: a,
        containerHeight: s,
        scrollbarWidth: d,
        totalWidth: v(() => u.value + d.value),
        rows: v(() => {
          const S = e.view.toLowerCase().split(" ");
          return {
            top: S[0].split(""),
            middle: S[1].split(""),
            bottom: S[2].split(""),
          };
        }),
        header: fe({ size: 0, offset: 0, space: !1 }),
        right: fe({ size: 300, offset: 0, space: !1 }),
        footer: fe({ size: 0, offset: 0, space: !1 }),
        left: fe({ size: 300, offset: 0, space: !1 }),
        scroll: i,
        animate() {
          y !== null
            ? clearTimeout(y)
            : document.body.classList.add("q-body--layout-animate"),
            (y = setTimeout(() => {
              (y = null),
                document.body.classList.remove("q-body--layout-animate");
            }, 155));
        },
        update(S, q, Y) {
          x[S][q] = Y;
        },
      };
      if ((bt(Se, x), Oe() > 0)) {
        let Y = function () {
            (S = null), q.classList.remove("hide-scrollbar");
          },
          F = function () {
            if (S === null) {
              if (q.scrollHeight > r.screen.height) return;
              q.classList.add("hide-scrollbar");
            } else clearTimeout(S);
            S = setTimeout(Y, 300);
          },
          w = function (E) {
            S !== null && E === "remove" && (clearTimeout(S), Y()),
              window[`${E}EventListener`]("resize", F);
          },
          S = null;
        const q = document.body;
        T(() => (e.container !== !0 ? "add" : "remove"), w),
          e.container !== !0 && w("add"),
          on(() => {
            w("remove");
          });
      }
      return () => {
        const S = yt(n.default, [
            D(Dt, { onScroll: g }),
            D(le, { onResize: H }),
          ]),
          q = D(
            "div",
            {
              class: l.value,
              style: h.value,
              ref: e.container === !0 ? void 0 : t,
              tabindex: -1,
            },
            S
          );
        return e.container === !0
          ? D("div", { class: "q-layout-container overflow-hidden", ref: t }, [
              D(le, { onResize: $ }),
              D("div", { class: "absolute-full", style: b.value }, [
                D("div", { class: "scroll", style: m.value }, [q]),
              ]),
            ])
          : q;
      };
    },
  });
const ge = [
  -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192,
  2262, 2324, 2394, 2456, 3178,
];
function On(e) {
  return Hn(e) === 0;
}
function Yn(e, n) {
  return n <= 6 ? 31 : n <= 11 || On(e) ? 30 : 29;
}
function Hn(e) {
  const n = ge.length;
  let o = ge[0],
    r,
    t,
    a,
    u,
    i;
  if (e < o || e >= ge[n - 1]) throw new Error("Invalid Jalaali year " + e);
  for (i = 1; i < n && ((r = ge[i]), (t = r - o), !(e < r)); i += 1) o = r;
  return (
    (u = e - o),
    t - u < 6 && (u = u - t + kn(t + 4, 33) * 33),
    (a = st(st(u + 1, 33) - 1, 4)),
    a === -1 && (a = 4),
    a
  );
}
function kn(e, n) {
  return ~~(e / n);
}
function st(e, n) {
  return e - ~~(e / n) * n;
}
const Mt = 864e5,
  Ln = 36e5,
  Ae = 6e4,
  zt = "YYYY-MM-DDTHH:mm:ss.SSSZ",
  Pn =
    /\[((?:[^\]\\]|\\]|\\)*)\]|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]/g,
  En =
    /(\[[^\]]*\])|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]|([.*+:?^,\s${}()|\\]+)/g,
  ke = {};
function An(e, n) {
  const o = "(" + n.days.join("|") + ")",
    r = e + o;
  if (ke[r] !== void 0) return ke[r];
  const t = "(" + n.daysShort.join("|") + ")",
    a = "(" + n.months.join("|") + ")",
    u = "(" + n.monthsShort.join("|") + ")",
    i = {};
  let s = 0;
  const d = e.replace(En, (h) => {
      switch ((s++, h)) {
        case "YY":
          return (i.YY = s), "(-?\\d{1,2})";
        case "YYYY":
          return (i.YYYY = s), "(-?\\d{1,4})";
        case "M":
          return (i.M = s), "(\\d{1,2})";
        case "MM":
          return (i.M = s), "(\\d{2})";
        case "MMM":
          return (i.MMM = s), u;
        case "MMMM":
          return (i.MMMM = s), a;
        case "D":
          return (i.D = s), "(\\d{1,2})";
        case "Do":
          return (i.D = s++), "(\\d{1,2}(st|nd|rd|th))";
        case "DD":
          return (i.D = s), "(\\d{2})";
        case "H":
          return (i.H = s), "(\\d{1,2})";
        case "HH":
          return (i.H = s), "(\\d{2})";
        case "h":
          return (i.h = s), "(\\d{1,2})";
        case "hh":
          return (i.h = s), "(\\d{2})";
        case "m":
          return (i.m = s), "(\\d{1,2})";
        case "mm":
          return (i.m = s), "(\\d{2})";
        case "s":
          return (i.s = s), "(\\d{1,2})";
        case "ss":
          return (i.s = s), "(\\d{2})";
        case "S":
          return (i.S = s), "(\\d{1})";
        case "SS":
          return (i.S = s), "(\\d{2})";
        case "SSS":
          return (i.S = s), "(\\d{3})";
        case "A":
          return (i.A = s), "(AM|PM)";
        case "a":
          return (i.a = s), "(am|pm)";
        case "aa":
          return (i.aa = s), "(a\\.m\\.|p\\.m\\.)";
        case "ddd":
          return t;
        case "dddd":
          return o;
        case "Q":
        case "d":
        case "E":
          return "(\\d{1})";
        case "Qo":
          return "(1st|2nd|3rd|4th)";
        case "DDD":
        case "DDDD":
          return "(\\d{1,3})";
        case "w":
          return "(\\d{1,2})";
        case "ww":
          return "(\\d{2})";
        case "Z":
          return (i.Z = s), "(Z|[+-]\\d{2}:\\d{2})";
        case "ZZ":
          return (i.ZZ = s), "(Z|[+-]\\d{2}\\d{2})";
        case "X":
          return (i.X = s), "(-?\\d+)";
        case "x":
          return (i.x = s), "(-?\\d{4,})";
        default:
          return (
            s--,
            h[0] === "[" && (h = h.substring(1, h.length - 1)),
            h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
          );
      }
    }),
    l = { map: i, regex: new RegExp("^" + d) };
  return (ke[r] = l), l;
}
function _t(e, n) {
  return e !== void 0 ? e : n !== void 0 ? n.date : ln.date;
}
function ct(e, n = "") {
  const o = e > 0 ? "-" : "+",
    r = Math.abs(e),
    t = Math.floor(r / 60),
    a = r % 60;
  return o + O(t) + n + O(a);
}
function Bn(e, n, o) {
  let r = e.getFullYear(),
    t = e.getMonth();
  const a = e.getDate();
  return (
    n.year !== void 0 && ((r += o * n.year), delete n.year),
    n.month !== void 0 && ((t += o * n.month), delete n.month),
    e.setDate(1),
    e.setMonth(2),
    e.setFullYear(r),
    e.setMonth(t),
    e.setDate(Math.min(a, je(e))),
    n.date !== void 0 && (e.setDate(e.getDate() + o * n.date), delete n.date),
    e
  );
}
function Fn(e, n, o) {
  const r = n.year !== void 0 ? n.year : e[`get${o}FullYear`](),
    t = n.month !== void 0 ? n.month - 1 : e[`get${o}Month`](),
    a = new Date(r, t + 1, 0).getDate(),
    u = Math.min(a, n.date !== void 0 ? n.date : e[`get${o}Date`]());
  return (
    e[`set${o}Date`](1),
    e[`set${o}Month`](2),
    e[`set${o}FullYear`](r),
    e[`set${o}Month`](t),
    e[`set${o}Date`](u),
    delete n.year,
    delete n.month,
    delete n.date,
    e
  );
}
function Ne(e, n, o) {
  const r = Ct(n),
    t = new Date(e),
    a =
      r.year !== void 0 || r.month !== void 0 || r.date !== void 0
        ? Bn(t, r, o)
        : t;
  for (const u in r) {
    const i = Cn(u);
    a[`set${i}`](a[`get${i}`]() + o * r[u]);
  }
  return a;
}
function Ct(e) {
  const n = { ...e };
  return (
    e.years !== void 0 && ((n.year = e.years), delete n.years),
    e.months !== void 0 && ((n.month = e.months), delete n.months),
    e.days !== void 0 && ((n.date = e.days), delete n.days),
    e.day !== void 0 && ((n.date = e.day), delete n.day),
    e.hour !== void 0 && ((n.hours = e.hour), delete n.hour),
    e.minute !== void 0 && ((n.minutes = e.minute), delete n.minute),
    e.second !== void 0 && ((n.seconds = e.second), delete n.second),
    e.millisecond !== void 0 &&
      ((n.milliseconds = e.millisecond), delete n.millisecond),
    n
  );
}
function Tt(e, n, o) {
  const r = Ct(n),
    t = o === !0 ? "UTC" : "",
    a = new Date(e),
    u =
      r.year !== void 0 || r.month !== void 0 || r.date !== void 0
        ? Fn(a, r, t)
        : a;
  for (const i in r) {
    const s = i.charAt(0).toUpperCase() + i.slice(1);
    u[`set${t}${s}`](r[i]);
  }
  return u;
}
function In(e, n, o) {
  const r = Qn(e, n, o),
    t = new Date(
      r.year,
      r.month === null ? null : r.month - 1,
      r.day === null ? 1 : r.day,
      r.hour,
      r.minute,
      r.second,
      r.millisecond
    ),
    a = t.getTimezoneOffset();
  return r.timezoneOffset === null || r.timezoneOffset === a
    ? t
    : Ne(t, { minutes: r.timezoneOffset - a }, 1);
}
function Qn(e, n, o, r, t) {
  const a = {
    year: null,
    month: null,
    day: null,
    hour: null,
    minute: null,
    second: null,
    millisecond: null,
    timezoneOffset: null,
    dateHash: null,
    timeHash: null,
  };
  if (
    (t !== void 0 && Object.assign(a, t),
    e == null || e === "" || typeof e != "string")
  )
    return a;
  n === void 0 && (n = zt);
  const u = _t(o, pt.props),
    i = u.months,
    s = u.monthsShort,
    { regex: d, map: l } = An(n, u),
    h = e.match(d);
  if (h === null) return a;
  let b = "";
  if (l.X !== void 0 || l.x !== void 0) {
    const m = parseInt(h[l.X !== void 0 ? l.X : l.x], 10);
    if (isNaN(m) === !0 || m < 0) return a;
    const g = new Date(m * (l.X !== void 0 ? 1e3 : 1));
    (a.year = g.getFullYear()),
      (a.month = g.getMonth() + 1),
      (a.day = g.getDate()),
      (a.hour = g.getHours()),
      (a.minute = g.getMinutes()),
      (a.second = g.getSeconds()),
      (a.millisecond = g.getMilliseconds());
  } else {
    if (l.YYYY !== void 0) a.year = parseInt(h[l.YYYY], 10);
    else if (l.YY !== void 0) {
      const m = parseInt(h[l.YY], 10);
      a.year = m < 0 ? m : 2e3 + m;
    }
    if (l.M !== void 0) {
      if (((a.month = parseInt(h[l.M], 10)), a.month < 1 || a.month > 12))
        return a;
    } else
      l.MMM !== void 0
        ? (a.month = s.indexOf(h[l.MMM]) + 1)
        : l.MMMM !== void 0 && (a.month = i.indexOf(h[l.MMMM]) + 1);
    if (l.D !== void 0) {
      if (
        ((a.day = parseInt(h[l.D], 10)),
        a.year === null || a.month === null || a.day < 1)
      )
        return a;
      const m =
        r !== "persian"
          ? new Date(a.year, a.month, 0).getDate()
          : Yn(a.year, a.month);
      if (a.day > m) return a;
    }
    l.H !== void 0
      ? (a.hour = parseInt(h[l.H], 10) % 24)
      : l.h !== void 0 &&
        ((a.hour = parseInt(h[l.h], 10) % 12),
        ((l.A && h[l.A] === "PM") ||
          (l.a && h[l.a] === "pm") ||
          (l.aa && h[l.aa] === "p.m.")) &&
          (a.hour += 12),
        (a.hour = a.hour % 24)),
      l.m !== void 0 && (a.minute = parseInt(h[l.m], 10) % 60),
      l.s !== void 0 && (a.second = parseInt(h[l.s], 10) % 60),
      l.S !== void 0 &&
        (a.millisecond = parseInt(h[l.S], 10) * 10 ** (3 - h[l.S].length)),
      (l.Z !== void 0 || l.ZZ !== void 0) &&
        ((b = l.Z !== void 0 ? h[l.Z].replace(":", "") : h[l.ZZ]),
        (a.timezoneOffset =
          (b[0] === "+" ? -1 : 1) * (60 * b.slice(1, 3) + 1 * b.slice(3, 5))));
  }
  return (
    (a.dateHash = O(a.year, 6) + "/" + O(a.month) + "/" + O(a.day)),
    (a.timeHash = O(a.hour) + ":" + O(a.minute) + ":" + O(a.second) + b),
    a
  );
}
function Rn(e) {
  return typeof e == "number" ? !0 : isNaN(Date.parse(e)) === !1;
}
function Nn(e, n) {
  return Tt(new Date(), e, n);
}
function jn(e) {
  const n = new Date(e).getDay();
  return n === 0 ? 7 : n;
}
function Be(e) {
  const n = new Date(e.getFullYear(), e.getMonth(), e.getDate());
  n.setDate(n.getDate() - ((n.getDay() + 6) % 7) + 3);
  const o = new Date(n.getFullYear(), 0, 4);
  o.setDate(o.getDate() - ((o.getDay() + 6) % 7) + 3);
  const r = n.getTimezoneOffset() - o.getTimezoneOffset();
  n.setHours(n.getHours() - r);
  const t = (n - o) / (Mt * 7);
  return 1 + Math.floor(t);
}
function Vn(e) {
  return e.getFullYear() * 1e4 + e.getMonth() * 100 + e.getDate();
}
function Le(e, n) {
  const o = new Date(e);
  return n === !0 ? Vn(o) : o.getTime();
}
function Wn(e, n, o, r = {}) {
  const t = Le(n, r.onlyDate),
    a = Le(o, r.onlyDate),
    u = Le(e, r.onlyDate);
  return (
    (u > t || (r.inclusiveFrom === !0 && u === t)) &&
    (u < a || (r.inclusiveTo === !0 && u === a))
  );
}
function Zn(e, n) {
  return Ne(e, n, 1);
}
function Xn(e, n) {
  return Ne(e, n, -1);
}
function R(e, n, o) {
  const r = new Date(e),
    t = `set${o === !0 ? "UTC" : ""}`;
  switch (n) {
    case "year":
    case "years":
      r[`${t}Month`](0);
    case "month":
    case "months":
      r[`${t}Date`](1);
    case "day":
    case "days":
    case "date":
      r[`${t}Hours`](0);
    case "hour":
    case "hours":
      r[`${t}Minutes`](0);
    case "minute":
    case "minutes":
      r[`${t}Seconds`](0);
    case "second":
    case "seconds":
      r[`${t}Milliseconds`](0);
  }
  return r;
}
function Un(e, n, o) {
  const r = new Date(e),
    t = `set${o === !0 ? "UTC" : ""}`;
  switch (n) {
    case "year":
    case "years":
      r[`${t}Month`](11);
    case "month":
    case "months":
      r[`${t}Date`](je(r));
    case "day":
    case "days":
    case "date":
      r[`${t}Hours`](23);
    case "hour":
    case "hours":
      r[`${t}Minutes`](59);
    case "minute":
    case "minutes":
      r[`${t}Seconds`](59);
    case "second":
    case "seconds":
      r[`${t}Milliseconds`](999);
  }
  return r;
}
function Kn(e) {
  let n = new Date(e);
  return (
    Array.prototype.slice.call(arguments, 1).forEach((o) => {
      n = Math.max(n, new Date(o));
    }),
    n
  );
}
function Jn(e) {
  let n = new Date(e);
  return (
    Array.prototype.slice.call(arguments, 1).forEach((o) => {
      n = Math.min(n, new Date(o));
    }),
    n
  );
}
function ye(e, n, o) {
  return (
    (e.getTime() -
      e.getTimezoneOffset() * Ae -
      (n.getTime() - n.getTimezoneOffset() * Ae)) /
    o
  );
}
function qt(e, n, o = "days") {
  const r = new Date(e),
    t = new Date(n);
  switch (o) {
    case "years":
    case "year":
      return r.getFullYear() - t.getFullYear();
    case "months":
    case "month":
      return (
        (r.getFullYear() - t.getFullYear()) * 12 + r.getMonth() - t.getMonth()
      );
    case "days":
    case "day":
    case "date":
      return ye(R(r, "day"), R(t, "day"), Mt);
    case "hours":
    case "hour":
      return ye(R(r, "hour"), R(t, "hour"), Ln);
    case "minutes":
    case "minute":
      return ye(R(r, "minute"), R(t, "minute"), Ae);
    case "seconds":
    case "second":
      return ye(R(r, "second"), R(t, "second"), 1e3);
  }
}
function Fe(e) {
  return qt(e, R(e, "year"), "days") + 1;
}
function Gn(e) {
  return St(e) === !0 ? "date" : typeof e == "number" ? "number" : "string";
}
function ea(e, n, o) {
  const r = new Date(e);
  if (n) {
    const t = new Date(n);
    if (r < t) return t;
  }
  if (o) {
    const t = new Date(o);
    if (r > t) return t;
  }
  return r;
}
function ta(e, n, o) {
  const r = new Date(e),
    t = new Date(n);
  if (o === void 0) return r.getTime() === t.getTime();
  switch (o) {
    case "second":
    case "seconds":
      if (r.getSeconds() !== t.getSeconds()) return !1;
    case "minute":
    case "minutes":
      if (r.getMinutes() !== t.getMinutes()) return !1;
    case "hour":
    case "hours":
      if (r.getHours() !== t.getHours()) return !1;
    case "day":
    case "days":
    case "date":
      if (r.getDate() !== t.getDate()) return !1;
    case "month":
    case "months":
      if (r.getMonth() !== t.getMonth()) return !1;
    case "year":
    case "years":
      if (r.getFullYear() !== t.getFullYear()) return !1;
      break;
    default:
      throw new Error(`date isSameDate unknown unit ${o}`);
  }
  return !0;
}
function je(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate();
}
function dt(e) {
  if (e >= 11 && e <= 13) return `${e}th`;
  switch (e % 10) {
    case 1:
      return `${e}st`;
    case 2:
      return `${e}nd`;
    case 3:
      return `${e}rd`;
  }
  return `${e}th`;
}
const ft = {
  YY(e, n, o) {
    const r = this.YYYY(e, n, o) % 100;
    return r >= 0 ? O(r) : "-" + O(Math.abs(r));
  },
  YYYY(e, n, o) {
    return o != null ? o : e.getFullYear();
  },
  M(e) {
    return e.getMonth() + 1;
  },
  MM(e) {
    return O(e.getMonth() + 1);
  },
  MMM(e, n) {
    return n.monthsShort[e.getMonth()];
  },
  MMMM(e, n) {
    return n.months[e.getMonth()];
  },
  Q(e) {
    return Math.ceil((e.getMonth() + 1) / 3);
  },
  Qo(e) {
    return dt(this.Q(e));
  },
  D(e) {
    return e.getDate();
  },
  Do(e) {
    return dt(e.getDate());
  },
  DD(e) {
    return O(e.getDate());
  },
  DDD(e) {
    return Fe(e);
  },
  DDDD(e) {
    return O(Fe(e), 3);
  },
  d(e) {
    return e.getDay();
  },
  dd(e, n) {
    return this.dddd(e, n).slice(0, 2);
  },
  ddd(e, n) {
    return n.daysShort[e.getDay()];
  },
  dddd(e, n) {
    return n.days[e.getDay()];
  },
  E(e) {
    return e.getDay() || 7;
  },
  w(e) {
    return Be(e);
  },
  ww(e) {
    return O(Be(e));
  },
  H(e) {
    return e.getHours();
  },
  HH(e) {
    return O(e.getHours());
  },
  h(e) {
    const n = e.getHours();
    return n === 0 ? 12 : n > 12 ? n % 12 : n;
  },
  hh(e) {
    return O(this.h(e));
  },
  m(e) {
    return e.getMinutes();
  },
  mm(e) {
    return O(e.getMinutes());
  },
  s(e) {
    return e.getSeconds();
  },
  ss(e) {
    return O(e.getSeconds());
  },
  S(e) {
    return Math.floor(e.getMilliseconds() / 100);
  },
  SS(e) {
    return O(Math.floor(e.getMilliseconds() / 10));
  },
  SSS(e) {
    return O(e.getMilliseconds(), 3);
  },
  A(e) {
    return this.H(e) < 12 ? "AM" : "PM";
  },
  a(e) {
    return this.H(e) < 12 ? "am" : "pm";
  },
  aa(e) {
    return this.H(e) < 12 ? "a.m." : "p.m.";
  },
  Z(e, n, o, r) {
    const t = r == null ? e.getTimezoneOffset() : r;
    return ct(t, ":");
  },
  ZZ(e, n, o, r) {
    const t = r == null ? e.getTimezoneOffset() : r;
    return ct(t);
  },
  X(e) {
    return Math.floor(e.getTime() / 1e3);
  },
  x(e) {
    return e.getTime();
  },
};
function na(e, n, o, r, t) {
  if ((e !== 0 && !e) || e === 1 / 0 || e === -1 / 0) return;
  const a = new Date(e);
  if (isNaN(a)) return;
  n === void 0 && (n = zt);
  const u = _t(o, pt.props);
  return n.replace(Pn, (i, s) =>
    i in ft ? ft[i](a, u, r, t) : s === void 0 ? i : s.split("\\]").join("]")
  );
}
function aa(e) {
  return St(e) === !0 ? new Date(e.getTime()) : e;
}
var ra = {
    isValid: Rn,
    extractDate: In,
    buildDate: Nn,
    getDayOfWeek: jn,
    getWeekOfYear: Be,
    isBetweenDates: Wn,
    addToDate: Zn,
    subtractFromDate: Xn,
    adjustDate: Tt,
    startOfDate: R,
    endOfDate: Un,
    getMaxDate: Kn,
    getMinDate: Jn,
    getDateDiff: qt,
    getDayOfYear: Fe,
    inferDateFormat: Gn,
    getDateBetween: ea,
    isSameDate: ta,
    daysInMonth: je,
    formatDate: na,
    clone: aa,
  },
  vt = "assets/mountains.781c71f1.jpg",
  ia = "assets/profile.fe6cc7cc.jpg";
const oa = {
    name: "MainLayout",
    data() {
      return { leftDrawerOpen: !1 };
    },
    computed: {
      todaysDate() {
        const e = Date.now();
        return ra.formatDate(e, "dddd D MMMM");
      },
    },
  },
  la = { class: "q-px-lg q-pt-xl q-mb-md" },
  ua = K("div", { class: "text-h3" }, "Todo", -1),
  sa = { class: "text-subtitle1" },
  ca = { class: "absolute-bottom bg-transparent" },
  da = K("img", { src: ia }, null, -1),
  fa = K("div", { class: "text-weight-bold" }, "Daniel Muench", -1),
  va = K("div", null, "@danielmuench", -1);
function ha(e, n, o, r, t, a) {
  const u = sn("router-view");
  return (
    ve(),
    he(
      xn,
      { view: "lHh Lpr lFf" },
      {
        default: P(() => [
          k(Sn, null, {
            default: P(() => [
              k(mn, null, {
                default: P(() => [
                  k(cn, {
                    flat: "",
                    dense: "",
                    round: "",
                    icon: "menu",
                    "aria-label": "Menu",
                    onClick:
                      n[0] ||
                      (n[0] = (i) => (t.leftDrawerOpen = !t.leftDrawerOpen)),
                  }),
                ]),
                _: 1,
              }),
              K("div", la, [ua, K("div", sa, dn(a.todaysDate), 1)]),
              k(et, { src: vt, class: "header-image absolute-top" }),
            ]),
            _: 1,
          }),
          k(
            qn,
            {
              modelValue: t.leftDrawerOpen,
              "onUpdate:modelValue":
                n[1] || (n[1] = (i) => (t.leftDrawerOpen = i)),
              "show-if-above": "",
              width: 250,
              breakpoint: 600,
            },
            {
              default: P(() => [
                k(
                  Tn,
                  {
                    style: {
                      height: "calc(100% - 192px)",
                      "margin-top": "192px",
                      "border-right": "1px solid #ddd",
                    },
                  },
                  {
                    default: P(() => [
                      k(
                        hn,
                        { padding: "" },
                        {
                          default: P(() => [
                            oe(
                              (ve(),
                              he(
                                Ge,
                                { to: "/", exact: "", clickable: "" },
                                {
                                  default: P(() => [
                                    k(
                                      me,
                                      { avatar: "" },
                                      {
                                        default: P(() => [
                                          k(Ue, { name: "list" }),
                                        ]),
                                        _: 1,
                                      }
                                    ),
                                    k(me, null, {
                                      default: P(() => [Ke(" Todo ")]),
                                      _: 1,
                                    }),
                                  ]),
                                  _: 1,
                                }
                              )),
                              [[Je]]
                            ),
                            oe(
                              (ve(),
                              he(
                                Ge,
                                { to: "/help", exact: "", clickable: "" },
                                {
                                  default: P(() => [
                                    k(
                                      me,
                                      { avatar: "" },
                                      {
                                        default: P(() => [
                                          k(Ue, { name: "help" }),
                                        ]),
                                        _: 1,
                                      }
                                    ),
                                    k(me, null, {
                                      default: P(() => [Ke(" Help ")]),
                                      _: 1,
                                    }),
                                  ]),
                                  _: 1,
                                }
                              )),
                              [[Je]]
                            ),
                          ]),
                          _: 1,
                        }
                      ),
                    ]),
                    _: 1,
                  }
                ),
                k(
                  et,
                  {
                    class: "absolute-top",
                    src: vt,
                    style: { height: "192px" },
                  },
                  {
                    default: P(() => [
                      K("div", ca, [
                        k(
                          fn,
                          { size: "80px", class: "q-mb-sm" },
                          { default: P(() => [da]), _: 1 }
                        ),
                        fa,
                        va,
                      ]),
                    ]),
                    _: 1,
                  }
                ),
              ]),
              _: 1,
            },
            8,
            ["modelValue"]
          ),
          k($n, null, {
            default: P(() => [(ve(), he(vn, null, [k(u)], 1024))]),
            _: 1,
          }),
        ]),
        _: 1,
      }
    )
  );
}
var ba = un(oa, [["render", ha]]);
export { ba as default };
