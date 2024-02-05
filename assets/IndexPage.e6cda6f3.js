import {
  c as C,
  a as d,
  h as Q,
  b as w,
  f as g,
  j as i,
  g as I,
  m as $,
  Y as B,
  ak as P,
  r as y,
  al as F,
  a5 as u,
  a6 as f,
  a7 as r,
  aa as q,
  a8 as l,
  a9 as b,
  am as K,
  an as L,
  ao as k,
  ap as N,
  aq as T,
  ac as z,
  ar as x,
  K as D,
  as as S,
  at as H,
  ad as U,
  ab as j,
  au as A,
} from "assets/index.70c2f1ca.js";
import { Q as E, a as M, b as _ } from "assets/QList.19fed4bd.js";
var O = C({
    name: "QItemLabel",
    props: {
      overline: Boolean,
      caption: Boolean,
      header: Boolean,
      lines: [Number, String],
    },
    setup(t, { slots: o }) {
      const a = d(() => parseInt(t.lines, 10)),
        e = d(
          () =>
            "q-item__label" +
            (t.overline === !0
              ? " q-item__label--overline text-overline"
              : "") +
            (t.caption === !0 ? " q-item__label--caption text-caption" : "") +
            (t.header === !0 ? " q-item__label--header" : "") +
            (a.value === 1 ? " ellipsis" : "")
        ),
        p = d(() =>
          t.lines !== void 0 && a.value > 1
            ? {
                overflow: "hidden",
                display: "-webkit-box",
                "-webkit-box-orient": "vertical",
                "-webkit-line-clamp": a.value,
              }
            : null
        );
      return () => Q("div", { style: p.value, class: e.value }, w(o.default));
    },
  }),
  R = C({
    name: "QPage",
    props: { padding: Boolean, styleFn: Function },
    setup(t, { slots: o }) {
      const {
          proxy: { $q: a },
        } = I(),
        e = g($, i);
      if (e === i)
        return console.error("QPage needs to be a deep child of QLayout"), i;
      if (g(B, i) === i)
        return console.error("QPage needs to be child of QPageContainer"), i;
      const m = d(() => {
          const s =
            (e.header.space === !0 ? e.header.size : 0) +
            (e.footer.space === !0 ? e.footer.size : 0);
          if (typeof t.styleFn == "function") {
            const v =
              e.isContainer.value === !0
                ? e.containerHeight.value
                : a.screen.height;
            return t.styleFn(s, v);
          }
          return {
            minHeight:
              e.isContainer.value === !0
                ? e.containerHeight.value - s + "px"
                : a.screen.height === 0
                ? s !== 0
                  ? `calc(100vh - ${s}px)`
                  : "100vh"
                : a.screen.height - s + "px",
          };
        }),
        c = d(() => `q-page${t.padding === !0 ? " q-layout-padding" : ""}`);
      return () => Q("main", { class: c.value, style: m.value }, w(o.default));
    },
  });
function Y() {
  return g(P);
}
const G = { class: "row q-pa-sm bg-primary" },
  J = { key: 0, class: "no-tasks absolute-center" },
  W = q("div", { class: "text-h5 text-primary text-center" }, "No tasks", -1),
  ee = {
    __name: "IndexPage",
    setup(t) {
      const o = y(""),
        a = y([]),
        e = Y();
      function p(c) {
        e.dialog({
          title: "Confirm",
          message: "Do you really want to delete the item?",
          cancel: !0,
          persistent: !0,
        }).onOk(() => {
          e.notify(`Task ${a.value[c].title} deleted!`), a.value.splice(c, 1);
        });
      }
      function m() {
        a.value.push({ title: o.value, done: !1 }), (o.value = "");
      }
      return (c, s) => {
        const v = F("riple");
        return (
          u(),
          f(
            R,
            { class: "bg-grey-3 column" },
            {
              default: r(() => [
                q("div", G, [
                  l(
                    L,
                    {
                      modelValue: o.value,
                      "onUpdate:modelValue":
                        s[0] || (s[0] = (n) => (o.value = n)),
                      onKeyup: K(m, ["enter"]),
                      class: "col",
                      square: "",
                      filled: "",
                      "bg-color": "white",
                      placeholder: "Add task",
                      dense: "",
                    },
                    {
                      append: r(() => [
                        l(b, {
                          onClick: m,
                          round: "",
                          dense: "",
                          flat: "",
                          icon: "add",
                        }),
                      ]),
                      _: 1,
                    },
                    8,
                    ["modelValue"]
                  ),
                ]),
                l(
                  E,
                  { class: "bg-white", separator: "", bordered: "" },
                  {
                    default: r(() => [
                      (u(!0),
                      k(
                        T,
                        null,
                        N(a.value, (n, V) =>
                          D(
                            (u(),
                            f(
                              M,
                              {
                                key: n.title,
                                onClick: (h) => (n.done = !n.done),
                                class: S({ "done bg-blue-1": n.done }),
                                clickable: "",
                              },
                              {
                                default: r(() => [
                                  l(
                                    _,
                                    { avatar: "" },
                                    {
                                      default: r(() => [
                                        l(
                                          H,
                                          {
                                            modelValue: n.done,
                                            "onUpdate:modelValue": (h) =>
                                              (n.done = h),
                                            class: "no-pointer-events",
                                            color: "primary",
                                          },
                                          null,
                                          8,
                                          ["modelValue", "onUpdate:modelValue"]
                                        ),
                                      ]),
                                      _: 2,
                                    },
                                    1024
                                  ),
                                  l(
                                    _,
                                    null,
                                    {
                                      default: r(() => [
                                        l(
                                          O,
                                          null,
                                          {
                                            default: r(() => [
                                              U(j(n.title), 1),
                                            ]),
                                            _: 2,
                                          },
                                          1024
                                        ),
                                      ]),
                                      _: 2,
                                    },
                                    1024
                                  ),
                                  n.done
                                    ? (u(),
                                      f(
                                        _,
                                        { key: 0, side: "" },
                                        {
                                          default: r(() => [
                                            l(
                                              b,
                                              {
                                                onClick: A(
                                                  (h) => p(V),
                                                  ["stop"]
                                                ),
                                                flat: "",
                                                round: "",
                                                dense: "",
                                                color: "primary",
                                                icon: "delete",
                                              },
                                              null,
                                              8,
                                              ["onClick"]
                                            ),
                                          ]),
                                          _: 2,
                                        },
                                        1024
                                      ))
                                    : x("", !0),
                                ]),
                                _: 2,
                              },
                              1032,
                              ["onClick", "class"]
                            )),
                            [[v]]
                          )
                        ),
                        128
                      )),
                    ]),
                    _: 1,
                  }
                ),
                a.value.length
                  ? x("", !0)
                  : (u(),
                    k("div", J, [
                      l(z, { name: "check", size: "100px", color: "primary" }),
                      W,
                    ])),
              ]),
              _: 1,
            }
          )
        );
      };
    },
  };
export { ee as default };
