/* @ds-bundle: {"format":3,"namespace":"OpenEduOpsDesignSystem_25274a","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Callout","sourcePath":"components/core/Callout.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"CodeBlock","sourcePath":"components/core/CodeBlock.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Lockup","sourcePath":"components/core/Lockup.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"2aecbeee0fb4","components/core/Button.jsx":"e7688932d0f2","components/core/Callout.jsx":"92349064b2eb","components/core/Card.jsx":"f9a752fd3702","components/core/CodeBlock.jsx":"972eebc1dfc5","components/core/Eyebrow.jsx":"438409754059","components/core/Input.jsx":"9916be7cab7d","components/core/Lockup.jsx":"a67b5aac11ae","components/core/Tag.jsx":"5845296c04ad","ui_kits/video-production/Frames.jsx":"1f4ff2609abf"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.OpenEduOpsDesignSystem_25274a = window.OpenEduOpsDesignSystem_25274a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Status badge — a small dot + label for states (success / info / warning / neutral).
 * Teal = success/done, navy = info, orange = warning/attention.
 */
function Badge({
  tone = 'neutral',
  children,
  style = {},
  ...rest
}) {
  const tones = {
    success: {
      dot: 'var(--teal)',
      fg: 'var(--navy)',
      bg: 'var(--teal-soft)'
    },
    info: {
      dot: 'var(--navy)',
      fg: 'var(--navy)',
      bg: 'var(--mist)'
    },
    warning: {
      dot: 'var(--orange)',
      fg: 'var(--navy)',
      bg: 'var(--orange-soft)'
    },
    neutral: {
      dot: 'var(--navy-50)',
      fg: 'var(--navy)',
      bg: 'var(--mist)'
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-body)',
      fontWeight: 500,
      fontSize: 12.5,
      color: t.fg,
      background: t.bg,
      padding: '4px 10px 4px 8px',
      borderRadius: 'var(--radius-pill)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: t.dot,
      flex: 'none'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * OpenEduOps Button.
 * Orange is the channel's one CTA accent — use `primary` sparingly (one per view).
 * Text on orange/teal is always navy (brand rule).
 */
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  iconLeft = null,
  iconRight = null,
  children,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '6px 12px',
      fontSize: 13,
      gap: 6
    },
    md: {
      padding: '10px 18px',
      fontSize: 14,
      gap: 8
    },
    lg: {
      padding: '14px 24px',
      fontSize: 16,
      gap: 10
    }
  };
  const variants = {
    primary: {
      background: 'var(--orange)',
      color: 'var(--navy)',
      border: '2px solid var(--orange)'
    },
    secondary: {
      background: 'var(--navy)',
      color: 'var(--white)',
      border: '2px solid var(--navy)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--navy)',
      border: '2px solid var(--border-hairline)'
    },
    success: {
      background: 'var(--teal)',
      color: 'var(--navy)',
      border: '2px solid var(--teal)'
    }
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: s.fontSize,
      lineHeight: 1,
      padding: s.padding,
      borderRadius: 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'filter var(--dur-fast) var(--ease-standard), transform var(--dur-fast)',
      ...v,
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'translateY(1px)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'translateY(0)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.filter = 'none';
    },
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.filter = 'brightness(0.94)';
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Callout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Callout — the node-and-trace highlight. An orange node + thin trace bar to the left,
 * navy panel. Use for one "look here" note. (Never a clip-art arrow.)
 */
function Callout({
  tone = 'orange',
  title = null,
  children,
  style = {},
  ...rest
}) {
  const accent = tone === 'teal' ? 'var(--teal)' : 'var(--orange)';
  const wash = tone === 'teal' ? 'var(--teal-soft)' : 'var(--orange-soft)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
      background: wash,
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-4) var(--space-5)',
      color: 'var(--text-body)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: 5,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: '50%',
      background: accent
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 3,
      background: accent,
      borderRadius: 2
    }
  })), /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 15,
      marginBottom: 3
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      lineHeight: 'var(--lh-body)'
    }
  }, children)));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Callout.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the surface primitive. White or mist fill, hairline border, soft shadow on hover.
 * Documentation-calm: restrained rounding, single-layer elevation.
 */
function Card({
  surface = 'white',
  interactive = false,
  padding = 'var(--space-5)',
  children,
  style = {},
  ...rest
}) {
  const bg = surface === 'mist' ? 'var(--surface-sunken)' : 'var(--surface-card)';
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: bg,
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-md)',
      padding,
      boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transform: hover ? 'translateY(-1px)' : 'none',
      transition: 'box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)',
      cursor: interactive ? 'pointer' : 'default',
      color: 'var(--text-body)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/CodeBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CodeBlock — the on-screen terminal panel. Near-black navy surface, JetBrains Mono,
 * teal $ prompt, orange flags, teal success, muted comments. Soft shadow, never full-bleed.
 *
 * `lines` is an array of token arrays: [{ t: 'prompt'|'cmd'|'flag'|'comment'|'ok'|'plain', text }].
 * Or pass plain children for freeform.
 */
function CodeBlock({
  title = 'dreamop@server: ~',
  lines = null,
  children,
  style = {},
  ...rest
}) {
  const colors = {
    prompt: 'var(--teal)',
    cmd: 'var(--white)',
    flag: 'var(--orange)',
    comment: 'var(--code-comment)',
    ok: 'var(--teal)',
    plain: '#c8d3e0'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--surface-code)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-code)',
      overflow: 'hidden',
      fontFamily: 'var(--font-mono)',
      ...style
    }
  }, rest), title && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      padding: '10px 14px',
      borderBottom: '1px solid rgba(255,255,255,0.07)'
    }
  }, ['#ff5f56', '#ffbd2e', '#27c93f'].map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: c
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8,
      fontSize: 12,
      color: '#8aa0b8'
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px',
      fontSize: 13,
      lineHeight: 1.7
    }
  }, lines ? lines.map((toks, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, (Array.isArray(toks) ? toks : [toks]).map((tk, j) => /*#__PURE__*/React.createElement("span", {
    key: j,
    style: {
      color: colors[tk.t] || colors.plain
    }
  }, tk.text)))) : children));
}
Object.assign(__ds_scope, { CodeBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CodeBlock.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Eyebrow — mono ALLCAPS label with an optional teal node dot.
 * The brand's metadata/section marker (e.g. "EPISODE 04 · MODULE 02").
 */
function Eyebrow({
  node = true,
  tone = 'teal',
  children,
  style = {},
  ...rest
}) {
  const color = tone === 'orange' ? 'var(--orange)' : tone === 'muted' ? 'var(--text-muted)' : 'var(--teal)';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-mono)',
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color,
      ...style
    }
  }, rest), node && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: color,
      flex: 'none'
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — text field with optional label and mono hint. Calm, documentation-style:
 * mist-tinted, hairline border, teal focus ring (system colour).
 */
function Input({
  label = null,
  hint = null,
  mono = false,
  style = {},
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      display: 'block',
      fontFamily: 'var(--font-body)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-body)',
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      padding: '10px 12px',
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-body)',
      fontSize: 14,
      color: 'var(--text-body)',
      background: 'var(--white)',
      borderRadius: 'var(--radius-sm)',
      border: `1px solid ${focus ? 'var(--teal)' : 'var(--border-hairline)'}`,
      boxShadow: focus ? '0 0 0 3px var(--teal-soft)' : 'none',
      outline: 'none',
      transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
      ...style
    }
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--text-muted)',
      marginTop: 5
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Lockup.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Lockup — the OpenEduOps logo (node-and-trace OEO mark, optional wordmark).
 * Colourway: `primary` (navy strokes / orange nodes) for light fields,
 * `reversed` (mist strokes / teal nodes) for dark fields. `markOnly` for avatar/favicon.
 */
function Lockup({
  colorway = 'primary',
  markOnly = false,
  height = 48,
  style = {},
  ...rest
}) {
  const stroke = colorway === 'reversed' ? 'var(--mist)' : 'var(--navy)';
  const node = colorway === 'reversed' ? 'var(--teal)' : 'var(--orange)';
  const Mark = /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 142 64",
    height: markOnly ? height : Math.round(height * 0.62),
    role: "img",
    "aria-label": "OpenEduOps"
  }, /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: stroke,
    strokeWidth: "5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "26",
    cy: "32",
    r: "17"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M43 32 H54"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M58 13 V51"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M58 15 H82"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M58 32 H76"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M58 49 H82"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M86 32 H98"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "116",
    cy: "32",
    r: "17"
  })), /*#__PURE__*/React.createElement("g", {
    fill: node
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "26",
    cy: "32",
    r: "5.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "116",
    cy: "32",
    r: "5.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "84",
    cy: "15",
    r: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "78",
    cy: "32",
    r: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "84",
    cy: "49",
    r: "5"
  })));
  if (markOnly) {
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        display: 'inline-flex',
        ...style
      }
    }, rest), Mark);
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: height * 0.08,
      ...style
    }
  }, rest), Mark, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: height * 0.42,
      letterSpacing: '-0.02em',
      color: stroke,
      lineHeight: 1
    }
  }, "OpenEduOps"));
}
Object.assign(__ds_scope, { Lockup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Lockup.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag chip — mono, uppercase pill. The thumbnail/episode chip (EP 04 · FIX · GUIDE).
 * Teal is the default (system); orange for identity emphasis; navy/outline for neutral.
 */
function Tag({
  tone = 'teal',
  children,
  style = {},
  ...rest
}) {
  const tones = {
    teal: {
      background: 'var(--teal)',
      color: 'var(--navy)',
      border: '1px solid var(--teal)'
    },
    orange: {
      background: 'var(--orange)',
      color: 'var(--navy)',
      border: '1px solid var(--orange)'
    },
    navy: {
      background: 'var(--navy)',
      color: 'var(--white)',
      border: '1px solid var(--navy)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--navy)',
      border: '1px solid var(--border-hairline)'
    }
  };
  const t = tones[tone] || tones.teal;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-mono)',
      fontWeight: 500,
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      padding: '4px 10px',
      borderRadius: 'var(--radius-pill)',
      ...t,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// ui_kits/video-production/Frames.jsx
try { (() => {
/* OpenEduOps — Video production frames.
   Bespoke 16:9 brand surfaces, drawn on a 1280×720 artboard, token-driven.
   Exposed on window for the index switcher. */

const ART_W = 1280,
  ART_H = 720;

/* shared faux screen-recording background (generic LMS admin — NOT a real product UI) */
function FauxScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--mist)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 52,
      background: 'var(--navy)',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '0 22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 4,
      background: 'var(--teal)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 150,
      height: 12,
      borderRadius: 3,
      background: 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 90,
      height: 12,
      borderRadius: 3,
      background: 'rgba(255,255,255,0.18)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: 'calc(100% - 52px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 220,
      background: 'var(--white)',
      borderRight: '1px solid var(--border-hairline)',
      padding: '20px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, [0, 1, 2, 3, 4, 5].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      opacity: i === 2 ? 1 : 0.5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 16,
      height: 16,
      borderRadius: 4,
      background: i === 2 ? 'var(--orange)' : 'var(--navy-30)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10,
      width: 120 - i * 8,
      borderRadius: 3,
      background: 'var(--navy-30)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 16,
      width: 280,
      borderRadius: 4,
      background: 'var(--navy-30)',
      marginBottom: 22
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 90,
      borderRadius: 10,
      background: 'var(--white)',
      border: '1px solid var(--border-hairline)'
    }
  }))))));
}
function Watermark({
  opacity = 0.55,
  corner = 'br'
}) {
  const pos = corner === 'br' ? {
    bottom: '5%',
    right: '4%'
  } : {
    top: '5%',
    right: '4%'
  };
  return /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark-dark.svg",
    alt: "",
    style: {
      position: 'absolute',
      width: 138,
      opacity,
      ...pos
    }
  });
}

/* 01 — Thumbnail (1280×720): navy radial base, teal tag chip, title with one orange word, teal footer */
function ThumbnailFrame() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(120% 100% at 80% 0%, #143052 0%, var(--navy) 55%)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 1280 720",
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.10
    },
    fill: "none",
    stroke: "#ffffff",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "1080",
    cy: "120",
    r: "6",
    fill: "#fff",
    stroke: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M1080 120 H980 V260"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "980",
    cy: "260",
    r: "6",
    fill: "#fff",
    stroke: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M1180 420 H1080"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "1080",
    cy: "420",
    r: "6",
    fill: "#fff",
    stroke: "none"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 48,
      left: 56
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 500,
      fontSize: 22,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--navy)',
      background: 'var(--teal)',
      padding: '8px 18px',
      borderRadius: 999
    }
  }, "EP 04")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 56,
      top: 168,
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 96,
      lineHeight: 1.02,
      letterSpacing: '-0.02em',
      color: 'var(--white)'
    }
  }, "Install ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--orange)'
    }
  }, "Moodle\xA05.2"), " on Ubuntu")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 56,
      bottom: 52,
      fontFamily: 'var(--font-mono)',
      fontWeight: 500,
      fontSize: 24,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--teal)'
    }
  }, "Step-by-step \xB7 2026"), /*#__PURE__*/React.createElement(Watermark, {
    opacity: 0.15
  }));
}

/* 02 — Title card (navy field, teal eyebrow, white title, orange trace underline) */
function TitleCard() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--navy)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 96px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 26
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: 'var(--teal)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 500,
      fontSize: 24,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--teal)'
    }
  }, "Episode 04 \xB7 Module 02")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 84,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      color: 'var(--white)',
      maxWidth: 920
    }
  }, "Configuring the Moodle database"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 180,
      height: 6,
      background: 'var(--orange)',
      borderRadius: 3,
      marginTop: 34
    }
  }), /*#__PURE__*/React.createElement(Watermark, {
    opacity: 0.5
  }));
}

/* 03 — Lower-third over footage (orange node-bar, navy 92% panel, name + teal role) */
function LowerThird() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(FauxScreen, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '5%',
      bottom: '12%',
      display: 'flex',
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      background: 'var(--orange)',
      borderRadius: '4px 0 0 4px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(11,31,58,0.92)',
      padding: '20px 30px',
      borderRadius: '0 8px 8px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 40,
      color: 'var(--white)',
      lineHeight: 1
    }
  }, "DreamOp"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 500,
      fontSize: 22,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--teal)',
      marginTop: 8
    }
  }, "Instructional designer"))), /*#__PURE__*/React.createElement(Watermark, {
    opacity: 0.55,
    corner: "tr"
  }));
}

/* 04 — Terminal overlay + node-and-trace callout pointing at a UI element */
function TerminalFrame() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(FauxScreen, null), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 1280 720",
    style: {
      position: 'absolute',
      inset: 0
    },
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M250 250 H470",
    stroke: "var(--orange)",
    strokeWidth: "4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "470",
    cy: "250",
    r: "9",
    fill: "var(--orange)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: '5%',
      bottom: '8%',
      width: 620,
      background: 'var(--code-bg)',
      borderRadius: 16,
      boxShadow: 'var(--shadow-code)',
      overflow: 'hidden',
      fontFamily: 'var(--font-mono)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '12px 16px',
      borderBottom: '1px solid rgba(255,255,255,0.07)'
    }
  }, ['#ff5f56', '#ffbd2e', '#27c93f'].map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: c
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8,
      fontSize: 16,
      color: '#8aa0b8'
    }
  }, "dreamop@server: ~")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px',
      fontSize: 20,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--code-comment)'
    }
  }, "# enable the scheduled task runner"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--teal)'
    }
  }, "$ "), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#fff'
    }
  }, "sudo crontab "), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--orange)'
    }
  }, "-u"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#fff'
    }
  }, " www-data "), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--orange)'
    }
  }, "-e")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--teal)'
    }
  }, "\u2713 moodle cron registered"))), /*#__PURE__*/React.createElement(Watermark, {
    opacity: 0.5,
    corner: "tr"
  }));
}
window.OEOFrames = {
  ART_W,
  ART_H,
  ThumbnailFrame,
  TitleCard,
  LowerThird,
  TerminalFrame
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/video-production/Frames.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CodeBlock = __ds_scope.CodeBlock;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Lockup = __ds_scope.Lockup;

__ds_ns.Tag = __ds_scope.Tag;

})();
