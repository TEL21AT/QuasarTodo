/**
 * @vue/shared v3.4.15
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function zr(e, t) {
  const n = new Set(e.split(","));
  return t ? (o) => n.has(o.toLowerCase()) : (o) => n.has(o);
}
const ve = {},
  rn = [],
  He = () => {},
  gu = () => !1,
  Po = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  Kr = (e) => e.startsWith("onUpdate:"),
  Ee = Object.assign,
  Ur = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  mu = Object.prototype.hasOwnProperty,
  ce = (e, t) => mu.call(e, t),
  oe = Array.isArray,
  sn = (e) => Kn(e) === "[object Map]",
  rl = (e) => Kn(e) === "[object Set]",
  pu = (e) => Kn(e) === "[object RegExp]",
  ie = (e) => typeof e == "function",
  xe = (e) => typeof e == "string",
  pn = (e) => typeof e == "symbol",
  be = (e) => e !== null && typeof e == "object",
  il = (e) => (be(e) || ie(e)) && ie(e.then) && ie(e.catch),
  sl = Object.prototype.toString,
  Kn = (e) => sl.call(e),
  vu = (e) => Kn(e).slice(8, -1),
  ll = (e) => Kn(e) === "[object Object]",
  Wr = (e) =>
    xe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  uo = zr(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Ao = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  bu = /-(\w)/g,
  ct = Ao((e) => e.replace(bu, (t, n) => (n ? n.toUpperCase() : ""))),
  yu = /\B([A-Z])/g,
  Kt = Ao((e) => e.replace(yu, "-$1").toLowerCase()),
  Mo = Ao((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Uo = Ao((e) => (e ? `on${Mo(e)}` : "")),
  At = (e, t) => !Object.is(e, t),
  Tn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  po = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  _u = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  wu = (e) => {
    const t = xe(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let wi;
const al = () =>
  wi ||
  (wi =
    typeof globalThis != "undefined"
      ? globalThis
      : typeof self != "undefined"
      ? self
      : typeof window != "undefined"
      ? window
      : typeof global != "undefined"
      ? global
      : {});
function Qr(e) {
  if (oe(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n],
        r = xe(o) ? Su(o) : Qr(o);
      if (r) for (const i in r) t[i] = r[i];
    }
    return t;
  } else if (xe(e) || be(e)) return e;
}
const xu = /;(?![^(]*\))/g,
  Cu = /:([^]+)/,
  ku = /\/\*[^]*?\*\//g;
function Su(e) {
  const t = {};
  return (
    e
      .replace(ku, "")
      .split(xu)
      .forEach((n) => {
        if (n) {
          const o = n.split(Cu);
          o.length > 1 && (t[o[0].trim()] = o[1].trim());
        }
      }),
    t
  );
}
function Gr(e) {
  let t = "";
  if (xe(e)) t = e;
  else if (oe(e))
    for (let n = 0; n < e.length; n++) {
      const o = Gr(e[n]);
      o && (t += o + " ");
    }
  else if (be(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const Eu =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Ru = zr(Eu);
function ul(e) {
  return !!e || e === "";
}
const Cm = (e) =>
    xe(e)
      ? e
      : e == null
      ? ""
      : oe(e) || (be(e) && (e.toString === sl || !ie(e.toString)))
      ? JSON.stringify(e, cl, 2)
      : String(e),
  cl = (e, t) =>
    t && t.__v_isRef
      ? cl(e, t.value)
      : sn(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [o, r], i) => ((n[Wo(o, i) + " =>"] = r), n),
            {}
          ),
        }
      : rl(t)
      ? { [`Set(${t.size})`]: [...t.values()].map((n) => Wo(n)) }
      : pn(t)
      ? Wo(t)
      : be(t) && !oe(t) && !ll(t)
      ? String(t)
      : t,
  Wo = (e, t = "") => {
    var n;
    return pn(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
  };
/**
 * @vue/reactivity v3.4.15
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Ze;
class fl {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Ze),
      !t && Ze && (this.index = (Ze.scopes || (Ze.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Ze;
      try {
        return (Ze = this), t();
      } finally {
        Ze = n;
      }
    }
  }
  on() {
    Ze = this;
  }
  off() {
    Ze = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, o;
      for (n = 0, o = this.effects.length; n < o; n++) this.effects[n].stop();
      for (n = 0, o = this.cleanups.length; n < o; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, o = this.scopes.length; n < o; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Tu(e) {
  return new fl(e);
}
function Pu(e, t = Ze) {
  t && t.active && t.effects.push(e);
}
function Au() {
  return Ze;
}
let Nt;
class Yr {
  constructor(t, n, o, r) {
    (this.fn = t),
      (this.trigger = n),
      (this.scheduler = o),
      (this.active = !0),
      (this.deps = []),
      (this._dirtyLevel = 2),
      (this._trackId = 0),
      (this._runnings = 0),
      (this._shouldSchedule = !1),
      (this._depsLength = 0),
      Pu(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 1) {
      Ut();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (Mu(n.computed), this._dirtyLevel >= 2)) break;
      }
      this._dirtyLevel < 2 && (this._dirtyLevel = 0), Wt();
    }
    return this._dirtyLevel >= 2;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 2 : 0;
  }
  run() {
    if (((this._dirtyLevel = 0), !this.active)) return this.fn();
    let t = Tt,
      n = Nt;
    try {
      return (Tt = !0), (Nt = this), this._runnings++, xi(this), this.fn();
    } finally {
      Ci(this), this._runnings--, (Nt = n), (Tt = t);
    }
  }
  stop() {
    var t;
    this.active &&
      (xi(this),
      Ci(this),
      (t = this.onStop) == null || t.call(this),
      (this.active = !1));
  }
}
function Mu(e) {
  return e.value;
}
function xi(e) {
  e._trackId++, (e._depsLength = 0);
}
function Ci(e) {
  if (e.deps && e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++) dl(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function dl(e, t) {
  const n = e.get(t);
  n !== void 0 &&
    t._trackId !== n &&
    (e.delete(t), e.size === 0 && e.cleanup());
}
let Tt = !0,
  yr = 0;
const hl = [];
function Ut() {
  hl.push(Tt), (Tt = !1);
}
function Wt() {
  const e = hl.pop();
  Tt = e === void 0 ? !0 : e;
}
function Zr() {
  yr++;
}
function Xr() {
  for (yr--; !yr && _r.length; ) _r.shift()();
}
function gl(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const o = e.deps[e._depsLength];
    o !== t ? (o && dl(o, e), (e.deps[e._depsLength++] = t)) : e._depsLength++;
  }
}
const _r = [];
function ml(e, t, n) {
  Zr();
  for (const o of e.keys())
    if (o._dirtyLevel < t && e.get(o) === o._trackId) {
      const r = o._dirtyLevel;
      (o._dirtyLevel = t), r === 0 && ((o._shouldSchedule = !0), o.trigger());
    }
  pl(e), Xr();
}
function pl(e) {
  for (const t of e.keys())
    t.scheduler &&
      t._shouldSchedule &&
      (!t._runnings || t.allowRecurse) &&
      e.get(t) === t._trackId &&
      ((t._shouldSchedule = !1), _r.push(t.scheduler));
}
const vl = (e, t) => {
    const n = new Map();
    return (n.cleanup = e), (n.computed = t), n;
  },
  wr = new WeakMap(),
  jt = Symbol(""),
  xr = Symbol("");
function Ve(e, t, n) {
  if (Tt && Nt) {
    let o = wr.get(e);
    o || wr.set(e, (o = new Map()));
    let r = o.get(n);
    r || o.set(n, (r = vl(() => o.delete(n)))), gl(Nt, r);
  }
}
function ht(e, t, n, o, r, i) {
  const s = wr.get(e);
  if (!s) return;
  let l = [];
  if (t === "clear") l = [...s.values()];
  else if (n === "length" && oe(e)) {
    const a = Number(o);
    s.forEach((c, u) => {
      (u === "length" || (!pn(u) && u >= a)) && l.push(c);
    });
  } else
    switch ((n !== void 0 && l.push(s.get(n)), t)) {
      case "add":
        oe(e)
          ? Wr(n) && l.push(s.get("length"))
          : (l.push(s.get(jt)), sn(e) && l.push(s.get(xr)));
        break;
      case "delete":
        oe(e) || (l.push(s.get(jt)), sn(e) && l.push(s.get(xr)));
        break;
      case "set":
        sn(e) && l.push(s.get(jt));
        break;
    }
  Zr();
  for (const a of l) a && ml(a, 2);
  Xr();
}
const qu = zr("__proto__,__v_isRef,__isVue"),
  bl = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(pn)
  ),
  ki = $u();
function $u() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const o = se(this);
        for (let i = 0, s = this.length; i < s; i++) Ve(o, "get", i + "");
        const r = o[t](...n);
        return r === -1 || r === !1 ? o[t](...n.map(se)) : r;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        Ut(), Zr();
        const o = se(this)[t].apply(this, n);
        return Xr(), Wt(), o;
      };
    }),
    e
  );
}
function Ou(e) {
  const t = se(this);
  return Ve(t, "has", e), t.hasOwnProperty(e);
}
class yl {
  constructor(t = !1, n = !1) {
    (this._isReadonly = t), (this._shallow = n);
  }
  get(t, n, o) {
    const r = this._isReadonly,
      i = this._shallow;
    if (n === "__v_isReactive") return !r;
    if (n === "__v_isReadonly") return r;
    if (n === "__v_isShallow") return i;
    if (n === "__v_raw")
      return o === (r ? (i ? Wu : Cl) : i ? xl : wl).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(o)
        ? t
        : void 0;
    const s = oe(t);
    if (!r) {
      if (s && ce(ki, n)) return Reflect.get(ki, n, o);
      if (n === "hasOwnProperty") return Ou;
    }
    const l = Reflect.get(t, n, o);
    return (pn(n) ? bl.has(n) : qu(n)) || (r || Ve(t, "get", n), i)
      ? l
      : Ne(l)
      ? s && Wr(n)
        ? l
        : l.value
      : be(l)
      ? r
        ? Sl(l)
        : vn(l)
      : l;
  }
}
class _l extends yl {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, r) {
    let i = t[n];
    if (!this._shallow) {
      const a = un(i);
      if (
        (!vo(o) && !un(o) && ((i = se(i)), (o = se(o))),
        !oe(t) && Ne(i) && !Ne(o))
      )
        return a ? !1 : ((i.value = o), !0);
    }
    const s = oe(t) && Wr(n) ? Number(n) < t.length : ce(t, n),
      l = Reflect.set(t, n, o, r);
    return (
      t === se(r) && (s ? At(o, i) && ht(t, "set", n, o) : ht(t, "add", n, o)),
      l
    );
  }
  deleteProperty(t, n) {
    const o = ce(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && o && ht(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!pn(n) || !bl.has(n)) && Ve(t, "has", n), o;
  }
  ownKeys(t) {
    return Ve(t, "iterate", oe(t) ? "length" : jt), Reflect.ownKeys(t);
  }
}
class Lu extends yl {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const Fu = new _l(),
  Bu = new Lu(),
  Iu = new _l(!0),
  Jr = (e) => e,
  qo = (e) => Reflect.getPrototypeOf(e);
function Gn(e, t, n = !1, o = !1) {
  e = e.__v_raw;
  const r = se(e),
    i = se(t);
  n || (At(t, i) && Ve(r, "get", t), Ve(r, "get", i));
  const { has: s } = qo(r),
    l = o ? Jr : n ? ni : Ln;
  if (s.call(r, t)) return l(e.get(t));
  if (s.call(r, i)) return l(e.get(i));
  e !== r && e.get(t);
}
function Yn(e, t = !1) {
  const n = this.__v_raw,
    o = se(n),
    r = se(e);
  return (
    t || (At(e, r) && Ve(o, "has", e), Ve(o, "has", r)),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  );
}
function Zn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Ve(se(e), "iterate", jt), Reflect.get(e, "size", e)
  );
}
function Si(e) {
  e = se(e);
  const t = se(this);
  return qo(t).has.call(t, e) || (t.add(e), ht(t, "add", e, e)), this;
}
function Ei(e, t) {
  t = se(t);
  const n = se(this),
    { has: o, get: r } = qo(n);
  let i = o.call(n, e);
  i || ((e = se(e)), (i = o.call(n, e)));
  const s = r.call(n, e);
  return (
    n.set(e, t), i ? At(t, s) && ht(n, "set", e, t) : ht(n, "add", e, t), this
  );
}
function Ri(e) {
  const t = se(this),
    { has: n, get: o } = qo(t);
  let r = n.call(t, e);
  r || ((e = se(e)), (r = n.call(t, e))), o && o.call(t, e);
  const i = t.delete(e);
  return r && ht(t, "delete", e, void 0), i;
}
function Ti() {
  const e = se(this),
    t = e.size !== 0,
    n = e.clear();
  return t && ht(e, "clear", void 0, void 0), n;
}
function Xn(e, t) {
  return function (o, r) {
    const i = this,
      s = i.__v_raw,
      l = se(s),
      a = t ? Jr : e ? ni : Ln;
    return (
      !e && Ve(l, "iterate", jt), s.forEach((c, u) => o.call(r, a(c), a(u), i))
    );
  };
}
function Jn(e, t, n) {
  return function (...o) {
    const r = this.__v_raw,
      i = se(r),
      s = sn(i),
      l = e === "entries" || (e === Symbol.iterator && s),
      a = e === "keys" && s,
      c = r[e](...o),
      u = n ? Jr : t ? ni : Ln;
    return (
      !t && Ve(i, "iterate", a ? xr : jt),
      {
        next() {
          const { value: d, done: f } = c.next();
          return f
            ? { value: d, done: f }
            : { value: l ? [u(d[0]), u(d[1])] : u(d), done: f };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function vt(e) {
  return function (...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Vu() {
  const e = {
      get(i) {
        return Gn(this, i);
      },
      get size() {
        return Zn(this);
      },
      has: Yn,
      add: Si,
      set: Ei,
      delete: Ri,
      clear: Ti,
      forEach: Xn(!1, !1),
    },
    t = {
      get(i) {
        return Gn(this, i, !1, !0);
      },
      get size() {
        return Zn(this);
      },
      has: Yn,
      add: Si,
      set: Ei,
      delete: Ri,
      clear: Ti,
      forEach: Xn(!1, !0),
    },
    n = {
      get(i) {
        return Gn(this, i, !0);
      },
      get size() {
        return Zn(this, !0);
      },
      has(i) {
        return Yn.call(this, i, !0);
      },
      add: vt("add"),
      set: vt("set"),
      delete: vt("delete"),
      clear: vt("clear"),
      forEach: Xn(!0, !1),
    },
    o = {
      get(i) {
        return Gn(this, i, !0, !0);
      },
      get size() {
        return Zn(this, !0);
      },
      has(i) {
        return Yn.call(this, i, !0);
      },
      add: vt("add"),
      set: vt("set"),
      delete: vt("delete"),
      clear: vt("clear"),
      forEach: Xn(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
      (e[i] = Jn(i, !1, !1)),
        (n[i] = Jn(i, !0, !1)),
        (t[i] = Jn(i, !1, !0)),
        (o[i] = Jn(i, !0, !0));
    }),
    [e, n, t, o]
  );
}
const [Nu, ju, Du, Hu] = Vu();
function ei(e, t) {
  const n = t ? (e ? Hu : Du) : e ? ju : Nu;
  return (o, r, i) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
      ? e
      : r === "__v_raw"
      ? o
      : Reflect.get(ce(n, r) && r in o ? n : o, r, i);
}
const zu = { get: ei(!1, !1) },
  Ku = { get: ei(!1, !0) },
  Uu = { get: ei(!0, !1) },
  wl = new WeakMap(),
  xl = new WeakMap(),
  Cl = new WeakMap(),
  Wu = new WeakMap();
function Qu(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Gu(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Qu(vu(e));
}
function vn(e) {
  return un(e) ? e : ti(e, !1, Fu, zu, wl);
}
function kl(e) {
  return ti(e, !1, Iu, Ku, xl);
}
function Sl(e) {
  return ti(e, !0, Bu, Uu, Cl);
}
function ti(e, t, n, o, r) {
  if (!be(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const i = r.get(e);
  if (i) return i;
  const s = Gu(e);
  if (s === 0) return e;
  const l = new Proxy(e, s === 2 ? o : n);
  return r.set(e, l), l;
}
function ln(e) {
  return un(e) ? ln(e.__v_raw) : !!(e && e.__v_isReactive);
}
function un(e) {
  return !!(e && e.__v_isReadonly);
}
function vo(e) {
  return !!(e && e.__v_isShallow);
}
function El(e) {
  return ln(e) || un(e);
}
function se(e) {
  const t = e && e.__v_raw;
  return t ? se(t) : e;
}
function Qt(e) {
  return po(e, "__v_skip", !0), e;
}
const Ln = (e) => (be(e) ? vn(e) : e),
  ni = (e) => (be(e) ? Sl(e) : e);
class Rl {
  constructor(t, n, o, r) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this.effect = new Yr(
        () => t(this._value),
        () => co(this, 1),
        () => this.dep && pl(this.dep)
      )),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !r),
      (this.__v_isReadonly = o);
  }
  get value() {
    const t = se(this);
    return (
      (!t._cacheable || t.effect.dirty) &&
        At(t._value, (t._value = t.effect.run())) &&
        co(t, 2),
      Tl(t),
      t.effect._dirtyLevel >= 1 && co(t, 1),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(t) {
    this.effect.dirty = t;
  }
}
function Yu(e, t, n = !1) {
  let o, r;
  const i = ie(e);
  return (
    i ? ((o = e), (r = He)) : ((o = e.get), (r = e.set)),
    new Rl(o, r, i || !r, n)
  );
}
function Tl(e) {
  Tt &&
    Nt &&
    ((e = se(e)),
    gl(
      Nt,
      e.dep ||
        (e.dep = vl(() => (e.dep = void 0), e instanceof Rl ? e : void 0))
    ));
}
function co(e, t = 2, n) {
  e = se(e);
  const o = e.dep;
  o && ml(o, t);
}
function Ne(e) {
  return !!(e && e.__v_isRef === !0);
}
function de(e) {
  return Pl(e, !1);
}
function Zu(e) {
  return Pl(e, !0);
}
function Pl(e, t) {
  return Ne(e) ? e : new Xu(e, t);
}
class Xu {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : se(t)),
      (this._value = n ? t : Ln(t));
  }
  get value() {
    return Tl(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || vo(t) || un(t);
    (t = n ? t : se(t)),
      At(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Ln(t)), co(this, 2));
  }
}
function Dt(e) {
  return Ne(e) ? e.value : e;
}
const Ju = {
  get: (e, t, n) => Dt(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const r = e[t];
    return Ne(r) && !Ne(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, o);
  },
};
function Al(e) {
  return ln(e) ? e : new Proxy(e, Ju);
}
/**
 * @vue/runtime-core v3.4.15
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function Pt(e, t, n, o) {
  let r;
  try {
    r = o ? e(...o) : e();
  } catch (i) {
    $o(i, t, n);
  }
  return r;
}
function Qe(e, t, n, o) {
  if (ie(e)) {
    const i = Pt(e, t, n, o);
    return (
      i &&
        il(i) &&
        i.catch((s) => {
          $o(s, t, n);
        }),
      i
    );
  }
  const r = [];
  for (let i = 0; i < e.length; i++) r.push(Qe(e[i], t, n, o));
  return r;
}
function $o(e, t, n, o = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const s = t.proxy,
      l = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; i; ) {
      const c = i.ec;
      if (c) {
        for (let u = 0; u < c.length; u++) if (c[u](e, s, l) === !1) return;
      }
      i = i.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      Pt(a, null, 10, [e, s, l]);
      return;
    }
  }
  ec(e, n, r, o);
}
function ec(e, t, n, o = !0) {
  console.error(e);
}
let Fn = !1,
  Cr = !1;
const $e = [];
let lt = 0;
const an = [];
let wt = null,
  Ft = 0;
const Ml = Promise.resolve();
let oi = null;
function De(e) {
  const t = oi || Ml;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function tc(e) {
  let t = lt + 1,
    n = $e.length;
  for (; t < n; ) {
    const o = (t + n) >>> 1,
      r = $e[o],
      i = Bn(r);
    i < e || (i === e && r.pre) ? (t = o + 1) : (n = o);
  }
  return t;
}
function ri(e) {
  (!$e.length || !$e.includes(e, Fn && e.allowRecurse ? lt + 1 : lt)) &&
    (e.id == null ? $e.push(e) : $e.splice(tc(e.id), 0, e), ql());
}
function ql() {
  !Fn && !Cr && ((Cr = !0), (oi = Ml.then(Ol)));
}
function nc(e) {
  const t = $e.indexOf(e);
  t > lt && $e.splice(t, 1);
}
function oc(e) {
  oe(e)
    ? an.push(...e)
    : (!wt || !wt.includes(e, e.allowRecurse ? Ft + 1 : Ft)) && an.push(e),
    ql();
}
function Pi(e, t, n = Fn ? lt + 1 : 0) {
  for (; n < $e.length; n++) {
    const o = $e[n];
    if (o && o.pre) {
      if (e && o.id !== e.uid) continue;
      $e.splice(n, 1), n--, o();
    }
  }
}
function $l(e) {
  if (an.length) {
    const t = [...new Set(an)].sort((n, o) => Bn(n) - Bn(o));
    if (((an.length = 0), wt)) {
      wt.push(...t);
      return;
    }
    for (wt = t, Ft = 0; Ft < wt.length; Ft++) wt[Ft]();
    (wt = null), (Ft = 0);
  }
}
const Bn = (e) => (e.id == null ? 1 / 0 : e.id),
  rc = (e, t) => {
    const n = Bn(e) - Bn(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Ol(e) {
  (Cr = !1), (Fn = !0), $e.sort(rc);
  const t = He;
  try {
    for (lt = 0; lt < $e.length; lt++) {
      const n = $e[lt];
      n && n.active !== !1 && Pt(n, null, 14);
    }
  } finally {
    (lt = 0),
      ($e.length = 0),
      $l(),
      (Fn = !1),
      (oi = null),
      ($e.length || an.length) && Ol();
  }
}
function ic(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || ve;
  let r = n;
  const i = t.startsWith("update:"),
    s = i && t.slice(7);
  if (s && s in o) {
    const u = `${s === "modelValue" ? "model" : s}Modifiers`,
      { number: d, trim: f } = o[u] || ve;
    f && (r = n.map((p) => (xe(p) ? p.trim() : p))), d && (r = n.map(_u));
  }
  let l,
    a = o[(l = Uo(t))] || o[(l = Uo(ct(t)))];
  !a && i && (a = o[(l = Uo(Kt(t)))]), a && Qe(a, e, 6, r);
  const c = o[l + "Once"];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), Qe(c, e, 6, r);
  }
}
function Ll(e, t, n = !1) {
  const o = t.emitsCache,
    r = o.get(e);
  if (r !== void 0) return r;
  const i = e.emits;
  let s = {},
    l = !1;
  if (!ie(e)) {
    const a = (c) => {
      const u = Ll(c, t, !0);
      u && ((l = !0), Ee(s, u));
    };
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a);
  }
  return !i && !l
    ? (be(e) && o.set(e, null), null)
    : (oe(i) ? i.forEach((a) => (s[a] = null)) : Ee(s, i),
      be(e) && o.set(e, s),
      s);
}
function Oo(e, t) {
  return !e || !Po(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      ce(e, t[0].toLowerCase() + t.slice(1)) || ce(e, Kt(t)) || ce(e, t));
}
let Fe = null,
  Fl = null;
function bo(e) {
  const t = Fe;
  return (Fe = e), (Fl = (e && e.type.__scopeId) || null), t;
}
function sc(e, t = Fe, n) {
  if (!t || e._n) return e;
  const o = (...r) => {
    o._d && Hi(-1);
    const i = bo(t);
    let s;
    try {
      s = e(...r);
    } finally {
      bo(i), o._d && Hi(1);
    }
    return s;
  };
  return (o._n = !0), (o._c = !0), (o._d = !0), o;
}
function Qo(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: r,
    props: i,
    propsOptions: [s],
    slots: l,
    attrs: a,
    emit: c,
    render: u,
    renderCache: d,
    data: f,
    setupState: p,
    ctx: y,
    inheritAttrs: T,
  } = e;
  let w, O;
  const m = bo(e);
  try {
    if (n.shapeFlag & 4) {
      const M = r || o,
        $ = M;
      (w = st(u.call($, M, d, i, p, f, y))), (O = a);
    } else {
      const M = t;
      (w = st(
        M.length > 1 ? M(i, { attrs: a, slots: l, emit: c }) : M(i, null)
      )),
        (O = t.props ? a : lc(a));
    }
  } catch (M) {
    (qn.length = 0), $o(M, e, 1), (w = Ie(ot));
  }
  let b = w;
  if (O && T !== !1) {
    const M = Object.keys(O),
      { shapeFlag: $ } = b;
    M.length && $ & 7 && (s && M.some(Kr) && (O = ac(O, s)), (b = gt(b, O)));
  }
  return (
    n.dirs && ((b = gt(b)), (b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (b.transition = n.transition),
    (w = b),
    bo(m),
    w
  );
}
const lc = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Po(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  ac = (e, t) => {
    const n = {};
    for (const o in e) (!Kr(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
    return n;
  };
function uc(e, t, n) {
  const { props: o, children: r, component: i } = e,
    { props: s, children: l, patchFlag: a } = t,
    c = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && a >= 0) {
    if (a & 1024) return !0;
    if (a & 16) return o ? Ai(o, s, c) : !!s;
    if (a & 8) {
      const u = t.dynamicProps;
      for (let d = 0; d < u.length; d++) {
        const f = u[d];
        if (s[f] !== o[f] && !Oo(c, f)) return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable)
      ? !0
      : o === s
      ? !1
      : o
      ? s
        ? Ai(o, s, c)
        : !0
      : !!s;
  return !1;
}
function Ai(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < o.length; r++) {
    const i = o[r];
    if (t[i] !== e[i] && !Oo(n, i)) return !0;
  }
  return !1;
}
function cc({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if ((o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e))
      ((e = t.vnode).el = n), (t = t.parent);
    else break;
  }
}
const Bl = "components",
  fc = "directives";
function dc(e, t) {
  return Il(Bl, e, !0, t) || e;
}
const hc = Symbol.for("v-ndc");
function km(e) {
  return Il(fc, e);
}
function Il(e, t, n = !0, o = !1) {
  const r = Fe || Me;
  if (r) {
    const i = r.type;
    if (e === Bl) {
      const l = Mr(i, !1);
      if (l && (l === t || l === ct(t) || l === Mo(ct(t)))) return i;
    }
    const s = Mi(r[e] || i[e], t) || Mi(r.appContext[e], t);
    return !s && o ? i : s;
  }
}
function Mi(e, t) {
  return e && (e[t] || e[ct(t)] || e[Mo(ct(t))]);
}
const Vl = (e) => e.__isSuspense;
function gc(e, t) {
  t && t.pendingBranch
    ? oe(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : oc(e);
}
const mc = Symbol.for("v-scx"),
  pc = () => ut(mc),
  eo = {};
function pe(e, t, n) {
  return Nl(e, t, n);
}
function Nl(
  e,
  t,
  { immediate: n, deep: o, flush: r, once: i, onTrack: s, onTrigger: l } = ve
) {
  if (t && i) {
    const q = t;
    t = (...V) => {
      q(...V), $();
    };
  }
  const a = Me,
    c = (q) => (o === !0 ? q : Bt(q, o === !1 ? 1 : void 0));
  let u,
    d = !1,
    f = !1;
  if (
    (Ne(e)
      ? ((u = () => e.value), (d = vo(e)))
      : ln(e)
      ? ((u = () => c(e)), (d = !0))
      : oe(e)
      ? ((f = !0),
        (d = e.some((q) => ln(q) || vo(q))),
        (u = () =>
          e.map((q) => {
            if (Ne(q)) return q.value;
            if (ln(q)) return c(q);
            if (ie(q)) return Pt(q, a, 2);
          })))
      : ie(e)
      ? t
        ? (u = () => Pt(e, a, 2))
        : (u = () => (p && p(), Qe(e, a, 3, [y])))
      : (u = He),
    t && o)
  ) {
    const q = u;
    u = () => Bt(q());
  }
  let p,
    y = (q) => {
      p = b.onStop = () => {
        Pt(q, a, 4), (p = b.onStop = void 0);
      };
    },
    T;
  if (jo)
    if (
      ((y = He),
      t ? n && Qe(t, a, 3, [u(), f ? [] : void 0, y]) : u(),
      r === "sync")
    ) {
      const q = pc();
      T = q.__watcherHandles || (q.__watcherHandles = []);
    } else return He;
  let w = f ? new Array(e.length).fill(eo) : eo;
  const O = () => {
    if (!(!b.active || !b.dirty))
      if (t) {
        const q = b.run();
        (o || d || (f ? q.some((V, H) => At(V, w[H])) : At(q, w))) &&
          (p && p(),
          Qe(t, a, 3, [q, w === eo ? void 0 : f && w[0] === eo ? [] : w, y]),
          (w = q));
      } else b.run();
  };
  O.allowRecurse = !!t;
  let m;
  r === "sync"
    ? (m = O)
    : r === "post"
    ? (m = () => Ae(O, a && a.suspense))
    : ((O.pre = !0), a && (O.id = a.uid), (m = () => ri(O)));
  const b = new Yr(u, He, m),
    M = Au(),
    $ = () => {
      b.stop(), M && Ur(M.effects, b);
    };
  return (
    t
      ? n
        ? O()
        : (w = b.run())
      : r === "post"
      ? Ae(b.run.bind(b), a && a.suspense)
      : b.run(),
    T && T.push($),
    $
  );
}
function vc(e, t, n) {
  const o = this.proxy,
    r = xe(e) ? (e.includes(".") ? jl(o, e) : () => o[e]) : e.bind(o, o);
  let i;
  ie(t) ? (i = t) : ((i = t.handler), (n = t));
  const s = Un(this),
    l = Nl(r, i.bind(o), n);
  return s(), l;
}
function jl(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let r = 0; r < n.length && o; r++) o = o[n[r]];
    return o;
  };
}
function Bt(e, t, n = 0, o) {
  if (!be(e) || e.__v_skip) return e;
  if (t && t > 0) {
    if (n >= t) return e;
    n++;
  }
  if (((o = o || new Set()), o.has(e))) return e;
  if ((o.add(e), Ne(e))) Bt(e.value, t, n, o);
  else if (oe(e)) for (let r = 0; r < e.length; r++) Bt(e[r], t, n, o);
  else if (rl(e) || sn(e))
    e.forEach((r) => {
      Bt(r, t, n, o);
    });
  else if (ll(e)) for (const r in e) Bt(e[r], t, n, o);
  return e;
}
function Dl(e, t) {
  if (Fe === null) return e;
  const n = Do(Fe) || Fe.proxy,
    o = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, s, l, a = ve] = t[r];
    i &&
      (ie(i) && (i = { mounted: i, updated: i }),
      i.deep && Bt(s),
      o.push({
        dir: i,
        instance: n,
        value: s,
        oldValue: void 0,
        arg: l,
        modifiers: a,
      }));
  }
  return e;
}
function qt(e, t, n, o) {
  const r = e.dirs,
    i = t && t.dirs;
  for (let s = 0; s < r.length; s++) {
    const l = r[s];
    i && (l.oldValue = i[s].value);
    let a = l.dir[o];
    a && (Ut(), Qe(a, n, 8, [e.el, l, e, t]), Wt());
  }
}
const xt = Symbol("_leaveCb"),
  to = Symbol("_enterCb");
function Hl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    Gt(() => {
      e.isMounted = !0;
    }),
    Ge(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const ze = [Function, Array],
  zl = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: ze,
    onEnter: ze,
    onAfterEnter: ze,
    onEnterCancelled: ze,
    onBeforeLeave: ze,
    onLeave: ze,
    onAfterLeave: ze,
    onLeaveCancelled: ze,
    onBeforeAppear: ze,
    onAppear: ze,
    onAfterAppear: ze,
    onAppearCancelled: ze,
  },
  bc = {
    name: "BaseTransition",
    props: zl,
    setup(e, { slots: t }) {
      const n = ke(),
        o = Hl();
      let r;
      return () => {
        const i = t.default && ii(t.default(), !0);
        if (!i || !i.length) return;
        let s = i[0];
        if (i.length > 1) {
          for (const T of i)
            if (T.type !== ot) {
              s = T;
              break;
            }
        }
        const l = se(e),
          { mode: a } = l;
        if (o.isLeaving) return Go(s);
        const c = qi(s);
        if (!c) return Go(s);
        const u = In(c, l, o, n);
        cn(c, u);
        const d = n.subTree,
          f = d && qi(d);
        let p = !1;
        const { getTransitionKey: y } = c.type;
        if (y) {
          const T = y();
          r === void 0 ? (r = T) : T !== r && ((r = T), (p = !0));
        }
        if (f && f.type !== ot && (!Et(c, f) || p)) {
          const T = In(f, l, o, n);
          if ((cn(f, T), a === "out-in"))
            return (
              (o.isLeaving = !0),
              (T.afterLeave = () => {
                (o.isLeaving = !1),
                  n.update.active !== !1 && ((n.effect.dirty = !0), n.update());
              }),
              Go(s)
            );
          a === "in-out" &&
            c.type !== ot &&
            (T.delayLeave = (w, O, m) => {
              const b = Kl(o, f);
              (b[String(f.key)] = f),
                (w[xt] = () => {
                  O(), (w[xt] = void 0), delete u.delayedLeave;
                }),
                (u.delayedLeave = m);
            });
        }
        return s;
      };
    },
  },
  yc = bc;
function Kl(e, t) {
  const { leavingVNodes: n } = e;
  let o = n.get(t.type);
  return o || ((o = Object.create(null)), n.set(t.type, o)), o;
}
function In(e, t, n, o) {
  const {
      appear: r,
      mode: i,
      persisted: s = !1,
      onBeforeEnter: l,
      onEnter: a,
      onAfterEnter: c,
      onEnterCancelled: u,
      onBeforeLeave: d,
      onLeave: f,
      onAfterLeave: p,
      onLeaveCancelled: y,
      onBeforeAppear: T,
      onAppear: w,
      onAfterAppear: O,
      onAppearCancelled: m,
    } = t,
    b = String(e.key),
    M = Kl(n, e),
    $ = (H, C) => {
      H && Qe(H, o, 9, C);
    },
    q = (H, C) => {
      const x = C[1];
      $(H, C),
        oe(H) ? H.every((F) => F.length <= 1) && x() : H.length <= 1 && x();
    },
    V = {
      mode: i,
      persisted: s,
      beforeEnter(H) {
        let C = l;
        if (!n.isMounted)
          if (r) C = T || l;
          else return;
        H[xt] && H[xt](!0);
        const x = M[b];
        x && Et(e, x) && x.el[xt] && x.el[xt](), $(C, [H]);
      },
      enter(H) {
        let C = a,
          x = c,
          F = u;
        if (!n.isMounted)
          if (r) (C = w || a), (x = O || c), (F = m || u);
          else return;
        let v = !1;
        const D = (H[to] = (k) => {
          v ||
            ((v = !0),
            k ? $(F, [H]) : $(x, [H]),
            V.delayedLeave && V.delayedLeave(),
            (H[to] = void 0));
        });
        C ? q(C, [H, D]) : D();
      },
      leave(H, C) {
        const x = String(e.key);
        if ((H[to] && H[to](!0), n.isUnmounting)) return C();
        $(d, [H]);
        let F = !1;
        const v = (H[xt] = (D) => {
          F ||
            ((F = !0),
            C(),
            D ? $(y, [H]) : $(p, [H]),
            (H[xt] = void 0),
            M[x] === e && delete M[x]);
        });
        (M[x] = e), f ? q(f, [H, v]) : v();
      },
      clone(H) {
        return In(H, t, n, o);
      },
    };
  return V;
}
function Go(e) {
  if (Fo(e)) return (e = gt(e)), (e.children = null), e;
}
function qi(e) {
  return Fo(e) ? (e.children ? e.children[0] : void 0) : e;
}
function cn(e, t) {
  e.shapeFlag & 6 && e.component
    ? cn(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function ii(e, t = !1, n) {
  let o = [],
    r = 0;
  for (let i = 0; i < e.length; i++) {
    let s = e[i];
    const l = n == null ? s.key : String(n) + String(s.key != null ? s.key : i);
    s.type === et
      ? (s.patchFlag & 128 && r++, (o = o.concat(ii(s.children, t, l))))
      : (t || s.type !== ot) && o.push(l != null ? gt(s, { key: l }) : s);
  }
  if (r > 1) for (let i = 0; i < o.length; i++) o[i].patchFlag = -2;
  return o;
}
/*! #__NO_SIDE_EFFECTS__ */ function Lo(e, t) {
  return ie(e) ? (() => Ee({ name: e.name }, t, { setup: e }))() : e;
}
const Pn = (e) => !!e.type.__asyncLoader,
  Fo = (e) => e.type.__isKeepAlive,
  _c = {
    name: "KeepAlive",
    __isKeepAlive: !0,
    props: {
      include: [String, RegExp, Array],
      exclude: [String, RegExp, Array],
      max: [String, Number],
    },
    setup(e, { slots: t }) {
      const n = ke(),
        o = n.ctx;
      if (!o.renderer)
        return () => {
          const m = t.default && t.default();
          return m && m.length === 1 ? m[0] : m;
        };
      const r = new Map(),
        i = new Set();
      let s = null;
      const l = n.suspense,
        {
          renderer: {
            p: a,
            m: c,
            um: u,
            o: { createElement: d },
          },
        } = o,
        f = d("div");
      (o.activate = (m, b, M, $, q) => {
        const V = m.component;
        c(m, b, M, 0, l),
          a(V.vnode, m, b, M, V, l, $, m.slotScopeIds, q),
          Ae(() => {
            (V.isDeactivated = !1), V.a && Tn(V.a);
            const H = m.props && m.props.onVnodeMounted;
            H && Ue(H, V.parent, m);
          }, l);
      }),
        (o.deactivate = (m) => {
          const b = m.component;
          c(m, f, null, 1, l),
            Ae(() => {
              b.da && Tn(b.da);
              const M = m.props && m.props.onVnodeUnmounted;
              M && Ue(M, b.parent, m), (b.isDeactivated = !0);
            }, l);
        });
      function p(m) {
        Yo(m), u(m, n, l, !0);
      }
      function y(m) {
        r.forEach((b, M) => {
          const $ = Mr(b.type);
          $ && (!m || !m($)) && T(M);
        });
      }
      function T(m) {
        const b = r.get(m);
        !s || !Et(b, s) ? p(b) : s && Yo(s), r.delete(m), i.delete(m);
      }
      pe(
        () => [e.include, e.exclude],
        ([m, b]) => {
          m && y((M) => Sn(m, M)), b && y((M) => !Sn(b, M));
        },
        { flush: "post", deep: !0 }
      );
      let w = null;
      const O = () => {
        w != null && r.set(w, Zo(n.subTree));
      };
      return (
        Gt(O),
        si(O),
        Ge(() => {
          r.forEach((m) => {
            const { subTree: b, suspense: M } = n,
              $ = Zo(b);
            if (m.type === $.type && m.key === $.key) {
              Yo($);
              const q = $.component.da;
              q && Ae(q, M);
              return;
            }
            p(m);
          });
        }),
        () => {
          if (((w = null), !t.default)) return null;
          const m = t.default(),
            b = m[0];
          if (m.length > 1) return (s = null), m;
          if (!wo(b) || (!(b.shapeFlag & 4) && !(b.shapeFlag & 128)))
            return (s = null), b;
          let M = Zo(b);
          const $ = M.type,
            q = Mr(Pn(M) ? M.type.__asyncResolved || {} : $),
            { include: V, exclude: H, max: C } = e;
          if ((V && (!q || !Sn(V, q))) || (H && q && Sn(H, q)))
            return (s = M), b;
          const x = M.key == null ? $ : M.key,
            F = r.get(x);
          return (
            M.el && ((M = gt(M)), b.shapeFlag & 128 && (b.ssContent = M)),
            (w = x),
            F
              ? ((M.el = F.el),
                (M.component = F.component),
                M.transition && cn(M, M.transition),
                (M.shapeFlag |= 512),
                i.delete(x),
                i.add(x))
              : (i.add(x),
                C && i.size > parseInt(C, 10) && T(i.values().next().value)),
            (M.shapeFlag |= 256),
            (s = M),
            Vl(b.type) ? b : M
          );
        }
      );
    },
  },
  Sm = _c;
function Sn(e, t) {
  return oe(e)
    ? e.some((n) => Sn(n, t))
    : xe(e)
    ? e.split(",").includes(t)
    : pu(e)
    ? e.test(t)
    : !1;
}
function Ul(e, t) {
  Wl(e, "a", t);
}
function Bo(e, t) {
  Wl(e, "da", t);
}
function Wl(e, t, n = Me) {
  const o =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if ((Io(t, o, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      Fo(r.parent.vnode) && wc(o, t, n, r), (r = r.parent);
  }
}
function wc(e, t, n, o) {
  const r = Io(t, e, o, !0);
  li(() => {
    Ur(o[t], r);
  }, n);
}
function Yo(e) {
  (e.shapeFlag &= -257), (e.shapeFlag &= -513);
}
function Zo(e) {
  return e.shapeFlag & 128 ? e.ssContent : e;
}
function Io(e, t, n = Me, o = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...s) => {
          if (n.isUnmounted) return;
          Ut();
          const l = Un(n),
            a = Qe(t, n, e, s);
          return l(), Wt(), a;
        });
    return o ? r.unshift(i) : r.push(i), i;
  }
}
const pt =
    (e) =>
    (t, n = Me) =>
      (!jo || e === "sp") && Io(e, (...o) => t(...o), n),
  xc = pt("bm"),
  Gt = pt("m"),
  Ql = pt("bu"),
  si = pt("u"),
  Ge = pt("bum"),
  li = pt("um"),
  Cc = pt("sp"),
  kc = pt("rtg"),
  Sc = pt("rtc");
function Ec(e, t = Me) {
  Io("ec", e, t);
}
function Em(e, t, n, o) {
  let r;
  const i = n && n[o];
  if (oe(e) || xe(e)) {
    r = new Array(e.length);
    for (let s = 0, l = e.length; s < l; s++)
      r[s] = t(e[s], s, void 0, i && i[s]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let s = 0; s < e; s++) r[s] = t(s + 1, s, void 0, i && i[s]);
  } else if (be(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (s, l) => t(s, l, void 0, i && i[l]));
    else {
      const s = Object.keys(e);
      r = new Array(s.length);
      for (let l = 0, a = s.length; l < a; l++) {
        const c = s[l];
        r[l] = t(e[c], c, l, i && i[l]);
      }
    }
  else r = [];
  return n && (n[o] = r), r;
}
const kr = (e) => (e ? (ua(e) ? Do(e) || e.proxy : kr(e.parent)) : null),
  An = Ee(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => kr(e.parent),
    $root: (e) => kr(e.root),
    $emit: (e) => e.emit,
    $options: (e) => ai(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        (e.effect.dirty = !0), ri(e.update);
      }),
    $nextTick: (e) => e.n || (e.n = De.bind(e.proxy)),
    $watch: (e) => vc.bind(e),
  }),
  Xo = (e, t) => e !== ve && !e.__isScriptSetup && ce(e, t),
  Rc = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: o,
        data: r,
        props: i,
        accessCache: s,
        type: l,
        appContext: a,
      } = e;
      let c;
      if (t[0] !== "$") {
        const p = s[t];
        if (p !== void 0)
          switch (p) {
            case 1:
              return o[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return i[t];
          }
        else {
          if (Xo(o, t)) return (s[t] = 1), o[t];
          if (r !== ve && ce(r, t)) return (s[t] = 2), r[t];
          if ((c = e.propsOptions[0]) && ce(c, t)) return (s[t] = 3), i[t];
          if (n !== ve && ce(n, t)) return (s[t] = 4), n[t];
          Sr && (s[t] = 0);
        }
      }
      const u = An[t];
      let d, f;
      if (u) return t === "$attrs" && Ve(e, "get", t), u(e);
      if ((d = l.__cssModules) && (d = d[t])) return d;
      if (n !== ve && ce(n, t)) return (s[t] = 4), n[t];
      if (((f = a.config.globalProperties), ce(f, t))) return f[t];
    },
    set({ _: e }, t, n) {
      const { data: o, setupState: r, ctx: i } = e;
      return Xo(r, t)
        ? ((r[t] = n), !0)
        : o !== ve && ce(o, t)
        ? ((o[t] = n), !0)
        : ce(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((i[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: o,
          appContext: r,
          propsOptions: i,
        },
      },
      s
    ) {
      let l;
      return (
        !!n[s] ||
        (e !== ve && ce(e, s)) ||
        Xo(t, s) ||
        ((l = i[0]) && ce(l, s)) ||
        ce(o, s) ||
        ce(An, s) ||
        ce(r.config.globalProperties, s)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : ce(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function $i(e) {
  return oe(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let Sr = !0;
function Tc(e) {
  const t = ai(e),
    n = e.proxy,
    o = e.ctx;
  (Sr = !1), t.beforeCreate && Oi(t.beforeCreate, e, "bc");
  const {
    data: r,
    computed: i,
    methods: s,
    watch: l,
    provide: a,
    inject: c,
    created: u,
    beforeMount: d,
    mounted: f,
    beforeUpdate: p,
    updated: y,
    activated: T,
    deactivated: w,
    beforeDestroy: O,
    beforeUnmount: m,
    destroyed: b,
    unmounted: M,
    render: $,
    renderTracked: q,
    renderTriggered: V,
    errorCaptured: H,
    serverPrefetch: C,
    expose: x,
    inheritAttrs: F,
    components: v,
    directives: D,
    filters: k,
  } = t;
  if ((c && Pc(c, o, null), s))
    for (const A in s) {
      const Q = s[A];
      ie(Q) && (o[A] = Q.bind(n));
    }
  if (r) {
    const A = r.call(n, n);
    be(A) && (e.data = vn(A));
  }
  if (((Sr = !0), i))
    for (const A in i) {
      const Q = i[A],
        ye = ie(Q) ? Q.bind(n, n) : ie(Q.get) ? Q.get.bind(n, n) : He,
        le = !ie(Q) && ie(Q.set) ? Q.set.bind(n) : He,
        fe = E({ get: ye, set: le });
      Object.defineProperty(o, A, {
        enumerable: !0,
        configurable: !0,
        get: () => fe.value,
        set: (B) => (fe.value = B),
      });
    }
  if (l) for (const A in l) Gl(l[A], o, n, A);
  if (a) {
    const A = ie(a) ? a.call(n) : a;
    Reflect.ownKeys(A).forEach((Q) => {
      fo(Q, A[Q]);
    });
  }
  u && Oi(u, e, "c");
  function G(A, Q) {
    oe(Q) ? Q.forEach((ye) => A(ye.bind(n))) : Q && A(Q.bind(n));
  }
  if (
    (G(xc, d),
    G(Gt, f),
    G(Ql, p),
    G(si, y),
    G(Ul, T),
    G(Bo, w),
    G(Ec, H),
    G(Sc, q),
    G(kc, V),
    G(Ge, m),
    G(li, M),
    G(Cc, C),
    oe(x))
  )
    if (x.length) {
      const A = e.exposed || (e.exposed = {});
      x.forEach((Q) => {
        Object.defineProperty(A, Q, {
          get: () => n[Q],
          set: (ye) => (n[Q] = ye),
        });
      });
    } else e.exposed || (e.exposed = {});
  $ && e.render === He && (e.render = $),
    F != null && (e.inheritAttrs = F),
    v && (e.components = v),
    D && (e.directives = D);
}
function Pc(e, t, n = He) {
  oe(e) && (e = Er(e));
  for (const o in e) {
    const r = e[o];
    let i;
    be(r)
      ? "default" in r
        ? (i = ut(r.from || o, r.default, !0))
        : (i = ut(r.from || o))
      : (i = ut(r)),
      Ne(i)
        ? Object.defineProperty(t, o, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (s) => (i.value = s),
          })
        : (t[o] = i);
  }
}
function Oi(e, t, n) {
  Qe(oe(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Gl(e, t, n, o) {
  const r = o.includes(".") ? jl(n, o) : () => n[o];
  if (xe(e)) {
    const i = t[e];
    ie(i) && pe(r, i);
  } else if (ie(e)) pe(r, e.bind(n));
  else if (be(e))
    if (oe(e)) e.forEach((i) => Gl(i, t, n, o));
    else {
      const i = ie(e.handler) ? e.handler.bind(n) : t[e.handler];
      ie(i) && pe(r, i, e);
    }
}
function ai(e) {
  const t = e.type,
    { mixins: n, extends: o } = t,
    {
      mixins: r,
      optionsCache: i,
      config: { optionMergeStrategies: s },
    } = e.appContext,
    l = i.get(t);
  let a;
  return (
    l
      ? (a = l)
      : !r.length && !n && !o
      ? (a = t)
      : ((a = {}), r.length && r.forEach((c) => yo(a, c, s, !0)), yo(a, t, s)),
    be(t) && i.set(t, a),
    a
  );
}
function yo(e, t, n, o = !1) {
  const { mixins: r, extends: i } = t;
  i && yo(e, i, n, !0), r && r.forEach((s) => yo(e, s, n, !0));
  for (const s in t)
    if (!(o && s === "expose")) {
      const l = Ac[s] || (n && n[s]);
      e[s] = l ? l(e[s], t[s]) : t[s];
    }
  return e;
}
const Ac = {
  data: Li,
  props: Fi,
  emits: Fi,
  methods: En,
  computed: En,
  beforeCreate: Le,
  created: Le,
  beforeMount: Le,
  mounted: Le,
  beforeUpdate: Le,
  updated: Le,
  beforeDestroy: Le,
  beforeUnmount: Le,
  destroyed: Le,
  unmounted: Le,
  activated: Le,
  deactivated: Le,
  errorCaptured: Le,
  serverPrefetch: Le,
  components: En,
  directives: En,
  watch: qc,
  provide: Li,
  inject: Mc,
};
function Li(e, t) {
  return t
    ? e
      ? function () {
          return Ee(
            ie(e) ? e.call(this, this) : e,
            ie(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Mc(e, t) {
  return En(Er(e), Er(t));
}
function Er(e) {
  if (oe(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Le(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function En(e, t) {
  return e ? Ee(Object.create(null), e, t) : t;
}
function Fi(e, t) {
  return e
    ? oe(e) && oe(t)
      ? [...new Set([...e, ...t])]
      : Ee(Object.create(null), $i(e), $i(t != null ? t : {}))
    : t;
}
function qc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ee(Object.create(null), e);
  for (const o in t) n[o] = Le(e[o], t[o]);
  return n;
}
function Yl() {
  return {
    app: null,
    config: {
      isNativeTag: gu,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let $c = 0;
function Oc(e, t) {
  return function (o, r = null) {
    ie(o) || (o = Ee({}, o)), r != null && !be(r) && (r = null);
    const i = Yl(),
      s = new WeakSet();
    let l = !1;
    const a = (i.app = {
      _uid: $c++,
      _component: o,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: af,
      get config() {
        return i.config;
      },
      set config(c) {},
      use(c, ...u) {
        return (
          s.has(c) ||
            (c && ie(c.install)
              ? (s.add(c), c.install(a, ...u))
              : ie(c) && (s.add(c), c(a, ...u))),
          a
        );
      },
      mixin(c) {
        return i.mixins.includes(c) || i.mixins.push(c), a;
      },
      component(c, u) {
        return u ? ((i.components[c] = u), a) : i.components[c];
      },
      directive(c, u) {
        return u ? ((i.directives[c] = u), a) : i.directives[c];
      },
      mount(c, u, d) {
        if (!l) {
          const f = Ie(o, r);
          return (
            (f.appContext = i),
            d === !0 ? (d = "svg") : d === !1 && (d = void 0),
            u && t ? t(f, c) : e(f, c, d),
            (l = !0),
            (a._container = c),
            (c.__vue_app__ = a),
            Do(f.component) || f.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(c, u) {
        return (i.provides[c] = u), a;
      },
      runWithContext(c) {
        _o = a;
        try {
          return c();
        } finally {
          _o = null;
        }
      },
    });
    return a;
  };
}
let _o = null;
function fo(e, t) {
  if (Me) {
    let n = Me.provides;
    const o = Me.parent && Me.parent.provides;
    o === n && (n = Me.provides = Object.create(o)), (n[e] = t);
  }
}
function ut(e, t, n = !1) {
  const o = Me || Fe;
  if (o || _o) {
    const r = o
      ? o.parent == null
        ? o.vnode.appContext && o.vnode.appContext.provides
        : o.parent.provides
      : _o._context.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && ie(t) ? t.call(o && o.proxy) : t;
  }
}
function Lc(e, t, n, o = !1) {
  const r = {},
    i = {};
  po(i, No, 1), (e.propsDefaults = Object.create(null)), Zl(e, t, r, i);
  for (const s in e.propsOptions[0]) s in r || (r[s] = void 0);
  n ? (e.props = o ? r : kl(r)) : e.type.props ? (e.props = r) : (e.props = i),
    (e.attrs = i);
}
function Fc(e, t, n, o) {
  const {
      props: r,
      attrs: i,
      vnode: { patchFlag: s },
    } = e,
    l = se(r),
    [a] = e.propsOptions;
  let c = !1;
  if ((o || s > 0) && !(s & 16)) {
    if (s & 8) {
      const u = e.vnode.dynamicProps;
      for (let d = 0; d < u.length; d++) {
        let f = u[d];
        if (Oo(e.emitsOptions, f)) continue;
        const p = t[f];
        if (a)
          if (ce(i, f)) p !== i[f] && ((i[f] = p), (c = !0));
          else {
            const y = ct(f);
            r[y] = Rr(a, l, y, p, e, !1);
          }
        else p !== i[f] && ((i[f] = p), (c = !0));
      }
    }
  } else {
    Zl(e, t, r, i) && (c = !0);
    let u;
    for (const d in l)
      (!t || (!ce(t, d) && ((u = Kt(d)) === d || !ce(t, u)))) &&
        (a
          ? n &&
            (n[d] !== void 0 || n[u] !== void 0) &&
            (r[d] = Rr(a, l, d, void 0, e, !0))
          : delete r[d]);
    if (i !== l)
      for (const d in i) (!t || (!ce(t, d) && !0)) && (delete i[d], (c = !0));
  }
  c && ht(e, "set", "$attrs");
}
function Zl(e, t, n, o) {
  const [r, i] = e.propsOptions;
  let s = !1,
    l;
  if (t)
    for (let a in t) {
      if (uo(a)) continue;
      const c = t[a];
      let u;
      r && ce(r, (u = ct(a)))
        ? !i || !i.includes(u)
          ? (n[u] = c)
          : ((l || (l = {}))[u] = c)
        : Oo(e.emitsOptions, a) ||
          ((!(a in o) || c !== o[a]) && ((o[a] = c), (s = !0)));
    }
  if (i) {
    const a = se(n),
      c = l || ve;
    for (let u = 0; u < i.length; u++) {
      const d = i[u];
      n[d] = Rr(r, a, d, c[d], e, !ce(c, d));
    }
  }
  return s;
}
function Rr(e, t, n, o, r, i) {
  const s = e[n];
  if (s != null) {
    const l = ce(s, "default");
    if (l && o === void 0) {
      const a = s.default;
      if (s.type !== Function && !s.skipFactory && ie(a)) {
        const { propsDefaults: c } = r;
        if (n in c) o = c[n];
        else {
          const u = Un(r);
          (o = c[n] = a.call(null, t)), u();
        }
      } else o = a;
    }
    s[0] &&
      (i && !l ? (o = !1) : s[1] && (o === "" || o === Kt(n)) && (o = !0));
  }
  return o;
}
function Xl(e, t, n = !1) {
  const o = t.propsCache,
    r = o.get(e);
  if (r) return r;
  const i = e.props,
    s = {},
    l = [];
  let a = !1;
  if (!ie(e)) {
    const u = (d) => {
      a = !0;
      const [f, p] = Xl(d, t, !0);
      Ee(s, f), p && l.push(...p);
    };
    !n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  if (!i && !a) return be(e) && o.set(e, rn), rn;
  if (oe(i))
    for (let u = 0; u < i.length; u++) {
      const d = ct(i[u]);
      Bi(d) && (s[d] = ve);
    }
  else if (i)
    for (const u in i) {
      const d = ct(u);
      if (Bi(d)) {
        const f = i[u],
          p = (s[d] = oe(f) || ie(f) ? { type: f } : Ee({}, f));
        if (p) {
          const y = Ni(Boolean, p.type),
            T = Ni(String, p.type);
          (p[0] = y > -1),
            (p[1] = T < 0 || y < T),
            (y > -1 || ce(p, "default")) && l.push(d);
        }
      }
    }
  const c = [s, l];
  return be(e) && o.set(e, c), c;
}
function Bi(e) {
  return e[0] !== "$";
}
function Ii(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Vi(e, t) {
  return Ii(e) === Ii(t);
}
function Ni(e, t) {
  return oe(t) ? t.findIndex((n) => Vi(n, e)) : ie(t) && Vi(t, e) ? 0 : -1;
}
const Jl = (e) => e[0] === "_" || e === "$stable",
  ui = (e) => (oe(e) ? e.map(st) : [st(e)]),
  Bc = (e, t, n) => {
    if (t._n) return t;
    const o = sc((...r) => ui(t(...r)), n);
    return (o._c = !1), o;
  },
  ea = (e, t, n) => {
    const o = e._ctx;
    for (const r in e) {
      if (Jl(r)) continue;
      const i = e[r];
      if (ie(i)) t[r] = Bc(r, i, o);
      else if (i != null) {
        const s = ui(i);
        t[r] = () => s;
      }
    }
  },
  ta = (e, t) => {
    const n = ui(t);
    e.slots.default = () => n;
  },
  Ic = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = se(t)), po(t, "_", n)) : ea(t, (e.slots = {}));
    } else (e.slots = {}), t && ta(e, t);
    po(e.slots, No, 1);
  },
  Vc = (e, t, n) => {
    const { vnode: o, slots: r } = e;
    let i = !0,
      s = ve;
    if (o.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (i = !1)
          : (Ee(r, t), !n && l === 1 && delete r._)
        : ((i = !t.$stable), ea(t, r)),
        (s = t);
    } else t && (ta(e, t), (s = { default: 1 }));
    if (i) for (const l in r) !Jl(l) && s[l] == null && delete r[l];
  };
function Tr(e, t, n, o, r = !1) {
  if (oe(e)) {
    e.forEach((f, p) => Tr(f, t && (oe(t) ? t[p] : t), n, o, r));
    return;
  }
  if (Pn(o) && !r) return;
  const i = o.shapeFlag & 4 ? Do(o.component) || o.component.proxy : o.el,
    s = r ? null : i,
    { i: l, r: a } = e,
    c = t && t.r,
    u = l.refs === ve ? (l.refs = {}) : l.refs,
    d = l.setupState;
  if (
    (c != null &&
      c !== a &&
      (xe(c)
        ? ((u[c] = null), ce(d, c) && (d[c] = null))
        : Ne(c) && (c.value = null)),
    ie(a))
  )
    Pt(a, l, 12, [s, u]);
  else {
    const f = xe(a),
      p = Ne(a),
      y = e.f;
    if (f || p) {
      const T = () => {
        if (y) {
          const w = f ? (ce(d, a) ? d[a] : u[a]) : a.value;
          r
            ? oe(w) && Ur(w, i)
            : oe(w)
            ? w.includes(i) || w.push(i)
            : f
            ? ((u[a] = [i]), ce(d, a) && (d[a] = u[a]))
            : ((a.value = [i]), e.k && (u[e.k] = a.value));
        } else
          f
            ? ((u[a] = s), ce(d, a) && (d[a] = s))
            : p && ((a.value = s), e.k && (u[e.k] = s));
      };
      r || y ? T() : ((T.id = -1), Ae(T, n));
    }
  }
}
const Ae = gc;
function Nc(e) {
  return jc(e);
}
function jc(e, t) {
  const n = al();
  n.__VUE__ = !0;
  const {
      insert: o,
      remove: r,
      patchProp: i,
      createElement: s,
      createText: l,
      createComment: a,
      setText: c,
      setElementText: u,
      parentNode: d,
      nextSibling: f,
      setScopeId: p = He,
      insertStaticContent: y,
    } = e,
    T = (
      h,
      g,
      _,
      L = null,
      P = null,
      j = null,
      U = void 0,
      N = null,
      z = !!g.dynamicChildren
    ) => {
      if (h === g) return;
      h && !Et(h, g) && ((L = R(h)), B(h, P, j, !0), (h = null)),
        g.patchFlag === -2 && ((z = !1), (g.dynamicChildren = null));
      const { type: I, ref: Y, shapeFlag: ee } = g;
      switch (I) {
        case Vo:
          w(h, g, _, L);
          break;
        case ot:
          O(h, g, _, L);
          break;
        case er:
          h == null && m(g, _, L, U);
          break;
        case et:
          v(h, g, _, L, P, j, U, N, z);
          break;
        default:
          ee & 1
            ? $(h, g, _, L, P, j, U, N, z)
            : ee & 6
            ? D(h, g, _, L, P, j, U, N, z)
            : (ee & 64 || ee & 128) && I.process(h, g, _, L, P, j, U, N, z, X);
      }
      Y != null && P && Tr(Y, h && h.ref, j, g || h, !g);
    },
    w = (h, g, _, L) => {
      if (h == null) o((g.el = l(g.children)), _, L);
      else {
        const P = (g.el = h.el);
        g.children !== h.children && c(P, g.children);
      }
    },
    O = (h, g, _, L) => {
      h == null ? o((g.el = a(g.children || "")), _, L) : (g.el = h.el);
    },
    m = (h, g, _, L) => {
      [h.el, h.anchor] = y(h.children, g, _, L, h.el, h.anchor);
    },
    b = ({ el: h, anchor: g }, _, L) => {
      let P;
      for (; h && h !== g; ) (P = f(h)), o(h, _, L), (h = P);
      o(g, _, L);
    },
    M = ({ el: h, anchor: g }) => {
      let _;
      for (; h && h !== g; ) (_ = f(h)), r(h), (h = _);
      r(g);
    },
    $ = (h, g, _, L, P, j, U, N, z) => {
      g.type === "svg" ? (U = "svg") : g.type === "math" && (U = "mathml"),
        h == null ? q(g, _, L, P, j, U, N, z) : C(h, g, P, j, U, N, z);
    },
    q = (h, g, _, L, P, j, U, N) => {
      let z, I;
      const { props: Y, shapeFlag: ee, transition: J, dirs: re } = h;
      if (
        ((z = h.el = s(h.type, j, Y && Y.is, Y)),
        ee & 8
          ? u(z, h.children)
          : ee & 16 && H(h.children, z, null, L, P, Jo(h, j), U, N),
        re && qt(h, null, L, "created"),
        V(z, h, h.scopeId, U, L),
        Y)
      ) {
        for (const me in Y)
          me !== "value" &&
            !uo(me) &&
            i(z, me, null, Y[me], j, h.children, L, P, te);
        "value" in Y && i(z, "value", null, Y.value, j),
          (I = Y.onVnodeBeforeMount) && Ue(I, L, h);
      }
      re && qt(h, null, L, "beforeMount");
      const ae = Dc(P, J);
      ae && J.beforeEnter(z),
        o(z, g, _),
        ((I = Y && Y.onVnodeMounted) || ae || re) &&
          Ae(() => {
            I && Ue(I, L, h), ae && J.enter(z), re && qt(h, null, L, "mounted");
          }, P);
    },
    V = (h, g, _, L, P) => {
      if ((_ && p(h, _), L)) for (let j = 0; j < L.length; j++) p(h, L[j]);
      if (P) {
        let j = P.subTree;
        if (g === j) {
          const U = P.vnode;
          V(h, U, U.scopeId, U.slotScopeIds, P.parent);
        }
      }
    },
    H = (h, g, _, L, P, j, U, N, z = 0) => {
      for (let I = z; I < h.length; I++) {
        const Y = (h[I] = N ? Ct(h[I]) : st(h[I]));
        T(null, Y, g, _, L, P, j, U, N);
      }
    },
    C = (h, g, _, L, P, j, U) => {
      const N = (g.el = h.el);
      let { patchFlag: z, dynamicChildren: I, dirs: Y } = g;
      z |= h.patchFlag & 16;
      const ee = h.props || ve,
        J = g.props || ve;
      let re;
      if (
        (_ && $t(_, !1),
        (re = J.onVnodeBeforeUpdate) && Ue(re, _, g, h),
        Y && qt(g, h, _, "beforeUpdate"),
        _ && $t(_, !0),
        I
          ? x(h.dynamicChildren, I, N, _, L, Jo(g, P), j)
          : U || Q(h, g, N, null, _, L, Jo(g, P), j, !1),
        z > 0)
      ) {
        if (z & 16) F(N, g, ee, J, _, L, P);
        else if (
          (z & 2 && ee.class !== J.class && i(N, "class", null, J.class, P),
          z & 4 && i(N, "style", ee.style, J.style, P),
          z & 8)
        ) {
          const ae = g.dynamicProps;
          for (let me = 0; me < ae.length; me++) {
            const we = ae[me],
              Te = ee[we],
              Ye = J[we];
            (Ye !== Te || we === "value") &&
              i(N, we, Te, Ye, P, h.children, _, L, te);
          }
        }
        z & 1 && h.children !== g.children && u(N, g.children);
      } else !U && I == null && F(N, g, ee, J, _, L, P);
      ((re = J.onVnodeUpdated) || Y) &&
        Ae(() => {
          re && Ue(re, _, g, h), Y && qt(g, h, _, "updated");
        }, L);
    },
    x = (h, g, _, L, P, j, U) => {
      for (let N = 0; N < g.length; N++) {
        const z = h[N],
          I = g[N],
          Y =
            z.el && (z.type === et || !Et(z, I) || z.shapeFlag & 70)
              ? d(z.el)
              : _;
        T(z, I, Y, null, L, P, j, U, !0);
      }
    },
    F = (h, g, _, L, P, j, U) => {
      if (_ !== L) {
        if (_ !== ve)
          for (const N in _)
            !uo(N) && !(N in L) && i(h, N, _[N], null, U, g.children, P, j, te);
        for (const N in L) {
          if (uo(N)) continue;
          const z = L[N],
            I = _[N];
          z !== I && N !== "value" && i(h, N, I, z, U, g.children, P, j, te);
        }
        "value" in L && i(h, "value", _.value, L.value, U);
      }
    },
    v = (h, g, _, L, P, j, U, N, z) => {
      const I = (g.el = h ? h.el : l("")),
        Y = (g.anchor = h ? h.anchor : l(""));
      let { patchFlag: ee, dynamicChildren: J, slotScopeIds: re } = g;
      re && (N = N ? N.concat(re) : re),
        h == null
          ? (o(I, _, L), o(Y, _, L), H(g.children || [], _, Y, P, j, U, N, z))
          : ee > 0 && ee & 64 && J && h.dynamicChildren
          ? (x(h.dynamicChildren, J, _, P, j, U, N),
            (g.key != null || (P && g === P.subTree)) && ci(h, g, !0))
          : Q(h, g, _, Y, P, j, U, N, z);
    },
    D = (h, g, _, L, P, j, U, N, z) => {
      (g.slotScopeIds = N),
        h == null
          ? g.shapeFlag & 512
            ? P.ctx.activate(g, _, L, U, z)
            : k(g, _, L, P, j, U, z)
          : Z(h, g, z);
    },
    k = (h, g, _, L, P, j, U) => {
      const N = (h.component = tf(h, L, P));
      if ((Fo(h) && (N.ctx.renderer = X), nf(N), N.asyncDep)) {
        if ((P && P.registerDep(N, G), !h.el)) {
          const z = (N.subTree = Ie(ot));
          O(null, z, g, _);
        }
      } else G(N, h, g, _, P, j, U);
    },
    Z = (h, g, _) => {
      const L = (g.component = h.component);
      if (uc(h, g, _))
        if (L.asyncDep && !L.asyncResolved) {
          A(L, g, _);
          return;
        } else (L.next = g), nc(L.update), (L.effect.dirty = !0), L.update();
      else (g.el = h.el), (L.vnode = g);
    },
    G = (h, g, _, L, P, j, U) => {
      const N = () => {
          if (h.isMounted) {
            let { next: Y, bu: ee, u: J, parent: re, vnode: ae } = h;
            {
              const Xt = na(h);
              if (Xt) {
                Y && ((Y.el = ae.el), A(h, Y, U)),
                  Xt.asyncDep.then(() => {
                    h.isUnmounted || N();
                  });
                return;
              }
            }
            let me = Y,
              we;
            $t(h, !1),
              Y ? ((Y.el = ae.el), A(h, Y, U)) : (Y = ae),
              ee && Tn(ee),
              (we = Y.props && Y.props.onVnodeBeforeUpdate) &&
                Ue(we, re, Y, ae),
              $t(h, !0);
            const Te = Qo(h),
              Ye = h.subTree;
            (h.subTree = Te),
              T(Ye, Te, d(Ye.el), R(Ye), h, P, j),
              (Y.el = Te.el),
              me === null && cc(h, Te.el),
              J && Ae(J, P),
              (we = Y.props && Y.props.onVnodeUpdated) &&
                Ae(() => Ue(we, re, Y, ae), P);
          } else {
            let Y;
            const { el: ee, props: J } = g,
              { bm: re, m: ae, parent: me } = h,
              we = Pn(g);
            if (
              ($t(h, !1),
              re && Tn(re),
              !we && (Y = J && J.onVnodeBeforeMount) && Ue(Y, me, g),
              $t(h, !0),
              ee && _e)
            ) {
              const Te = () => {
                (h.subTree = Qo(h)), _e(ee, h.subTree, h, P, null);
              };
              we
                ? g.type.__asyncLoader().then(() => !h.isUnmounted && Te())
                : Te();
            } else {
              const Te = (h.subTree = Qo(h));
              T(null, Te, _, L, h, P, j), (g.el = Te.el);
            }
            if ((ae && Ae(ae, P), !we && (Y = J && J.onVnodeMounted))) {
              const Te = g;
              Ae(() => Ue(Y, me, Te), P);
            }
            (g.shapeFlag & 256 ||
              (me && Pn(me.vnode) && me.vnode.shapeFlag & 256)) &&
              h.a &&
              Ae(h.a, P),
              (h.isMounted = !0),
              (g = _ = L = null);
          }
        },
        z = (h.effect = new Yr(N, He, () => ri(I), h.scope)),
        I = (h.update = () => {
          z.dirty && z.run();
        });
      (I.id = h.uid), $t(h, !0), I();
    },
    A = (h, g, _) => {
      g.component = h;
      const L = h.vnode.props;
      (h.vnode = g),
        (h.next = null),
        Fc(h, g.props, L, _),
        Vc(h, g.children, _),
        Ut(),
        Pi(h),
        Wt();
    },
    Q = (h, g, _, L, P, j, U, N, z = !1) => {
      const I = h && h.children,
        Y = h ? h.shapeFlag : 0,
        ee = g.children,
        { patchFlag: J, shapeFlag: re } = g;
      if (J > 0) {
        if (J & 128) {
          le(I, ee, _, L, P, j, U, N, z);
          return;
        } else if (J & 256) {
          ye(I, ee, _, L, P, j, U, N, z);
          return;
        }
      }
      re & 8
        ? (Y & 16 && te(I, P, j), ee !== I && u(_, ee))
        : Y & 16
        ? re & 16
          ? le(I, ee, _, L, P, j, U, N, z)
          : te(I, P, j, !0)
        : (Y & 8 && u(_, ""), re & 16 && H(ee, _, L, P, j, U, N, z));
    },
    ye = (h, g, _, L, P, j, U, N, z) => {
      (h = h || rn), (g = g || rn);
      const I = h.length,
        Y = g.length,
        ee = Math.min(I, Y);
      let J;
      for (J = 0; J < ee; J++) {
        const re = (g[J] = z ? Ct(g[J]) : st(g[J]));
        T(h[J], re, _, null, P, j, U, N, z);
      }
      I > Y ? te(h, P, j, !0, !1, ee) : H(g, _, L, P, j, U, N, z, ee);
    },
    le = (h, g, _, L, P, j, U, N, z) => {
      let I = 0;
      const Y = g.length;
      let ee = h.length - 1,
        J = Y - 1;
      for (; I <= ee && I <= J; ) {
        const re = h[I],
          ae = (g[I] = z ? Ct(g[I]) : st(g[I]));
        if (Et(re, ae)) T(re, ae, _, null, P, j, U, N, z);
        else break;
        I++;
      }
      for (; I <= ee && I <= J; ) {
        const re = h[ee],
          ae = (g[J] = z ? Ct(g[J]) : st(g[J]));
        if (Et(re, ae)) T(re, ae, _, null, P, j, U, N, z);
        else break;
        ee--, J--;
      }
      if (I > ee) {
        if (I <= J) {
          const re = J + 1,
            ae = re < Y ? g[re].el : L;
          for (; I <= J; )
            T(null, (g[I] = z ? Ct(g[I]) : st(g[I])), _, ae, P, j, U, N, z),
              I++;
        }
      } else if (I > J) for (; I <= ee; ) B(h[I], P, j, !0), I++;
      else {
        const re = I,
          ae = I,
          me = new Map();
        for (I = ae; I <= J; I++) {
          const je = (g[I] = z ? Ct(g[I]) : st(g[I]));
          je.key != null && me.set(je.key, I);
        }
        let we,
          Te = 0;
        const Ye = J - ae + 1;
        let Xt = !1,
          bi = 0;
        const yn = new Array(Ye);
        for (I = 0; I < Ye; I++) yn[I] = 0;
        for (I = re; I <= ee; I++) {
          const je = h[I];
          if (Te >= Ye) {
            B(je, P, j, !0);
            continue;
          }
          let it;
          if (je.key != null) it = me.get(je.key);
          else
            for (we = ae; we <= J; we++)
              if (yn[we - ae] === 0 && Et(je, g[we])) {
                it = we;
                break;
              }
          it === void 0
            ? B(je, P, j, !0)
            : ((yn[it - ae] = I + 1),
              it >= bi ? (bi = it) : (Xt = !0),
              T(je, g[it], _, null, P, j, U, N, z),
              Te++);
        }
        const yi = Xt ? Hc(yn) : rn;
        for (we = yi.length - 1, I = Ye - 1; I >= 0; I--) {
          const je = ae + I,
            it = g[je],
            _i = je + 1 < Y ? g[je + 1].el : L;
          yn[I] === 0
            ? T(null, it, _, _i, P, j, U, N, z)
            : Xt && (we < 0 || I !== yi[we] ? fe(it, _, _i, 2) : we--);
        }
      }
    },
    fe = (h, g, _, L, P = null) => {
      const { el: j, type: U, transition: N, children: z, shapeFlag: I } = h;
      if (I & 6) {
        fe(h.component.subTree, g, _, L);
        return;
      }
      if (I & 128) {
        h.suspense.move(g, _, L);
        return;
      }
      if (I & 64) {
        U.move(h, g, _, X);
        return;
      }
      if (U === et) {
        o(j, g, _);
        for (let ee = 0; ee < z.length; ee++) fe(z[ee], g, _, L);
        o(h.anchor, g, _);
        return;
      }
      if (U === er) {
        b(h, g, _);
        return;
      }
      if (L !== 2 && I & 1 && N)
        if (L === 0) N.beforeEnter(j), o(j, g, _), Ae(() => N.enter(j), P);
        else {
          const { leave: ee, delayLeave: J, afterLeave: re } = N,
            ae = () => o(j, g, _),
            me = () => {
              ee(j, () => {
                ae(), re && re();
              });
            };
          J ? J(j, ae, me) : me();
        }
      else o(j, g, _);
    },
    B = (h, g, _, L = !1, P = !1) => {
      const {
        type: j,
        props: U,
        ref: N,
        children: z,
        dynamicChildren: I,
        shapeFlag: Y,
        patchFlag: ee,
        dirs: J,
      } = h;
      if ((N != null && Tr(N, null, _, h, !0), Y & 256)) {
        g.ctx.deactivate(h);
        return;
      }
      const re = Y & 1 && J,
        ae = !Pn(h);
      let me;
      if ((ae && (me = U && U.onVnodeBeforeUnmount) && Ue(me, g, h), Y & 6))
        ne(h.component, _, L);
      else {
        if (Y & 128) {
          h.suspense.unmount(_, L);
          return;
        }
        re && qt(h, null, g, "beforeUnmount"),
          Y & 64
            ? h.type.remove(h, g, _, P, X, L)
            : I && (j !== et || (ee > 0 && ee & 64))
            ? te(I, g, _, !1, !0)
            : ((j === et && ee & 384) || (!P && Y & 16)) && te(z, g, _),
          L && ue(h);
      }
      ((ae && (me = U && U.onVnodeUnmounted)) || re) &&
        Ae(() => {
          me && Ue(me, g, h), re && qt(h, null, g, "unmounted");
        }, _);
    },
    ue = (h) => {
      const { type: g, el: _, anchor: L, transition: P } = h;
      if (g === et) {
        Re(_, L);
        return;
      }
      if (g === er) {
        M(h);
        return;
      }
      const j = () => {
        r(_), P && !P.persisted && P.afterLeave && P.afterLeave();
      };
      if (h.shapeFlag & 1 && P && !P.persisted) {
        const { leave: U, delayLeave: N } = P,
          z = () => U(_, j);
        N ? N(h.el, j, z) : z();
      } else j();
    },
    Re = (h, g) => {
      let _;
      for (; h !== g; ) (_ = f(h)), r(h), (h = _);
      r(g);
    },
    ne = (h, g, _) => {
      const { bum: L, scope: P, update: j, subTree: U, um: N } = h;
      L && Tn(L),
        P.stop(),
        j && ((j.active = !1), B(U, h, g, _)),
        N && Ae(N, g),
        Ae(() => {
          h.isUnmounted = !0;
        }, g),
        g &&
          g.pendingBranch &&
          !g.isUnmounted &&
          h.asyncDep &&
          !h.asyncResolved &&
          h.suspenseId === g.pendingId &&
          (g.deps--, g.deps === 0 && g.resolve());
    },
    te = (h, g, _, L = !1, P = !1, j = 0) => {
      for (let U = j; U < h.length; U++) B(h[U], g, _, L, P);
    },
    R = (h) =>
      h.shapeFlag & 6
        ? R(h.component.subTree)
        : h.shapeFlag & 128
        ? h.suspense.next()
        : f(h.anchor || h.el);
  let W = !1;
  const K = (h, g, _) => {
      h == null
        ? g._vnode && B(g._vnode, null, null, !0)
        : T(g._vnode || null, h, g, null, null, null, _),
        W || ((W = !0), Pi(), $l(), (W = !1)),
        (g._vnode = h);
    },
    X = { p: T, um: B, m: fe, r: ue, mt: k, mc: H, pc: Q, pbc: x, n: R, o: e };
  let he, _e;
  return (
    t && ([he, _e] = t(X)), { render: K, hydrate: he, createApp: Oc(K, he) }
  );
}
function Jo({ type: e, props: t }, n) {
  return (n === "svg" && e === "foreignObject") ||
    (n === "mathml" &&
      e === "annotation-xml" &&
      t &&
      t.encoding &&
      t.encoding.includes("html"))
    ? void 0
    : n;
}
function $t({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Dc(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function ci(e, t, n = !1) {
  const o = e.children,
    r = t.children;
  if (oe(o) && oe(r))
    for (let i = 0; i < o.length; i++) {
      const s = o[i];
      let l = r[i];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = r[i] = Ct(r[i])), (l.el = s.el)),
        n || ci(s, l)),
        l.type === Vo && (l.el = s.el);
    }
}
function Hc(e) {
  const t = e.slice(),
    n = [0];
  let o, r, i, s, l;
  const a = e.length;
  for (o = 0; o < a; o++) {
    const c = e[o];
    if (c !== 0) {
      if (((r = n[n.length - 1]), e[r] < c)) {
        (t[o] = r), n.push(o);
        continue;
      }
      for (i = 0, s = n.length - 1; i < s; )
        (l = (i + s) >> 1), e[n[l]] < c ? (i = l + 1) : (s = l);
      c < e[n[i]] && (i > 0 && (t[o] = n[i - 1]), (n[i] = o));
    }
  }
  for (i = n.length, s = n[i - 1]; i-- > 0; ) (n[i] = s), (s = t[s]);
  return n;
}
function na(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : na(t);
}
const zc = (e) => e.__isTeleport,
  Mn = (e) => e && (e.disabled || e.disabled === ""),
  ji = (e) => typeof SVGElement != "undefined" && e instanceof SVGElement,
  Di = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement,
  Pr = (e, t) => {
    const n = e && e.to;
    return xe(n) ? (t ? t(n) : null) : n;
  },
  Kc = {
    name: "Teleport",
    __isTeleport: !0,
    process(e, t, n, o, r, i, s, l, a, c) {
      const {
          mc: u,
          pc: d,
          pbc: f,
          o: { insert: p, querySelector: y, createText: T, createComment: w },
        } = c,
        O = Mn(t.props);
      let { shapeFlag: m, children: b, dynamicChildren: M } = t;
      if (e == null) {
        const $ = (t.el = T("")),
          q = (t.anchor = T(""));
        p($, n, o), p(q, n, o);
        const V = (t.target = Pr(t.props, y)),
          H = (t.targetAnchor = T(""));
        V &&
          (p(H, V),
          s === "svg" || ji(V)
            ? (s = "svg")
            : (s === "mathml" || Di(V)) && (s = "mathml"));
        const C = (x, F) => {
          m & 16 && u(b, x, F, r, i, s, l, a);
        };
        O ? C(n, q) : V && C(V, H);
      } else {
        t.el = e.el;
        const $ = (t.anchor = e.anchor),
          q = (t.target = e.target),
          V = (t.targetAnchor = e.targetAnchor),
          H = Mn(e.props),
          C = H ? n : q,
          x = H ? $ : V;
        if (
          (s === "svg" || ji(q)
            ? (s = "svg")
            : (s === "mathml" || Di(q)) && (s = "mathml"),
          M
            ? (f(e.dynamicChildren, M, C, r, i, s, l), ci(e, t, !0))
            : a || d(e, t, C, x, r, i, s, l, !1),
          O)
        )
          H
            ? t.props &&
              e.props &&
              t.props.to !== e.props.to &&
              (t.props.to = e.props.to)
            : no(t, n, $, c, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const F = (t.target = Pr(t.props, y));
          F && no(t, F, null, c, 0);
        } else H && no(t, q, V, c, 1);
      }
      oa(t);
    },
    remove(e, t, n, o, { um: r, o: { remove: i } }, s) {
      const {
        shapeFlag: l,
        children: a,
        anchor: c,
        targetAnchor: u,
        target: d,
        props: f,
      } = e;
      if ((d && i(u), s && i(c), l & 16)) {
        const p = s || !Mn(f);
        for (let y = 0; y < a.length; y++) {
          const T = a[y];
          r(T, t, n, p, !!T.dynamicChildren);
        }
      }
    },
    move: no,
    hydrate: Uc,
  };
function no(e, t, n, { o: { insert: o }, m: r }, i = 2) {
  i === 0 && o(e.targetAnchor, t, n);
  const { el: s, anchor: l, shapeFlag: a, children: c, props: u } = e,
    d = i === 2;
  if ((d && o(s, t, n), (!d || Mn(u)) && a & 16))
    for (let f = 0; f < c.length; f++) r(c[f], t, n, 2);
  d && o(l, t, n);
}
function Uc(
  e,
  t,
  n,
  o,
  r,
  i,
  { o: { nextSibling: s, parentNode: l, querySelector: a } },
  c
) {
  const u = (t.target = Pr(t.props, a));
  if (u) {
    const d = u._lpa || u.firstChild;
    if (t.shapeFlag & 16)
      if (Mn(t.props))
        (t.anchor = c(s(e), t, l(e), n, o, r, i)), (t.targetAnchor = d);
      else {
        t.anchor = s(e);
        let f = d;
        for (; f; )
          if (
            ((f = s(f)), f && f.nodeType === 8 && f.data === "teleport anchor")
          ) {
            (t.targetAnchor = f),
              (u._lpa = t.targetAnchor && s(t.targetAnchor));
            break;
          }
        c(d, t, u, n, o, r, i);
      }
    oa(t);
  }
  return t.anchor && s(t.anchor);
}
const Wc = Kc;
function oa(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n && n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid),
        (n = n.nextSibling);
    t.ut();
  }
}
const et = Symbol.for("v-fgt"),
  Vo = Symbol.for("v-txt"),
  ot = Symbol.for("v-cmt"),
  er = Symbol.for("v-stc"),
  qn = [];
let tt = null;
function ra(e = !1) {
  qn.push((tt = e ? null : []));
}
function Qc() {
  qn.pop(), (tt = qn[qn.length - 1] || null);
}
let Vn = 1;
function Hi(e) {
  Vn += e;
}
function ia(e) {
  return (
    (e.dynamicChildren = Vn > 0 ? tt || rn : null),
    Qc(),
    Vn > 0 && tt && tt.push(e),
    e
  );
}
function Rm(e, t, n, o, r, i) {
  return ia(aa(e, t, n, o, r, i, !0));
}
function sa(e, t, n, o, r) {
  return ia(Ie(e, t, n, o, r, !0));
}
function wo(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Et(e, t) {
  return e.type === t.type && e.key === t.key;
}
const No = "__vInternal",
  la = ({ key: e }) => (e != null ? e : null),
  ho = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? xe(e) || Ne(e) || ie(e)
        ? { i: Fe, r: e, k: t, f: !!n }
        : e
      : null
  );
function aa(
  e,
  t = null,
  n = null,
  o = 0,
  r = null,
  i = e === et ? 0 : 1,
  s = !1,
  l = !1
) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && la(t),
    ref: t && ho(t),
    scopeId: Fl,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: o,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: Fe,
  };
  return (
    l
      ? (fi(a, n), i & 128 && e.normalize(a))
      : n && (a.shapeFlag |= xe(n) ? 8 : 16),
    Vn > 0 &&
      !s &&
      tt &&
      (a.patchFlag > 0 || i & 6) &&
      a.patchFlag !== 32 &&
      tt.push(a),
    a
  );
}
const Ie = Gc;
function Gc(e, t = null, n = null, o = 0, r = null, i = !1) {
  if (((!e || e === hc) && (e = ot), wo(e))) {
    const l = gt(e, t, !0);
    return (
      n && fi(l, n),
      Vn > 0 &&
        !i &&
        tt &&
        (l.shapeFlag & 6 ? (tt[tt.indexOf(e)] = l) : tt.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((lf(e) && (e = e.__vccOpts), t)) {
    t = Yc(t);
    let { class: l, style: a } = t;
    l && !xe(l) && (t.class = Gr(l)),
      be(a) && (El(a) && !oe(a) && (a = Ee({}, a)), (t.style = Qr(a)));
  }
  const s = xe(e) ? 1 : Vl(e) ? 128 : zc(e) ? 64 : be(e) ? 4 : ie(e) ? 2 : 0;
  return aa(e, t, n, o, r, s, i, !0);
}
function Yc(e) {
  return e ? (El(e) || No in e ? Ee({}, e) : e) : null;
}
function gt(e, t, n = !1) {
  const { props: o, ref: r, patchFlag: i, children: s } = e,
    l = t ? Xc(o || {}, t) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && la(l),
    ref:
      t && t.ref
        ? n && r
          ? oe(r)
            ? r.concat(ho(t))
            : [r, ho(t)]
          : ho(t)
        : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: s,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== et ? (i === -1 ? 16 : i | 16) : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && gt(e.ssContent),
    ssFallback: e.ssFallback && gt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function Zc(e = " ", t = 0) {
  return Ie(Vo, null, e, t);
}
function Tm(e = "", t = !1) {
  return t ? (ra(), sa(ot, null, e)) : Ie(ot, null, e);
}
function st(e) {
  return e == null || typeof e == "boolean"
    ? Ie(ot)
    : oe(e)
    ? Ie(et, null, e.slice())
    : typeof e == "object"
    ? Ct(e)
    : Ie(Vo, null, String(e));
}
function Ct(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : gt(e);
}
function fi(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null) t = null;
  else if (oe(t)) n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), fi(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(No in t)
        ? (t._ctx = Fe)
        : r === 3 &&
          Fe &&
          (Fe.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    ie(t)
      ? ((t = { default: t, _ctx: Fe }), (n = 32))
      : ((t = String(t)), o & 64 ? ((n = 16), (t = [Zc(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Xc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const r in o)
      if (r === "class")
        t.class !== o.class && (t.class = Gr([t.class, o.class]));
      else if (r === "style") t.style = Qr([t.style, o.style]);
      else if (Po(r)) {
        const i = t[r],
          s = o[r];
        s &&
          i !== s &&
          !(oe(i) && i.includes(s)) &&
          (t[r] = i ? [].concat(i, s) : s);
      } else r !== "" && (t[r] = o[r]);
  }
  return t;
}
function Ue(e, t, n, o = null) {
  Qe(e, t, 7, [n, o]);
}
const Jc = Yl();
let ef = 0;
function tf(e, t, n) {
  const o = e.type,
    r = (t ? t.appContext : e.appContext) || Jc,
    i = {
      uid: ef++,
      vnode: e,
      type: o,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new fl(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Xl(o, r),
      emitsOptions: Ll(o, r),
      emit: null,
      emitted: null,
      propsDefaults: ve,
      inheritAttrs: o.inheritAttrs,
      ctx: ve,
      data: ve,
      props: ve,
      attrs: ve,
      slots: ve,
      refs: ve,
      setupState: ve,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (i.ctx = { _: i }),
    (i.root = t ? t.root : i),
    (i.emit = ic.bind(null, i)),
    e.ce && e.ce(i),
    i
  );
}
let Me = null;
const ke = () => Me || Fe;
let xo, Ar;
{
  const e = al(),
    t = (n, o) => {
      let r;
      return (
        (r = e[n]) || (r = e[n] = []),
        r.push(o),
        (i) => {
          r.length > 1 ? r.forEach((s) => s(i)) : r[0](i);
        }
      );
    };
  (xo = t("__VUE_INSTANCE_SETTERS__", (n) => (Me = n))),
    (Ar = t("__VUE_SSR_SETTERS__", (n) => (jo = n)));
}
const Un = (e) => {
    const t = Me;
    return (
      xo(e),
      e.scope.on(),
      () => {
        e.scope.off(), xo(t);
      }
    );
  },
  zi = () => {
    Me && Me.scope.off(), xo(null);
  };
function ua(e) {
  return e.vnode.shapeFlag & 4;
}
let jo = !1;
function nf(e, t = !1) {
  t && Ar(t);
  const { props: n, children: o } = e.vnode,
    r = ua(e);
  Lc(e, n, r, t), Ic(e, o);
  const i = r ? of(e, t) : void 0;
  return t && Ar(!1), i;
}
function of(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Qt(new Proxy(e.ctx, Rc)));
  const { setup: o } = n;
  if (o) {
    const r = (e.setupContext = o.length > 1 ? sf(e) : null),
      i = Un(e);
    Ut();
    const s = Pt(o, e, 0, [e.props, r]);
    if ((Wt(), i(), il(s))) {
      if ((s.then(zi, zi), t))
        return s
          .then((l) => {
            Ki(e, l, t);
          })
          .catch((l) => {
            $o(l, e, 0);
          });
      e.asyncDep = s;
    } else Ki(e, s, t);
  } else ca(e, t);
}
function Ki(e, t, n) {
  ie(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : be(t) && (e.setupState = Al(t)),
    ca(e, n);
}
let Ui;
function ca(e, t, n) {
  const o = e.type;
  if (!e.render) {
    if (!t && Ui && !o.render) {
      const r = o.template || ai(e).template;
      if (r) {
        const { isCustomElement: i, compilerOptions: s } = e.appContext.config,
          { delimiters: l, compilerOptions: a } = o,
          c = Ee(Ee({ isCustomElement: i, delimiters: l }, s), a);
        o.render = Ui(r, c);
      }
    }
    e.render = o.render || He;
  }
  {
    const r = Un(e);
    Ut();
    try {
      Tc(e);
    } finally {
      Wt(), r();
    }
  }
}
function rf(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return Ve(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function sf(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return rf(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Do(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Al(Qt(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in An) return An[n](e);
        },
        has(t, n) {
          return n in t || n in An;
        },
      }))
    );
}
function Mr(e, t = !0) {
  return ie(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function lf(e) {
  return ie(e) && "__vccOpts" in e;
}
const E = (e, t) => Yu(e, t, jo);
function S(e, t, n) {
  const o = arguments.length;
  return o === 2
    ? be(t) && !oe(t)
      ? wo(t)
        ? Ie(e, null, [t])
        : Ie(e, t)
      : Ie(e, null, t)
    : (o > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : o === 3 && wo(n) && (n = [n]),
      Ie(e, t, n));
}
const af = "3.4.15";
/**
 * @vue/runtime-dom v3.4.15
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ const uf = "http://www.w3.org/2000/svg",
  cf = "http://www.w3.org/1998/Math/MathML",
  kt = typeof document != "undefined" ? document : null,
  Wi = kt && kt.createElement("template"),
  ff = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, o) => {
      const r =
        t === "svg"
          ? kt.createElementNS(uf, e)
          : t === "mathml"
          ? kt.createElementNS(cf, e)
          : kt.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          o &&
          o.multiple != null &&
          r.setAttribute("multiple", o.multiple),
        r
      );
    },
    createText: (e) => kt.createTextNode(e),
    createComment: (e) => kt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => kt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, o, r, i) {
      const s = n ? n.previousSibling : t.lastChild;
      if (r && (r === i || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), n),
            !(r === i || !(r = r.nextSibling));

        );
      else {
        Wi.innerHTML =
          o === "svg"
            ? `<svg>${e}</svg>`
            : o === "mathml"
            ? `<math>${e}</math>`
            : e;
        const l = Wi.content;
        if (o === "svg" || o === "mathml") {
          const a = l.firstChild;
          for (; a.firstChild; ) l.appendChild(a.firstChild);
          l.removeChild(a);
        }
        t.insertBefore(l, n);
      }
      return [
        s ? s.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  },
  bt = "transition",
  _n = "animation",
  fn = Symbol("_vtc"),
  dn = (e, { slots: t }) => S(yc, da(e), t);
dn.displayName = "Transition";
const fa = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
  },
  df = (dn.props = Ee({}, zl, fa)),
  Ot = (e, t = []) => {
    oe(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  Qi = (e) => (e ? (oe(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function da(e) {
  const t = {};
  for (const v in e) v in fa || (t[v] = e[v]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: o,
      duration: r,
      enterFromClass: i = `${n}-enter-from`,
      enterActiveClass: s = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: a = i,
      appearActiveClass: c = s,
      appearToClass: u = l,
      leaveFromClass: d = `${n}-leave-from`,
      leaveActiveClass: f = `${n}-leave-active`,
      leaveToClass: p = `${n}-leave-to`,
    } = e,
    y = hf(r),
    T = y && y[0],
    w = y && y[1],
    {
      onBeforeEnter: O,
      onEnter: m,
      onEnterCancelled: b,
      onLeave: M,
      onLeaveCancelled: $,
      onBeforeAppear: q = O,
      onAppear: V = m,
      onAppearCancelled: H = b,
    } = t,
    C = (v, D, k) => {
      _t(v, D ? u : l), _t(v, D ? c : s), k && k();
    },
    x = (v, D) => {
      (v._isLeaving = !1), _t(v, d), _t(v, p), _t(v, f), D && D();
    },
    F = (v) => (D, k) => {
      const Z = v ? V : m,
        G = () => C(D, v, k);
      Ot(Z, [D, G]),
        Gi(() => {
          _t(D, v ? a : i), dt(D, v ? u : l), Qi(Z) || Yi(D, o, T, G);
        });
    };
  return Ee(t, {
    onBeforeEnter(v) {
      Ot(O, [v]), dt(v, i), dt(v, s);
    },
    onBeforeAppear(v) {
      Ot(q, [v]), dt(v, a), dt(v, c);
    },
    onEnter: F(!1),
    onAppear: F(!0),
    onLeave(v, D) {
      v._isLeaving = !0;
      const k = () => x(v, D);
      dt(v, d),
        ga(),
        dt(v, f),
        Gi(() => {
          !v._isLeaving || (_t(v, d), dt(v, p), Qi(M) || Yi(v, o, w, k));
        }),
        Ot(M, [v, k]);
    },
    onEnterCancelled(v) {
      C(v, !1), Ot(b, [v]);
    },
    onAppearCancelled(v) {
      C(v, !0), Ot(H, [v]);
    },
    onLeaveCancelled(v) {
      x(v), Ot($, [v]);
    },
  });
}
function hf(e) {
  if (e == null) return null;
  if (be(e)) return [tr(e.enter), tr(e.leave)];
  {
    const t = tr(e);
    return [t, t];
  }
}
function tr(e) {
  return wu(e);
}
function dt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e[fn] || (e[fn] = new Set())).add(t);
}
function _t(e, t) {
  t.split(/\s+/).forEach((o) => o && e.classList.remove(o));
  const n = e[fn];
  n && (n.delete(t), n.size || (e[fn] = void 0));
}
function Gi(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let gf = 0;
function Yi(e, t, n, o) {
  const r = (e._endId = ++gf),
    i = () => {
      r === e._endId && o();
    };
  if (n) return setTimeout(i, n);
  const { type: s, timeout: l, propCount: a } = ha(e, t);
  if (!s) return o();
  const c = s + "end";
  let u = 0;
  const d = () => {
      e.removeEventListener(c, f), i();
    },
    f = (p) => {
      p.target === e && ++u >= a && d();
    };
  setTimeout(() => {
    u < a && d();
  }, l + 1),
    e.addEventListener(c, f);
}
function ha(e, t) {
  const n = window.getComputedStyle(e),
    o = (y) => (n[y] || "").split(", "),
    r = o(`${bt}Delay`),
    i = o(`${bt}Duration`),
    s = Zi(r, i),
    l = o(`${_n}Delay`),
    a = o(`${_n}Duration`),
    c = Zi(l, a);
  let u = null,
    d = 0,
    f = 0;
  t === bt
    ? s > 0 && ((u = bt), (d = s), (f = i.length))
    : t === _n
    ? c > 0 && ((u = _n), (d = c), (f = a.length))
    : ((d = Math.max(s, c)),
      (u = d > 0 ? (s > c ? bt : _n) : null),
      (f = u ? (u === bt ? i.length : a.length) : 0));
  const p =
    u === bt && /\b(transform|all)(,|$)/.test(o(`${bt}Property`).toString());
  return { type: u, timeout: d, propCount: f, hasTransform: p };
}
function Zi(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, o) => Xi(n) + Xi(e[o])));
}
function Xi(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function ga() {
  return document.body.offsetHeight;
}
function mf(e, t, n) {
  const o = e[fn];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
const pf = Symbol("_vod"),
  vf = Symbol("");
function bf(e, t, n) {
  const o = e.style,
    r = o.display,
    i = xe(n);
  if (n && !i) {
    if (t && !xe(t)) for (const s in t) n[s] == null && qr(o, s, "");
    for (const s in n) qr(o, s, n[s]);
  } else if (i) {
    if (t !== n) {
      const s = o[vf];
      s && (n += ";" + s), (o.cssText = n);
    }
  } else t && e.removeAttribute("style");
  pf in e && (o.display = r);
}
const Ji = /\s*!important$/;
function qr(e, t, n) {
  if (oe(n)) n.forEach((o) => qr(e, t, o));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const o = yf(e, t);
    Ji.test(n)
      ? e.setProperty(Kt(o), n.replace(Ji, ""), "important")
      : (e[o] = n);
  }
}
const es = ["Webkit", "Moz", "ms"],
  nr = {};
function yf(e, t) {
  const n = nr[t];
  if (n) return n;
  let o = ct(t);
  if (o !== "filter" && o in e) return (nr[t] = o);
  o = Mo(o);
  for (let r = 0; r < es.length; r++) {
    const i = es[r] + o;
    if (i in e) return (nr[t] = i);
  }
  return t;
}
const ts = "http://www.w3.org/1999/xlink";
function _f(e, t, n, o, r) {
  if (o && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(ts, t.slice(6, t.length))
      : e.setAttributeNS(ts, t, n);
  else {
    const i = Ru(t);
    n == null || (i && !ul(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? "" : n);
  }
}
function wf(e, t, n, o, r, i, s) {
  if (t === "innerHTML" || t === "textContent") {
    o && s(o, r, i), (e[t] = n == null ? "" : n);
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
    e._value = n;
    const c = l === "OPTION" ? e.getAttribute("value") : e.value,
      u = n == null ? "" : n;
    c !== u && (e.value = u), n == null && e.removeAttribute(t);
    return;
  }
  let a = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean"
      ? (n = ul(n))
      : n == null && c === "string"
      ? ((n = ""), (a = !0))
      : c === "number" && ((n = 0), (a = !0));
  }
  try {
    e[t] = n;
  } catch {}
  a && e.removeAttribute(t);
}
function xf(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function Cf(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const ns = Symbol("_vei");
function kf(e, t, n, o, r = null) {
  const i = e[ns] || (e[ns] = {}),
    s = i[t];
  if (o && s) s.value = o;
  else {
    const [l, a] = Sf(t);
    if (o) {
      const c = (i[t] = Tf(o, r));
      xf(e, l, c, a);
    } else s && (Cf(e, l, s, a), (i[t] = void 0));
  }
}
const os = /(?:Once|Passive|Capture)$/;
function Sf(e) {
  let t;
  if (os.test(e)) {
    t = {};
    let o;
    for (; (o = e.match(os)); )
      (e = e.slice(0, e.length - o[0].length)), (t[o[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : Kt(e.slice(2)), t];
}
let or = 0;
const Ef = Promise.resolve(),
  Rf = () => or || (Ef.then(() => (or = 0)), (or = Date.now()));
function Tf(e, t) {
  const n = (o) => {
    if (!o._vts) o._vts = Date.now();
    else if (o._vts <= n.attached) return;
    Qe(Pf(o, n.value), t, 5, [o]);
  };
  return (n.value = e), (n.attached = Rf()), n;
}
function Pf(e, t) {
  if (oe(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((o) => (r) => !r._stopped && o && o(r))
    );
  } else return t;
}
const rs = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  Af = (e, t, n, o, r, i, s, l, a) => {
    const c = r === "svg";
    t === "class"
      ? mf(e, o, c)
      : t === "style"
      ? bf(e, n, o)
      : Po(t)
      ? Kr(t) || kf(e, t, n, o, s)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Mf(e, t, o, c)
        )
      ? wf(e, t, o, i, s, l, a)
      : (t === "true-value"
          ? (e._trueValue = o)
          : t === "false-value" && (e._falseValue = o),
        _f(e, t, o, c));
  };
function Mf(e, t, n, o) {
  if (o)
    return !!(
      t === "innerHTML" ||
      t === "textContent" ||
      (t in e && rs(t) && ie(n))
    );
  if (
    t === "spellcheck" ||
    t === "draggable" ||
    t === "translate" ||
    t === "form" ||
    (t === "list" && e.tagName === "INPUT") ||
    (t === "type" && e.tagName === "TEXTAREA")
  )
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return rs(t) && xe(n) ? !1 : t in e;
}
const ma = new WeakMap(),
  pa = new WeakMap(),
  Co = Symbol("_moveCb"),
  is = Symbol("_enterCb"),
  va = {
    name: "TransitionGroup",
    props: Ee({}, df, { tag: String, moveClass: String }),
    setup(e, { slots: t }) {
      const n = ke(),
        o = Hl();
      let r, i;
      return (
        si(() => {
          if (!r.length) return;
          const s = e.moveClass || `${e.name || "v"}-move`;
          if (!Bf(r[0].el, n.vnode.el, s)) return;
          r.forEach(Of), r.forEach(Lf);
          const l = r.filter(Ff);
          ga(),
            l.forEach((a) => {
              const c = a.el,
                u = c.style;
              dt(c, s),
                (u.transform = u.webkitTransform = u.transitionDuration = "");
              const d = (c[Co] = (f) => {
                (f && f.target !== c) ||
                  ((!f || /transform$/.test(f.propertyName)) &&
                    (c.removeEventListener("transitionend", d),
                    (c[Co] = null),
                    _t(c, s)));
              });
              c.addEventListener("transitionend", d);
            });
        }),
        () => {
          const s = se(e),
            l = da(s);
          let a = s.tag || et;
          (r = i), (i = t.default ? ii(t.default()) : []);
          for (let c = 0; c < i.length; c++) {
            const u = i[c];
            u.key != null && cn(u, In(u, l, o, n));
          }
          if (r)
            for (let c = 0; c < r.length; c++) {
              const u = r[c];
              cn(u, In(u, l, o, n)), ma.set(u, u.el.getBoundingClientRect());
            }
          return Ie(a, null, i);
        }
      );
    },
  },
  qf = (e) => delete e.mode;
va.props;
const $f = va;
function Of(e) {
  const t = e.el;
  t[Co] && t[Co](), t[is] && t[is]();
}
function Lf(e) {
  pa.set(e, e.el.getBoundingClientRect());
}
function Ff(e) {
  const t = ma.get(e),
    n = pa.get(e),
    o = t.left - n.left,
    r = t.top - n.top;
  if (o || r) {
    const i = e.el.style;
    return (
      (i.transform = i.webkitTransform = `translate(${o}px,${r}px)`),
      (i.transitionDuration = "0s"),
      e
    );
  }
}
function Bf(e, t, n) {
  const o = e.cloneNode(),
    r = e[fn];
  r &&
    r.forEach((l) => {
      l.split(/\s+/).forEach((a) => a && o.classList.remove(a));
    }),
    n.split(/\s+/).forEach((l) => l && o.classList.add(l)),
    (o.style.display = "none");
  const i = t.nodeType === 1 ? t : t.parentNode;
  i.appendChild(o);
  const { hasTransform: s } = ha(o);
  return i.removeChild(o), s;
}
const If = ["ctrl", "shift", "alt", "meta"],
  Vf = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, t) => If.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  Pm = (e, t) => {
    const n = e._withMods || (e._withMods = {}),
      o = t.join(".");
    return (
      n[o] ||
      (n[o] = (r, ...i) => {
        for (let s = 0; s < t.length; s++) {
          const l = Vf[t[s]];
          if (l && l(r, t)) return;
        }
        return e(r, ...i);
      })
    );
  },
  Nf = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  Am = (e, t) => {
    const n = e._withKeys || (e._withKeys = {}),
      o = t.join(".");
    return (
      n[o] ||
      (n[o] = (r) => {
        if (!("key" in r)) return;
        const i = Kt(r.key);
        if (t.some((s) => s === i || Nf[s] === i)) return e(r);
      })
    );
  },
  jf = Ee({ patchProp: Af }, ff);
let ss;
function Df() {
  return ss || (ss = Nc(jf));
}
const ba = (...e) => {
  const t = Df().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (o) => {
      const r = zf(o);
      if (!r) return;
      const i = t._component;
      !ie(i) && !i.render && !i.template && (i.template = r.innerHTML),
        (r.innerHTML = "");
      const s = n(r, !1, Hf(r));
      return (
        r instanceof Element &&
          (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")),
        s
      );
    }),
    t
  );
};
function Hf(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function zf(e) {
  return xe(e) ? document.querySelector(e) : e;
}
function bn(e, t, n, o) {
  return Object.defineProperty(e, t, { get: n, set: o, enumerable: !0 }), e;
}
const Mt = de(!1);
let Ho;
function Kf(e, t) {
  const n =
    /(edg|edge|edga|edgios)\/([\w.]+)/.exec(e) ||
    /(opr)[\/]([\w.]+)/.exec(e) ||
    /(vivaldi)[\/]([\w.]+)/.exec(e) ||
    /(chrome|crios)[\/]([\w.]+)/.exec(e) ||
    /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(e) ||
    /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(
      e
    ) ||
    /(firefox|fxios)[\/]([\w.]+)/.exec(e) ||
    /(webkit)[\/]([\w.]+)/.exec(e) ||
    /(opera)(?:.*version|)[\/]([\w.]+)/.exec(e) ||
    [];
  return {
    browser: n[5] || n[3] || n[1] || "",
    version: n[2] || n[4] || "0",
    versionNumber: n[4] || n[2] || "0",
    platform: t[0] || "",
  };
}
function Uf(e) {
  return (
    /(ipad)/.exec(e) ||
    /(ipod)/.exec(e) ||
    /(windows phone)/.exec(e) ||
    /(iphone)/.exec(e) ||
    /(kindle)/.exec(e) ||
    /(silk)/.exec(e) ||
    /(android)/.exec(e) ||
    /(win)/.exec(e) ||
    /(mac)/.exec(e) ||
    /(linux)/.exec(e) ||
    /(cros)/.exec(e) ||
    /(playbook)/.exec(e) ||
    /(bb)/.exec(e) ||
    /(blackberry)/.exec(e) ||
    []
  );
}
const ya = "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
function Wf(e) {
  (Ho = { is: { ...e } }), delete e.mac, delete e.desktop;
  const t =
    Math.min(window.innerHeight, window.innerWidth) > 414 ? "ipad" : "iphone";
  Object.assign(e, { mobile: !0, ios: !0, platform: t, [t]: !0 });
}
function Qf(e) {
  const t = e.toLowerCase(),
    n = Uf(t),
    o = Kf(t, n),
    r = {};
  o.browser &&
    ((r[o.browser] = !0),
    (r.version = o.version),
    (r.versionNumber = parseInt(o.versionNumber, 10))),
    o.platform && (r[o.platform] = !0);
  const i =
    r.android ||
    r.ios ||
    r.bb ||
    r.blackberry ||
    r.ipad ||
    r.iphone ||
    r.ipod ||
    r.kindle ||
    r.playbook ||
    r.silk ||
    r["windows phone"];
  return (
    i === !0 || t.indexOf("mobile") > -1
      ? ((r.mobile = !0),
        r.edga || r.edgios
          ? ((r.edge = !0), (o.browser = "edge"))
          : r.crios
          ? ((r.chrome = !0), (o.browser = "chrome"))
          : r.fxios && ((r.firefox = !0), (o.browser = "firefox")))
      : (r.desktop = !0),
    (r.ipod || r.ipad || r.iphone) && (r.ios = !0),
    r["windows phone"] && ((r.winphone = !0), delete r["windows phone"]),
    (r.chrome ||
      r.opr ||
      r.safari ||
      r.vivaldi ||
      (r.mobile === !0 && r.ios !== !0 && i !== !0)) &&
      (r.webkit = !0),
    r.edg && ((o.browser = "edgechromium"), (r.edgeChromium = !0)),
    ((r.safari && r.blackberry) || r.bb) &&
      ((o.browser = "blackberry"), (r.blackberry = !0)),
    r.safari && r.playbook && ((o.browser = "playbook"), (r.playbook = !0)),
    r.opr && ((o.browser = "opera"), (r.opera = !0)),
    r.safari && r.android && ((o.browser = "android"), (r.android = !0)),
    r.safari && r.kindle && ((o.browser = "kindle"), (r.kindle = !0)),
    r.safari && r.silk && ((o.browser = "silk"), (r.silk = !0)),
    r.vivaldi && ((o.browser = "vivaldi"), (r.vivaldi = !0)),
    (r.name = o.browser),
    (r.platform = o.platform),
    t.indexOf("electron") > -1
      ? (r.electron = !0)
      : document.location.href.indexOf("-extension://") > -1
      ? (r.bex = !0)
      : (window.Capacitor !== void 0
          ? ((r.capacitor = !0),
            (r.nativeMobile = !0),
            (r.nativeMobileWrapper = "capacitor"))
          : (window._cordovaNative !== void 0 || window.cordova !== void 0) &&
            ((r.cordova = !0),
            (r.nativeMobile = !0),
            (r.nativeMobileWrapper = "cordova")),
        ya === !0 &&
          r.mac === !0 &&
          ((r.desktop === !0 && r.safari === !0) ||
            (r.nativeMobile === !0 &&
              r.android !== !0 &&
              r.ios !== !0 &&
              r.ipad !== !0)) &&
          Wf(r)),
    r
  );
}
const ls = navigator.userAgent || navigator.vendor || window.opera,
  Gf = { has: { touch: !1, webStorage: !1 }, within: { iframe: !1 } },
  Ce = {
    userAgent: ls,
    is: Qf(ls),
    has: { touch: ya },
    within: { iframe: window.self !== window.top },
  },
  $r = {
    install(e) {
      const { $q: t } = e;
      Mt.value === !0
        ? (e.onSSRHydrated.push(() => {
            Object.assign(t.platform, Ce), (Mt.value = !1), (Ho = void 0);
          }),
          (t.platform = vn(this)))
        : (t.platform = this);
    },
  };
{
  let e;
  bn(Ce.has, "webStorage", () => {
    if (e !== void 0) return e;
    try {
      if (window.localStorage) return (e = !0), !0;
    } catch {}
    return (e = !1), !1;
  }),
    Ce.is.ios === !0 && window.navigator.vendor.toLowerCase().indexOf("apple"),
    Mt.value === !0 ? Object.assign($r, Ce, Ho, Gf) : Object.assign($r, Ce);
}
var zo = (e, t) => {
  const n = vn(e);
  for (const o in e)
    bn(
      t,
      o,
      () => n[o],
      (r) => {
        n[o] = r;
      }
    );
  return t;
};
const Be = { hasPassive: !1, passiveCapture: !0, notPassiveCapture: !0 };
try {
  const e = Object.defineProperty({}, "passive", {
    get() {
      Object.assign(Be, {
        hasPassive: !0,
        passive: { passive: !0 },
        notPassive: { passive: !1 },
        passiveCapture: { passive: !0, capture: !0 },
        notPassiveCapture: { passive: !1, capture: !0 },
      });
    },
  });
  window.addEventListener("qtest", null, e),
    window.removeEventListener("qtest", null, e);
} catch {}
function Nn() {}
function Mm(e) {
  return e.button === 0;
}
function Yf(e) {
  return (
    e.touches && e.touches[0]
      ? (e = e.touches[0])
      : e.changedTouches && e.changedTouches[0]
      ? (e = e.changedTouches[0])
      : e.targetTouches && e.targetTouches[0] && (e = e.targetTouches[0]),
    { top: e.clientY, left: e.clientX }
  );
}
function Zf(e) {
  if (e.path) return e.path;
  if (e.composedPath) return e.composedPath();
  const t = [];
  let n = e.target;
  for (; n; ) {
    if ((t.push(n), n.tagName === "HTML"))
      return t.push(document), t.push(window), t;
    n = n.parentElement;
  }
}
function ko(e) {
  e.stopPropagation();
}
function Rt(e) {
  e.cancelable !== !1 && e.preventDefault();
}
function We(e) {
  e.cancelable !== !1 && e.preventDefault(), e.stopPropagation();
}
function qm(e, t) {
  if (e === void 0 || (t === !0 && e.__dragPrevented === !0)) return;
  const n =
    t === !0
      ? (o) => {
          (o.__dragPrevented = !0),
            o.addEventListener("dragstart", Rt, Be.notPassiveCapture);
        }
      : (o) => {
          delete o.__dragPrevented,
            o.removeEventListener("dragstart", Rt, Be.notPassiveCapture);
        };
  e.querySelectorAll("a, img").forEach(n);
}
function Xf(e, t, n) {
  const o = `__q_${t}_evt`;
  (e[o] = e[o] !== void 0 ? e[o].concat(n) : n),
    n.forEach((r) => {
      r[0].addEventListener(r[1], e[r[2]], Be[r[3]]);
    });
}
function Jf(e, t) {
  const n = `__q_${t}_evt`;
  e[n] !== void 0 &&
    (e[n].forEach((o) => {
      o[0].removeEventListener(o[1], e[o[2]], Be[o[3]]);
    }),
    (e[n] = void 0));
}
function _a(e, t = 250, n) {
  let o = null;
  function r() {
    const i = arguments,
      s = () => {
        (o = null), n !== !0 && e.apply(this, i);
      };
    o !== null ? clearTimeout(o) : n === !0 && e.apply(this, i),
      (o = setTimeout(s, t));
  }
  return (
    (r.cancel = () => {
      o !== null && clearTimeout(o);
    }),
    r
  );
}
const rr = ["sm", "md", "lg", "xl"],
  { passive: as } = Be;
var ed = zo(
  {
    width: 0,
    height: 0,
    name: "xs",
    sizes: { sm: 600, md: 1024, lg: 1440, xl: 1920 },
    lt: { sm: !0, md: !0, lg: !0, xl: !0 },
    gt: { xs: !1, sm: !1, md: !1, lg: !1 },
    xs: !0,
    sm: !1,
    md: !1,
    lg: !1,
    xl: !1,
  },
  {
    setSizes: Nn,
    setDebounce: Nn,
    install({ $q: e, onSSRHydrated: t }) {
      if (((e.screen = this), this.__installed === !0)) {
        e.config.screen !== void 0 &&
          (e.config.screen.bodyClasses === !1
            ? document.body.classList.remove(`screen--${this.name}`)
            : this.__update(!0));
        return;
      }
      const { visualViewport: n } = window,
        o = n || window,
        r = document.scrollingElement || document.documentElement,
        i =
          n === void 0 || Ce.is.mobile === !0
            ? () => [
                Math.max(window.innerWidth, r.clientWidth),
                Math.max(window.innerHeight, r.clientHeight),
              ]
            : () => [
                n.width * n.scale + window.innerWidth - r.clientWidth,
                n.height * n.scale + window.innerHeight - r.clientHeight,
              ],
        s = e.config.screen !== void 0 && e.config.screen.bodyClasses === !0;
      this.__update = (d) => {
        const [f, p] = i();
        if ((p !== this.height && (this.height = p), f !== this.width))
          this.width = f;
        else if (d !== !0) return;
        let y = this.sizes;
        (this.gt.xs = f >= y.sm),
          (this.gt.sm = f >= y.md),
          (this.gt.md = f >= y.lg),
          (this.gt.lg = f >= y.xl),
          (this.lt.sm = f < y.sm),
          (this.lt.md = f < y.md),
          (this.lt.lg = f < y.lg),
          (this.lt.xl = f < y.xl),
          (this.xs = this.lt.sm),
          (this.sm = this.gt.xs === !0 && this.lt.md === !0),
          (this.md = this.gt.sm === !0 && this.lt.lg === !0),
          (this.lg = this.gt.md === !0 && this.lt.xl === !0),
          (this.xl = this.gt.lg),
          (y =
            (this.xs === !0 && "xs") ||
            (this.sm === !0 && "sm") ||
            (this.md === !0 && "md") ||
            (this.lg === !0 && "lg") ||
            "xl"),
          y !== this.name &&
            (s === !0 &&
              (document.body.classList.remove(`screen--${this.name}`),
              document.body.classList.add(`screen--${y}`)),
            (this.name = y));
      };
      let l,
        a = {},
        c = 16;
      (this.setSizes = (d) => {
        rr.forEach((f) => {
          d[f] !== void 0 && (a[f] = d[f]);
        });
      }),
        (this.setDebounce = (d) => {
          c = d;
        });
      const u = () => {
        const d = getComputedStyle(document.body);
        d.getPropertyValue("--q-size-sm") &&
          rr.forEach((f) => {
            this.sizes[f] = parseInt(d.getPropertyValue(`--q-size-${f}`), 10);
          }),
          (this.setSizes = (f) => {
            rr.forEach((p) => {
              f[p] && (this.sizes[p] = f[p]);
            }),
              this.__update(!0);
          }),
          (this.setDebounce = (f) => {
            l !== void 0 && o.removeEventListener("resize", l, as),
              (l = f > 0 ? _a(this.__update, f) : this.__update),
              o.addEventListener("resize", l, as);
          }),
          this.setDebounce(c),
          Object.keys(a).length !== 0
            ? (this.setSizes(a), (a = void 0))
            : this.__update(),
          s === !0 &&
            this.name === "xs" &&
            document.body.classList.add("screen--xs");
      };
      Mt.value === !0 ? t.push(u) : u();
    },
  }
);
const qe = zo(
    { isActive: !1, mode: !1 },
    {
      __media: void 0,
      set(e) {
        (qe.mode = e),
          e === "auto"
            ? (qe.__media === void 0 &&
                ((qe.__media = window.matchMedia(
                  "(prefers-color-scheme: dark)"
                )),
                (qe.__updateMedia = () => {
                  qe.set("auto");
                }),
                qe.__media.addListener(qe.__updateMedia)),
              (e = qe.__media.matches))
            : qe.__media !== void 0 &&
              (qe.__media.removeListener(qe.__updateMedia),
              (qe.__media = void 0)),
          (qe.isActive = e === !0),
          document.body.classList.remove(
            `body--${e === !0 ? "light" : "dark"}`
          ),
          document.body.classList.add(`body--${e === !0 ? "dark" : "light"}`);
      },
      toggle() {
        qe.set(qe.isActive === !1);
      },
      install({ $q: e, onSSRHydrated: t, ssrContext: n }) {
        const { dark: o } = e.config;
        if (((e.dark = this), this.__installed === !0 && o === void 0)) return;
        this.isActive = o === !0;
        const r = o !== void 0 ? o : !1;
        if (Mt.value === !0) {
          const i = (l) => {
              this.__fromSSR = l;
            },
            s = this.set;
          (this.set = i),
            i(r),
            t.push(() => {
              (this.set = s), this.set(this.__fromSSR);
            });
        } else this.set(r);
      },
    }
  ),
  wa = () => !0;
function td(e) {
  return typeof e == "string" && e !== "" && e !== "/" && e !== "#/";
}
function nd(e) {
  return (
    e.startsWith("#") === !0 && (e = e.substring(1)),
    e.startsWith("/") === !1 && (e = "/" + e),
    e.endsWith("/") === !0 && (e = e.substring(0, e.length - 1)),
    "#" + e
  );
}
function od(e) {
  if (e.backButtonExit === !1) return () => !1;
  if (e.backButtonExit === "*") return wa;
  const t = ["#/"];
  return (
    Array.isArray(e.backButtonExit) === !0 &&
      t.push(...e.backButtonExit.filter(td).map(nd)),
    () => t.includes(window.location.hash)
  );
}
var Or = {
    __history: [],
    add: Nn,
    remove: Nn,
    install({ $q: e }) {
      if (this.__installed === !0) return;
      const { cordova: t, capacitor: n } = Ce.is;
      if (t !== !0 && n !== !0) return;
      const o = e.config[t === !0 ? "cordova" : "capacitor"];
      if (
        (o !== void 0 && o.backButton === !1) ||
        (n === !0 &&
          (window.Capacitor === void 0 ||
            window.Capacitor.Plugins.App === void 0))
      )
        return;
      (this.add = (s) => {
        s.condition === void 0 && (s.condition = wa), this.__history.push(s);
      }),
        (this.remove = (s) => {
          const l = this.__history.indexOf(s);
          l >= 0 && this.__history.splice(l, 1);
        });
      const r = od(Object.assign({ backButtonExit: !0 }, o)),
        i = () => {
          if (this.__history.length) {
            const s = this.__history[this.__history.length - 1];
            s.condition() === !0 && (this.__history.pop(), s.handler());
          } else r() === !0 ? navigator.app.exitApp() : window.history.back();
        };
      t === !0
        ? document.addEventListener("deviceready", () => {
            document.addEventListener("backbutton", i, !1);
          })
        : window.Capacitor.Plugins.App.addListener("backButton", i);
    },
  },
  us = {
    isoName: "en-US",
    nativeName: "English (US)",
    label: {
      clear: "Clear",
      ok: "OK",
      cancel: "Cancel",
      close: "Close",
      set: "Set",
      select: "Select",
      reset: "Reset",
      remove: "Remove",
      update: "Update",
      create: "Create",
      search: "Search",
      filter: "Filter",
      refresh: "Refresh",
      expand: (e) => (e ? `Expand "${e}"` : "Expand"),
      collapse: (e) => (e ? `Collapse "${e}"` : "Collapse"),
    },
    date: {
      days: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
        "_"
      ),
      daysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      months:
        "January_February_March_April_May_June_July_August_September_October_November_December".split(
          "_"
        ),
      monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      firstDayOfWeek: 0,
      format24h: !1,
      pluralDay: "days",
    },
    table: {
      noData: "No data available",
      noResults: "No matching records found",
      loading: "Loading...",
      selectedRecords: (e) =>
        e === 1
          ? "1 record selected."
          : (e === 0 ? "No" : e) + " records selected.",
      recordsPerPage: "Records per page:",
      allRows: "All",
      pagination: (e, t, n) => e + "-" + t + " of " + n,
      columns: "Columns",
    },
    editor: {
      url: "URL",
      bold: "Bold",
      italic: "Italic",
      strikethrough: "Strikethrough",
      underline: "Underline",
      unorderedList: "Unordered List",
      orderedList: "Ordered List",
      subscript: "Subscript",
      superscript: "Superscript",
      hyperlink: "Hyperlink",
      toggleFullscreen: "Toggle Fullscreen",
      quote: "Quote",
      left: "Left align",
      center: "Center align",
      right: "Right align",
      justify: "Justify align",
      print: "Print",
      outdent: "Decrease indentation",
      indent: "Increase indentation",
      removeFormat: "Remove formatting",
      formatting: "Formatting",
      fontSize: "Font Size",
      align: "Align",
      hr: "Insert Horizontal Rule",
      undo: "Undo",
      redo: "Redo",
      heading1: "Heading 1",
      heading2: "Heading 2",
      heading3: "Heading 3",
      heading4: "Heading 4",
      heading5: "Heading 5",
      heading6: "Heading 6",
      paragraph: "Paragraph",
      code: "Code",
      size1: "Very small",
      size2: "A bit small",
      size3: "Normal",
      size4: "Medium-large",
      size5: "Big",
      size6: "Very big",
      size7: "Maximum",
      defaultFont: "Default Font",
      viewSource: "View Source",
    },
    tree: {
      noNodes: "No nodes available",
      noResults: "No matching nodes found",
    },
  };
function cs() {
  const e =
    Array.isArray(navigator.languages) === !0 &&
    navigator.languages.length !== 0
      ? navigator.languages[0]
      : navigator.language;
  if (typeof e == "string")
    return e
      .split(/[-_]/)
      .map((t, n) =>
        n === 0
          ? t.toLowerCase()
          : n > 1 || t.length < 4
          ? t.toUpperCase()
          : t[0].toUpperCase() + t.slice(1).toLowerCase()
      )
      .join("-");
}
const Xe = zo(
  { __langPack: {} },
  {
    getLocale: cs,
    set(e = us, t) {
      const n = { ...e, rtl: e.rtl === !0, getLocale: cs };
      {
        if (
          ((n.set = Xe.set),
          Xe.__langConfig === void 0 || Xe.__langConfig.noHtmlAttrs !== !0)
        ) {
          const o = document.documentElement;
          o.setAttribute("dir", n.rtl === !0 ? "rtl" : "ltr"),
            o.setAttribute("lang", n.isoName);
        }
        Object.assign(Xe.__langPack, n),
          (Xe.props = n),
          (Xe.isoName = n.isoName),
          (Xe.nativeName = n.nativeName);
      }
    },
    install({ $q: e, lang: t, ssrContext: n }) {
      (e.lang = Xe.__langPack),
        (Xe.__langConfig = e.config.lang),
        this.__installed === !0
          ? t !== void 0 && this.set(t)
          : this.set(t || us);
    },
  }
);
function rd(e, t, n = document.body) {
  if (typeof e != "string")
    throw new TypeError("Expected a string as propName");
  if (typeof t != "string") throw new TypeError("Expected a string as value");
  if (!(n instanceof Element)) throw new TypeError("Expected a DOM element");
  n.style.setProperty(`--q-${e}`, t);
}
let xa = !1;
function id(e) {
  xa = e.isComposing === !0;
}
function Ca(e) {
  return (
    xa === !0 || e !== Object(e) || e.isComposing === !0 || e.qKeyEvent === !0
  );
}
function jn(e, t) {
  return Ca(e) === !0 ? !1 : [].concat(t).includes(e.keyCode);
}
function ka(e) {
  if (e.ios === !0) return "ios";
  if (e.android === !0) return "android";
}
function sd({ is: e, has: t, within: n }, o) {
  const r = [
    e.desktop === !0 ? "desktop" : "mobile",
    `${t.touch === !1 ? "no-" : ""}touch`,
  ];
  if (e.mobile === !0) {
    const i = ka(e);
    i !== void 0 && r.push("platform-" + i);
  }
  if (e.nativeMobile === !0) {
    const i = e.nativeMobileWrapper;
    r.push(i),
      r.push("native-mobile"),
      e.ios === !0 &&
        (o[i] === void 0 || o[i].iosStatusBarPadding !== !1) &&
        r.push("q-ios-padding");
  } else e.electron === !0 ? r.push("electron") : e.bex === !0 && r.push("bex");
  return n.iframe === !0 && r.push("within-iframe"), r;
}
function ld() {
  const { is: e } = Ce,
    t = document.body.className,
    n = new Set(t.replace(/ {2}/g, " ").split(" "));
  if (Ho !== void 0)
    n.delete("desktop"), n.add("platform-ios"), n.add("mobile");
  else if (e.nativeMobile !== !0 && e.electron !== !0 && e.bex !== !0) {
    if (e.desktop === !0)
      n.delete("mobile"),
        n.delete("platform-ios"),
        n.delete("platform-android"),
        n.add("desktop");
    else if (e.mobile === !0) {
      n.delete("desktop"), n.add("mobile");
      const r = ka(e);
      r !== void 0
        ? (n.add(`platform-${r}`),
          n.delete(`platform-${r === "ios" ? "android" : "ios"}`))
        : (n.delete("platform-ios"), n.delete("platform-android"));
    }
  }
  Ce.has.touch === !0 && (n.delete("no-touch"), n.add("touch")),
    Ce.within.iframe === !0 && n.add("within-iframe");
  const o = Array.from(n).join(" ");
  t !== o && (document.body.className = o);
}
function ad(e) {
  for (const t in e) rd(t, e[t]);
}
var ud = {
    install(e) {
      if (this.__installed !== !0) {
        if (Mt.value === !0) ld();
        else {
          const { $q: t } = e;
          t.config.brand !== void 0 && ad(t.config.brand);
          const n = sd(Ce, t.config);
          document.body.classList.add.apply(document.body.classList, n);
        }
        Ce.is.ios === !0 && document.body.addEventListener("touchstart", Nn),
          window.addEventListener("keydown", id, !0);
      }
    },
  },
  cd = {
    name: "material-icons",
    type: {
      positive: "check_circle",
      negative: "warning",
      info: "info",
      warning: "priority_high",
    },
    arrow: {
      up: "arrow_upward",
      right: "arrow_forward",
      down: "arrow_downward",
      left: "arrow_back",
      dropdown: "arrow_drop_down",
    },
    chevron: { left: "chevron_left", right: "chevron_right" },
    colorPicker: { spectrum: "gradient", tune: "tune", palette: "style" },
    pullToRefresh: { icon: "refresh" },
    carousel: {
      left: "chevron_left",
      right: "chevron_right",
      up: "keyboard_arrow_up",
      down: "keyboard_arrow_down",
      navigationIcon: "lens",
    },
    chip: { remove: "cancel", selected: "check" },
    datetime: {
      arrowLeft: "chevron_left",
      arrowRight: "chevron_right",
      now: "access_time",
      today: "today",
    },
    editor: {
      bold: "format_bold",
      italic: "format_italic",
      strikethrough: "strikethrough_s",
      underline: "format_underlined",
      unorderedList: "format_list_bulleted",
      orderedList: "format_list_numbered",
      subscript: "vertical_align_bottom",
      superscript: "vertical_align_top",
      hyperlink: "link",
      toggleFullscreen: "fullscreen",
      quote: "format_quote",
      left: "format_align_left",
      center: "format_align_center",
      right: "format_align_right",
      justify: "format_align_justify",
      print: "print",
      outdent: "format_indent_decrease",
      indent: "format_indent_increase",
      removeFormat: "format_clear",
      formatting: "text_format",
      fontSize: "format_size",
      align: "format_align_left",
      hr: "remove",
      undo: "undo",
      redo: "redo",
      heading: "format_size",
      code: "code",
      size: "format_size",
      font: "font_download",
      viewSource: "code",
    },
    expansionItem: {
      icon: "keyboard_arrow_down",
      denseIcon: "arrow_drop_down",
    },
    fab: { icon: "add", activeIcon: "close" },
    field: { clear: "cancel", error: "error" },
    pagination: {
      first: "first_page",
      prev: "keyboard_arrow_left",
      next: "keyboard_arrow_right",
      last: "last_page",
    },
    rating: { icon: "grade" },
    stepper: { done: "check", active: "edit", error: "warning" },
    tabs: {
      left: "chevron_left",
      right: "chevron_right",
      up: "keyboard_arrow_up",
      down: "keyboard_arrow_down",
    },
    table: {
      arrowUp: "arrow_upward",
      warning: "warning",
      firstPage: "first_page",
      prevPage: "chevron_left",
      nextPage: "chevron_right",
      lastPage: "last_page",
    },
    tree: { icon: "play_arrow" },
    uploader: {
      done: "done",
      clear: "clear",
      add: "add_box",
      upload: "cloud_upload",
      removeQueue: "clear_all",
      removeUploaded: "done_all",
    },
  };
const So = zo(
    { iconMapFn: null, __icons: {} },
    {
      set(e, t) {
        const n = { ...e, rtl: e.rtl === !0 };
        (n.set = So.set), Object.assign(So.__icons, n);
      },
      install({ $q: e, iconSet: t, ssrContext: n }) {
        e.config.iconMapFn !== void 0 && (this.iconMapFn = e.config.iconMapFn),
          (e.iconSet = this.__icons),
          bn(
            e,
            "iconMapFn",
            () => this.iconMapFn,
            (o) => {
              this.iconMapFn = o;
            }
          ),
          this.__installed === !0
            ? t !== void 0 && this.set(t)
            : this.set(t || cd);
      },
    }
  ),
  fd = "_q_",
  $m = "_q_l_",
  Om = "_q_pc_",
  dd = "_q_fo_",
  Lm = () => {},
  Eo = {};
let Sa = !1;
function hd() {
  Sa = !0;
}
function at(e) {
  return e !== null && typeof e == "object" && Array.isArray(e) !== !0;
}
function Fm(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
const fs = [$r, ud, qe, ed, Or, Xe, So];
function Ea(e, t) {
  const n = ba(e);
  n.config.globalProperties = t.config.globalProperties;
  const { reload: o, ...r } = t._context;
  return Object.assign(n._context, r), n;
}
function ds(e, t) {
  t.forEach((n) => {
    n.install(e), (n.__installed = !0);
  });
}
function gd(e, t, n) {
  (e.config.globalProperties.$q = n.$q),
    e.provide(fd, n.$q),
    ds(n, fs),
    t.components !== void 0 &&
      Object.values(t.components).forEach((o) => {
        at(o) === !0 && o.name !== void 0 && e.component(o.name, o);
      }),
    t.directives !== void 0 &&
      Object.values(t.directives).forEach((o) => {
        at(o) === !0 && o.name !== void 0 && e.directive(o.name, o);
      }),
    t.plugins !== void 0 &&
      ds(
        n,
        Object.values(t.plugins).filter(
          (o) => typeof o.install == "function" && fs.includes(o) === !1
        )
      ),
    Mt.value === !0 &&
      (n.$q.onSSRHydrated = () => {
        n.onSSRHydrated.forEach((o) => {
          o();
        }),
          (n.$q.onSSRHydrated = () => {});
      });
}
var md = function (e, t = {}) {
    const n = { version: "2.14.2" };
    Sa === !1
      ? (t.config !== void 0 && Object.assign(Eo, t.config),
        (n.config = { ...Eo }),
        hd())
      : (n.config = t.config || {}),
      gd(e, t, {
        parentApp: e,
        $q: n,
        lang: t.lang,
        iconSet: t.iconSet,
        onSSRHydrated: [],
      });
  },
  pd = { version: "2.14.2", install: md, lang: Xe, iconSet: So },
  vd = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [o, r] of t) n[o] = r;
    return n;
  };
const bd = Lo({ name: "App" });
function yd(e, t, n, o, r, i) {
  const s = dc("router-view");
  return ra(), sa(s);
}
var _d = vd(bd, [["render", yd]]);
var wd = !1;
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const xd = Symbol();
var hs;
(function (e) {
  (e.direct = "direct"),
    (e.patchObject = "patch object"),
    (e.patchFunction = "patch function");
})(hs || (hs = {}));
function Cd() {
  const e = Tu(!0),
    t = e.run(() => de({}));
  let n = [],
    o = [];
  const r = Qt({
    install(i) {
      (r._a = i),
        i.provide(xd, r),
        (i.config.globalProperties.$pinia = r),
        o.forEach((s) => n.push(s)),
        (o = []);
    },
    use(i) {
      return !this._a && !wd ? o.push(i) : n.push(i), this;
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  });
  return r;
}
var ir = () => Cd();
/*!
 * vue-router v4.2.5
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const nn = typeof window != "undefined";
function kd(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const ge = Object.assign;
function sr(e, t) {
  const n = {};
  for (const o in t) {
    const r = t[o];
    n[o] = rt(r) ? r.map(e) : e(r);
  }
  return n;
}
const $n = () => {},
  rt = Array.isArray,
  Sd = /\/$/,
  Ed = (e) => e.replace(Sd, "");
function lr(e, t, n = "/") {
  let o,
    r = {},
    i = "",
    s = "";
  const l = t.indexOf("#");
  let a = t.indexOf("?");
  return (
    l < a && l >= 0 && (a = -1),
    a > -1 &&
      ((o = t.slice(0, a)),
      (i = t.slice(a + 1, l > -1 ? l : t.length)),
      (r = e(i))),
    l > -1 && ((o = o || t.slice(0, l)), (s = t.slice(l, t.length))),
    (o = Ad(o != null ? o : t, n)),
    { fullPath: o + (i && "?") + i + s, path: o, query: r, hash: s }
  );
}
function Rd(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function gs(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function Td(e, t, n) {
  const o = t.matched.length - 1,
    r = n.matched.length - 1;
  return (
    o > -1 &&
    o === r &&
    hn(t.matched[o], n.matched[r]) &&
    Ra(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function hn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Ra(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!Pd(e[n], t[n])) return !1;
  return !0;
}
function Pd(e, t) {
  return rt(e) ? ms(e, t) : rt(t) ? ms(t, e) : e === t;
}
function ms(e, t) {
  return rt(t)
    ? e.length === t.length && e.every((n, o) => n === t[o])
    : e.length === 1 && e[0] === t;
}
function Ad(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    o = e.split("/"),
    r = o[o.length - 1];
  (r === ".." || r === ".") && o.push("");
  let i = n.length - 1,
    s,
    l;
  for (s = 0; s < o.length; s++)
    if (((l = o[s]), l !== "."))
      if (l === "..") i > 1 && i--;
      else break;
  return (
    n.slice(0, i).join("/") +
    "/" +
    o.slice(s - (s === o.length ? 1 : 0)).join("/")
  );
}
var Dn;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(Dn || (Dn = {}));
var On;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(On || (On = {}));
function Md(e) {
  if (!e)
    if (nn) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Ed(e);
}
const qd = /^[^#]+#/;
function $d(e, t) {
  return e.replace(qd, "#") + t;
}
function Od(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    o = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: o.left - n.left - (t.left || 0),
    top: o.top - n.top - (t.top || 0),
  };
}
const Ko = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function Ld(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      o = typeof n == "string" && n.startsWith("#"),
      r =
        typeof n == "string"
          ? o
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!r) return;
    t = Od(r, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function ps(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Lr = new Map();
function Fd(e, t) {
  Lr.set(e, t);
}
function Bd(e) {
  const t = Lr.get(e);
  return Lr.delete(e), t;
}
let Id = () => location.protocol + "//" + location.host;
function Ta(e, t) {
  const { pathname: n, search: o, hash: r } = t,
    i = e.indexOf("#");
  if (i > -1) {
    let l = r.includes(e.slice(i)) ? e.slice(i).length : 1,
      a = r.slice(l);
    return a[0] !== "/" && (a = "/" + a), gs(a, "");
  }
  return gs(n, e) + o + r;
}
function Vd(e, t, n, o) {
  let r = [],
    i = [],
    s = null;
  const l = ({ state: f }) => {
    const p = Ta(e, location),
      y = n.value,
      T = t.value;
    let w = 0;
    if (f) {
      if (((n.value = p), (t.value = f), s && s === y)) {
        s = null;
        return;
      }
      w = T ? f.position - T.position : 0;
    } else o(p);
    r.forEach((O) => {
      O(n.value, y, {
        delta: w,
        type: Dn.pop,
        direction: w ? (w > 0 ? On.forward : On.back) : On.unknown,
      });
    });
  };
  function a() {
    s = n.value;
  }
  function c(f) {
    r.push(f);
    const p = () => {
      const y = r.indexOf(f);
      y > -1 && r.splice(y, 1);
    };
    return i.push(p), p;
  }
  function u() {
    const { history: f } = window;
    !f.state || f.replaceState(ge({}, f.state, { scroll: Ko() }), "");
  }
  function d() {
    for (const f of i) f();
    (i = []),
      window.removeEventListener("popstate", l),
      window.removeEventListener("beforeunload", u);
  }
  return (
    window.addEventListener("popstate", l),
    window.addEventListener("beforeunload", u, { passive: !0 }),
    { pauseListeners: a, listen: c, destroy: d }
  );
}
function vs(e, t, n, o = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: r ? Ko() : null,
  };
}
function Nd(e) {
  const { history: t, location: n } = window,
    o = { value: Ta(e, n) },
    r = { value: t.state };
  r.value ||
    i(
      o.value,
      {
        back: null,
        current: o.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function i(a, c, u) {
    const d = e.indexOf("#"),
      f =
        d > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(d)) + a
          : Id() + e + a;
    try {
      t[u ? "replaceState" : "pushState"](c, "", f), (r.value = c);
    } catch (p) {
      console.error(p), n[u ? "replace" : "assign"](f);
    }
  }
  function s(a, c) {
    const u = ge({}, t.state, vs(r.value.back, a, r.value.forward, !0), c, {
      position: r.value.position,
    });
    i(a, u, !0), (o.value = a);
  }
  function l(a, c) {
    const u = ge({}, r.value, t.state, { forward: a, scroll: Ko() });
    i(u.current, u, !0);
    const d = ge({}, vs(o.value, a, null), { position: u.position + 1 }, c);
    i(a, d, !1), (o.value = a);
  }
  return { location: o, state: r, push: l, replace: s };
}
function jd(e) {
  e = Md(e);
  const t = Nd(e),
    n = Vd(e, t.state, t.location, t.replace);
  function o(i, s = !0) {
    s || n.pauseListeners(), history.go(i);
  }
  const r = ge(
    { location: "", base: e, go: o, createHref: $d.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(r, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(r, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    r
  );
}
function Dd(e) {
  return (
    (e = location.host ? e || location.pathname + location.search : ""),
    e.includes("#") || (e += "#"),
    jd(e)
  );
}
function Hd(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function Pa(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const yt = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  Aa = Symbol("");
var bs;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(bs || (bs = {}));
function gn(e, t) {
  return ge(new Error(), { type: e, [Aa]: !0 }, t);
}
function ft(e, t) {
  return e instanceof Error && Aa in e && (t == null || !!(e.type & t));
}
const ys = "[^/]+?",
  zd = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Kd = /[.+*?^${}()[\]/\\]/g;
function Ud(e, t) {
  const n = ge({}, zd, t),
    o = [];
  let r = n.start ? "^" : "";
  const i = [];
  for (const c of e) {
    const u = c.length ? [] : [90];
    n.strict && !c.length && (r += "/");
    for (let d = 0; d < c.length; d++) {
      const f = c[d];
      let p = 40 + (n.sensitive ? 0.25 : 0);
      if (f.type === 0)
        d || (r += "/"), (r += f.value.replace(Kd, "\\$&")), (p += 40);
      else if (f.type === 1) {
        const { value: y, repeatable: T, optional: w, regexp: O } = f;
        i.push({ name: y, repeatable: T, optional: w });
        const m = O || ys;
        if (m !== ys) {
          p += 10;
          try {
            new RegExp(`(${m})`);
          } catch (M) {
            throw new Error(
              `Invalid custom RegExp for param "${y}" (${m}): ` + M.message
            );
          }
        }
        let b = T ? `((?:${m})(?:/(?:${m}))*)` : `(${m})`;
        d || (b = w && c.length < 2 ? `(?:/${b})` : "/" + b),
          w && (b += "?"),
          (r += b),
          (p += 20),
          w && (p += -8),
          T && (p += -20),
          m === ".*" && (p += -50);
      }
      u.push(p);
    }
    o.push(u);
  }
  if (n.strict && n.end) {
    const c = o.length - 1;
    o[c][o[c].length - 1] += 0.7000000000000001;
  }
  n.strict || (r += "/?"), n.end ? (r += "$") : n.strict && (r += "(?:/|$)");
  const s = new RegExp(r, n.sensitive ? "" : "i");
  function l(c) {
    const u = c.match(s),
      d = {};
    if (!u) return null;
    for (let f = 1; f < u.length; f++) {
      const p = u[f] || "",
        y = i[f - 1];
      d[y.name] = p && y.repeatable ? p.split("/") : p;
    }
    return d;
  }
  function a(c) {
    let u = "",
      d = !1;
    for (const f of e) {
      (!d || !u.endsWith("/")) && (u += "/"), (d = !1);
      for (const p of f)
        if (p.type === 0) u += p.value;
        else if (p.type === 1) {
          const { value: y, repeatable: T, optional: w } = p,
            O = y in c ? c[y] : "";
          if (rt(O) && !T)
            throw new Error(
              `Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`
            );
          const m = rt(O) ? O.join("/") : O;
          if (!m)
            if (w)
              f.length < 2 &&
                (u.endsWith("/") ? (u = u.slice(0, -1)) : (d = !0));
            else throw new Error(`Missing required param "${y}"`);
          u += m;
        }
    }
    return u || "/";
  }
  return { re: s, score: o, keys: i, parse: l, stringify: a };
}
function Wd(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o) return o;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function Qd(e, t) {
  let n = 0;
  const o = e.score,
    r = t.score;
  for (; n < o.length && n < r.length; ) {
    const i = Wd(o[n], r[n]);
    if (i) return i;
    n++;
  }
  if (Math.abs(r.length - o.length) === 1) {
    if (_s(o)) return 1;
    if (_s(r)) return -1;
  }
  return r.length - o.length;
}
function _s(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Gd = { type: 0, value: "" },
  Yd = /[a-zA-Z0-9_]/;
function Zd(e) {
  if (!e) return [[]];
  if (e === "/") return [[Gd]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(p) {
    throw new Error(`ERR (${n})/"${c}": ${p}`);
  }
  let n = 0,
    o = n;
  const r = [];
  let i;
  function s() {
    i && r.push(i), (i = []);
  }
  let l = 0,
    a,
    c = "",
    u = "";
  function d() {
    !c ||
      (n === 0
        ? i.push({ type: 0, value: c })
        : n === 1 || n === 2 || n === 3
        ? (i.length > 1 &&
            (a === "*" || a === "+") &&
            t(
              `A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`
            ),
          i.push({
            type: 1,
            value: c,
            regexp: u,
            repeatable: a === "*" || a === "+",
            optional: a === "*" || a === "?",
          }))
        : t("Invalid state to consume buffer"),
      (c = ""));
  }
  function f() {
    c += a;
  }
  for (; l < e.length; ) {
    if (((a = e[l++]), a === "\\" && n !== 2)) {
      (o = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        a === "/" ? (c && d(), s()) : a === ":" ? (d(), (n = 1)) : f();
        break;
      case 4:
        f(), (n = o);
        break;
      case 1:
        a === "("
          ? (n = 2)
          : Yd.test(a)
          ? f()
          : (d(), (n = 0), a !== "*" && a !== "?" && a !== "+" && l--);
        break;
      case 2:
        a === ")"
          ? u[u.length - 1] == "\\"
            ? (u = u.slice(0, -1) + a)
            : (n = 3)
          : (u += a);
        break;
      case 3:
        d(), (n = 0), a !== "*" && a !== "?" && a !== "+" && l--, (u = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${c}"`), d(), s(), r;
}
function Xd(e, t, n) {
  const o = Ud(Zd(e.path), n),
    r = ge(o, { record: e, parent: t, children: [], alias: [] });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function Jd(e, t) {
  const n = [],
    o = new Map();
  t = Cs({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(u) {
    return o.get(u);
  }
  function i(u, d, f) {
    const p = !f,
      y = eh(u);
    y.aliasOf = f && f.record;
    const T = Cs(t, u),
      w = [y];
    if ("alias" in u) {
      const b = typeof u.alias == "string" ? [u.alias] : u.alias;
      for (const M of b)
        w.push(
          ge({}, y, {
            components: f ? f.record.components : y.components,
            path: M,
            aliasOf: f ? f.record : y,
          })
        );
    }
    let O, m;
    for (const b of w) {
      const { path: M } = b;
      if (d && M[0] !== "/") {
        const $ = d.record.path,
          q = $[$.length - 1] === "/" ? "" : "/";
        b.path = d.record.path + (M && q + M);
      }
      if (
        ((O = Xd(b, d, T)),
        f
          ? f.alias.push(O)
          : ((m = m || O),
            m !== O && m.alias.push(O),
            p && u.name && !xs(O) && s(u.name)),
        y.children)
      ) {
        const $ = y.children;
        for (let q = 0; q < $.length; q++) i($[q], O, f && f.children[q]);
      }
      (f = f || O),
        ((O.record.components && Object.keys(O.record.components).length) ||
          O.record.name ||
          O.record.redirect) &&
          a(O);
    }
    return m
      ? () => {
          s(m);
        }
      : $n;
  }
  function s(u) {
    if (Pa(u)) {
      const d = o.get(u);
      d &&
        (o.delete(u),
        n.splice(n.indexOf(d), 1),
        d.children.forEach(s),
        d.alias.forEach(s));
    } else {
      const d = n.indexOf(u);
      d > -1 &&
        (n.splice(d, 1),
        u.record.name && o.delete(u.record.name),
        u.children.forEach(s),
        u.alias.forEach(s));
    }
  }
  function l() {
    return n;
  }
  function a(u) {
    let d = 0;
    for (
      ;
      d < n.length &&
      Qd(u, n[d]) >= 0 &&
      (u.record.path !== n[d].record.path || !Ma(u, n[d]));

    )
      d++;
    n.splice(d, 0, u), u.record.name && !xs(u) && o.set(u.record.name, u);
  }
  function c(u, d) {
    let f,
      p = {},
      y,
      T;
    if ("name" in u && u.name) {
      if (((f = o.get(u.name)), !f)) throw gn(1, { location: u });
      (T = f.record.name),
        (p = ge(
          ws(
            d.params,
            f.keys.filter((m) => !m.optional).map((m) => m.name)
          ),
          u.params &&
            ws(
              u.params,
              f.keys.map((m) => m.name)
            )
        )),
        (y = f.stringify(p));
    } else if ("path" in u)
      (y = u.path),
        (f = n.find((m) => m.re.test(y))),
        f && ((p = f.parse(y)), (T = f.record.name));
    else {
      if (((f = d.name ? o.get(d.name) : n.find((m) => m.re.test(d.path))), !f))
        throw gn(1, { location: u, currentLocation: d });
      (T = f.record.name),
        (p = ge({}, d.params, u.params)),
        (y = f.stringify(p));
    }
    const w = [];
    let O = f;
    for (; O; ) w.unshift(O.record), (O = O.parent);
    return { name: T, path: y, params: p, matched: w, meta: nh(w) };
  }
  return (
    e.forEach((u) => i(u)),
    {
      addRoute: i,
      resolve: c,
      removeRoute: s,
      getRoutes: l,
      getRecordMatcher: r,
    }
  );
}
function ws(e, t) {
  const n = {};
  for (const o of t) o in e && (n[o] = e[o]);
  return n;
}
function eh(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: th(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
}
function th(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const o in e.components) t[o] = typeof n == "object" ? n[o] : n;
  return t;
}
function xs(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function nh(e) {
  return e.reduce((t, n) => ge(t, n.meta), {});
}
function Cs(e, t) {
  const n = {};
  for (const o in e) n[o] = o in t ? t[o] : e[o];
  return n;
}
function Ma(e, t) {
  return t.children.some((n) => n === e || Ma(e, n));
}
const qa = /#/g,
  oh = /&/g,
  rh = /\//g,
  ih = /=/g,
  sh = /\?/g,
  $a = /\+/g,
  lh = /%5B/g,
  ah = /%5D/g,
  Oa = /%5E/g,
  uh = /%60/g,
  La = /%7B/g,
  ch = /%7C/g,
  Fa = /%7D/g,
  fh = /%20/g;
function di(e) {
  return encodeURI("" + e)
    .replace(ch, "|")
    .replace(lh, "[")
    .replace(ah, "]");
}
function dh(e) {
  return di(e).replace(La, "{").replace(Fa, "}").replace(Oa, "^");
}
function Fr(e) {
  return di(e)
    .replace($a, "%2B")
    .replace(fh, "+")
    .replace(qa, "%23")
    .replace(oh, "%26")
    .replace(uh, "`")
    .replace(La, "{")
    .replace(Fa, "}")
    .replace(Oa, "^");
}
function hh(e) {
  return Fr(e).replace(ih, "%3D");
}
function gh(e) {
  return di(e).replace(qa, "%23").replace(sh, "%3F");
}
function mh(e) {
  return e == null ? "" : gh(e).replace(rh, "%2F");
}
function Ro(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function ph(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const i = o[r].replace($a, " "),
      s = i.indexOf("="),
      l = Ro(s < 0 ? i : i.slice(0, s)),
      a = s < 0 ? null : Ro(i.slice(s + 1));
    if (l in t) {
      let c = t[l];
      rt(c) || (c = t[l] = [c]), c.push(a);
    } else t[l] = a;
  }
  return t;
}
function ks(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (((n = hh(n)), o == null)) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (rt(o) ? o.map((i) => i && Fr(i)) : [o && Fr(o)]).forEach((i) => {
      i !== void 0 &&
        ((t += (t.length ? "&" : "") + n), i != null && (t += "=" + i));
    });
  }
  return t;
}
function vh(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 &&
      (t[n] = rt(o)
        ? o.map((r) => (r == null ? null : "" + r))
        : o == null
        ? o
        : "" + o);
  }
  return t;
}
const bh = Symbol(""),
  Ss = Symbol(""),
  hi = Symbol(""),
  Ba = Symbol(""),
  Br = Symbol("");
function wn() {
  let e = [];
  function t(o) {
    return (
      e.push(o),
      () => {
        const r = e.indexOf(o);
        r > -1 && e.splice(r, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function St(e, t, n, o, r) {
  const i = o && (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () =>
    new Promise((s, l) => {
      const a = (d) => {
          d === !1
            ? l(gn(4, { from: n, to: t }))
            : d instanceof Error
            ? l(d)
            : Hd(d)
            ? l(gn(2, { from: t, to: d }))
            : (i &&
                o.enterCallbacks[r] === i &&
                typeof d == "function" &&
                i.push(d),
              s());
        },
        c = e.call(o && o.instances[r], t, n, a);
      let u = Promise.resolve(c);
      e.length < 3 && (u = u.then(a)), u.catch((d) => l(d));
    });
}
function ar(e, t, n, o) {
  const r = [];
  for (const i of e)
    for (const s in i.components) {
      let l = i.components[s];
      if (!(t !== "beforeRouteEnter" && !i.instances[s]))
        if (yh(l)) {
          const c = (l.__vccOpts || l)[t];
          c && r.push(St(c, n, o, i, s));
        } else {
          let a = l();
          r.push(() =>
            a.then((c) => {
              if (!c)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${s}" at "${i.path}"`)
                );
              const u = kd(c) ? c.default : c;
              i.components[s] = u;
              const f = (u.__vccOpts || u)[t];
              return f && St(f, n, o, i, s)();
            })
          );
        }
    }
  return r;
}
function yh(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function Es(e) {
  const t = ut(hi),
    n = ut(Ba),
    o = E(() => t.resolve(Dt(e.to))),
    r = E(() => {
      const { matched: a } = o.value,
        { length: c } = a,
        u = a[c - 1],
        d = n.matched;
      if (!u || !d.length) return -1;
      const f = d.findIndex(hn.bind(null, u));
      if (f > -1) return f;
      const p = Rs(a[c - 2]);
      return c > 1 && Rs(u) === p && d[d.length - 1].path !== p
        ? d.findIndex(hn.bind(null, a[c - 2]))
        : f;
    }),
    i = E(() => r.value > -1 && Ch(n.params, o.value.params)),
    s = E(
      () =>
        r.value > -1 &&
        r.value === n.matched.length - 1 &&
        Ra(n.params, o.value.params)
    );
  function l(a = {}) {
    return xh(a)
      ? t[Dt(e.replace) ? "replace" : "push"](Dt(e.to)).catch($n)
      : Promise.resolve();
  }
  return {
    route: o,
    href: E(() => o.value.href),
    isActive: i,
    isExactActive: s,
    navigate: l,
  };
}
const _h = Lo({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: Es,
    setup(e, { slots: t }) {
      const n = vn(Es(e)),
        { options: o } = ut(hi),
        r = E(() => ({
          [Ts(e.activeClass, o.linkActiveClass, "router-link-active")]:
            n.isActive,
          [Ts(
            e.exactActiveClass,
            o.linkExactActiveClass,
            "router-link-exact-active"
          )]: n.isExactActive,
        }));
      return () => {
        const i = t.default && t.default(n);
        return e.custom
          ? i
          : S(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: r.value,
              },
              i
            );
      };
    },
  }),
  wh = _h;
function xh(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Ch(e, t) {
  for (const n in t) {
    const o = t[n],
      r = e[n];
    if (typeof o == "string") {
      if (o !== r) return !1;
    } else if (!rt(r) || r.length !== o.length || o.some((i, s) => i !== r[s]))
      return !1;
  }
  return !0;
}
function Rs(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const Ts = (e, t, n) => (e != null ? e : t != null ? t : n),
  kh = Lo({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const o = ut(Br),
        r = E(() => e.route || o.value),
        i = ut(Ss, 0),
        s = E(() => {
          let c = Dt(i);
          const { matched: u } = r.value;
          let d;
          for (; (d = u[c]) && !d.components; ) c++;
          return c;
        }),
        l = E(() => r.value.matched[s.value]);
      fo(
        Ss,
        E(() => s.value + 1)
      ),
        fo(bh, l),
        fo(Br, r);
      const a = de();
      return (
        pe(
          () => [a.value, l.value, e.name],
          ([c, u, d], [f, p, y]) => {
            u &&
              ((u.instances[d] = c),
              p &&
                p !== u &&
                c &&
                c === f &&
                (u.leaveGuards.size || (u.leaveGuards = p.leaveGuards),
                u.updateGuards.size || (u.updateGuards = p.updateGuards))),
              c &&
                u &&
                (!p || !hn(u, p) || !f) &&
                (u.enterCallbacks[d] || []).forEach((T) => T(c));
          },
          { flush: "post" }
        ),
        () => {
          const c = r.value,
            u = e.name,
            d = l.value,
            f = d && d.components[u];
          if (!f) return Ps(n.default, { Component: f, route: c });
          const p = d.props[u],
            y = p
              ? p === !0
                ? c.params
                : typeof p == "function"
                ? p(c)
                : p
              : null,
            w = S(
              f,
              ge({}, y, t, {
                onVnodeUnmounted: (O) => {
                  O.component.isUnmounted && (d.instances[u] = null);
                },
                ref: a,
              })
            );
          return Ps(n.default, { Component: w, route: c }) || w;
        }
      );
    },
  });
function Ps(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Sh = kh;
function Eh(e) {
  const t = Jd(e.routes, e),
    n = e.parseQuery || ph,
    o = e.stringifyQuery || ks,
    r = e.history,
    i = wn(),
    s = wn(),
    l = wn(),
    a = Zu(yt);
  let c = yt;
  nn &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const u = sr.bind(null, (R) => "" + R),
    d = sr.bind(null, mh),
    f = sr.bind(null, Ro);
  function p(R, W) {
    let K, X;
    return (
      Pa(R) ? ((K = t.getRecordMatcher(R)), (X = W)) : (X = R), t.addRoute(X, K)
    );
  }
  function y(R) {
    const W = t.getRecordMatcher(R);
    W && t.removeRoute(W);
  }
  function T() {
    return t.getRoutes().map((R) => R.record);
  }
  function w(R) {
    return !!t.getRecordMatcher(R);
  }
  function O(R, W) {
    if (((W = ge({}, W || a.value)), typeof R == "string")) {
      const g = lr(n, R, W.path),
        _ = t.resolve({ path: g.path }, W),
        L = r.createHref(g.fullPath);
      return ge(g, _, {
        params: f(_.params),
        hash: Ro(g.hash),
        redirectedFrom: void 0,
        href: L,
      });
    }
    let K;
    if ("path" in R) K = ge({}, R, { path: lr(n, R.path, W.path).path });
    else {
      const g = ge({}, R.params);
      for (const _ in g) g[_] == null && delete g[_];
      (K = ge({}, R, { params: d(g) })), (W.params = d(W.params));
    }
    const X = t.resolve(K, W),
      he = R.hash || "";
    X.params = u(f(X.params));
    const _e = Rd(o, ge({}, R, { hash: dh(he), path: X.path })),
      h = r.createHref(_e);
    return ge(
      { fullPath: _e, hash: he, query: o === ks ? vh(R.query) : R.query || {} },
      X,
      { redirectedFrom: void 0, href: h }
    );
  }
  function m(R) {
    return typeof R == "string" ? lr(n, R, a.value.path) : ge({}, R);
  }
  function b(R, W) {
    if (c !== R) return gn(8, { from: W, to: R });
  }
  function M(R) {
    return V(R);
  }
  function $(R) {
    return M(ge(m(R), { replace: !0 }));
  }
  function q(R) {
    const W = R.matched[R.matched.length - 1];
    if (W && W.redirect) {
      const { redirect: K } = W;
      let X = typeof K == "function" ? K(R) : K;
      return (
        typeof X == "string" &&
          ((X = X.includes("?") || X.includes("#") ? (X = m(X)) : { path: X }),
          (X.params = {})),
        ge(
          { query: R.query, hash: R.hash, params: "path" in X ? {} : R.params },
          X
        )
      );
    }
  }
  function V(R, W) {
    const K = (c = O(R)),
      X = a.value,
      he = R.state,
      _e = R.force,
      h = R.replace === !0,
      g = q(K);
    if (g)
      return V(
        ge(m(g), {
          state: typeof g == "object" ? ge({}, he, g.state) : he,
          force: _e,
          replace: h,
        }),
        W || K
      );
    const _ = K;
    _.redirectedFrom = W;
    let L;
    return (
      !_e &&
        Td(o, X, K) &&
        ((L = gn(16, { to: _, from: X })), fe(X, X, !0, !1)),
      (L ? Promise.resolve(L) : x(_, X))
        .catch((P) => (ft(P) ? (ft(P, 2) ? P : le(P)) : Q(P, _, X)))
        .then((P) => {
          if (P) {
            if (ft(P, 2))
              return V(
                ge({ replace: h }, m(P.to), {
                  state: typeof P.to == "object" ? ge({}, he, P.to.state) : he,
                  force: _e,
                }),
                W || _
              );
          } else P = v(_, X, !0, h, he);
          return F(_, X, P), P;
        })
    );
  }
  function H(R, W) {
    const K = b(R, W);
    return K ? Promise.reject(K) : Promise.resolve();
  }
  function C(R) {
    const W = Re.values().next().value;
    return W && typeof W.runWithContext == "function"
      ? W.runWithContext(R)
      : R();
  }
  function x(R, W) {
    let K;
    const [X, he, _e] = Rh(R, W);
    K = ar(X.reverse(), "beforeRouteLeave", R, W);
    for (const g of X)
      g.leaveGuards.forEach((_) => {
        K.push(St(_, R, W));
      });
    const h = H.bind(null, R, W);
    return (
      K.push(h),
      te(K)
        .then(() => {
          K = [];
          for (const g of i.list()) K.push(St(g, R, W));
          return K.push(h), te(K);
        })
        .then(() => {
          K = ar(he, "beforeRouteUpdate", R, W);
          for (const g of he)
            g.updateGuards.forEach((_) => {
              K.push(St(_, R, W));
            });
          return K.push(h), te(K);
        })
        .then(() => {
          K = [];
          for (const g of _e)
            if (g.beforeEnter)
              if (rt(g.beforeEnter))
                for (const _ of g.beforeEnter) K.push(St(_, R, W));
              else K.push(St(g.beforeEnter, R, W));
          return K.push(h), te(K);
        })
        .then(
          () => (
            R.matched.forEach((g) => (g.enterCallbacks = {})),
            (K = ar(_e, "beforeRouteEnter", R, W)),
            K.push(h),
            te(K)
          )
        )
        .then(() => {
          K = [];
          for (const g of s.list()) K.push(St(g, R, W));
          return K.push(h), te(K);
        })
        .catch((g) => (ft(g, 8) ? g : Promise.reject(g)))
    );
  }
  function F(R, W, K) {
    l.list().forEach((X) => C(() => X(R, W, K)));
  }
  function v(R, W, K, X, he) {
    const _e = b(R, W);
    if (_e) return _e;
    const h = W === yt,
      g = nn ? history.state : {};
    K &&
      (X || h
        ? r.replace(R.fullPath, ge({ scroll: h && g && g.scroll }, he))
        : r.push(R.fullPath, he)),
      (a.value = R),
      fe(R, W, K, h),
      le();
  }
  let D;
  function k() {
    D ||
      (D = r.listen((R, W, K) => {
        if (!ne.listening) return;
        const X = O(R),
          he = q(X);
        if (he) {
          V(ge(he, { replace: !0 }), X).catch($n);
          return;
        }
        c = X;
        const _e = a.value;
        nn && Fd(ps(_e.fullPath, K.delta), Ko()),
          x(X, _e)
            .catch((h) =>
              ft(h, 12)
                ? h
                : ft(h, 2)
                ? (V(h.to, X)
                    .then((g) => {
                      ft(g, 20) &&
                        !K.delta &&
                        K.type === Dn.pop &&
                        r.go(-1, !1);
                    })
                    .catch($n),
                  Promise.reject())
                : (K.delta && r.go(-K.delta, !1), Q(h, X, _e))
            )
            .then((h) => {
              (h = h || v(X, _e, !1)),
                h &&
                  (K.delta && !ft(h, 8)
                    ? r.go(-K.delta, !1)
                    : K.type === Dn.pop && ft(h, 20) && r.go(-1, !1)),
                F(X, _e, h);
            })
            .catch($n);
      }));
  }
  let Z = wn(),
    G = wn(),
    A;
  function Q(R, W, K) {
    le(R);
    const X = G.list();
    return (
      X.length ? X.forEach((he) => he(R, W, K)) : console.error(R),
      Promise.reject(R)
    );
  }
  function ye() {
    return A && a.value !== yt
      ? Promise.resolve()
      : new Promise((R, W) => {
          Z.add([R, W]);
        });
  }
  function le(R) {
    return (
      A ||
        ((A = !R),
        k(),
        Z.list().forEach(([W, K]) => (R ? K(R) : W())),
        Z.reset()),
      R
    );
  }
  function fe(R, W, K, X) {
    const { scrollBehavior: he } = e;
    if (!nn || !he) return Promise.resolve();
    const _e =
      (!K && Bd(ps(R.fullPath, 0))) ||
      ((X || !K) && history.state && history.state.scroll) ||
      null;
    return De()
      .then(() => he(R, W, _e))
      .then((h) => h && Ld(h))
      .catch((h) => Q(h, R, W));
  }
  const B = (R) => r.go(R);
  let ue;
  const Re = new Set(),
    ne = {
      currentRoute: a,
      listening: !0,
      addRoute: p,
      removeRoute: y,
      hasRoute: w,
      getRoutes: T,
      resolve: O,
      options: e,
      push: M,
      replace: $,
      go: B,
      back: () => B(-1),
      forward: () => B(1),
      beforeEach: i.add,
      beforeResolve: s.add,
      afterEach: l.add,
      onError: G.add,
      isReady: ye,
      install(R) {
        const W = this;
        R.component("RouterLink", wh),
          R.component("RouterView", Sh),
          (R.config.globalProperties.$router = W),
          Object.defineProperty(R.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => Dt(a),
          }),
          nn &&
            !ue &&
            a.value === yt &&
            ((ue = !0), M(r.location).catch((he) => {}));
        const K = {};
        for (const he in yt)
          Object.defineProperty(K, he, {
            get: () => a.value[he],
            enumerable: !0,
          });
        R.provide(hi, W), R.provide(Ba, kl(K)), R.provide(Br, a);
        const X = R.unmount;
        Re.add(R),
          (R.unmount = function () {
            Re.delete(R),
              Re.size < 1 &&
                ((c = yt),
                D && D(),
                (D = null),
                (a.value = yt),
                (ue = !1),
                (A = !1)),
              X();
          });
      },
    };
  function te(R) {
    return R.reduce((W, K) => W.then(() => C(K)), Promise.resolve());
  }
  return ne;
}
function Rh(e, t) {
  const n = [],
    o = [],
    r = [],
    i = Math.max(t.matched.length, e.matched.length);
  for (let s = 0; s < i; s++) {
    const l = t.matched[s];
    l && (e.matched.find((c) => hn(c, l)) ? o.push(l) : n.push(l));
    const a = e.matched[s];
    a && (t.matched.find((c) => hn(c, a)) || r.push(a));
  }
  return [n, o, r];
}
const Th = (function () {
    const t = document.createElement("link").relList;
    return t && t.supports && t.supports("modulepreload")
      ? "modulepreload"
      : "preload";
  })(),
  As = {},
  Ph = "/",
  ur = function (t, n) {
    return !n || n.length === 0
      ? t()
      : Promise.all(
          n.map((o) => {
            if (((o = `${Ph}${o}`), o in As)) return;
            As[o] = !0;
            const r = o.endsWith(".css"),
              i = r ? '[rel="stylesheet"]' : "";
            if (document.querySelector(`link[href="${o}"]${i}`)) return;
            const s = document.createElement("link");
            if (
              ((s.rel = r ? "stylesheet" : Th),
              r || ((s.as = "script"), (s.crossOrigin = "")),
              (s.href = o),
              document.head.appendChild(s),
              r)
            )
              return new Promise((l, a) => {
                s.addEventListener("load", l),
                  s.addEventListener("error", () =>
                    a(new Error(`Unable to preload CSS for ${o}`))
                  );
              });
          })
        ).then(() => t());
  },
  Ah = [
    {
      path: "/",
      component: () =>
        ur(
          () => import("assets/MainLayout.43d66c50.js"),
          [
            "assets/MainLayout.43d66c50.js",
            "assets/MainLayout.91b6f672.css",
            "assets/QList.19fed4bd.js",
          ]
        ),
      children: [
        {
          path: "",
          component: () =>
            ur(
              () => import("assets/IndexPage.e6cda6f3.js"),
              [
                "assets/IndexPage.e6cda6f3.js",
                "assets/IndexPage.5412550d.css",
                "assets/QList.19fed4bd.js",
              ]
            ),
        },
      ],
    },
    {
      path: "/:catchAll(.*)*",
      component: () => ur(() => import("assets/ErrorNotFound.50cd009b.js"), []),
    },
  ];
var cr = function () {
  return Eh({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: Ah,
    history: Dd("/"),
  });
};
async function Mh(e, t) {
  const n = e(_d);
  n.use(pd, t);
  const o = typeof ir == "function" ? await ir({}) : ir;
  n.use(o);
  const r = Qt(typeof cr == "function" ? await cr({ store: o }) : cr);
  return (
    o.use(({ store: i }) => {
      i.router = r;
    }),
    { app: n, store: o, router: r }
  );
}
function qh(e, t, n) {
  let o;
  function r() {
    o !== void 0 && (Or.remove(o), (o = void 0));
  }
  return (
    Ge(() => {
      e.value === !0 && r();
    }),
    {
      removeFromHistory: r,
      addToHistory() {
        (o = { condition: () => n.value === !0, handler: t }), Or.add(o);
      },
    }
  );
}
function Ia(e) {
  return e.appContext.config.globalProperties.$router !== void 0;
}
function Va(e) {
  return e.isUnmounted === !0 || e.isDeactivated === !0;
}
function $h() {
  let e = null;
  const t = ke();
  function n() {
    e !== null && (clearTimeout(e), (e = null));
  }
  return (
    Bo(n),
    Ge(n),
    {
      removeTimeout: n,
      registerTimeout(o, r) {
        n(), Va(t) === !1 && (e = setTimeout(o, r));
      },
    }
  );
}
function Oh() {
  let e;
  const t = ke();
  function n() {
    e = void 0;
  }
  return (
    Bo(n),
    Ge(n),
    {
      removeTick: n,
      registerTick(o) {
        (e = o),
          De(() => {
            e === o && (Va(t) === !1 && e(), (e = void 0));
          });
      },
    }
  );
}
const Lh = {
    modelValue: { type: Boolean, default: null },
    "onUpdate:modelValue": [Function, Array],
  },
  Fh = ["beforeShow", "show", "beforeHide", "hide"];
function Bh({
  showing: e,
  canShow: t,
  hideOnRouteChange: n,
  handleShow: o,
  handleHide: r,
  processOnMount: i,
}) {
  const s = ke(),
    { props: l, emit: a, proxy: c } = s;
  let u;
  function d(m) {
    e.value === !0 ? y(m) : f(m);
  }
  function f(m) {
    if (
      l.disable === !0 ||
      (m !== void 0 && m.qAnchorHandled === !0) ||
      (t !== void 0 && t(m) !== !0)
    )
      return;
    const b = l["onUpdate:modelValue"] !== void 0;
    b === !0 &&
      (a("update:modelValue", !0),
      (u = m),
      De(() => {
        u === m && (u = void 0);
      })),
      (l.modelValue === null || b === !1) && p(m);
  }
  function p(m) {
    e.value !== !0 &&
      ((e.value = !0), a("beforeShow", m), o !== void 0 ? o(m) : a("show", m));
  }
  function y(m) {
    if (l.disable === !0) return;
    const b = l["onUpdate:modelValue"] !== void 0;
    b === !0 &&
      (a("update:modelValue", !1),
      (u = m),
      De(() => {
        u === m && (u = void 0);
      })),
      (l.modelValue === null || b === !1) && T(m);
  }
  function T(m) {
    e.value !== !1 &&
      ((e.value = !1), a("beforeHide", m), r !== void 0 ? r(m) : a("hide", m));
  }
  function w(m) {
    l.disable === !0 && m === !0
      ? l["onUpdate:modelValue"] !== void 0 && a("update:modelValue", !1)
      : (m === !0) !== e.value && (m === !0 ? p : T)(u);
  }
  pe(() => l.modelValue, w),
    n !== void 0 &&
      Ia(s) === !0 &&
      pe(
        () => c.$route.fullPath,
        () => {
          n.value === !0 && e.value === !0 && y();
        }
      ),
    i === !0 &&
      Gt(() => {
        w(l.modelValue);
      });
  const O = { show: f, hide: y, toggle: d };
  return Object.assign(c, O), O;
}
const Ih = {
  transitionShow: { type: String, default: "fade" },
  transitionHide: { type: String, default: "fade" },
  transitionDuration: { type: [String, Number], default: 300 },
};
function Vh(e, t = () => {}, n = () => {}) {
  return {
    transitionProps: E(() => {
      const o = `q-transition--${e.transitionShow || t()}`,
        r = `q-transition--${e.transitionHide || n()}`;
      return {
        appear: !0,
        enterFromClass: `${o}-enter-from`,
        enterActiveClass: `${o}-enter-active`,
        enterToClass: `${o}-enter-to`,
        leaveFromClass: `${r}-leave-from`,
        leaveActiveClass: `${r}-leave-active`,
        leaveToClass: `${r}-leave-to`,
      };
    }),
    transitionStyle: E(
      () => `--q-transition-duration: ${e.transitionDuration}ms`
    ),
  };
}
let It = [],
  Hn = [];
function Na(e) {
  Hn = Hn.filter((t) => t !== e);
}
function Nh(e) {
  Na(e), Hn.push(e);
}
function Ms(e) {
  Na(e), Hn.length === 0 && It.length !== 0 && (It[It.length - 1](), (It = []));
}
function gi(e) {
  Hn.length === 0 ? e() : It.push(e);
}
function jh(e) {
  It = It.filter((t) => t !== e);
}
let Dh = 1,
  Hh = document.body;
function mi(e, t) {
  const n = document.createElement("div");
  if (
    ((n.id = t !== void 0 ? `q-portal--${t}--${Dh++}` : e),
    Eo.globalNodes !== void 0)
  ) {
    const o = Eo.globalNodes.class;
    o !== void 0 && (n.className = o);
  }
  return Hh.appendChild(n), n;
}
function ja(e) {
  e.remove();
}
const fr = [];
function zh(e) {
  for (e = e.parent; e != null; ) {
    if (e.type.name === "QGlobalDialog") return !0;
    if (e.type.name === "QDialog" || e.type.name === "QMenu") return !1;
    e = e.parent;
  }
  return !1;
}
function Kh(e, t, n, o) {
  const r = de(!1),
    i = de(!1);
  let s = null;
  const l = {},
    a = o === "dialog" && zh(e);
  function c(d) {
    if (d === !0) {
      Ms(l), (i.value = !0);
      return;
    }
    (i.value = !1),
      r.value === !1 &&
        (a === !1 && s === null && (s = mi(!1, o)),
        (r.value = !0),
        fr.push(e.proxy),
        Nh(l));
  }
  function u(d) {
    if (((i.value = !1), d !== !0)) return;
    Ms(l), (r.value = !1);
    const f = fr.indexOf(e.proxy);
    f !== -1 && fr.splice(f, 1), s !== null && (ja(s), (s = null));
  }
  return (
    li(() => {
      u(!0);
    }),
    (e.proxy.__qPortal = !0),
    bn(e.proxy, "contentEl", () => t.value),
    {
      showPortal: c,
      hidePortal: u,
      portalIsActive: r,
      portalIsAccessible: i,
      renderPortal: () =>
        a === !0 ? n() : r.value === !0 ? [S(Wc, { to: s }, n())] : void 0,
    }
  );
}
function Ir(e, t) {
  const n = e.style;
  for (const o in t) n[o] = t[o];
}
function Uh(e) {
  if (e == null) return;
  if (typeof e == "string")
    try {
      return document.querySelector(e) || void 0;
    } catch {
      return;
    }
  const t = Dt(e);
  if (t) return t.$el || t;
}
function Wh(e, t) {
  if (e == null || e.contains(t) === !0) return !0;
  for (let n = e.nextElementSibling; n !== null; n = n.nextElementSibling)
    if (n.contains(t)) return !0;
  return !1;
}
const Qh = [
  null,
  document,
  document.body,
  document.scrollingElement,
  document.documentElement,
];
function Bm(e, t) {
  let n = Uh(t);
  if (n === void 0) {
    if (e == null) return window;
    n = e.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return Qh.includes(n) ? window : n;
}
function Da(e) {
  return e === window
    ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0
    : e.scrollTop;
}
function Ha(e) {
  return e === window
    ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0
    : e.scrollLeft;
}
function za(e, t, n = 0) {
  const o = arguments[3] === void 0 ? performance.now() : arguments[3],
    r = Da(e);
  if (n <= 0) {
    r !== t && Vr(e, t);
    return;
  }
  requestAnimationFrame((i) => {
    const s = i - o,
      l = r + ((t - r) / Math.max(s, n)) * s;
    Vr(e, l), l !== t && za(e, t, n - s, i);
  });
}
function Ka(e, t, n = 0) {
  const o = arguments[3] === void 0 ? performance.now() : arguments[3],
    r = Ha(e);
  if (n <= 0) {
    r !== t && Nr(e, t);
    return;
  }
  requestAnimationFrame((i) => {
    const s = i - o,
      l = r + ((t - r) / Math.max(s, n)) * s;
    Nr(e, l), l !== t && Ka(e, t, n - s, i);
  });
}
function Vr(e, t) {
  if (e === window) {
    window.scrollTo(
      window.pageXOffset || window.scrollX || document.body.scrollLeft || 0,
      t
    );
    return;
  }
  e.scrollTop = t;
}
function Nr(e, t) {
  if (e === window) {
    window.scrollTo(
      t,
      window.pageYOffset || window.scrollY || document.body.scrollTop || 0
    );
    return;
  }
  e.scrollLeft = t;
}
function Im(e, t, n) {
  if (n) {
    za(e, t, n);
    return;
  }
  Vr(e, t);
}
function Vm(e, t, n) {
  if (n) {
    Ka(e, t, n);
    return;
  }
  Nr(e, t);
}
let oo;
function Nm() {
  if (oo !== void 0) return oo;
  const e = document.createElement("p"),
    t = document.createElement("div");
  Ir(e, { width: "100%", height: "200px" }),
    Ir(t, {
      position: "absolute",
      top: "0px",
      left: "0px",
      visibility: "hidden",
      width: "200px",
      height: "150px",
      overflow: "hidden",
    }),
    t.appendChild(e),
    document.body.appendChild(t);
  const n = e.offsetWidth;
  t.style.overflow = "scroll";
  let o = e.offsetWidth;
  return n === o && (o = t.clientWidth), t.remove(), (oo = n - o), oo;
}
function Gh(e, t = !0) {
  return !e || e.nodeType !== Node.ELEMENT_NODE
    ? !1
    : t
    ? e.scrollHeight > e.clientHeight &&
      (e.classList.contains("scroll") ||
        e.classList.contains("overflow-auto") ||
        ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-y"]))
    : e.scrollWidth > e.clientWidth &&
      (e.classList.contains("scroll") ||
        e.classList.contains("overflow-auto") ||
        ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-x"]));
}
let xn = 0,
  dr,
  hr,
  Rn,
  gr = !1,
  qs,
  $s,
  Os,
  Lt = null;
function Yh(e) {
  Zh(e) && We(e);
}
function Zh(e) {
  if (
    e.target === document.body ||
    e.target.classList.contains("q-layout__backdrop")
  )
    return !0;
  const t = Zf(e),
    n = e.shiftKey && !e.deltaX,
    o = !n && Math.abs(e.deltaX) <= Math.abs(e.deltaY),
    r = n || o ? e.deltaY : e.deltaX;
  for (let i = 0; i < t.length; i++) {
    const s = t[i];
    if (Gh(s, o))
      return o
        ? r < 0 && s.scrollTop === 0
          ? !0
          : r > 0 && s.scrollTop + s.clientHeight === s.scrollHeight
        : r < 0 && s.scrollLeft === 0
        ? !0
        : r > 0 && s.scrollLeft + s.clientWidth === s.scrollWidth;
  }
  return !0;
}
function Ls(e) {
  e.target === document &&
    (document.scrollingElement.scrollTop = document.scrollingElement.scrollTop);
}
function ro(e) {
  gr !== !0 &&
    ((gr = !0),
    requestAnimationFrame(() => {
      gr = !1;
      const { height: t } = e.target,
        { clientHeight: n, scrollTop: o } = document.scrollingElement;
      (Rn === void 0 || t !== window.innerHeight) &&
        ((Rn = n - t), (document.scrollingElement.scrollTop = o)),
        o > Rn &&
          (document.scrollingElement.scrollTop -= Math.ceil((o - Rn) / 8));
    }));
}
function Fs(e) {
  const t = document.body,
    n = window.visualViewport !== void 0;
  if (e === "add") {
    const { overflowY: o, overflowX: r } = window.getComputedStyle(t);
    (dr = Ha(window)),
      (hr = Da(window)),
      (qs = t.style.left),
      ($s = t.style.top),
      (Os = window.location.href),
      (t.style.left = `-${dr}px`),
      (t.style.top = `-${hr}px`),
      r !== "hidden" &&
        (r === "scroll" || t.scrollWidth > window.innerWidth) &&
        t.classList.add("q-body--force-scrollbar-x"),
      o !== "hidden" &&
        (o === "scroll" || t.scrollHeight > window.innerHeight) &&
        t.classList.add("q-body--force-scrollbar-y"),
      t.classList.add("q-body--prevent-scroll"),
      (document.qScrollPrevented = !0),
      Ce.is.ios === !0 &&
        (n === !0
          ? (window.scrollTo(0, 0),
            window.visualViewport.addEventListener(
              "resize",
              ro,
              Be.passiveCapture
            ),
            window.visualViewport.addEventListener(
              "scroll",
              ro,
              Be.passiveCapture
            ),
            window.scrollTo(0, 0))
          : window.addEventListener("scroll", Ls, Be.passiveCapture));
  }
  Ce.is.desktop === !0 &&
    Ce.is.mac === !0 &&
    window[`${e}EventListener`]("wheel", Yh, Be.notPassive),
    e === "remove" &&
      (Ce.is.ios === !0 &&
        (n === !0
          ? (window.visualViewport.removeEventListener(
              "resize",
              ro,
              Be.passiveCapture
            ),
            window.visualViewport.removeEventListener(
              "scroll",
              ro,
              Be.passiveCapture
            ))
          : window.removeEventListener("scroll", Ls, Be.passiveCapture)),
      t.classList.remove("q-body--prevent-scroll"),
      t.classList.remove("q-body--force-scrollbar-x"),
      t.classList.remove("q-body--force-scrollbar-y"),
      (document.qScrollPrevented = !1),
      (t.style.left = qs),
      (t.style.top = $s),
      window.location.href === Os && window.scrollTo(dr, hr),
      (Rn = void 0));
}
function Xh(e) {
  let t = "add";
  if (e === !0) {
    if ((xn++, Lt !== null)) {
      clearTimeout(Lt), (Lt = null);
      return;
    }
    if (xn > 1) return;
  } else {
    if (xn === 0 || (xn--, xn > 0)) return;
    if (((t = "remove"), Ce.is.ios === !0 && Ce.is.nativeMobile === !0)) {
      Lt !== null && clearTimeout(Lt),
        (Lt = setTimeout(() => {
          Fs(t), (Lt = null);
        }, 100));
      return;
    }
  }
  Fs(t);
}
function Jh() {
  let e;
  return {
    preventBodyScroll(t) {
      t !== e && (e !== void 0 || t === !0) && ((e = t), Xh(t));
    },
  };
}
const Oe = (e) => Qt(Lo(e)),
  eg = (e) => Qt(e);
function nt(e, t) {
  return (e !== void 0 && e()) || t;
}
function jm(e, t) {
  if (e !== void 0) {
    const n = e();
    if (n != null) return n.slice();
  }
  return t;
}
function Vt(e, t) {
  return e !== void 0 ? t.concat(e()) : t;
}
function tg(e, t) {
  return e === void 0 ? t : t !== void 0 ? t.concat(e()) : e();
}
function Dm(e, t, n, o, r, i) {
  t.key = o + r;
  const s = S(e, t, n);
  return r === !0 ? Dl(s, i()) : s;
}
const Ht = [];
let mn;
function ng(e) {
  mn = e.keyCode === 27;
}
function og() {
  mn === !0 && (mn = !1);
}
function rg(e) {
  mn === !0 && ((mn = !1), jn(e, 27) === !0 && Ht[Ht.length - 1](e));
}
function Ua(e) {
  window[e]("keydown", ng),
    window[e]("blur", og),
    window[e]("keyup", rg),
    (mn = !1);
}
function ig(e) {
  Ce.is.desktop === !0 &&
    (Ht.push(e), Ht.length === 1 && Ua("addEventListener"));
}
function Bs(e) {
  const t = Ht.indexOf(e);
  t > -1 && (Ht.splice(t, 1), Ht.length === 0 && Ua("removeEventListener"));
}
const zt = [];
function Wa(e) {
  zt[zt.length - 1](e);
}
function sg(e) {
  Ce.is.desktop === !0 &&
    (zt.push(e),
    zt.length === 1 && document.body.addEventListener("focusin", Wa));
}
function Is(e) {
  const t = zt.indexOf(e);
  t > -1 &&
    (zt.splice(t, 1),
    zt.length === 0 && document.body.removeEventListener("focusin", Wa));
}
let io = 0;
const lg = {
    standard: "fixed-full flex-center",
    top: "fixed-top justify-center",
    bottom: "fixed-bottom justify-center",
    right: "fixed-right items-center",
    left: "fixed-left items-center",
  },
  Vs = {
    standard: ["scale", "scale"],
    top: ["slide-down", "slide-up"],
    bottom: ["slide-up", "slide-down"],
    right: ["slide-left", "slide-right"],
    left: ["slide-right", "slide-left"],
  };
var ag = Oe({
  name: "QDialog",
  inheritAttrs: !1,
  props: {
    ...Lh,
    ...Ih,
    transitionShow: String,
    transitionHide: String,
    persistent: Boolean,
    autoClose: Boolean,
    allowFocusOutside: Boolean,
    noEscDismiss: Boolean,
    noBackdropDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    noShake: Boolean,
    seamless: Boolean,
    maximized: Boolean,
    fullWidth: Boolean,
    fullHeight: Boolean,
    square: Boolean,
    position: {
      type: String,
      default: "standard",
      validator: (e) =>
        e === "standard" || ["top", "bottom", "left", "right"].includes(e),
    },
  },
  emits: [...Fh, "shake", "click", "escapeKey"],
  setup(e, { slots: t, emit: n, attrs: o }) {
    const r = ke(),
      i = de(null),
      s = de(!1),
      l = de(!1);
    let a = null,
      c = null,
      u,
      d;
    const f = E(
        () =>
          e.persistent !== !0 && e.noRouteDismiss !== !0 && e.seamless !== !0
      ),
      { preventBodyScroll: p } = Jh(),
      { registerTimeout: y } = $h(),
      { registerTick: T, removeTick: w } = Oh(),
      { transitionProps: O, transitionStyle: m } = Vh(
        e,
        () => Vs[e.position][0],
        () => Vs[e.position][1]
      ),
      {
        showPortal: b,
        hidePortal: M,
        portalIsAccessible: $,
        renderPortal: q,
      } = Kh(r, i, Re, "dialog"),
      { hide: V } = Bh({
        showing: s,
        hideOnRouteChange: f,
        handleShow: k,
        handleHide: Z,
        processOnMount: !0,
      }),
      { addToHistory: H, removeFromHistory: C } = qh(s, V, f),
      x = E(
        () =>
          `q-dialog__inner flex no-pointer-events q-dialog__inner--${
            e.maximized === !0 ? "maximized" : "minimized"
          } q-dialog__inner--${e.position} ${lg[e.position]}` +
          (l.value === !0 ? " q-dialog__inner--animating" : "") +
          (e.fullWidth === !0 ? " q-dialog__inner--fullwidth" : "") +
          (e.fullHeight === !0 ? " q-dialog__inner--fullheight" : "") +
          (e.square === !0 ? " q-dialog__inner--square" : "")
      ),
      F = E(() => s.value === !0 && e.seamless !== !0),
      v = E(() => (e.autoClose === !0 ? { onClick: fe } : {})),
      D = E(() => [
        `q-dialog fullscreen no-pointer-events q-dialog--${
          F.value === !0 ? "modal" : "seamless"
        }`,
        o.class,
      ]);
    pe(
      () => e.maximized,
      (ne) => {
        s.value === !0 && le(ne);
      }
    ),
      pe(F, (ne) => {
        p(ne), ne === !0 ? (sg(ue), ig(Q)) : (Is(ue), Bs(Q));
      });
    function k(ne) {
      H(),
        (c =
          e.noRefocus === !1 && document.activeElement !== null
            ? document.activeElement
            : null),
        le(e.maximized),
        b(),
        (l.value = !0),
        e.noFocus !== !0
          ? (document.activeElement !== null && document.activeElement.blur(),
            T(G))
          : w(),
        y(() => {
          if (r.proxy.$q.platform.is.ios === !0) {
            if (e.seamless !== !0 && document.activeElement) {
              const { top: te, bottom: R } =
                  document.activeElement.getBoundingClientRect(),
                { innerHeight: W } = window,
                K =
                  window.visualViewport !== void 0
                    ? window.visualViewport.height
                    : W;
              te > 0 &&
                R > K / 2 &&
                (document.scrollingElement.scrollTop = Math.min(
                  document.scrollingElement.scrollHeight - K,
                  R >= W
                    ? 1 / 0
                    : Math.ceil(document.scrollingElement.scrollTop + R - K / 2)
                )),
                document.activeElement.scrollIntoView();
            }
            (d = !0), i.value.click(), (d = !1);
          }
          b(!0), (l.value = !1), n("show", ne);
        }, e.transitionDuration);
    }
    function Z(ne) {
      w(),
        C(),
        ye(!0),
        (l.value = !0),
        M(),
        c !== null &&
          ((
            (ne && ne.type.indexOf("key") === 0
              ? c.closest('[tabindex]:not([tabindex^="-"])')
              : void 0) || c
          ).focus(),
          (c = null)),
        y(() => {
          M(!0), (l.value = !1), n("hide", ne);
        }, e.transitionDuration);
    }
    function G(ne) {
      gi(() => {
        let te = i.value;
        te === null ||
          te.contains(document.activeElement) === !0 ||
          ((te =
            (ne !== "" ? te.querySelector(ne) : null) ||
            te.querySelector(
              "[autofocus][tabindex], [data-autofocus][tabindex]"
            ) ||
            te.querySelector(
              "[autofocus] [tabindex], [data-autofocus] [tabindex]"
            ) ||
            te.querySelector("[autofocus], [data-autofocus]") ||
            te),
          te.focus({ preventScroll: !0 }));
      });
    }
    function A(ne) {
      ne && typeof ne.focus == "function"
        ? ne.focus({ preventScroll: !0 })
        : G(),
        n("shake");
      const te = i.value;
      te !== null &&
        (te.classList.remove("q-animate--scale"),
        te.classList.add("q-animate--scale"),
        a !== null && clearTimeout(a),
        (a = setTimeout(() => {
          (a = null),
            i.value !== null && (te.classList.remove("q-animate--scale"), G());
        }, 170)));
    }
    function Q() {
      e.seamless !== !0 &&
        (e.persistent === !0 || e.noEscDismiss === !0
          ? e.maximized !== !0 && e.noShake !== !0 && A()
          : (n("escapeKey"), V()));
    }
    function ye(ne) {
      a !== null && (clearTimeout(a), (a = null)),
        (ne === !0 || s.value === !0) &&
          (le(!1), e.seamless !== !0 && (p(!1), Is(ue), Bs(Q))),
        ne !== !0 && (c = null);
    }
    function le(ne) {
      ne === !0
        ? u !== !0 &&
          (io < 1 && document.body.classList.add("q-body--dialog"),
          io++,
          (u = !0))
        : u === !0 &&
          (io < 2 && document.body.classList.remove("q-body--dialog"),
          io--,
          (u = !1));
    }
    function fe(ne) {
      d !== !0 && (V(ne), n("click", ne));
    }
    function B(ne) {
      e.persistent !== !0 && e.noBackdropDismiss !== !0
        ? V(ne)
        : e.noShake !== !0 && A();
    }
    function ue(ne) {
      e.allowFocusOutside !== !0 &&
        $.value === !0 &&
        Wh(i.value, ne.target) !== !0 &&
        G('[tabindex]:not([tabindex="-1"])');
    }
    Object.assign(r.proxy, {
      focus: G,
      shake: A,
      __updateRefocusTarget(ne) {
        c = ne || null;
      },
    }),
      Ge(ye);
    function Re() {
      return S(
        "div",
        {
          role: "dialog",
          "aria-modal": F.value === !0 ? "true" : "false",
          ...o,
          class: D.value,
        },
        [
          S(dn, { name: "q-transition--fade", appear: !0 }, () =>
            F.value === !0
              ? S("div", {
                  class: "q-dialog__backdrop fixed-full",
                  style: m.value,
                  "aria-hidden": "true",
                  tabindex: -1,
                  onClick: B,
                })
              : null
          ),
          S(dn, O.value, () =>
            s.value === !0
              ? S(
                  "div",
                  {
                    ref: i,
                    class: x.value,
                    style: m.value,
                    tabindex: -1,
                    ...v.value,
                  },
                  nt(t.default)
                )
              : null
          ),
        ]
      );
    }
    return q;
  },
});
const jr = { xs: 18, sm: 24, md: 32, lg: 38, xl: 46 },
  Wn = { size: String };
function Qn(e, t = jr) {
  return E(() =>
    e.size !== void 0
      ? { fontSize: e.size in t ? `${t[e.size]}px` : e.size }
      : null
  );
}
const Ns = "0 0 24 24",
  js = (e) => e,
  mr = (e) => `ionicons ${e}`,
  Qa = {
    "mdi-": (e) => `mdi ${e}`,
    "icon-": js,
    "bt-": (e) => `bt ${e}`,
    "eva-": (e) => `eva ${e}`,
    "ion-md": mr,
    "ion-ios": mr,
    "ion-logo": mr,
    "iconfont ": js,
    "ti-": (e) => `themify-icon ${e}`,
    "bi-": (e) => `bootstrap-icons ${e}`,
  },
  Ga = { o_: "-outlined", r_: "-round", s_: "-sharp" },
  Ya = { sym_o_: "-outlined", sym_r_: "-rounded", sym_s_: "-sharp" },
  ug = new RegExp("^(" + Object.keys(Qa).join("|") + ")"),
  cg = new RegExp("^(" + Object.keys(Ga).join("|") + ")"),
  Ds = new RegExp("^(" + Object.keys(Ya).join("|") + ")"),
  fg = /^[Mm]\s?[-+]?\.?\d/,
  dg = /^img:/,
  hg = /^svguse:/,
  gg = /^ion-/,
  mg = /^(fa-(sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;
var mt = Oe({
  name: "QIcon",
  props: {
    ...Wn,
    tag: { type: String, default: "i" },
    name: String,
    color: String,
    left: Boolean,
    right: Boolean,
  },
  setup(e, { slots: t }) {
    const {
        proxy: { $q: n },
      } = ke(),
      o = Qn(e),
      r = E(
        () =>
          "q-icon" +
          (e.left === !0 ? " on-left" : "") +
          (e.right === !0 ? " on-right" : "") +
          (e.color !== void 0 ? ` text-${e.color}` : "")
      ),
      i = E(() => {
        let s,
          l = e.name;
        if (l === "none" || !l) return { none: !0 };
        if (n.iconMapFn !== null) {
          const u = n.iconMapFn(l);
          if (u !== void 0)
            if (u.icon !== void 0) {
              if (((l = u.icon), l === "none" || !l)) return { none: !0 };
            } else
              return {
                cls: u.cls,
                content: u.content !== void 0 ? u.content : " ",
              };
        }
        if (fg.test(l) === !0) {
          const [u, d = Ns] = l.split("|");
          return {
            svg: !0,
            viewBox: d,
            nodes: u.split("&&").map((f) => {
              const [p, y, T] = f.split("@@");
              return S("path", { style: y, d: p, transform: T });
            }),
          };
        }
        if (dg.test(l) === !0) return { img: !0, src: l.substring(4) };
        if (hg.test(l) === !0) {
          const [u, d = Ns] = l.split("|");
          return { svguse: !0, src: u.substring(7), viewBox: d };
        }
        let a = " ";
        const c = l.match(ug);
        if (c !== null) s = Qa[c[1]](l);
        else if (mg.test(l) === !0) s = l;
        else if (gg.test(l) === !0)
          s = `ionicons ion-${
            n.platform.is.ios === !0 ? "ios" : "md"
          }${l.substring(3)}`;
        else if (Ds.test(l) === !0) {
          s = "notranslate material-symbols";
          const u = l.match(Ds);
          u !== null && ((l = l.substring(6)), (s += Ya[u[1]])), (a = l);
        } else {
          s = "notranslate material-icons";
          const u = l.match(cg);
          u !== null && ((l = l.substring(2)), (s += Ga[u[1]])), (a = l);
        }
        return { cls: s, content: a };
      });
    return () => {
      const s = {
        class: r.value,
        style: o.value,
        "aria-hidden": "true",
        role: "presentation",
      };
      return i.value.none === !0
        ? S(e.tag, s, nt(t.default))
        : i.value.img === !0
        ? S("span", s, Vt(t.default, [S("img", { src: i.value.src })]))
        : i.value.svg === !0
        ? S(
            "span",
            s,
            Vt(t.default, [
              S(
                "svg",
                { viewBox: i.value.viewBox || "0 0 24 24" },
                i.value.nodes
              ),
            ])
          )
        : i.value.svguse === !0
        ? S(
            "span",
            s,
            Vt(t.default, [
              S("svg", { viewBox: i.value.viewBox }, [
                S("use", { "xlink:href": i.value.src }),
              ]),
            ])
          )
        : (i.value.cls !== void 0 && (s.class += " " + i.value.cls),
          S(e.tag, s, Vt(t.default, [i.value.content])));
    };
  },
});
const pg = { size: { type: [Number, String], default: "1em" }, color: String };
function vg(e) {
  return {
    cSize: E(() => (e.size in jr ? `${jr[e.size]}px` : e.size)),
    classes: E(() => "q-spinner" + (e.color ? ` text-${e.color}` : "")),
  };
}
var zn = Oe({
  name: "QSpinner",
  props: { ...pg, thickness: { type: Number, default: 5 } },
  setup(e) {
    const { cSize: t, classes: n } = vg(e);
    return () =>
      S(
        "svg",
        {
          class: n.value + " q-spinner-mat",
          width: t.value,
          height: t.value,
          viewBox: "25 25 50 50",
        },
        [
          S("circle", {
            class: "path",
            cx: "50",
            cy: "50",
            r: "20",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": e.thickness,
            "stroke-miterlimit": "10",
          }),
        ]
      );
  },
});
function bg(e, t = 250) {
  let n = !1,
    o;
  return function () {
    return (
      n === !1 &&
        ((n = !0),
        setTimeout(() => {
          n = !1;
        }, t),
        (o = e.apply(this, arguments))),
      o
    );
  };
}
function Hs(e, t, n, o) {
  n.modifiers.stop === !0 && ko(e);
  const r = n.modifiers.color;
  let i = n.modifiers.center;
  i = i === !0 || o === !0;
  const s = document.createElement("span"),
    l = document.createElement("span"),
    a = Yf(e),
    { left: c, top: u, width: d, height: f } = t.getBoundingClientRect(),
    p = Math.sqrt(d * d + f * f),
    y = p / 2,
    T = `${(d - p) / 2}px`,
    w = i ? T : `${a.left - c - y}px`,
    O = `${(f - p) / 2}px`,
    m = i ? O : `${a.top - u - y}px`;
  (l.className = "q-ripple__inner"),
    Ir(l, {
      height: `${p}px`,
      width: `${p}px`,
      transform: `translate3d(${w},${m},0) scale3d(.2,.2,1)`,
      opacity: 0,
    }),
    (s.className = `q-ripple${r ? " text-" + r : ""}`),
    s.setAttribute("dir", "ltr"),
    s.appendChild(l),
    t.appendChild(s);
  const b = () => {
    s.remove(), clearTimeout(M);
  };
  n.abort.push(b);
  let M = setTimeout(() => {
    l.classList.add("q-ripple__inner--enter"),
      (l.style.transform = `translate3d(${T},${O},0) scale3d(1,1,1)`),
      (l.style.opacity = 0.2),
      (M = setTimeout(() => {
        l.classList.remove("q-ripple__inner--enter"),
          l.classList.add("q-ripple__inner--leave"),
          (l.style.opacity = 0),
          (M = setTimeout(() => {
            s.remove(), n.abort.splice(n.abort.indexOf(b), 1);
          }, 275));
      }, 250));
  }, 50);
}
function zs(e, { modifiers: t, value: n, arg: o }) {
  const r = Object.assign({}, e.cfg.ripple, t, n);
  e.modifiers = {
    early: r.early === !0,
    stop: r.stop === !0,
    center: r.center === !0,
    color: r.color || o,
    keyCodes: [].concat(r.keyCodes || 13),
  };
}
var yg = eg({
  name: "ripple",
  beforeMount(e, t) {
    const n = t.instance.$.appContext.config.globalProperties.$q.config || {};
    if (n.ripple === !1) return;
    const o = {
      cfg: n,
      enabled: t.value !== !1,
      modifiers: {},
      abort: [],
      start(r) {
        o.enabled === !0 &&
          r.qSkipRipple !== !0 &&
          r.type === (o.modifiers.early === !0 ? "pointerdown" : "click") &&
          Hs(r, e, o, r.qKeyEvent === !0);
      },
      keystart: bg((r) => {
        o.enabled === !0 &&
          r.qSkipRipple !== !0 &&
          jn(r, o.modifiers.keyCodes) === !0 &&
          r.type === `key${o.modifiers.early === !0 ? "down" : "up"}` &&
          Hs(r, e, o, !0);
      }, 300),
    };
    zs(o, t),
      (e.__qripple = o),
      Xf(o, "main", [
        [e, "pointerdown", "start", "passive"],
        [e, "click", "start", "passive"],
        [e, "keydown", "keystart", "passive"],
        [e, "keyup", "keystart", "passive"],
      ]);
  },
  updated(e, t) {
    if (t.oldValue !== t.value) {
      const n = e.__qripple;
      n !== void 0 &&
        ((n.enabled = t.value !== !1),
        n.enabled === !0 && Object(t.value) === t.value && zs(n, t));
    }
  },
  beforeUnmount(e) {
    const t = e.__qripple;
    t !== void 0 &&
      (t.abort.forEach((n) => {
        n();
      }),
      Jf(t, "main"),
      delete e._qripple);
  },
});
const Za = {
    left: "start",
    center: "center",
    right: "end",
    between: "between",
    around: "around",
    evenly: "evenly",
    stretch: "stretch",
  },
  _g = Object.keys(Za),
  Xa = { align: { type: String, validator: (e) => _g.includes(e) } };
function Ja(e) {
  return E(() => {
    const t =
      e.align === void 0 ? (e.vertical === !0 ? "stretch" : "left") : e.align;
    return `${e.vertical === !0 ? "items" : "justify"}-${Za[t]}`;
  });
}
function Ks(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
function Us(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function wg(e, t) {
  for (const n in t) {
    const o = t[n],
      r = e[n];
    if (typeof o == "string") {
      if (o !== r) return !1;
    } else if (
      Array.isArray(r) === !1 ||
      r.length !== o.length ||
      o.some((i, s) => i !== r[s])
    )
      return !1;
  }
  return !0;
}
function Ws(e, t) {
  return Array.isArray(t) === !0
    ? e.length === t.length && e.every((n, o) => n === t[o])
    : e.length === 1 && e[0] === t;
}
function xg(e, t) {
  return Array.isArray(e) === !0
    ? Ws(e, t)
    : Array.isArray(t) === !0
    ? Ws(t, e)
    : e === t;
}
function Cg(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (xg(e[n], t[n]) === !1) return !1;
  return !0;
}
const kg = {
  to: [String, Object],
  replace: Boolean,
  exact: Boolean,
  activeClass: { type: String, default: "q-router-link--active" },
  exactActiveClass: { type: String, default: "q-router-link--exact-active" },
  href: String,
  target: String,
  disable: Boolean,
};
function Sg({ fallbackTag: e, useDisableForRouterLinkProps: t = !0 } = {}) {
  const n = ke(),
    { props: o, proxy: r, emit: i } = n,
    s = Ia(n),
    l = E(() => o.disable !== !0 && o.href !== void 0),
    a = E(
      t === !0
        ? () =>
            s === !0 &&
            o.disable !== !0 &&
            l.value !== !0 &&
            o.to !== void 0 &&
            o.to !== null &&
            o.to !== ""
        : () =>
            s === !0 &&
            l.value !== !0 &&
            o.to !== void 0 &&
            o.to !== null &&
            o.to !== ""
    ),
    c = E(() => (a.value === !0 ? m(o.to) : null)),
    u = E(() => c.value !== null),
    d = E(() => l.value === !0 || u.value === !0),
    f = E(() => (o.type === "a" || d.value === !0 ? "a" : o.tag || e || "div")),
    p = E(() =>
      l.value === !0
        ? { href: o.href, target: o.target }
        : u.value === !0
        ? { href: c.value.href, target: o.target }
        : {}
    ),
    y = E(() => {
      if (u.value === !1) return -1;
      const { matched: $ } = c.value,
        { length: q } = $,
        V = $[q - 1];
      if (V === void 0) return -1;
      const H = r.$route.matched;
      if (H.length === 0) return -1;
      const C = H.findIndex(Us.bind(null, V));
      if (C > -1) return C;
      const x = Ks($[q - 2]);
      return q > 1 && Ks(V) === x && H[H.length - 1].path !== x
        ? H.findIndex(Us.bind(null, $[q - 2]))
        : C;
    }),
    T = E(
      () =>
        u.value === !0 && y.value !== -1 && wg(r.$route.params, c.value.params)
    ),
    w = E(
      () =>
        T.value === !0 &&
        y.value === r.$route.matched.length - 1 &&
        Cg(r.$route.params, c.value.params)
    ),
    O = E(() =>
      u.value === !0
        ? w.value === !0
          ? ` ${o.exactActiveClass} ${o.activeClass}`
          : o.exact === !0
          ? ""
          : T.value === !0
          ? ` ${o.activeClass}`
          : ""
        : ""
    );
  function m($) {
    try {
      return r.$router.resolve($);
    } catch {}
    return null;
  }
  function b(
    $,
    { returnRouterError: q, to: V = o.to, replace: H = o.replace } = {}
  ) {
    if (o.disable === !0) return $.preventDefault(), Promise.resolve(!1);
    if (
      $.metaKey ||
      $.altKey ||
      $.ctrlKey ||
      $.shiftKey ||
      ($.button !== void 0 && $.button !== 0) ||
      o.target === "_blank"
    )
      return Promise.resolve(!1);
    $.preventDefault();
    const C = r.$router[H === !0 ? "replace" : "push"](V);
    return q === !0 ? C : C.then(() => {}).catch(() => {});
  }
  function M($) {
    if (u.value === !0) {
      const q = (V) => b($, V);
      i("click", $, q), $.defaultPrevented !== !0 && q();
    } else i("click", $);
  }
  return {
    hasRouterLink: u,
    hasHrefLink: l,
    hasLink: d,
    linkTag: f,
    resolvedLink: c,
    linkIsActive: T,
    linkIsExactActive: w,
    linkClass: O,
    linkAttrs: p,
    getLink: m,
    navigateToRouterLink: b,
    navigateOnClick: M,
  };
}
const Qs = { none: 0, xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  Eg = { xs: 8, sm: 10, md: 14, lg: 20, xl: 24 },
  Rg = ["button", "submit", "reset"],
  Tg = /[^\s]\/[^\s]/,
  Pg = ["flat", "outline", "push", "unelevated"],
  Ag = (e, t) =>
    e.flat === !0
      ? "flat"
      : e.outline === !0
      ? "outline"
      : e.push === !0
      ? "push"
      : e.unelevated === !0
      ? "unelevated"
      : t,
  Mg = {
    ...Wn,
    ...kg,
    type: { type: String, default: "button" },
    label: [Number, String],
    icon: String,
    iconRight: String,
    ...Pg.reduce((e, t) => (e[t] = Boolean) && e, {}),
    square: Boolean,
    round: Boolean,
    rounded: Boolean,
    glossy: Boolean,
    size: String,
    fab: Boolean,
    fabMini: Boolean,
    padding: String,
    color: String,
    textColor: String,
    noCaps: Boolean,
    noWrap: Boolean,
    dense: Boolean,
    tabindex: [Number, String],
    ripple: { type: [Boolean, Object], default: !0 },
    align: { ...Xa.align, default: "center" },
    stack: Boolean,
    stretch: Boolean,
    loading: { type: Boolean, default: null },
    disable: Boolean,
  };
function qg(e) {
  const t = Qn(e, Eg),
    n = Ja(e),
    {
      hasRouterLink: o,
      hasLink: r,
      linkTag: i,
      linkAttrs: s,
      navigateOnClick: l,
    } = Sg({ fallbackTag: "button" }),
    a = E(() => {
      const w = e.fab === !1 && e.fabMini === !1 ? t.value : {};
      return e.padding !== void 0
        ? Object.assign({}, w, {
            padding: e.padding
              .split(/\s+/)
              .map((O) => (O in Qs ? Qs[O] + "px" : O))
              .join(" "),
            minWidth: "0",
            minHeight: "0",
          })
        : w;
    }),
    c = E(() => e.rounded === !0 || e.fab === !0 || e.fabMini === !0),
    u = E(() => e.disable !== !0 && e.loading !== !0),
    d = E(() => (u.value === !0 ? e.tabindex || 0 : -1)),
    f = E(() => Ag(e, "standard")),
    p = E(() => {
      const w = { tabindex: d.value };
      return (
        r.value === !0
          ? Object.assign(w, s.value)
          : Rg.includes(e.type) === !0 && (w.type = e.type),
        i.value === "a"
          ? (e.disable === !0
              ? (w["aria-disabled"] = "true")
              : w.href === void 0 && (w.role = "button"),
            o.value !== !0 && Tg.test(e.type) === !0 && (w.type = e.type))
          : e.disable === !0 &&
            ((w.disabled = ""), (w["aria-disabled"] = "true")),
        e.loading === !0 &&
          e.percentage !== void 0 &&
          Object.assign(w, {
            role: "progressbar",
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            "aria-valuenow": e.percentage,
          }),
        w
      );
    }),
    y = E(() => {
      let w;
      e.color !== void 0
        ? e.flat === !0 || e.outline === !0
          ? (w = `text-${e.textColor || e.color}`)
          : (w = `bg-${e.color} text-${e.textColor || "white"}`)
        : e.textColor && (w = `text-${e.textColor}`);
      const O =
        e.round === !0
          ? "round"
          : `rectangle${
              c.value === !0
                ? " q-btn--rounded"
                : e.square === !0
                ? " q-btn--square"
                : ""
            }`;
      return (
        `q-btn--${f.value} q-btn--${O}` +
        (w !== void 0 ? " " + w : "") +
        (u.value === !0
          ? " q-btn--actionable q-focusable q-hoverable"
          : e.disable === !0
          ? " disabled"
          : "") +
        (e.fab === !0
          ? " q-btn--fab"
          : e.fabMini === !0
          ? " q-btn--fab-mini"
          : "") +
        (e.noCaps === !0 ? " q-btn--no-uppercase" : "") +
        (e.dense === !0 ? " q-btn--dense" : "") +
        (e.stretch === !0 ? " no-border-radius self-stretch" : "") +
        (e.glossy === !0 ? " glossy" : "") +
        (e.square ? " q-btn--square" : "")
      );
    }),
    T = E(
      () =>
        n.value +
        (e.stack === !0 ? " column" : " row") +
        (e.noWrap === !0 ? " no-wrap text-no-wrap" : "") +
        (e.loading === !0 ? " q-btn__content--hidden" : "")
    );
  return {
    classes: y,
    style: a,
    innerClasses: T,
    attributes: p,
    hasLink: r,
    linkTag: i,
    navigateOnClick: l,
    isActionable: u,
  };
}
const { passiveCapture: Ke } = Be;
let Jt = null,
  en = null,
  tn = null;
var Dr = Oe({
  name: "QBtn",
  props: {
    ...Mg,
    percentage: Number,
    darkPercentage: Boolean,
    onTouchstart: [Function, Array],
  },
  emits: ["click", "keydown", "mousedown", "keyup"],
  setup(e, { slots: t, emit: n }) {
    const { proxy: o } = ke(),
      {
        classes: r,
        style: i,
        innerClasses: s,
        attributes: l,
        hasLink: a,
        linkTag: c,
        navigateOnClick: u,
        isActionable: d,
      } = qg(e),
      f = de(null),
      p = de(null);
    let y = null,
      T,
      w = null;
    const O = E(() => e.label !== void 0 && e.label !== null && e.label !== ""),
      m = E(() =>
        e.disable === !0 || e.ripple === !1
          ? !1
          : {
              keyCodes: a.value === !0 ? [13, 32] : [13],
              ...(e.ripple === !0 ? {} : e.ripple),
            }
      ),
      b = E(() => ({ center: e.round })),
      M = E(() => {
        const k = Math.max(0, Math.min(100, e.percentage));
        return k > 0
          ? {
              transition: "transform 0.6s",
              transform: `translateX(${k - 100}%)`,
            }
          : {};
      }),
      $ = E(() => {
        if (e.loading === !0)
          return {
            onMousedown: D,
            onTouchstart: D,
            onClick: D,
            onKeydown: D,
            onKeyup: D,
          };
        if (d.value === !0) {
          const k = { onClick: V, onKeydown: H, onMousedown: x };
          if (o.$q.platform.has.touch === !0) {
            const Z = e.onTouchstart !== void 0 ? "" : "Passive";
            k[`onTouchstart${Z}`] = C;
          }
          return k;
        }
        return { onClick: We };
      }),
      q = E(() => ({
        ref: f,
        class: "q-btn q-btn-item non-selectable no-outline " + r.value,
        style: i.value,
        ...l.value,
        ...$.value,
      }));
    function V(k) {
      if (f.value !== null) {
        if (k !== void 0) {
          if (k.defaultPrevented === !0) return;
          const Z = document.activeElement;
          if (
            e.type === "submit" &&
            Z !== document.body &&
            f.value.contains(Z) === !1 &&
            Z.contains(f.value) === !1
          ) {
            f.value.focus();
            const G = () => {
              document.removeEventListener("keydown", We, !0),
                document.removeEventListener("keyup", G, Ke),
                f.value !== null && f.value.removeEventListener("blur", G, Ke);
            };
            document.addEventListener("keydown", We, !0),
              document.addEventListener("keyup", G, Ke),
              f.value.addEventListener("blur", G, Ke);
          }
        }
        u(k);
      }
    }
    function H(k) {
      f.value !== null &&
        (n("keydown", k),
        jn(k, [13, 32]) === !0 &&
          en !== f.value &&
          (en !== null && v(),
          k.defaultPrevented !== !0 &&
            (f.value.focus(),
            (en = f.value),
            f.value.classList.add("q-btn--active"),
            document.addEventListener("keyup", F, !0),
            f.value.addEventListener("blur", F, Ke)),
          We(k)));
    }
    function C(k) {
      f.value !== null &&
        (n("touchstart", k),
        k.defaultPrevented !== !0 &&
          (Jt !== f.value &&
            (Jt !== null && v(),
            (Jt = f.value),
            (y = k.target),
            y.addEventListener("touchcancel", F, Ke),
            y.addEventListener("touchend", F, Ke)),
          (T = !0),
          w !== null && clearTimeout(w),
          (w = setTimeout(() => {
            (w = null), (T = !1);
          }, 200))));
    }
    function x(k) {
      f.value !== null &&
        ((k.qSkipRipple = T === !0),
        n("mousedown", k),
        k.defaultPrevented !== !0 &&
          tn !== f.value &&
          (tn !== null && v(),
          (tn = f.value),
          f.value.classList.add("q-btn--active"),
          document.addEventListener("mouseup", F, Ke)));
    }
    function F(k) {
      if (
        f.value !== null &&
        !(
          k !== void 0 &&
          k.type === "blur" &&
          document.activeElement === f.value
        )
      ) {
        if (k !== void 0 && k.type === "keyup") {
          if (en === f.value && jn(k, [13, 32]) === !0) {
            const Z = new MouseEvent("click", k);
            (Z.qKeyEvent = !0),
              k.defaultPrevented === !0 && Rt(Z),
              k.cancelBubble === !0 && ko(Z),
              f.value.dispatchEvent(Z),
              We(k),
              (k.qKeyEvent = !0);
          }
          n("keyup", k);
        }
        v();
      }
    }
    function v(k) {
      const Z = p.value;
      k !== !0 &&
        (Jt === f.value || tn === f.value) &&
        Z !== null &&
        Z !== document.activeElement &&
        (Z.setAttribute("tabindex", -1), Z.focus()),
        Jt === f.value &&
          (y !== null &&
            (y.removeEventListener("touchcancel", F, Ke),
            y.removeEventListener("touchend", F, Ke)),
          (Jt = y = null)),
        tn === f.value &&
          (document.removeEventListener("mouseup", F, Ke), (tn = null)),
        en === f.value &&
          (document.removeEventListener("keyup", F, !0),
          f.value !== null && f.value.removeEventListener("blur", F, Ke),
          (en = null)),
        f.value !== null && f.value.classList.remove("q-btn--active");
    }
    function D(k) {
      We(k), (k.qSkipRipple = !0);
    }
    return (
      Ge(() => {
        v(!0);
      }),
      Object.assign(o, { click: V }),
      () => {
        let k = [];
        e.icon !== void 0 &&
          k.push(
            S(mt, {
              name: e.icon,
              left: e.stack !== !0 && O.value === !0,
              role: "img",
              "aria-hidden": "true",
            })
          ),
          O.value === !0 && k.push(S("span", { class: "block" }, [e.label])),
          (k = Vt(t.default, k)),
          e.iconRight !== void 0 &&
            e.round === !1 &&
            k.push(
              S(mt, {
                name: e.iconRight,
                right: e.stack !== !0 && O.value === !0,
                role: "img",
                "aria-hidden": "true",
              })
            );
        const Z = [S("span", { class: "q-focus-helper", ref: p })];
        return (
          e.loading === !0 &&
            e.percentage !== void 0 &&
            Z.push(
              S(
                "span",
                {
                  class:
                    "q-btn__progress absolute-full overflow-hidden" +
                    (e.darkPercentage === !0 ? " q-btn__progress--dark" : ""),
                },
                [
                  S("span", {
                    class: "q-btn__progress-indicator fit block",
                    style: M.value,
                  }),
                ]
              )
            ),
          Z.push(
            S(
              "span",
              {
                class:
                  "q-btn__content text-center col items-center q-anchor--skip " +
                  s.value,
              },
              k
            )
          ),
          e.loading !== null &&
            Z.push(
              S(dn, { name: "q-transition--fade" }, () =>
                e.loading === !0
                  ? [
                      S(
                        "span",
                        {
                          key: "loading",
                          class: "absolute-full flex flex-center",
                        },
                        t.loading !== void 0 ? t.loading() : [S(zn)]
                      ),
                    ]
                  : null
              )
            ),
          Dl(S(c.value, q.value, Z), [[yg, m.value, void 0, b.value]])
        );
      }
    );
  },
});
const Yt = { dark: { type: Boolean, default: null } };
function Zt(e, t) {
  return E(() => (e.dark === null ? t.dark.isActive : e.dark));
}
var $g = Oe({
    name: "QCard",
    props: {
      ...Yt,
      tag: { type: String, default: "div" },
      square: Boolean,
      flat: Boolean,
      bordered: Boolean,
    },
    setup(e, { slots: t }) {
      const {
          proxy: { $q: n },
        } = ke(),
        o = Zt(e, n),
        r = E(
          () =>
            "q-card" +
            (o.value === !0 ? " q-card--dark q-dark" : "") +
            (e.bordered === !0 ? " q-card--bordered" : "") +
            (e.square === !0 ? " q-card--square no-border-radius" : "") +
            (e.flat === !0 ? " q-card--flat no-shadow" : "")
        );
      return () => S(e.tag, { class: r.value }, nt(t.default));
    },
  }),
  Cn = Oe({
    name: "QCardSection",
    props: { tag: { type: String, default: "div" }, horizontal: Boolean },
    setup(e, { slots: t }) {
      const n = E(
        () =>
          `q-card__section q-card__section--${
            e.horizontal === !0 ? "horiz row no-wrap" : "vert"
          }`
      );
      return () => S(e.tag, { class: n.value }, nt(t.default));
    },
  }),
  Og = Oe({
    name: "QCardActions",
    props: { ...Xa, vertical: Boolean },
    setup(e, { slots: t }) {
      const n = Ja(e),
        o = E(
          () =>
            `q-card__actions ${n.value} q-card__actions--${
              e.vertical === !0 ? "vert column" : "horiz row"
            }`
        );
      return () => S("div", { class: o.value }, nt(t.default));
    },
  });
const Lg = {
    true: "inset",
    item: "item-inset",
    "item-thumbnail": "item-thumbnail-inset",
  },
  pr = { xs: 2, sm: 4, md: 8, lg: 16, xl: 24 };
var Gs = Oe({
  name: "QSeparator",
  props: {
    ...Yt,
    spaced: [Boolean, String],
    inset: [Boolean, String],
    vertical: Boolean,
    color: String,
    size: String,
  },
  setup(e) {
    const t = ke(),
      n = Zt(e, t.proxy.$q),
      o = E(() => (e.vertical === !0 ? "vertical" : "horizontal")),
      r = E(() => ` q-separator--${o.value}`),
      i = E(() => (e.inset !== !1 ? `${r.value}-${Lg[e.inset]}` : "")),
      s = E(
        () =>
          `q-separator${r.value}${i.value}` +
          (e.color !== void 0 ? ` bg-${e.color}` : "") +
          (n.value === !0 ? " q-separator--dark" : "")
      ),
      l = E(() => {
        const a = {};
        if (
          (e.size !== void 0 &&
            (a[e.vertical === !0 ? "width" : "height"] = e.size),
          e.spaced !== !1)
        ) {
          const c =
              e.spaced === !0
                ? `${pr.md}px`
                : e.spaced in pr
                ? `${pr[e.spaced]}px`
                : e.spaced,
            u = e.vertical === !0 ? ["Left", "Right"] : ["Top", "Bottom"];
          a[`margin${u[0]}`] = a[`margin${u[1]}`] = c;
        }
        return a;
      });
    return () =>
      S("hr", { class: s.value, style: l.value, "aria-orientation": o.value });
  },
});
function Fg({ validate: e, resetValidation: t, requiresQForm: n }) {
  const o = ut(dd, !1);
  if (o !== !1) {
    const { props: r, proxy: i } = ke();
    Object.assign(i, { validate: e, resetValidation: t }),
      pe(
        () => r.disable,
        (s) => {
          s === !0
            ? (typeof t == "function" && t(), o.unbindComponent(i))
            : o.bindComponent(i);
        }
      ),
      Gt(() => {
        r.disable !== !0 && o.bindComponent(i);
      }),
      Ge(() => {
        r.disable !== !0 && o.unbindComponent(i);
      });
  } else n === !0 && console.error("Parent QForm not found on useFormChild()!");
}
const Ys = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,
  Zs = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,
  Xs = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,
  so =
    /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,
  lo =
    /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/,
  vr = {
    date: (e) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e),
    time: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(e),
    fulltime: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(e),
    timeOrFulltime: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(e),
    email: (e) =>
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        e
      ),
    hexColor: (e) => Ys.test(e),
    hexaColor: (e) => Zs.test(e),
    hexOrHexaColor: (e) => Xs.test(e),
    rgbColor: (e) => so.test(e),
    rgbaColor: (e) => lo.test(e),
    rgbOrRgbaColor: (e) => so.test(e) || lo.test(e),
    hexOrRgbColor: (e) => Ys.test(e) || so.test(e),
    hexaOrRgbaColor: (e) => Zs.test(e) || lo.test(e),
    anyColor: (e) => Xs.test(e) || so.test(e) || lo.test(e),
  },
  Bg = [!0, !1, "ondemand"],
  Ig = {
    modelValue: {},
    error: { type: Boolean, default: null },
    errorMessage: String,
    noErrorIcon: Boolean,
    rules: Array,
    reactiveRules: Boolean,
    lazyRules: {
      type: [Boolean, String],
      default: !1,
      validator: (e) => Bg.includes(e),
    },
  };
function Vg(e, t) {
  const { props: n, proxy: o } = ke(),
    r = de(!1),
    i = de(null),
    s = de(null);
  Fg({ validate: y, resetValidation: p });
  let l = 0,
    a;
  const c = E(
      () => n.rules !== void 0 && n.rules !== null && n.rules.length !== 0
    ),
    u = E(() => n.disable !== !0 && c.value === !0 && t.value === !1),
    d = E(() => n.error === !0 || r.value === !0),
    f = E(() =>
      typeof n.errorMessage == "string" && n.errorMessage.length !== 0
        ? n.errorMessage
        : i.value
    );
  pe(
    () => n.modelValue,
    () => {
      (s.value = !0), u.value === !0 && n.lazyRules === !1 && T();
    }
  ),
    pe(
      () => n.reactiveRules,
      (w) => {
        w === !0
          ? a === void 0 &&
            (a = pe(
              () => n.rules,
              () => {
                u.value === !0 &&
                  s.value === !0 &&
                  n.lazyRules !== "ondemand" &&
                  T();
              },
              { immediate: !0 }
            ))
          : a !== void 0 && (a(), (a = void 0));
      },
      { immediate: !0 }
    ),
    pe(
      () => n.lazyRules,
      (w) => {
        w === !1 && u.value === !0 && s.value === !0 && T();
      }
    ),
    pe(e, (w) => {
      w === !0
        ? s.value === null && (s.value = n.lazyRules === !0)
        : u.value === !0 &&
          (n.lazyRules === !1 || (n.lazyRules === !0 && s.value === !0)) &&
          T();
    });
  function p() {
    l++,
      (t.value = !1),
      (s.value = null),
      (r.value = !1),
      (i.value = null),
      T.cancel();
  }
  function y(w = n.modelValue) {
    if (n.disable === !0 || c.value === !1) return !0;
    const O = ++l,
      m =
        t.value !== !0
          ? () => {
              s.value = !0;
            }
          : () => {},
      b = ($, q) => {
        $ === !0 && m(), (r.value = $), (i.value = q || null), (t.value = !1);
      },
      M = [];
    for (let $ = 0; $ < n.rules.length; $++) {
      const q = n.rules[$];
      let V;
      if (
        (typeof q == "function"
          ? (V = q(w, vr))
          : typeof q == "string" && vr[q] !== void 0 && (V = vr[q](w)),
        V === !1 || typeof V == "string")
      )
        return b(!0, V), !1;
      V !== !0 && V !== void 0 && M.push(V);
    }
    return M.length === 0
      ? (b(!1), !0)
      : ((t.value = !0),
        Promise.all(M).then(
          ($) => {
            if ($ === void 0 || Array.isArray($) === !1 || $.length === 0)
              return O === l && b(!1), !0;
            const q = $.find((V) => V === !1 || typeof V == "string");
            return O === l && b(q !== void 0, q), q === void 0;
          },
          ($) => (O === l && (console.error($), b(!0)), !1)
        ));
  }
  const T = _a(y, 0);
  return (
    Ge(() => {
      a !== void 0 && a(), T.cancel();
    }),
    Object.assign(o, { resetValidation: p, validate: y }),
    bn(o, "hasError", () => d.value),
    {
      isDirtyModel: s,
      hasRules: c,
      hasError: d,
      errorMessage: f,
      validate: y,
      resetValidation: p,
    }
  );
}
const Js = /^on[A-Z]/;
function Ng(e, t) {
  const n = { listeners: de({}), attributes: de({}) };
  function o() {
    const r = {},
      i = {};
    for (const s in e)
      s !== "class" && s !== "style" && Js.test(s) === !1 && (r[s] = e[s]);
    for (const s in t.props) Js.test(s) === !0 && (i[s] = t.props[s]);
    (n.attributes.value = r), (n.listeners.value = i);
  }
  return Ql(o), o(), n;
}
let br,
  ao = 0;
const Pe = new Array(256);
for (let e = 0; e < 256; e++) Pe[e] = (e + 256).toString(16).substring(1);
const jg = (() => {
    const e =
      typeof crypto != "undefined"
        ? crypto
        : typeof window != "undefined"
        ? window.crypto || window.msCrypto
        : void 0;
    if (e !== void 0) {
      if (e.randomBytes !== void 0) return e.randomBytes;
      if (e.getRandomValues !== void 0)
        return (t) => {
          const n = new Uint8Array(t);
          return e.getRandomValues(n), n;
        };
    }
    return (t) => {
      const n = [];
      for (let o = t; o > 0; o--) n.push(Math.floor(Math.random() * 256));
      return n;
    };
  })(),
  el = 4096;
function eu() {
  (br === void 0 || ao + 16 > el) && ((ao = 0), (br = jg(el)));
  const e = Array.prototype.slice.call(br, ao, (ao += 16));
  return (
    (e[6] = (e[6] & 15) | 64),
    (e[8] = (e[8] & 63) | 128),
    Pe[e[0]] +
      Pe[e[1]] +
      Pe[e[2]] +
      Pe[e[3]] +
      "-" +
      Pe[e[4]] +
      Pe[e[5]] +
      "-" +
      Pe[e[6]] +
      Pe[e[7]] +
      "-" +
      Pe[e[8]] +
      Pe[e[9]] +
      "-" +
      Pe[e[10]] +
      Pe[e[11]] +
      Pe[e[12]] +
      Pe[e[13]] +
      Pe[e[14]] +
      Pe[e[15]]
  );
}
function tu(e, t) {
  return e === void 0 ? (t === !0 ? `f_${eu()}` : void 0) : e;
}
function Hr(e) {
  return e != null && ("" + e).length !== 0;
}
const Dg = {
    ...Yt,
    ...Ig,
    label: String,
    stackLabel: Boolean,
    hint: String,
    hideHint: Boolean,
    prefix: String,
    suffix: String,
    labelColor: String,
    color: String,
    bgColor: String,
    filled: Boolean,
    outlined: Boolean,
    borderless: Boolean,
    standout: [Boolean, String],
    square: Boolean,
    loading: Boolean,
    labelSlot: Boolean,
    bottomSlots: Boolean,
    hideBottomSpace: Boolean,
    rounded: Boolean,
    dense: Boolean,
    itemAligned: Boolean,
    counter: Boolean,
    clearable: Boolean,
    clearIcon: String,
    disable: Boolean,
    readonly: Boolean,
    autofocus: Boolean,
    for: String,
    maxlength: [Number, String],
  },
  Hg = [
    "update:modelValue",
    "clear",
    "focus",
    "blur",
    "popupShow",
    "popupHide",
  ];
function zg({ requiredForAttr: e = !0, tagProp: t } = {}) {
  const { props: n, attrs: o, proxy: r, vnode: i } = ke(),
    s = Zt(n, r.$q);
  return {
    requiredForAttr: e,
    tag: t === !0 ? E(() => n.tag) : { value: "label" },
    isDark: s,
    editable: E(() => n.disable !== !0 && n.readonly !== !0),
    innerLoading: de(!1),
    focused: de(!1),
    hasPopupOpen: !1,
    splitAttrs: Ng(o, i),
    targetUid: de(tu(n.for, e)),
    rootRef: de(null),
    targetRef: de(null),
    controlRef: de(null),
  };
}
function Kg(e) {
  const { props: t, emit: n, slots: o, attrs: r, proxy: i } = ke(),
    { $q: s } = i;
  let l = null;
  e.hasValue === void 0 && (e.hasValue = E(() => Hr(t.modelValue))),
    e.emitValue === void 0 &&
      (e.emitValue = (A) => {
        n("update:modelValue", A);
      }),
    e.controlEvents === void 0 &&
      (e.controlEvents = { onFocusin: C, onFocusout: x }),
    Object.assign(e, {
      clearValue: F,
      onControlFocusin: C,
      onControlFocusout: x,
      focus: V,
    }),
    e.computedCounter === void 0 &&
      (e.computedCounter = E(() => {
        if (t.counter !== !1) {
          const A =
              typeof t.modelValue == "string" || typeof t.modelValue == "number"
                ? ("" + t.modelValue).length
                : Array.isArray(t.modelValue) === !0
                ? t.modelValue.length
                : 0,
            Q = t.maxlength !== void 0 ? t.maxlength : t.maxValues;
          return A + (Q !== void 0 ? " / " + Q : "");
        }
      }));
  const {
      isDirtyModel: a,
      hasRules: c,
      hasError: u,
      errorMessage: d,
      resetValidation: f,
    } = Vg(e.focused, e.innerLoading),
    p =
      e.floatingLabel !== void 0
        ? E(
            () =>
              t.stackLabel === !0 ||
              e.focused.value === !0 ||
              e.floatingLabel.value === !0
          )
        : E(
            () =>
              t.stackLabel === !0 ||
              e.focused.value === !0 ||
              e.hasValue.value === !0
          ),
    y = E(
      () =>
        t.bottomSlots === !0 ||
        t.hint !== void 0 ||
        c.value === !0 ||
        t.counter === !0 ||
        t.error !== null
    ),
    T = E(() =>
      t.filled === !0
        ? "filled"
        : t.outlined === !0
        ? "outlined"
        : t.borderless === !0
        ? "borderless"
        : t.standout
        ? "standout"
        : "standard"
    ),
    w = E(
      () =>
        `q-field row no-wrap items-start q-field--${T.value}` +
        (e.fieldClass !== void 0 ? ` ${e.fieldClass.value}` : "") +
        (t.rounded === !0 ? " q-field--rounded" : "") +
        (t.square === !0 ? " q-field--square" : "") +
        (p.value === !0 ? " q-field--float" : "") +
        (m.value === !0 ? " q-field--labeled" : "") +
        (t.dense === !0 ? " q-field--dense" : "") +
        (t.itemAligned === !0 ? " q-field--item-aligned q-item-type" : "") +
        (e.isDark.value === !0 ? " q-field--dark" : "") +
        (e.getControl === void 0 ? " q-field--auto-height" : "") +
        (e.focused.value === !0 ? " q-field--focused" : "") +
        (u.value === !0 ? " q-field--error" : "") +
        (u.value === !0 || e.focused.value === !0
          ? " q-field--highlighted"
          : "") +
        (t.hideBottomSpace !== !0 && y.value === !0
          ? " q-field--with-bottom"
          : "") +
        (t.disable === !0
          ? " q-field--disabled"
          : t.readonly === !0
          ? " q-field--readonly"
          : "")
    ),
    O = E(
      () =>
        "q-field__control relative-position row no-wrap" +
        (t.bgColor !== void 0 ? ` bg-${t.bgColor}` : "") +
        (u.value === !0
          ? " text-negative"
          : typeof t.standout == "string" &&
            t.standout.length !== 0 &&
            e.focused.value === !0
          ? ` ${t.standout}`
          : t.color !== void 0
          ? ` text-${t.color}`
          : "")
    ),
    m = E(() => t.labelSlot === !0 || t.label !== void 0),
    b = E(
      () =>
        "q-field__label no-pointer-events absolute ellipsis" +
        (t.labelColor !== void 0 && u.value !== !0
          ? ` text-${t.labelColor}`
          : "")
    ),
    M = E(() => ({
      id: e.targetUid.value,
      editable: e.editable.value,
      focused: e.focused.value,
      floatingLabel: p.value,
      modelValue: t.modelValue,
      emitValue: e.emitValue,
    })),
    $ = E(() => {
      const A = { for: e.targetUid.value };
      return t.disable === !0 && (A["aria-disabled"] = "true"), A;
    });
  pe(
    () => t.for,
    (A) => {
      e.targetUid.value = tu(A, e.requiredForAttr);
    }
  );
  function q() {
    const A = document.activeElement;
    let Q = e.targetRef !== void 0 && e.targetRef.value;
    Q &&
      (A === null || A.id !== e.targetUid.value) &&
      (Q.hasAttribute("tabindex") === !0 || (Q = Q.querySelector("[tabindex]")),
      Q && Q !== A && Q.focus({ preventScroll: !0 }));
  }
  function V() {
    gi(q);
  }
  function H() {
    jh(q);
    const A = document.activeElement;
    A !== null && e.rootRef.value.contains(A) && A.blur();
  }
  function C(A) {
    l !== null && (clearTimeout(l), (l = null)),
      e.editable.value === !0 &&
        e.focused.value === !1 &&
        ((e.focused.value = !0), n("focus", A));
  }
  function x(A, Q) {
    l !== null && clearTimeout(l),
      (l = setTimeout(() => {
        (l = null),
          !(
            document.hasFocus() === !0 &&
            (e.hasPopupOpen === !0 ||
              e.controlRef === void 0 ||
              e.controlRef.value === null ||
              e.controlRef.value.contains(document.activeElement) !== !1)
          ) &&
            (e.focused.value === !0 && ((e.focused.value = !1), n("blur", A)),
            Q !== void 0 && Q());
      }));
  }
  function F(A) {
    We(A),
      s.platform.is.mobile !== !0
        ? (
            (e.targetRef !== void 0 && e.targetRef.value) ||
            e.rootRef.value
          ).focus()
        : e.rootRef.value.contains(document.activeElement) === !0 &&
          document.activeElement.blur(),
      t.type === "file" && (e.inputRef.value.value = null),
      n("update:modelValue", null),
      n("clear", t.modelValue),
      De(() => {
        f(), s.platform.is.mobile !== !0 && (a.value = !1);
      });
  }
  function v() {
    const A = [];
    return (
      o.prepend !== void 0 &&
        A.push(
          S(
            "div",
            {
              class:
                "q-field__prepend q-field__marginal row no-wrap items-center",
              key: "prepend",
              onClick: Rt,
            },
            o.prepend()
          )
        ),
      A.push(
        S(
          "div",
          {
            class:
              "q-field__control-container col relative-position row no-wrap q-anchor--skip",
          },
          D()
        )
      ),
      u.value === !0 &&
        t.noErrorIcon === !1 &&
        A.push(
          Z("error", [
            S(mt, { name: s.iconSet.field.error, color: "negative" }),
          ])
        ),
      t.loading === !0 || e.innerLoading.value === !0
        ? A.push(
            Z(
              "inner-loading-append",
              o.loading !== void 0 ? o.loading() : [S(zn, { color: t.color })]
            )
          )
        : t.clearable === !0 &&
          e.hasValue.value === !0 &&
          e.editable.value === !0 &&
          A.push(
            Z("inner-clearable-append", [
              S(mt, {
                class: "q-field__focusable-action",
                tag: "button",
                name: t.clearIcon || s.iconSet.field.clear,
                tabindex: 0,
                type: "button",
                "aria-hidden": null,
                role: null,
                onClick: F,
              }),
            ])
          ),
      o.append !== void 0 &&
        A.push(
          S(
            "div",
            {
              class:
                "q-field__append q-field__marginal row no-wrap items-center",
              key: "append",
              onClick: Rt,
            },
            o.append()
          )
        ),
      e.getInnerAppend !== void 0 &&
        A.push(Z("inner-append", e.getInnerAppend())),
      e.getControlChild !== void 0 && A.push(e.getControlChild()),
      A
    );
  }
  function D() {
    const A = [];
    return (
      t.prefix !== void 0 &&
        t.prefix !== null &&
        A.push(
          S(
            "div",
            { class: "q-field__prefix no-pointer-events row items-center" },
            t.prefix
          )
        ),
      e.getShadowControl !== void 0 &&
        e.hasShadow.value === !0 &&
        A.push(e.getShadowControl()),
      e.getControl !== void 0
        ? A.push(e.getControl())
        : o.rawControl !== void 0
        ? A.push(o.rawControl())
        : o.control !== void 0 &&
          A.push(
            S(
              "div",
              {
                ref: e.targetRef,
                class: "q-field__native row",
                tabindex: -1,
                ...e.splitAttrs.attributes.value,
                "data-autofocus": t.autofocus === !0 || void 0,
              },
              o.control(M.value)
            )
          ),
      m.value === !0 &&
        A.push(S("div", { class: b.value }, nt(o.label, t.label))),
      t.suffix !== void 0 &&
        t.suffix !== null &&
        A.push(
          S(
            "div",
            { class: "q-field__suffix no-pointer-events row items-center" },
            t.suffix
          )
        ),
      A.concat(nt(o.default))
    );
  }
  function k() {
    let A, Q;
    u.value === !0
      ? d.value !== null
        ? ((A = [S("div", { role: "alert" }, d.value)]),
          (Q = `q--slot-error-${d.value}`))
        : ((A = nt(o.error)), (Q = "q--slot-error"))
      : (t.hideHint !== !0 || e.focused.value === !0) &&
        (t.hint !== void 0
          ? ((A = [S("div", t.hint)]), (Q = `q--slot-hint-${t.hint}`))
          : ((A = nt(o.hint)), (Q = "q--slot-hint")));
    const ye = t.counter === !0 || o.counter !== void 0;
    if (t.hideBottomSpace === !0 && ye === !1 && A === void 0) return;
    const le = S("div", { key: Q, class: "q-field__messages col" }, A);
    return S(
      "div",
      {
        class:
          "q-field__bottom row items-start q-field__bottom--" +
          (t.hideBottomSpace !== !0 ? "animated" : "stale"),
        onClick: Rt,
      },
      [
        t.hideBottomSpace === !0
          ? le
          : S(dn, { name: "q-transition--field-message" }, () => le),
        ye === !0
          ? S(
              "div",
              { class: "q-field__counter" },
              o.counter !== void 0 ? o.counter() : e.computedCounter.value
            )
          : null,
      ]
    );
  }
  function Z(A, Q) {
    return Q === null
      ? null
      : S(
          "div",
          {
            key: A,
            class:
              "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip",
          },
          Q
        );
  }
  let G = !1;
  return (
    Bo(() => {
      G = !0;
    }),
    Ul(() => {
      G === !0 && t.autofocus === !0 && i.focus();
    }),
    Gt(() => {
      Mt.value === !0 &&
        e.requiredForAttr === !0 &&
        t.for === void 0 &&
        (e.targetUid.value = `f_${eu()}`),
        t.autofocus === !0 && i.focus();
    }),
    Ge(() => {
      l !== null && clearTimeout(l);
    }),
    Object.assign(i, { focus: V, blur: H }),
    function () {
      const Q =
        e.getControl === void 0 && o.control === void 0
          ? {
              ...e.splitAttrs.attributes.value,
              "data-autofocus": t.autofocus === !0 || void 0,
              ...$.value,
            }
          : $.value;
      return S(
        e.tag.value,
        { ref: e.rootRef, class: [w.value, r.class], style: r.style, ...Q },
        [
          o.before !== void 0
            ? S(
                "div",
                {
                  class:
                    "q-field__before q-field__marginal row no-wrap items-center",
                  onClick: Rt,
                },
                o.before()
              )
            : null,
          S(
            "div",
            { class: "q-field__inner relative-position col self-stretch" },
            [
              S(
                "div",
                {
                  ref: e.controlRef,
                  class: O.value,
                  tabindex: -1,
                  ...e.controlEvents,
                },
                v()
              ),
              y.value === !0 ? k() : null,
            ]
          ),
          o.after !== void 0
            ? S(
                "div",
                {
                  class:
                    "q-field__after q-field__marginal row no-wrap items-center",
                  onClick: Rt,
                },
                o.after()
              )
            : null,
        ]
      );
    }
  );
}
const tl = {
    date: "####/##/##",
    datetime: "####/##/## ##:##",
    time: "##:##",
    fulltime: "##:##:##",
    phone: "(###) ### - ####",
    card: "#### #### #### ####",
  },
  To = {
    "#": { pattern: "[\\d]", negate: "[^\\d]" },
    S: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]" },
    N: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]" },
    A: {
      pattern: "[a-zA-Z]",
      negate: "[^a-zA-Z]",
      transform: (e) => e.toLocaleUpperCase(),
    },
    a: {
      pattern: "[a-zA-Z]",
      negate: "[^a-zA-Z]",
      transform: (e) => e.toLocaleLowerCase(),
    },
    X: {
      pattern: "[0-9a-zA-Z]",
      negate: "[^0-9a-zA-Z]",
      transform: (e) => e.toLocaleUpperCase(),
    },
    x: {
      pattern: "[0-9a-zA-Z]",
      negate: "[^0-9a-zA-Z]",
      transform: (e) => e.toLocaleLowerCase(),
    },
  },
  nu = Object.keys(To);
nu.forEach((e) => {
  To[e].regex = new RegExp(To[e].pattern);
});
const Ug = new RegExp(
    "\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + nu.join("") + "])|(.)",
    "g"
  ),
  nl = /[.*+?^${}()|[\]\\]/g,
  Se = String.fromCharCode(1),
  Wg = {
    mask: String,
    reverseFillMask: Boolean,
    fillMask: [Boolean, String],
    unmaskedValue: Boolean,
  };
function Qg(e, t, n, o) {
  let r, i, s, l, a, c;
  const u = de(null),
    d = de(p());
  function f() {
    return (
      e.autogrow === !0 ||
      ["textarea", "text", "search", "url", "tel", "password"].includes(e.type)
    );
  }
  pe(() => e.type + e.autogrow, T),
    pe(
      () => e.mask,
      (C) => {
        if (C !== void 0) w(d.value, !0);
        else {
          const x = V(d.value);
          T(), e.modelValue !== x && t("update:modelValue", x);
        }
      }
    ),
    pe(
      () => e.fillMask + e.reverseFillMask,
      () => {
        u.value === !0 && w(d.value, !0);
      }
    ),
    pe(
      () => e.unmaskedValue,
      () => {
        u.value === !0 && w(d.value);
      }
    );
  function p() {
    if ((T(), u.value === !0)) {
      const C = $(V(e.modelValue));
      return e.fillMask !== !1 ? H(C) : C;
    }
    return e.modelValue;
  }
  function y(C) {
    if (C < r.length) return r.slice(-C);
    let x = "",
      F = r;
    const v = F.indexOf(Se);
    if (v > -1) {
      for (let D = C - F.length; D > 0; D--) x += Se;
      F = F.slice(0, v) + x + F.slice(v);
    }
    return F;
  }
  function T() {
    if (
      ((u.value = e.mask !== void 0 && e.mask.length !== 0 && f()),
      u.value === !1)
    ) {
      (l = void 0), (r = ""), (i = "");
      return;
    }
    const C = tl[e.mask] === void 0 ? e.mask : tl[e.mask],
      x =
        typeof e.fillMask == "string" && e.fillMask.length !== 0
          ? e.fillMask.slice(0, 1)
          : "_",
      F = x.replace(nl, "\\$&"),
      v = [],
      D = [],
      k = [];
    let Z = e.reverseFillMask === !0,
      G = "",
      A = "";
    C.replace(Ug, (fe, B, ue, Re, ne) => {
      if (Re !== void 0) {
        const te = To[Re];
        k.push(te),
          (A = te.negate),
          Z === !0 &&
            (D.push(
              "(?:" +
                A +
                "+)?(" +
                te.pattern +
                "+)?(?:" +
                A +
                "+)?(" +
                te.pattern +
                "+)?"
            ),
            (Z = !1)),
          D.push("(?:" + A + "+)?(" + te.pattern + ")?");
      } else if (ue !== void 0)
        (G = "\\" + (ue === "\\" ? "" : ue)),
          k.push(ue),
          v.push("([^" + G + "]+)?" + G + "?");
      else {
        const te = B !== void 0 ? B : ne;
        (G = te === "\\" ? "\\\\\\\\" : te.replace(nl, "\\\\$&")),
          k.push(te),
          v.push("([^" + G + "]+)?" + G + "?");
      }
    });
    const Q = new RegExp(
        "^" +
          v.join("") +
          "(" +
          (G === "" ? "." : "[^" + G + "]") +
          "+)?" +
          (G === "" ? "" : "[" + G + "]*") +
          "$"
      ),
      ye = D.length - 1,
      le = D.map((fe, B) =>
        B === 0 && e.reverseFillMask === !0
          ? new RegExp("^" + F + "*" + fe)
          : B === ye
          ? new RegExp(
              "^" +
                fe +
                "(" +
                (A === "" ? "." : A) +
                "+)?" +
                (e.reverseFillMask === !0 ? "$" : F + "*")
            )
          : new RegExp("^" + fe)
      );
    (s = k),
      (l = (fe) => {
        const B = Q.exec(
          e.reverseFillMask === !0 ? fe : fe.slice(0, k.length + 1)
        );
        B !== null && (fe = B.slice(1).join(""));
        const ue = [],
          Re = le.length;
        for (let ne = 0, te = fe; ne < Re; ne++) {
          const R = le[ne].exec(te);
          if (R === null) break;
          (te = te.slice(R.shift().length)), ue.push(...R);
        }
        return ue.length !== 0 ? ue.join("") : fe;
      }),
      (r = k.map((fe) => (typeof fe == "string" ? fe : Se)).join("")),
      (i = r.split(Se).join(x));
  }
  function w(C, x, F) {
    const v = o.value,
      D = v.selectionEnd,
      k = v.value.length - D,
      Z = V(C);
    x === !0 && T();
    const G = $(Z),
      A = e.fillMask !== !1 ? H(G) : G,
      Q = d.value !== A;
    v.value !== A && (v.value = A),
      Q === !0 && (d.value = A),
      document.activeElement === v &&
        De(() => {
          if (A === i) {
            const le = e.reverseFillMask === !0 ? i.length : 0;
            v.setSelectionRange(le, le, "forward");
            return;
          }
          if (F === "insertFromPaste" && e.reverseFillMask !== !0) {
            const le = v.selectionEnd;
            let fe = D - 1;
            for (let B = a; B <= fe && B < le; B++) r[B] !== Se && fe++;
            m.right(v, fe);
            return;
          }
          if (
            ["deleteContentBackward", "deleteContentForward"].indexOf(F) > -1
          ) {
            const le =
              e.reverseFillMask === !0
                ? D === 0
                  ? A.length > G.length
                    ? 1
                    : 0
                  : Math.max(
                      0,
                      A.length - (A === i ? 0 : Math.min(G.length, k) + 1)
                    ) + 1
                : D;
            v.setSelectionRange(le, le, "forward");
            return;
          }
          if (e.reverseFillMask === !0)
            if (Q === !0) {
              const le = Math.max(
                0,
                A.length - (A === i ? 0 : Math.min(G.length, k + 1))
              );
              le === 1 && D === 1
                ? v.setSelectionRange(le, le, "forward")
                : m.rightReverse(v, le);
            } else {
              const le = A.length - k;
              v.setSelectionRange(le, le, "backward");
            }
          else if (Q === !0) {
            const le = Math.max(0, r.indexOf(Se), Math.min(G.length, D) - 1);
            m.right(v, le);
          } else {
            const le = D - 1;
            m.right(v, le);
          }
        });
    const ye = e.unmaskedValue === !0 ? V(A) : A;
    String(e.modelValue) !== ye &&
      (e.modelValue !== null || ye !== "") &&
      n(ye, !0);
  }
  function O(C, x, F) {
    const v = $(V(C.value));
    (x = Math.max(0, r.indexOf(Se), Math.min(v.length, x))),
      (a = x),
      C.setSelectionRange(x, F, "forward");
  }
  const m = {
    left(C, x) {
      const F = r.slice(x - 1).indexOf(Se) === -1;
      let v = Math.max(0, x - 1);
      for (; v >= 0; v--)
        if (r[v] === Se) {
          (x = v), F === !0 && x++;
          break;
        }
      if (v < 0 && r[x] !== void 0 && r[x] !== Se) return m.right(C, 0);
      x >= 0 && C.setSelectionRange(x, x, "backward");
    },
    right(C, x) {
      const F = C.value.length;
      let v = Math.min(F, x + 1);
      for (; v <= F; v++)
        if (r[v] === Se) {
          x = v;
          break;
        } else r[v - 1] === Se && (x = v);
      if (v > F && r[x - 1] !== void 0 && r[x - 1] !== Se) return m.left(C, F);
      C.setSelectionRange(x, x, "forward");
    },
    leftReverse(C, x) {
      const F = y(C.value.length);
      let v = Math.max(0, x - 1);
      for (; v >= 0; v--)
        if (F[v - 1] === Se) {
          x = v;
          break;
        } else if (F[v] === Se && ((x = v), v === 0)) break;
      if (v < 0 && F[x] !== void 0 && F[x] !== Se) return m.rightReverse(C, 0);
      x >= 0 && C.setSelectionRange(x, x, "backward");
    },
    rightReverse(C, x) {
      const F = C.value.length,
        v = y(F),
        D = v.slice(0, x + 1).indexOf(Se) === -1;
      let k = Math.min(F, x + 1);
      for (; k <= F; k++)
        if (v[k - 1] === Se) {
          (x = k), x > 0 && D === !0 && x--;
          break;
        }
      if (k > F && v[x - 1] !== void 0 && v[x - 1] !== Se)
        return m.leftReverse(C, F);
      C.setSelectionRange(x, x, "forward");
    },
  };
  function b(C) {
    t("click", C), (c = void 0);
  }
  function M(C) {
    if ((t("keydown", C), Ca(C) === !0 || C.altKey === !0)) return;
    const x = o.value,
      F = x.selectionStart,
      v = x.selectionEnd;
    if ((C.shiftKey || (c = void 0), C.keyCode === 37 || C.keyCode === 39)) {
      C.shiftKey &&
        c === void 0 &&
        (c = x.selectionDirection === "forward" ? F : v);
      const D =
        m[
          (C.keyCode === 39 ? "right" : "left") +
            (e.reverseFillMask === !0 ? "Reverse" : "")
        ];
      if ((C.preventDefault(), D(x, c === F ? v : F), C.shiftKey)) {
        const k = x.selectionStart;
        x.setSelectionRange(Math.min(c, k), Math.max(c, k), "forward");
      }
    } else
      C.keyCode === 8 && e.reverseFillMask !== !0 && F === v
        ? (m.left(x, F), x.setSelectionRange(x.selectionStart, v, "backward"))
        : C.keyCode === 46 &&
          e.reverseFillMask === !0 &&
          F === v &&
          (m.rightReverse(x, v),
          x.setSelectionRange(F, x.selectionEnd, "forward"));
  }
  function $(C) {
    if (C == null || C === "") return "";
    if (e.reverseFillMask === !0) return q(C);
    const x = s;
    let F = 0,
      v = "";
    for (let D = 0; D < x.length; D++) {
      const k = C[F],
        Z = x[D];
      if (typeof Z == "string") (v += Z), k === Z && F++;
      else if (k !== void 0 && Z.regex.test(k))
        (v += Z.transform !== void 0 ? Z.transform(k) : k), F++;
      else return v;
    }
    return v;
  }
  function q(C) {
    const x = s,
      F = r.indexOf(Se);
    let v = C.length - 1,
      D = "";
    for (let k = x.length - 1; k >= 0 && v > -1; k--) {
      const Z = x[k];
      let G = C[v];
      if (typeof Z == "string") (D = Z + D), G === Z && v--;
      else if (G !== void 0 && Z.regex.test(G))
        do
          (D = (Z.transform !== void 0 ? Z.transform(G) : G) + D),
            v--,
            (G = C[v]);
        while (F === k && G !== void 0 && Z.regex.test(G));
      else return D;
    }
    return D;
  }
  function V(C) {
    return typeof C != "string" || l === void 0
      ? typeof C == "number"
        ? l("" + C)
        : C
      : l(C);
  }
  function H(C) {
    return i.length - C.length <= 0
      ? C
      : e.reverseFillMask === !0 && C.length !== 0
      ? i.slice(0, -C.length) + C
      : C + i.slice(C.length);
  }
  return {
    innerValue: d,
    hasMask: u,
    moveCursorForPaste: O,
    updateMaskValue: w,
    onMaskedKeydown: M,
    onMaskedClick: b,
  };
}
const pi = { name: String };
function ou(e = {}) {
  return (t, n, o) => {
    t[n](S("input", { class: "hidden" + (o || ""), ...e.value }));
  };
}
function Gg(e) {
  return E(() => e.name || e.for);
}
function Yg(e, t) {
  function n() {
    const o = e.modelValue;
    try {
      const r =
        "DataTransfer" in window
          ? new DataTransfer()
          : "ClipboardEvent" in window
          ? new ClipboardEvent("").clipboardData
          : void 0;
      return (
        Object(o) === o &&
          ("length" in o ? Array.from(o) : [o]).forEach((i) => {
            r.items.add(i);
          }),
        { files: r.files }
      );
    } catch {
      return { files: void 0 };
    }
  }
  return E(
    t === !0
      ? () => {
          if (e.type === "file") return n();
        }
      : n
  );
}
const Zg =
    /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/,
  Xg =
    /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u,
  Jg = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/,
  em = /[a-z0-9_ -]$/i;
function tm(e) {
  return function (n) {
    if (n.type === "compositionend" || n.type === "change") {
      if (n.target.qComposing !== !0) return;
      (n.target.qComposing = !1), e(n);
    } else
      n.type === "compositionupdate" &&
        n.target.qComposing !== !0 &&
        typeof n.data == "string" &&
        (Ce.is.firefox === !0
          ? em.test(n.data) === !1
          : Zg.test(n.data) === !0 ||
            Xg.test(n.data) === !0 ||
            Jg.test(n.data) === !0) === !0 &&
        (n.target.qComposing = !0);
  };
}
var nm = Oe({
  name: "QInput",
  inheritAttrs: !1,
  props: {
    ...Dg,
    ...Wg,
    ...pi,
    modelValue: { required: !1 },
    shadowText: String,
    type: { type: String, default: "text" },
    debounce: [String, Number],
    autogrow: Boolean,
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object],
  },
  emits: [...Hg, "paste", "change", "keydown", "click", "animationend"],
  setup(e, { emit: t, attrs: n }) {
    const { proxy: o } = ke(),
      { $q: r } = o,
      i = {};
    let s = NaN,
      l,
      a,
      c = null,
      u;
    const d = de(null),
      f = Gg(e),
      {
        innerValue: p,
        hasMask: y,
        moveCursorForPaste: T,
        updateMaskValue: w,
        onMaskedKeydown: O,
        onMaskedClick: m,
      } = Qg(e, t, G, d),
      b = Yg(e, !0),
      M = E(() => Hr(p.value)),
      $ = tm(k),
      q = zg(),
      V = E(() => e.type === "textarea" || e.autogrow === !0),
      H = E(
        () =>
          V.value === !0 ||
          ["text", "search", "url", "tel", "password"].includes(e.type)
      ),
      C = E(() => {
        const B = {
          ...q.splitAttrs.listeners.value,
          onInput: k,
          onPaste: D,
          onChange: Q,
          onBlur: ye,
          onFocus: ko,
        };
        return (
          (B.onCompositionstart =
            B.onCompositionupdate =
            B.onCompositionend =
              $),
          y.value === !0 && ((B.onKeydown = O), (B.onClick = m)),
          e.autogrow === !0 && (B.onAnimationend = Z),
          B
        );
      }),
      x = E(() => {
        const B = {
          tabindex: 0,
          "data-autofocus": e.autofocus === !0 || void 0,
          rows: e.type === "textarea" ? 6 : void 0,
          "aria-label": e.label,
          name: f.value,
          ...q.splitAttrs.attributes.value,
          id: q.targetUid.value,
          maxlength: e.maxlength,
          disabled: e.disable === !0,
          readonly: e.readonly === !0,
        };
        return (
          V.value === !1 && (B.type = e.type),
          e.autogrow === !0 && (B.rows = 1),
          B
        );
      });
    pe(
      () => e.type,
      () => {
        d.value && (d.value.value = e.modelValue);
      }
    ),
      pe(
        () => e.modelValue,
        (B) => {
          if (y.value === !0) {
            if (a === !0 && ((a = !1), String(B) === s)) return;
            w(B);
          } else
            p.value !== B &&
              ((p.value = B),
              e.type === "number" &&
                i.hasOwnProperty("value") === !0 &&
                (l === !0 ? (l = !1) : delete i.value));
          e.autogrow === !0 && De(A);
        }
      ),
      pe(
        () => e.autogrow,
        (B) => {
          B === !0
            ? De(A)
            : d.value !== null && n.rows > 0 && (d.value.style.height = "auto");
        }
      ),
      pe(
        () => e.dense,
        () => {
          e.autogrow === !0 && De(A);
        }
      );
    function F() {
      gi(() => {
        const B = document.activeElement;
        d.value !== null &&
          d.value !== B &&
          (B === null || B.id !== q.targetUid.value) &&
          d.value.focus({ preventScroll: !0 });
      });
    }
    function v() {
      d.value !== null && d.value.select();
    }
    function D(B) {
      if (y.value === !0 && e.reverseFillMask !== !0) {
        const ue = B.target;
        T(ue, ue.selectionStart, ue.selectionEnd);
      }
      t("paste", B);
    }
    function k(B) {
      if (!B || !B.target) return;
      if (e.type === "file") {
        t("update:modelValue", B.target.files);
        return;
      }
      const ue = B.target.value;
      if (B.target.qComposing === !0) {
        i.value = ue;
        return;
      }
      if (y.value === !0) w(ue, !1, B.inputType);
      else if ((G(ue), H.value === !0 && B.target === document.activeElement)) {
        const { selectionStart: Re, selectionEnd: ne } = B.target;
        Re !== void 0 &&
          ne !== void 0 &&
          De(() => {
            B.target === document.activeElement &&
              ue.indexOf(B.target.value) === 0 &&
              B.target.setSelectionRange(Re, ne);
          });
      }
      e.autogrow === !0 && A();
    }
    function Z(B) {
      t("animationend", B), A();
    }
    function G(B, ue) {
      (u = () => {
        (c = null),
          e.type !== "number" &&
            i.hasOwnProperty("value") === !0 &&
            delete i.value,
          e.modelValue !== B &&
            s !== B &&
            ((s = B),
            ue === !0 && (a = !0),
            t("update:modelValue", B),
            De(() => {
              s === B && (s = NaN);
            })),
          (u = void 0);
      }),
        e.type === "number" && ((l = !0), (i.value = B)),
        e.debounce !== void 0
          ? (c !== null && clearTimeout(c),
            (i.value = B),
            (c = setTimeout(u, e.debounce)))
          : u();
    }
    function A() {
      requestAnimationFrame(() => {
        const B = d.value;
        if (B !== null) {
          const ue = B.parentNode.style,
            { scrollTop: Re } = B,
            { overflowY: ne, maxHeight: te } =
              r.platform.is.firefox === !0 ? {} : window.getComputedStyle(B),
            R = ne !== void 0 && ne !== "scroll";
          R === !0 && (B.style.overflowY = "hidden"),
            (ue.marginBottom = B.scrollHeight - 1 + "px"),
            (B.style.height = "1px"),
            (B.style.height = B.scrollHeight + "px"),
            R === !0 &&
              (B.style.overflowY =
                parseInt(te, 10) < B.scrollHeight ? "auto" : "hidden"),
            (ue.marginBottom = ""),
            (B.scrollTop = Re);
        }
      });
    }
    function Q(B) {
      $(B),
        c !== null && (clearTimeout(c), (c = null)),
        u !== void 0 && u(),
        t("change", B.target.value);
    }
    function ye(B) {
      B !== void 0 && ko(B),
        c !== null && (clearTimeout(c), (c = null)),
        u !== void 0 && u(),
        (l = !1),
        (a = !1),
        delete i.value,
        e.type !== "file" &&
          setTimeout(() => {
            d.value !== null &&
              (d.value.value = p.value !== void 0 ? p.value : "");
          });
    }
    function le() {
      return i.hasOwnProperty("value") === !0
        ? i.value
        : p.value !== void 0
        ? p.value
        : "";
    }
    Ge(() => {
      ye();
    }),
      Gt(() => {
        e.autogrow === !0 && A();
      }),
      Object.assign(q, {
        innerValue: p,
        fieldClass: E(
          () =>
            `q-${V.value === !0 ? "textarea" : "input"}` +
            (e.autogrow === !0 ? " q-textarea--autogrow" : "")
        ),
        hasShadow: E(
          () =>
            e.type !== "file" &&
            typeof e.shadowText == "string" &&
            e.shadowText.length !== 0
        ),
        inputRef: d,
        emitValue: G,
        hasValue: M,
        floatingLabel: E(
          () =>
            (M.value === !0 &&
              (e.type !== "number" || isNaN(p.value) === !1)) ||
            Hr(e.displayValue)
        ),
        getControl: () =>
          S(V.value === !0 ? "textarea" : "input", {
            ref: d,
            class: ["q-field__native q-placeholder", e.inputClass],
            style: e.inputStyle,
            ...x.value,
            ...C.value,
            ...(e.type !== "file" ? { value: le() } : b.value),
          }),
        getShadowControl: () =>
          S(
            "div",
            {
              class:
                "q-field__native q-field__shadow absolute-bottom no-pointer-events" +
                (V.value === !0 ? "" : " text-no-wrap"),
            },
            [S("span", { class: "invisible" }, le()), S("span", e.shadowText)]
          ),
      });
    const fe = Kg(q);
    return (
      Object.assign(o, {
        focus: F,
        select: v,
        getNativeElement: () => d.value,
      }),
      bn(o, "nativeEl", () => d.value),
      fe
    );
  },
});
function ru(e, t) {
  const n = de(null),
    o = E(() =>
      e.disable === !0
        ? null
        : S("span", { ref: n, class: "no-outline", tabindex: -1 })
    );
  function r(i) {
    const s = t.value;
    i !== void 0 && i.type.indexOf("key") === 0
      ? s !== null &&
        document.activeElement !== s &&
        s.contains(document.activeElement) === !0 &&
        s.focus()
      : n.value !== null &&
        (i === void 0 || (s !== null && s.contains(i.target) === !0)) &&
        n.value.focus();
  }
  return { refocusTargetEl: o, refocusTarget: r };
}
var iu = { xs: 30, sm: 35, md: 40, lg: 50, xl: 60 };
const om = S(
  "svg",
  {
    key: "svg",
    class: "q-radio__bg absolute non-selectable",
    viewBox: "0 0 24 24",
  },
  [
    S("path", {
      d: "M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12",
    }),
    S("path", {
      class: "q-radio__check",
      d: "M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6",
    }),
  ]
);
var rm = Oe({
  name: "QRadio",
  props: {
    ...Yt,
    ...Wn,
    ...pi,
    modelValue: { required: !0 },
    val: { required: !0 },
    label: String,
    leftLabel: Boolean,
    checkedIcon: String,
    uncheckedIcon: String,
    color: String,
    keepColor: Boolean,
    dense: Boolean,
    disable: Boolean,
    tabindex: [String, Number],
  },
  emits: ["update:modelValue"],
  setup(e, { slots: t, emit: n }) {
    const { proxy: o } = ke(),
      r = Zt(e, o.$q),
      i = Qn(e, iu),
      s = de(null),
      { refocusTargetEl: l, refocusTarget: a } = ru(e, s),
      c = E(() => se(e.modelValue) === se(e.val)),
      u = E(
        () =>
          "q-radio cursor-pointer no-outline row inline no-wrap items-center" +
          (e.disable === !0 ? " disabled" : "") +
          (r.value === !0 ? " q-radio--dark" : "") +
          (e.dense === !0 ? " q-radio--dense" : "") +
          (e.leftLabel === !0 ? " reverse" : "")
      ),
      d = E(() => {
        const b =
          e.color !== void 0 && (e.keepColor === !0 || c.value === !0)
            ? ` text-${e.color}`
            : "";
        return `q-radio__inner relative-position q-radio__inner--${
          c.value === !0 ? "truthy" : "falsy"
        }${b}`;
      }),
      f = E(() => (c.value === !0 ? e.checkedIcon : e.uncheckedIcon) || null),
      p = E(() => (e.disable === !0 ? -1 : e.tabindex || 0)),
      y = E(() => {
        const b = { type: "radio" };
        return (
          e.name !== void 0 &&
            Object.assign(b, {
              ".checked": c.value === !0,
              "^checked": c.value === !0 ? "checked" : void 0,
              name: e.name,
              value: e.val,
            }),
          b
        );
      }),
      T = ou(y);
    function w(b) {
      b !== void 0 && (We(b), a(b)),
        e.disable !== !0 && c.value !== !0 && n("update:modelValue", e.val, b);
    }
    function O(b) {
      (b.keyCode === 13 || b.keyCode === 32) && We(b);
    }
    function m(b) {
      (b.keyCode === 13 || b.keyCode === 32) && w(b);
    }
    return (
      Object.assign(o, { set: w }),
      () => {
        const b =
          f.value !== null
            ? [
                S(
                  "div",
                  {
                    key: "icon",
                    class:
                      "q-radio__icon-container absolute-full flex flex-center no-wrap",
                  },
                  [S(mt, { class: "q-radio__icon", name: f.value })]
                ),
              ]
            : [om];
        e.disable !== !0 &&
          T(b, "unshift", " q-radio__native q-ma-none q-pa-none");
        const M = [
          S(
            "div",
            { class: d.value, style: i.value, "aria-hidden": "true" },
            b
          ),
        ];
        l.value !== null && M.push(l.value);
        const $ = e.label !== void 0 ? Vt(t.default, [e.label]) : nt(t.default);
        return (
          $ !== void 0 &&
            M.push(S("div", { class: "q-radio__label q-anchor--skip" }, $)),
          S(
            "div",
            {
              ref: s,
              class: u.value,
              tabindex: p.value,
              role: "radio",
              "aria-label": e.label,
              "aria-checked": c.value === !0 ? "true" : "false",
              "aria-disabled": e.disable === !0 ? "true" : void 0,
              onClick: w,
              onKeydown: O,
              onKeyup: m,
            },
            M
          )
        );
      }
    );
  },
});
const su = {
    ...Yt,
    ...Wn,
    ...pi,
    modelValue: { required: !0, default: null },
    val: {},
    trueValue: { default: !0 },
    falseValue: { default: !1 },
    indeterminateValue: { default: null },
    checkedIcon: String,
    uncheckedIcon: String,
    indeterminateIcon: String,
    toggleOrder: { type: String, validator: (e) => e === "tf" || e === "ft" },
    toggleIndeterminate: Boolean,
    label: String,
    leftLabel: Boolean,
    color: String,
    keepColor: Boolean,
    dense: Boolean,
    disable: Boolean,
    tabindex: [String, Number],
  },
  lu = ["update:modelValue"];
function au(e, t) {
  const { props: n, slots: o, emit: r, proxy: i } = ke(),
    { $q: s } = i,
    l = Zt(n, s),
    a = de(null),
    { refocusTargetEl: c, refocusTarget: u } = ru(n, a),
    d = Qn(n, iu),
    f = E(() => n.val !== void 0 && Array.isArray(n.modelValue)),
    p = E(() => {
      const v = se(n.val);
      return f.value === !0 ? n.modelValue.findIndex((D) => se(D) === v) : -1;
    }),
    y = E(() =>
      f.value === !0 ? p.value > -1 : se(n.modelValue) === se(n.trueValue)
    ),
    T = E(() =>
      f.value === !0 ? p.value === -1 : se(n.modelValue) === se(n.falseValue)
    ),
    w = E(() => y.value === !1 && T.value === !1),
    O = E(() => (n.disable === !0 ? -1 : n.tabindex || 0)),
    m = E(
      () =>
        `q-${e} cursor-pointer no-outline row inline no-wrap items-center` +
        (n.disable === !0 ? " disabled" : "") +
        (l.value === !0 ? ` q-${e}--dark` : "") +
        (n.dense === !0 ? ` q-${e}--dense` : "") +
        (n.leftLabel === !0 ? " reverse" : "")
    ),
    b = E(() => {
      const v = y.value === !0 ? "truthy" : T.value === !0 ? "falsy" : "indet",
        D =
          n.color !== void 0 &&
          (n.keepColor === !0 ||
            (e === "toggle" ? y.value === !0 : T.value !== !0))
            ? ` text-${n.color}`
            : "";
      return `q-${e}__inner relative-position non-selectable q-${e}__inner--${v}${D}`;
    }),
    M = E(() => {
      const v = { type: "checkbox" };
      return (
        n.name !== void 0 &&
          Object.assign(v, {
            ".checked": y.value,
            "^checked": y.value === !0 ? "checked" : void 0,
            name: n.name,
            value: f.value === !0 ? n.val : n.trueValue,
          }),
        v
      );
    }),
    $ = ou(M),
    q = E(() => {
      const v = {
        tabindex: O.value,
        role: e === "toggle" ? "switch" : "checkbox",
        "aria-label": n.label,
        "aria-checked":
          w.value === !0 ? "mixed" : y.value === !0 ? "true" : "false",
      };
      return n.disable === !0 && (v["aria-disabled"] = "true"), v;
    });
  function V(v) {
    v !== void 0 && (We(v), u(v)),
      n.disable !== !0 && r("update:modelValue", H(), v);
  }
  function H() {
    if (f.value === !0) {
      if (y.value === !0) {
        const v = n.modelValue.slice();
        return v.splice(p.value, 1), v;
      }
      return n.modelValue.concat([n.val]);
    }
    if (y.value === !0) {
      if (n.toggleOrder !== "ft" || n.toggleIndeterminate === !1)
        return n.falseValue;
    } else if (T.value === !0) {
      if (n.toggleOrder === "ft" || n.toggleIndeterminate === !1)
        return n.trueValue;
    } else return n.toggleOrder !== "ft" ? n.trueValue : n.falseValue;
    return n.indeterminateValue;
  }
  function C(v) {
    (v.keyCode === 13 || v.keyCode === 32) && We(v);
  }
  function x(v) {
    (v.keyCode === 13 || v.keyCode === 32) && V(v);
  }
  const F = t(y, w);
  return (
    Object.assign(i, { toggle: V }),
    () => {
      const v = F();
      n.disable !== !0 &&
        $(v, "unshift", ` q-${e}__native absolute q-ma-none q-pa-none`);
      const D = [
        S("div", { class: b.value, style: d.value, "aria-hidden": "true" }, v),
      ];
      c.value !== null && D.push(c.value);
      const k = n.label !== void 0 ? Vt(o.default, [n.label]) : nt(o.default);
      return (
        k !== void 0 &&
          D.push(S("div", { class: `q-${e}__label q-anchor--skip` }, k)),
        S(
          "div",
          {
            ref: a,
            class: m.value,
            ...q.value,
            onClick: V,
            onKeydown: C,
            onKeyup: x,
          },
          D
        )
      );
    }
  );
}
const im = S("div", { key: "svg", class: "q-checkbox__bg absolute" }, [
  S(
    "svg",
    { class: "q-checkbox__svg fit absolute-full", viewBox: "0 0 24 24" },
    [
      S("path", {
        class: "q-checkbox__truthy",
        fill: "none",
        d: "M1.73,12.91 8.1,19.28 22.79,4.59",
      }),
      S("path", { class: "q-checkbox__indet", d: "M4,14H20V10H4" }),
    ]
  ),
]);
var sm = Oe({
    name: "QCheckbox",
    props: su,
    emits: lu,
    setup(e) {
      function t(n, o) {
        const r = E(
          () =>
            (n.value === !0
              ? e.checkedIcon
              : o.value === !0
              ? e.indeterminateIcon
              : e.uncheckedIcon) || null
        );
        return () =>
          r.value !== null
            ? [
                S(
                  "div",
                  {
                    key: "icon",
                    class:
                      "q-checkbox__icon-container absolute-full flex flex-center no-wrap",
                  },
                  [S(mt, { class: "q-checkbox__icon", name: r.value })]
                ),
              ]
            : [im];
      }
      return au("checkbox", t);
    },
  }),
  lm = Oe({
    name: "QToggle",
    props: { ...su, icon: String, iconColor: String },
    emits: lu,
    setup(e) {
      function t(n, o) {
        const r = E(
            () =>
              (n.value === !0
                ? e.checkedIcon
                : o.value === !0
                ? e.indeterminateIcon
                : e.uncheckedIcon) || e.icon
          ),
          i = E(() => (n.value === !0 ? e.iconColor : null));
        return () => [
          S("div", { class: "q-toggle__track" }),
          S(
            "div",
            { class: "q-toggle__thumb absolute flex flex-center no-wrap" },
            r.value !== void 0
              ? [S(mt, { name: r.value, color: i.value })]
              : void 0
          ),
        ];
      }
      return au("toggle", t);
    },
  });
const uu = { radio: rm, checkbox: sm, toggle: lm },
  am = Object.keys(uu);
var um = Oe({
    name: "QOptionGroup",
    props: {
      ...Yt,
      modelValue: { required: !0 },
      options: {
        type: Array,
        validator: (e) => e.every((t) => "value" in t && "label" in t),
      },
      name: String,
      type: { default: "radio", validator: (e) => am.includes(e) },
      color: String,
      keepColor: Boolean,
      dense: Boolean,
      size: String,
      leftLabel: Boolean,
      inline: Boolean,
      disable: Boolean,
    },
    emits: ["update:modelValue"],
    setup(e, { emit: t, slots: n }) {
      const {
          proxy: { $q: o },
        } = ke(),
        r = Array.isArray(e.modelValue);
      e.type === "radio"
        ? r === !0 && console.error("q-option-group: model should not be array")
        : r === !1 &&
          console.error("q-option-group: model should be array in your case");
      const i = Zt(e, o),
        s = E(() => uu[e.type]),
        l = E(
          () =>
            "q-option-group q-gutter-x-sm" +
            (e.inline === !0 ? " q-option-group--inline" : "")
        ),
        a = E(() => {
          const u = { role: "group" };
          return (
            e.type === "radio" &&
              ((u.role = "radiogroup"),
              e.disable === !0 && (u["aria-disabled"] = "true")),
            u
          );
        });
      function c(u) {
        t("update:modelValue", u);
      }
      return () =>
        S(
          "div",
          { class: l.value, ...a.value },
          e.options.map((u, d) => {
            const f =
              n["label-" + d] !== void 0
                ? () => n["label-" + d](u)
                : n.label !== void 0
                ? () => n.label(u)
                : void 0;
            return S("div", [
              S(
                s.value,
                {
                  modelValue: e.modelValue,
                  val: u.value,
                  name: u.name === void 0 ? e.name : u.name,
                  disable: e.disable || u.disable,
                  label: f === void 0 ? u.label : null,
                  leftLabel: u.leftLabel === void 0 ? e.leftLabel : u.leftLabel,
                  color: u.color === void 0 ? e.color : u.color,
                  checkedIcon: u.checkedIcon,
                  uncheckedIcon: u.uncheckedIcon,
                  dark: u.dark || i.value,
                  size: u.size === void 0 ? e.size : u.size,
                  dense: e.dense,
                  keepColor: u.keepColor === void 0 ? e.keepColor : u.keepColor,
                  "onUpdate:modelValue": c,
                },
                f
              ),
            ]);
          })
        );
    },
  }),
  cm = Oe({
    name: "DialogPlugin",
    props: {
      ...Yt,
      title: String,
      message: String,
      prompt: Object,
      options: Object,
      progress: [Boolean, Object],
      html: Boolean,
      ok: { type: [String, Object, Boolean], default: !0 },
      cancel: [String, Object, Boolean],
      focus: {
        type: String,
        default: "ok",
        validator: (e) => ["ok", "cancel", "none"].includes(e),
      },
      stackButtons: Boolean,
      color: String,
      cardClass: [String, Array, Object],
      cardStyle: [String, Array, Object],
    },
    emits: ["ok", "hide"],
    setup(e, { emit: t }) {
      const { proxy: n } = ke(),
        { $q: o } = n,
        r = Zt(e, o),
        i = de(null),
        s = de(
          e.prompt !== void 0
            ? e.prompt.model
            : e.options !== void 0
            ? e.options.model
            : void 0
        ),
        l = E(
          () =>
            "q-dialog-plugin" +
            (r.value === !0 ? " q-dialog-plugin--dark q-dark" : "") +
            (e.progress !== !1 ? " q-dialog-plugin--progress" : "")
        ),
        a = E(() => e.color || (r.value === !0 ? "amber" : "primary")),
        c = E(() =>
          e.progress === !1
            ? null
            : at(e.progress) === !0
            ? {
                component: e.progress.spinner || zn,
                props: { color: e.progress.color || a.value },
              }
            : { component: zn, props: { color: a.value } }
        ),
        u = E(() => e.prompt !== void 0 || e.options !== void 0),
        d = E(() => {
          if (u.value !== !0) return {};
          const {
            model: k,
            isValid: Z,
            items: G,
            ...A
          } = e.prompt !== void 0 ? e.prompt : e.options;
          return A;
        }),
        f = E(() => (at(e.ok) === !0 || e.ok === !0 ? o.lang.label.ok : e.ok)),
        p = E(() =>
          at(e.cancel) === !0 || e.cancel === !0
            ? o.lang.label.cancel
            : e.cancel
        ),
        y = E(() =>
          e.prompt !== void 0
            ? e.prompt.isValid !== void 0 && e.prompt.isValid(s.value) !== !0
            : e.options !== void 0
            ? e.options.isValid !== void 0 && e.options.isValid(s.value) !== !0
            : !1
        ),
        T = E(() => ({
          color: a.value,
          label: f.value,
          ripple: !1,
          disable: y.value,
          ...(at(e.ok) === !0 ? e.ok : { flat: !0 }),
          "data-autofocus": (e.focus === "ok" && u.value !== !0) || void 0,
          onClick: b,
        })),
        w = E(() => ({
          color: a.value,
          label: p.value,
          ripple: !1,
          ...(at(e.cancel) === !0 ? e.cancel : { flat: !0 }),
          "data-autofocus": (e.focus === "cancel" && u.value !== !0) || void 0,
          onClick: M,
        }));
      pe(() => e.prompt && e.prompt.model, q),
        pe(() => e.options && e.options.model, q);
      function O() {
        i.value.show();
      }
      function m() {
        i.value.hide();
      }
      function b() {
        t("ok", se(s.value)), m();
      }
      function M() {
        m();
      }
      function $() {
        t("hide");
      }
      function q(k) {
        s.value = k;
      }
      function V(k) {
        y.value !== !0 &&
          e.prompt.type !== "textarea" &&
          jn(k, 13) === !0 &&
          b();
      }
      function H(k, Z) {
        return e.html === !0
          ? S(Cn, { class: k, innerHTML: Z })
          : S(Cn, { class: k }, () => Z);
      }
      function C() {
        return [
          S(nm, {
            color: a.value,
            dense: !0,
            autofocus: !0,
            dark: r.value,
            ...d.value,
            modelValue: s.value,
            "onUpdate:modelValue": q,
            onKeyup: V,
          }),
        ];
      }
      function x() {
        return [
          S(um, {
            color: a.value,
            options: e.options.items,
            dark: r.value,
            ...d.value,
            modelValue: s.value,
            "onUpdate:modelValue": q,
          }),
        ];
      }
      function F() {
        const k = [];
        return (
          e.cancel && k.push(S(Dr, w.value)),
          e.ok && k.push(S(Dr, T.value)),
          S(
            Og,
            {
              class: e.stackButtons === !0 ? "items-end" : "",
              vertical: e.stackButtons,
              align: "right",
            },
            () => k
          )
        );
      }
      function v() {
        const k = [];
        return (
          e.title && k.push(H("q-dialog__title", e.title)),
          e.progress !== !1 &&
            k.push(
              S(Cn, { class: "q-dialog__progress" }, () =>
                S(c.value.component, c.value.props)
              )
            ),
          e.message && k.push(H("q-dialog__message", e.message)),
          e.prompt !== void 0
            ? k.push(S(Cn, { class: "scroll q-dialog-plugin__form" }, C))
            : e.options !== void 0 &&
              k.push(
                S(Gs, { dark: r.value }),
                S(Cn, { class: "scroll q-dialog-plugin__form" }, x),
                S(Gs, { dark: r.value })
              ),
          (e.ok || e.cancel) && k.push(F()),
          k
        );
      }
      function D() {
        return [
          S(
            $g,
            {
              class: [l.value, e.cardClass],
              style: e.cardStyle,
              dark: r.value,
            },
            v
          ),
        ];
      }
      return (
        Object.assign(n, { show: O, hide: m }),
        () => S(ag, { ref: i, onHide: $ }, D)
      );
    },
  });
function cu(e, t) {
  for (const n in t)
    n !== "spinner" && Object(t[n]) === t[n]
      ? ((e[n] = Object(e[n]) !== e[n] ? {} : { ...e[n] }), cu(e[n], t[n]))
      : (e[n] = t[n]);
}
function fm(e, t, n) {
  return (o) => {
    let r, i;
    const s = t === !0 && o.component !== void 0;
    if (s === !0) {
      const { component: m, componentProps: b } = o;
      (r = typeof m == "string" ? n.component(m) : m), (i = b || {});
    } else {
      const { class: m, style: b, ...M } = o;
      (r = e),
        (i = M),
        m !== void 0 && (M.cardClass = m),
        b !== void 0 && (M.cardStyle = b);
    }
    let l,
      a = !1;
    const c = de(null),
      u = mi(!1, "dialog"),
      d = (m) => {
        if (c.value !== null && c.value[m] !== void 0) {
          c.value[m]();
          return;
        }
        const b = l.$.subTree;
        if (b && b.component) {
          if (b.component.proxy && b.component.proxy[m]) {
            b.component.proxy[m]();
            return;
          }
          if (
            b.component.subTree &&
            b.component.subTree.component &&
            b.component.subTree.component.proxy &&
            b.component.subTree.component.proxy[m]
          ) {
            b.component.subTree.component.proxy[m]();
            return;
          }
        }
        console.error("[Quasar] Incorrectly defined Dialog component");
      },
      f = [],
      p = [],
      y = {
        onOk(m) {
          return f.push(m), y;
        },
        onCancel(m) {
          return p.push(m), y;
        },
        onDismiss(m) {
          return f.push(m), p.push(m), y;
        },
        hide() {
          return d("hide"), y;
        },
        update(m) {
          if (l !== null) {
            if (s === !0) Object.assign(i, m);
            else {
              const { class: b, style: M, ...$ } = m;
              b !== void 0 && ($.cardClass = b),
                M !== void 0 && ($.cardStyle = M),
                cu(i, $);
            }
            l.$forceUpdate();
          }
          return y;
        },
      },
      T = (m) => {
        (a = !0),
          f.forEach((b) => {
            b(m);
          });
      },
      w = () => {
        O.unmount(u),
          ja(u),
          (O = null),
          (l = null),
          a !== !0 &&
            p.forEach((m) => {
              m();
            });
      };
    let O = Ea(
      {
        name: "QGlobalDialog",
        setup: () => () =>
          S(r, {
            ...i,
            ref: c,
            onOk: T,
            onHide: w,
            onVnodeMounted(...m) {
              typeof i.onVnodeMounted == "function" && i.onVnodeMounted(...m),
                De(() => d("show"));
            },
          }),
      },
      n
    );
    return (l = O.mount(u)), y;
  };
}
var dm = {
    install({ $q: e, parentApp: t }) {
      (e.dialog = fm(cm, !0, t)),
        this.__installed !== !0 && (this.create = e.dialog);
    },
  },
  hm = Oe({
    name: "QAvatar",
    props: {
      ...Wn,
      fontSize: String,
      color: String,
      textColor: String,
      icon: String,
      square: Boolean,
      rounded: Boolean,
    },
    setup(e, { slots: t }) {
      const n = Qn(e),
        o = E(
          () =>
            "q-avatar" +
            (e.color ? ` bg-${e.color}` : "") +
            (e.textColor ? ` text-${e.textColor} q-chip--colored` : "") +
            (e.square === !0
              ? " q-avatar--square"
              : e.rounded === !0
              ? " rounded-borders"
              : "")
        ),
        r = E(() => (e.fontSize ? { fontSize: e.fontSize } : null));
      return () => {
        const i = e.icon !== void 0 ? [S(mt, { name: e.icon })] : void 0;
        return S("div", { class: o.value, style: n.value }, [
          S(
            "div",
            {
              class: "q-avatar__content row flex-center overflow-hidden",
              style: r.value,
            },
            tg(t.default, i)
          ),
        ]);
      };
    },
  });
let gm = 0;
const go = {},
  mo = {},
  Je = {},
  fu = {},
  mm = /^\s*$/,
  du = [],
  pm = [void 0, null, !0, !1, ""],
  vi = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
    "top",
    "bottom",
    "left",
    "right",
    "center",
  ],
  vm = ["top-left", "top-right", "bottom-left", "bottom-right"],
  on = {
    positive: { icon: (e) => e.iconSet.type.positive, color: "positive" },
    negative: { icon: (e) => e.iconSet.type.negative, color: "negative" },
    warning: {
      icon: (e) => e.iconSet.type.warning,
      color: "warning",
      textColor: "dark",
    },
    info: { icon: (e) => e.iconSet.type.info, color: "info" },
    ongoing: { group: !1, timeout: 0, spinner: !0, color: "grey-8" },
  };
function hu(e, t, n) {
  if (!e) return kn("parameter required");
  let o;
  const r = { textColor: "white" };
  if (
    (e.ignoreDefaults !== !0 && Object.assign(r, go),
    at(e) === !1 &&
      (r.type && Object.assign(r, on[r.type]), (e = { message: e })),
    Object.assign(r, on[e.type || r.type], e),
    typeof r.icon == "function" && (r.icon = r.icon(t)),
    r.spinner
      ? (r.spinner === !0 && (r.spinner = zn), (r.spinner = Qt(r.spinner)))
      : (r.spinner = !1),
    (r.meta = {
      hasMedia: Boolean(r.spinner !== !1 || r.icon || r.avatar),
      hasText: ol(r.message) || ol(r.caption),
    }),
    r.position)
  ) {
    if (vi.includes(r.position) === !1) return kn("wrong position", e);
  } else r.position = "bottom";
  if (pm.includes(r.timeout) === !0) r.timeout = 5e3;
  else {
    const a = Number(r.timeout);
    if (isNaN(a) || a < 0) return kn("wrong timeout", e);
    r.timeout = Number.isFinite(a) ? a : 0;
  }
  r.timeout === 0
    ? (r.progress = !1)
    : r.progress === !0 &&
      ((r.meta.progressClass =
        "q-notification__progress" +
        (r.progressClass ? ` ${r.progressClass}` : "")),
      (r.meta.progressStyle = { animationDuration: `${r.timeout + 1e3}ms` }));
  const i = (Array.isArray(e.actions) === !0 ? e.actions : [])
      .concat(
        e.ignoreDefaults !== !0 && Array.isArray(go.actions) === !0
          ? go.actions
          : []
      )
      .concat(
        on[e.type] !== void 0 && Array.isArray(on[e.type].actions) === !0
          ? on[e.type].actions
          : []
      ),
    { closeBtn: s } = r;
  if (
    (s && i.push({ label: typeof s == "string" ? s : t.lang.label.close }),
    (r.actions = i.map(({ handler: a, noDismiss: c, ...u }) => ({
      flat: !0,
      ...u,
      onClick:
        typeof a == "function"
          ? () => {
              a(), c !== !0 && l();
            }
          : () => {
              l();
            },
    }))),
    r.multiLine === void 0 && (r.multiLine = r.actions.length > 1),
    Object.assign(r.meta, {
      class:
        `q-notification row items-stretch q-notification--${
          r.multiLine === !0 ? "multi-line" : "standard"
        }` +
        (r.color !== void 0 ? ` bg-${r.color}` : "") +
        (r.textColor !== void 0 ? ` text-${r.textColor}` : "") +
        (r.classes !== void 0 ? ` ${r.classes}` : ""),
      wrapperClass:
        "q-notification__wrapper col relative-position border-radius-inherit " +
        (r.multiLine === !0
          ? "column no-wrap justify-center"
          : "row items-center"),
      contentClass:
        "q-notification__content row items-center" +
        (r.multiLine === !0 ? "" : " col"),
      leftClass: r.meta.hasText === !0 ? "additional" : "single",
      attrs: { role: "alert", ...r.attrs },
    }),
    r.group === !1
      ? ((r.group = void 0), (r.meta.group = void 0))
      : ((r.group === void 0 || r.group === !0) &&
          (r.group = [r.message, r.caption, r.multiline]
            .concat(r.actions.map((a) => `${a.label}*${a.icon}`))
            .join("|")),
        (r.meta.group = r.group + "|" + r.position)),
    r.actions.length === 0
      ? (r.actions = void 0)
      : (r.meta.actionsClass =
          "q-notification__actions row items-center " +
          (r.multiLine === !0 ? "justify-end" : "col-auto") +
          (r.meta.hasMedia === !0
            ? " q-notification__actions--with-media"
            : "")),
    n !== void 0)
  ) {
    n.notif.meta.timer &&
      (clearTimeout(n.notif.meta.timer), (n.notif.meta.timer = void 0)),
      (r.meta.uid = n.notif.meta.uid);
    const a = Je[r.position].value.indexOf(n.notif);
    Je[r.position].value[a] = r;
  } else {
    const a = mo[r.meta.group];
    if (a === void 0) {
      if (
        ((r.meta.uid = gm++),
        (r.meta.badge = 1),
        ["left", "right", "center"].indexOf(r.position) !== -1)
      )
        Je[r.position].value.splice(
          Math.floor(Je[r.position].value.length / 2),
          0,
          r
        );
      else {
        const c = r.position.indexOf("top") > -1 ? "unshift" : "push";
        Je[r.position].value[c](r);
      }
      r.group !== void 0 && (mo[r.meta.group] = r);
    } else {
      if (
        (a.meta.timer && (clearTimeout(a.meta.timer), (a.meta.timer = void 0)),
        r.badgePosition !== void 0)
      ) {
        if (vm.includes(r.badgePosition) === !1)
          return kn("wrong badgePosition", e);
      } else
        r.badgePosition = `top-${
          r.position.indexOf("left") > -1 ? "right" : "left"
        }`;
      (r.meta.uid = a.meta.uid),
        (r.meta.badge = a.meta.badge + 1),
        (r.meta.badgeClass =
          `q-notification__badge q-notification__badge--${r.badgePosition}` +
          (r.badgeColor !== void 0 ? ` bg-${r.badgeColor}` : "") +
          (r.badgeTextColor !== void 0 ? ` text-${r.badgeTextColor}` : "") +
          (r.badgeClass ? ` ${r.badgeClass}` : ""));
      const c = Je[r.position].value.indexOf(a);
      Je[r.position].value[c] = mo[r.meta.group] = r;
    }
  }
  const l = () => {
    bm(r), (o = void 0);
  };
  if (
    (r.timeout > 0 &&
      (r.meta.timer = setTimeout(() => {
        (r.meta.timer = void 0), l();
      }, r.timeout + 1e3)),
    r.group !== void 0)
  )
    return (a) => {
      a !== void 0
        ? kn("trying to update a grouped one which is forbidden", e)
        : l();
    };
  if (((o = { dismiss: l, config: e, notif: r }), n !== void 0)) {
    Object.assign(n, o);
    return;
  }
  return (a) => {
    if (o !== void 0)
      if (a === void 0) o.dismiss();
      else {
        const c = Object.assign({}, o.config, a, {
          group: !1,
          position: r.position,
        });
        hu(c, t, o);
      }
  };
}
function bm(e) {
  e.meta.timer && (clearTimeout(e.meta.timer), (e.meta.timer = void 0));
  const t = Je[e.position].value.indexOf(e);
  if (t !== -1) {
    e.group !== void 0 && delete mo[e.meta.group];
    const n = du["" + e.meta.uid];
    if (n) {
      const { width: o, height: r } = getComputedStyle(n);
      (n.style.left = `${n.offsetLeft}px`),
        (n.style.width = o),
        (n.style.height = r);
    }
    Je[e.position].value.splice(t, 1),
      typeof e.onDismiss == "function" && e.onDismiss();
  }
}
function ol(e) {
  return e != null && mm.test(e) !== !0;
}
function kn(e, t) {
  return console.error(`Notify: ${e}`, t), !1;
}
function ym() {
  return Oe({
    name: "QNotifications",
    devtools: { hide: !0 },
    setup() {
      return () =>
        S(
          "div",
          { class: "q-notifications" },
          vi.map((e) =>
            S(
              $f,
              {
                key: e,
                class: fu[e],
                tag: "div",
                name: `q-notification--${e}`,
              },
              () =>
                Je[e].value.map((t) => {
                  const n = t.meta,
                    o = [];
                  if (
                    (n.hasMedia === !0 &&
                      (t.spinner !== !1
                        ? o.push(
                            S(t.spinner, {
                              class:
                                "q-notification__spinner q-notification__spinner--" +
                                n.leftClass,
                              color: t.spinnerColor,
                              size: t.spinnerSize,
                            })
                          )
                        : t.icon
                        ? o.push(
                            S(mt, {
                              class:
                                "q-notification__icon q-notification__icon--" +
                                n.leftClass,
                              name: t.icon,
                              color: t.iconColor,
                              size: t.iconSize,
                              role: "img",
                            })
                          )
                        : t.avatar &&
                          o.push(
                            S(
                              hm,
                              {
                                class:
                                  "q-notification__avatar q-notification__avatar--" +
                                  n.leftClass,
                              },
                              () =>
                                S("img", {
                                  src: t.avatar,
                                  "aria-hidden": "true",
                                })
                            )
                          )),
                    n.hasText === !0)
                  ) {
                    let i;
                    const s = { class: "q-notification__message col" };
                    if (t.html === !0)
                      s.innerHTML = t.caption
                        ? `<div>${t.message}</div><div class="q-notification__caption">${t.caption}</div>`
                        : t.message;
                    else {
                      const l = [t.message];
                      i = t.caption
                        ? [
                            S("div", l),
                            S("div", { class: "q-notification__caption" }, [
                              t.caption,
                            ]),
                          ]
                        : l;
                    }
                    o.push(S("div", s, i));
                  }
                  const r = [S("div", { class: n.contentClass }, o)];
                  return (
                    t.progress === !0 &&
                      r.push(
                        S("div", {
                          key: `${n.uid}|p|${n.badge}`,
                          class: n.progressClass,
                          style: n.progressStyle,
                        })
                      ),
                    t.actions !== void 0 &&
                      r.push(
                        S(
                          "div",
                          { class: n.actionsClass },
                          t.actions.map((i) => S(Dr, i))
                        )
                      ),
                    n.badge > 1 &&
                      r.push(
                        S(
                          "div",
                          {
                            key: `${n.uid}|${n.badge}`,
                            class: t.meta.badgeClass,
                            style: t.badgeStyle,
                          },
                          [n.badge]
                        )
                      ),
                    S(
                      "div",
                      {
                        ref: (i) => {
                          du["" + n.uid] = i;
                        },
                        key: n.uid,
                        class: n.class,
                        ...n.attrs,
                      },
                      [S("div", { class: n.wrapperClass }, r)]
                    )
                  );
                })
            )
          )
        );
    },
  });
}
var _m = {
    setDefaults(e) {
      at(e) === !0 && Object.assign(go, e);
    },
    registerType(e, t) {
      at(t) === !0 && (on[e] = t);
    },
    install({ $q: e, parentApp: t }) {
      if (
        ((e.notify = this.create = (n) => hu(n, e)),
        (e.notify.setDefaults = this.setDefaults),
        (e.notify.registerType = this.registerType),
        e.config.notify !== void 0 && this.setDefaults(e.config.notify),
        this.__installed !== !0)
      ) {
        vi.forEach((o) => {
          Je[o] = de([]);
          const r =
              ["left", "center", "right"].includes(o) === !0
                ? "center"
                : o.indexOf("top") > -1
                ? "top"
                : "bottom",
            i =
              o.indexOf("left") > -1
                ? "start"
                : o.indexOf("right") > -1
                ? "end"
                : "center",
            s = ["left", "right"].includes(o)
              ? `items-${o === "left" ? "start" : "end"} justify-center`
              : o === "center"
              ? "flex-center"
              : `items-${i}`;
          fu[
            o
          ] = `q-notifications__list q-notifications__list--${r} fixed column no-wrap ${s}`;
        });
        const n = mi("q-notify");
        Ea(ym(), t).mount(n);
      }
    },
  },
  wm = { config: {}, plugins: { Dialog: dm, Notify: _m } };
async function xm({ app: e, router: t, store: n }) {
  e.use(t), e.mount("#q-app");
}
Mh(ba, wm).then(xm);
export {
  li as $,
  ko as A,
  Yf as B,
  Jf as C,
  We as D,
  Yt as E,
  Zt as F,
  _a as G,
  Bo as H,
  Ul as I,
  Vt as J,
  Dl as K,
  Vm as L,
  Im as M,
  Lh as N,
  Fh as O,
  $r as P,
  zn as Q,
  $h as R,
  Bh as S,
  dn as T,
  qh as U,
  Dm as V,
  Jh as W,
  fo as X,
  Om as Y,
  Nm as Z,
  vn as _,
  E as a,
  Xe as a0,
  Fm as a1,
  us as a2,
  vd as a3,
  dc as a4,
  ra as a5,
  sa as a6,
  sc as a7,
  Ie as a8,
  Dr as a9,
  aa,
  Cm as ab,
  mt as ac,
  Zc as ad,
  hm as ae,
  Sm as af,
  yg as ag,
  kg as ah,
  Sg as ai,
  jn as aj,
  fd as ak,
  km as al,
  Am as am,
  nm as an,
  Rm as ao,
  Em as ap,
  et as aq,
  Tm as ar,
  Gr as as,
  sm as at,
  Pm as au,
  Lo as av,
  nt as b,
  Oe as c,
  Gt as d,
  De as e,
  ut as f,
  ke as g,
  S as h,
  Mt as i,
  Lm as j,
  jm as k,
  Be as l,
  $m as m,
  Nn as n,
  Ge as o,
  Bm as p,
  Da as q,
  de as r,
  Ha as s,
  eg as t,
  Ce as u,
  Mm as v,
  pe as w,
  Xf as x,
  qm as y,
  Rt as z,
};
