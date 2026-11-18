// Checks the calculation code in index.html against the hand calculations in test_cases.md.
// Run from the project folder:  node 02_validation/run_tests.js
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const calc = html.split('// === CALC START ===')[1].split('// === CALC END ===')[0];
const lib = new Function(calc + '; return { sectionProperties, analyzeBeam, designChecks };')();

const W12 = { material: 'steel', wShape: 'W12x26' };
const cases = [
  { name: '1 Spec case', beam: { ...W12, support: 'simple', span: 20, pointLoads: [], uniformLoads: [{ w: 1, start: 0, end: 20 }] },
    expect: { RA: 10, RB: 10, M: 50.0, defl: 0.609, fb: 17.96, bendPass: true, deflPass: true } },
  { name: '2 Midspan point load', beam: { ...W12, support: 'simple', span: 20, pointLoads: [{ P: 10, x: 10 }], uniformLoads: [] },
    expect: { RA: 5, RB: 5, M: 50.0, defl: 0.487 } },
  { name: '3 Off-center point load', beam: { ...W12, support: 'simple', span: 20, pointLoads: [{ P: 10, x: 5 }], uniformLoads: [] },
    expect: { RA: 7.5, RB: 2.5, M: 37.5, Mx: 5 } },
  { name: '4 Partial uniform load', beam: { ...W12, support: 'simple', span: 20, pointLoads: [], uniformLoads: [{ w: 2, start: 0, end: 10 }] },
    expect: { RA: 15, RB: 5, M: 56.25, Mx: 7.5 } },
  { name: '5 Cantilever tip load', beam: { ...W12, support: 'cantilever', span: 10, pointLoads: [{ P: 2, x: 10 }], uniformLoads: [] },
    expect: { RA: 2, MA: 20, M: 20.0, defl: 0.195 } },
  { name: '6 Cantilever uniform load', beam: { ...W12, support: 'cantilever', span: 10, pointLoads: [], uniformLoads: [{ w: 1, start: 0, end: 10 }] },
    expect: { RA: 10, MA: 50, M: 50.0, defl: 0.365 } },
  { name: '7 Lumber 2x10', beam: { material: 'lumber', lumberSize: '2x10', support: 'simple', span: 12, pointLoads: [], uniformLoads: [{ w: 0.1, start: 0, end: 12 }] },
    expect: { S: 21.39, I: 98.93, M: 1.8, fb: 1.010, defl: 0.295, bendPass: false, deflPass: true } }
];

// Tolerance: half a unit in the last digit given in the hand calculation (at least 0.0005).
const tol = v => { const d = (String(v).split('.')[1] || '').length; return Math.max(0.5 * 10 ** -d, 0.0005); };

let failures = 0;
for (const c of cases) {
  const sec = lib.sectionProperties(c.beam);
  const a = lib.analyzeBeam(c.beam, sec);
  const k = lib.designChecks(a, sec, c.beam.span);
  const got = {
    RA: a.reactions.RA, RB: a.reactions.RB, MA: a.reactions.MA,
    M: Math.abs(a.maxMoment.value), Mx: a.maxMoment.x,
    defl: Math.abs(a.maxDeflection.value), fb: k.bending.fb, S: sec.S, I: sec.I,
    bendPass: k.bending.pass, deflPass: k.deflection.pass
  };
  const lines = [];
  let ok = true;
  for (const [key, want] of Object.entries(c.expect)) {
    const have = got[key];
    const pass = typeof want === 'boolean' ? have === want : Math.abs(have - want) <= tol(want);
    if (!pass) ok = false;
    lines.push(`   ${pass ? 'ok  ' : 'FAIL'} ${key}: expected ${want}, got ${typeof have === 'number' ? have.toFixed(4) : have}`);
  }
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${c.name}`);
  if (!ok) { failures++; console.log(lines.join('\n')); }
}
console.log(failures === 0 ? `\nAll ${cases.length} cases pass.` : `\n${failures} of ${cases.length} cases failed.`);
process.exit(failures === 0 ? 0 : 1);
